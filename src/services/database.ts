import * as SQLite from 'expo-sqlite';
import { Note, AppSettings } from '../types';

const DB_NAME = 'nigerservices.db';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = SQLite.openDatabaseSync(DB_NAME);
      await this.createTables();
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        isPinned INTEGER DEFAULT 0,
        color TEXT
      );
    `);

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS cached_rates (
        currency_code TEXT PRIMARY KEY,
        rate REAL NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
  }

  async getAllNotes(): Promise<Note[]> {
    if (!this.db) throw new Error('Database not initialized');

    const rows = await this.db.getAllAsync<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      isPinned: number;
      color: string | null;
    }>('SELECT * FROM notes ORDER BY isPinned DESC, updatedAt DESC');

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      isPinned: row.isPinned === 1,
      color: row.color ?? undefined,
    }));
  }

  async getNoteById(id: string): Promise<Note | null> {
    if (!this.db) throw new Error('Database not initialized');

    const rows = await this.db.getAllAsync<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      isPinned: number;
      color: string | null;
    }>('SELECT * FROM notes WHERE id = ?', [id]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      isPinned: row.isPinned === 1,
      color: row.color ?? undefined,
    };
  }

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    if (!this.db) throw new Error('Database not initialized');

    const id = this.generateId();
    const now = new Date().toISOString();

    await this.db.runAsync(
      'INSERT INTO notes (id, title, content, createdAt, updatedAt, isPinned, color) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, note.title, note.content, now, now, note.isPinned ? 1 : 0, note.color ?? null]
    );

    return {
      id,
      title: note.title,
      content: note.content,
      createdAt: now,
      updatedAt: now,
      isPinned: note.isPinned,
      color: note.color,
    };
  }

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const now = new Date().toISOString();
    const fields: string[] = ['updatedAt = ?'];
    const values: (string | number | null)[] = [now];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push('content = ?');
      values.push(updates.content);
    }
    if (updates.isPinned !== undefined) {
      fields.push('isPinned = ?');
      values.push(updates.isPinned ? 1 : 0);
    }
    if (updates.color !== undefined) {
      fields.push('color = ?');
      values.push(updates.color ?? null);
    }

    values.push(id);

    await this.db.runAsync(
      `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  async deleteNote(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    await this.db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
  }

  async getSetting(key: string): Promise<string | null> {
    if (!this.db) throw new Error('Database not initialized');

    const rows = await this.db.getAllAsync<{ value: string }>(
      'SELECT value FROM settings WHERE key = ?',
      [key]
    );

    return rows.length > 0 ? rows[0].value : null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [key, value]
    );
  }

  async getSettings(): Promise<AppSettings> {
    const language = (await this.getSetting('language')) as 'fr' | 'en' || 'fr';
    const darkMode = (await this.getSetting('darkMode')) === 'true';
    const selectedCity = (await this.getSetting('selectedCity')) || 'niamey';
    const notificationsEnabled = (await this.getSetting('notificationsEnabled')) === 'true';

    return { language, darkMode, selectedCity, notificationsEnabled };
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    await this.setSetting('language', settings.language);
    await this.setSetting('darkMode', String(settings.darkMode));
    await this.setSetting('selectedCity', settings.selectedCity);
    await this.setSetting('notificationsEnabled', String(settings.notificationsEnabled));
  }

  async getCachedRates(): Promise<Record<string, number>> {
    if (!this.db) throw new Error('Database not initialized');

    const rows = await this.db.getAllAsync<{ currency_code: string; rate: number }>(
      'SELECT currency_code, rate FROM cached_rates'
    );

    const rates: Record<string, number> = {};
    for (const row of rows) {
      rates[row.currency_code] = row.rate;
    }

    return rates;
  }

  async saveCachedRates(rates: Record<string, number>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const now = new Date().toISOString();

    for (const [code, rate] of Object.entries(rates)) {
      await this.db.runAsync(
        'INSERT OR REPLACE INTO cached_rates (currency_code, rate, updated_at) VALUES (?, ?, ?)',
        [code, rate, now]
      );
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export const database = new DatabaseService();
