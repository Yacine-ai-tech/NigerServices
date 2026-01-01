import { EXCHANGE_RATES, CURRENCIES, CURRENCY_API } from '../constants';
import { database } from './database';

class CurrencyService {
  private rates: Record<string, number> = EXCHANGE_RATES;
  private lastUpdated: Date = new Date();
  private isOnline: boolean = false;

  async initialize(): Promise<void> {
    try {
      const cachedRates = await database.getCachedRates();
      if (Object.keys(cachedRates).length > 0) {
        this.rates = cachedRates;
      }
    } catch (error) {
      this.rates = EXCHANGE_RATES;
    }
    
    // Try to update from API
    await this.updateRatesFromAPI();
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

  getIsOnline(): boolean {
    return this.isOnline;
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (amount === 0) return 0;
    
    const amountInXOF = fromCurrency === 'XOF' 
      ? amount 
      : amount / (this.rates[fromCurrency] || 1);
    
    const result = toCurrency === 'XOF'
      ? amountInXOF
      : amountInXOF * (this.rates[toCurrency] || 1);
    
    return Math.round(result * 100) / 100;
  }

  formatCurrency(amount: number, currencyCode: string): string {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    if (!currency) return amount.toFixed(2);

    if (currencyCode === 'XOF' || currencyCode === 'XAF') {
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

  async updateRatesFromAPI(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${CURRENCY_API.baseUrl}XOF`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      
      if (data.rates) {
        const newRates: Record<string, number> = { XOF: 1 };
        
        // Convert API rates (from XOF) to our format
        CURRENCIES.forEach(curr => {
          if (data.rates[curr.code]) {
            newRates[curr.code] = data.rates[curr.code];
          }
        });

        // Keep EUR fixed at 655.957 (treaty rate)
        newRates['EUR'] = 0.00152449;
        newRates['XAF'] = 1; // XOF = XAF

        this.rates = newRates;
        this.lastUpdated = new Date();
        this.isOnline = true;

        await database.saveCachedRates(this.rates);
        return true;
      }
      
      throw new Error('Invalid response');
    } catch (error) {
      this.isOnline = false;
      // Use fallback rates silently
      return false;
    }
  }
}

export const currencyService = new CurrencyService();
