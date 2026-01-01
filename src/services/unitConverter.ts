import { UNIT_CATEGORIES } from '../constants';

class UnitConverterService {
  getCategories() {
    return UNIT_CATEGORIES;
  }

  getCategoryById(id: string) {
    return UNIT_CATEGORIES.find(cat => cat.id === id);
  }

  convert(value: number, fromUnitId: string, toUnitId: string, categoryId: string): number {
    if (value === 0) return 0;

    const category = this.getCategoryById(categoryId);
    if (!category) return 0;

    const fromUnit = category.units.find(u => u.id === fromUnitId);
    const toUnit = category.units.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return 0;

    // Special handling for temperature
    if (categoryId === 'temperature') {
      return this.convertTemperature(value, fromUnitId, toUnitId);
    }

    // Convert to base unit, then to target unit
    const baseValue = value * fromUnit.toBase;
    const result = baseValue / toUnit.toBase;

    return Math.round(result * 1000000) / 1000000; // Round to 6 decimal places
  }

  private convertTemperature(value: number, from: string, to: string): number {
    // Convert to Celsius first
    let celsius: number;
    
    switch (from) {
      case 'c':
        celsius = value;
        break;
      case 'f':
        celsius = (value - 32) * 5/9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        return value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'c':
        return Math.round(celsius * 100) / 100;
      case 'f':
        return Math.round((celsius * 9/5 + 32) * 100) / 100;
      case 'k':
        return Math.round((celsius + 273.15) * 100) / 100;
      default:
        return celsius;
    }
  }

  formatValue(value: number, unitSymbol: string): string {
    const formatted = value.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
    return `${formatted} ${unitSymbol}`;
  }
}

export const unitConverterService = new UnitConverterService();
