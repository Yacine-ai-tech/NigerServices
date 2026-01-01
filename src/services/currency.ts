import { EXCHANGE_RATES, CURRENCIES } from '../constants';
import { database } from './database';

class CurrencyService {
  private rates: Record<string, number> = EXCHANGE_RATES;
  private lastUpdated: Date = new Date();

  async initialize(): Promise<void> {
    // Try to load cached rates from database
    try {
      const cachedRates = await database.getCachedRates();
      if (Object.keys(cachedRates).length > 0) {
        this.rates = cachedRates;
      }
    } catch (error) {
      // Use default rates if database fails
      this.rates = EXCHANGE_RATES;
    }
  }

  getCurrencies() {
    return CURRENCIES;
  }

  getRates(): Record<string, number> {
    return this.rates;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (amount === 0) return 0;
    
    // Convert to XOF first (base currency), then to target
    const amountInXOF = fromCurrency === 'XOF' 
      ? amount 
      : amount / (this.rates[fromCurrency] || 1);
    
    const result = toCurrency === 'XOF'
      ? amountInXOF
      : amountInXOF * (this.rates[toCurrency] || 1);
    
    return Math.round(result * 100) / 100;
  }

  // Format currency with proper symbol and locale
  formatCurrency(amount: number, currencyCode: string): string {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    if (!currency) return amount.toFixed(2);

    // Format based on currency
    if (currencyCode === 'XOF') {
      return `${this.formatNumber(amount)} FCFA`;
    }
    
    return `${currency.symbol}${this.formatNumber(amount)}`;
  }

  private formatNumber(num: number): string {
    return num.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  // Update rates from API when online
  async updateRatesFromAPI(): Promise<boolean> {
    try {
      // In a real app, you would fetch from an API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/XOF');
      // For now, we'll use the static rates but simulate an update
      
      this.lastUpdated = new Date();
      await database.saveCachedRates(this.rates);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const currencyService = new CurrencyService();
