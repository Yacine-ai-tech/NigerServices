import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { STRINGS } from '../constants';
import { database } from '../services';
import { Note, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NOTE_COLORS = [
  '#FFFFFF',
  '#FFF9C4',
  '#FFE0B2',
  '#F8BBD9',
  '#E1BEE7',
  '#C5CAE9',
  '#B3E5FC',
  '#B2DFDB',
  '#C8E6C9',
];

const CATEGORIES = [
  { id: 'all', name: 'Toutes', icon: 'apps' },
  { id: 'personal', name: 'Personnel', icon: 'person' },
  { id: 'work', name: 'Travail', icon: 'briefcase' },
  { id: 'ideas', name: 'Idées', icon: 'bulb' },
  { id: 'shopping', name: 'Courses', icon: 'cart' },
];

export const NotesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const strings = STRINGS.fr;

  const loadNotes = async () => {
    try {
      const fetchedNotes = await database.getAllNotes();
      setNotes(fetchedNotes);
      filterNotes(fetchedNotes, searchQuery, selectedCategory);
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Erreur', 'Impossible de charger les notes');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const filterNotes = (allNotes: Note[], query: string, category: string) => {
    let filtered = [...allNotes];
    
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        note =>
          note.title.toLowerCase().includes(lowerQuery) ||
          note.content.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(note => note.category === category);
    }
    
    // Sort: pinned first, then by date
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    
    setFilteredNotes(filtered);
  };

  useEffect(() => {
    filterNotes(notes, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadNotes();
  };

  const handleCreateNote = () => {
    navigation.navigate('NoteDetail', {});
  };

  const handleEditNote = (noteId: string) => {
    navigation.navigate('NoteDetail', { noteId });
  };

  const handleDeleteNote = (noteId: string, noteTitle: string) => {
    Alert.alert(
      'Supprimer la note',
      `Voulez-vous vraiment supprimer "${noteTitle}"?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.deleteNote(noteId);
              loadNotes();
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la note');
            }
          },
        },
      ]
    );
  };

  const handleTogglePin = async (note: Note) => {
    try {
      await database.updateNote(note.id, { isPinned: !note.isPinned });
      loadNotes();
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleEditNote(item.id)}
      onLongPress={() => handleDeleteNote(item.id, item.title)}
    >
      <Card
        style={[
          styles.noteCard,
          { backgroundColor: item.color || Colors.surface },
        ]}
      >
        <View style={styles.noteHeader}>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title || 'Sans titre'}
          </Text>
          <TouchableOpacity
            onPress={() => handleTogglePin(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={item.isPinned ? 'pin' : 'pin-outline'}
              size={18}
              color={item.isPinned ? Colors.primary : Colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
        {item.content && (
          <Text style={styles.noteContent} numberOfLines={3}>
            {truncateContent(item.content)}
          </Text>
        )}
        <View style={styles.noteFooter}>
          <Text style={styles.noteDate}>{formatDate(item.updatedAt)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name="document-text-outline" size={64} color={Colors.textTertiary} />
      </View>
      <Text style={styles.emptyTitle}>{strings.noNotes}</Text>
      <Text style={styles.emptySubtitle}>{strings.addFirstNote}</Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={handleCreateNote}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={20} color={Colors.white} />
        <Text style={styles.emptyButtonText}>Créer une note</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{strings.myNotes}</Text>
          <Text style={styles.headerSubtitle}>
            {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateNote}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une note..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Ionicons
              name={cat.icon as keyof typeof Ionicons.glyphMap}
              size={16}
              color={selectedCategory === cat.id ? Colors.white : Colors.textSecondary}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredNotes.length === 0 && !isLoading ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      )}

      {/* Info Card */}
      {filteredNotes.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Appuyez longuement pour supprimer une note
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    padding: 0,
  },
  categoryContainer: {
    maxHeight: 50,
    marginBottom: Spacing.sm,
  },
  categoryContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surface,
    gap: Spacing.xs,
    ...Shadow.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  columnWrapper: {
    gap: Spacing.md,
  },
  noteCard: {
    flex: 1,
    marginBottom: Spacing.md,
    maxWidth: '48%',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  noteTitle: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  noteContent: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Shadow.md,
  },
  emptyButtonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  infoContainer: {
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  infoText: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
});
