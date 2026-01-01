import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { CURRENCIES } from '../constants';
import { currencyService } from '../services';

export const CurrencyScreen: React.FC = () => {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('XOF');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const currencies = currencyService.getCurrencies();

  const convertedAmount = useCallback(() => {
    const numAmount = parseFloat(amount) || 0;
    return currencyService.convert(numAmount, fromCurrency, toCurrency);
  }, [amount, fromCurrency, toCurrency]);

  const getFromCurrency = () => currencies.find(c => c.code === fromCurrency);
  const getToCurrency = () => currencies.find(c => c.code === toCurrency);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const formatResult = (value: number): string => {
    return value.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Convertisseur de devises</Text>
        <Text style={styles.headerSubtitle}>Taux XOF/FCFA fixe: 1 EUR = 655.957 FCFA</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Input */}
        <Card style={styles.inputCard} variant="elevated">
          <Text style={styles.cardLabel}>Montant</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={Colors.textTertiary}
          />
        </Card>

        {/* Currency Selection */}
        <View style={styles.currencyRow}>
          {/* From Currency */}
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => setShowFromPicker(!showFromPicker)}
            activeOpacity={0.7}
          >
            <Card style={styles.currencyCard}>
              <Text style={styles.currencyFlag}>{getFromCurrency()?.flag}</Text>
              <View style={styles.currencyInfo}>
                <Text style={styles.currencyCode}>{fromCurrency}</Text>
                <Text style={styles.currencyName}>{getFromCurrency()?.name}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
            </Card>
          </TouchableOpacity>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
            <Ionicons name="swap-horizontal" size={24} color={Colors.white} />
          </TouchableOpacity>

          {/* To Currency */}
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => setShowToPicker(!showToPicker)}
            activeOpacity={0.7}
          >
            <Card style={styles.currencyCard}>
              <Text style={styles.currencyFlag}>{getToCurrency()?.flag}</Text>
              <View style={styles.currencyInfo}>
                <Text style={styles.currencyCode}>{toCurrency}</Text>
                <Text style={styles.currencyName}>{getToCurrency()?.name}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
            </Card>
          </TouchableOpacity>
        </View>

        {/* Currency Picker for From */}
        {showFromPicker && (
          <Card style={styles.pickerCard}>
            <ScrollView style={styles.pickerScroll} nestedScrollEnabled>
              {currencies.map(currency => (
                <TouchableOpacity
                  key={currency.code}
                  style={[
                    styles.pickerItem,
                    currency.code === fromCurrency && styles.pickerItemSelected,
                  ]}
                  onPress={() => {
                    setFromCurrency(currency.code);
                    setShowFromPicker(false);
                  }}
                >
                  <Text style={styles.pickerFlag}>{currency.flag}</Text>
                  <Text style={styles.pickerCode}>{currency.code}</Text>
                  <Text style={styles.pickerName}>{currency.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card>
        )}

        {/* Currency Picker for To */}
        {showToPicker && (
          <Card style={styles.pickerCard}>
            <ScrollView style={styles.pickerScroll} nestedScrollEnabled>
              {currencies.map(currency => (
                <TouchableOpacity
                  key={currency.code}
                  style={[
                    styles.pickerItem,
                    currency.code === toCurrency && styles.pickerItemSelected,
                  ]}
                  onPress={() => {
                    setToCurrency(currency.code);
                    setShowToPicker(false);
                  }}
                >
                  <Text style={styles.pickerFlag}>{currency.flag}</Text>
                  <Text style={styles.pickerCode}>{currency.code}</Text>
                  <Text style={styles.pickerName}>{currency.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card>
        )}

        {/* Result */}
        <Card style={styles.resultCard} variant="elevated">
          <Text style={styles.resultLabel}>Résultat</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultAmount}>{formatResult(convertedAmount())}</Text>
            <Text style={styles.resultCurrency}>{getToCurrency()?.symbol}</Text>
          </View>
          <Text style={styles.resultConversion}>
            {amount || '0'} {getFromCurrency()?.symbol} = {formatResult(convertedAmount())} {getToCurrency()?.symbol}
          </Text>
        </Card>

        {/* Quick Amounts */}
        <View style={styles.quickAmounts}>
          <Text style={styles.quickTitle}>Montants rapides</Text>
          <View style={styles.quickRow}>
            {['1000', '5000', '10000', '50000'].map(quickAmount => (
              <TouchableOpacity
                key={quickAmount}
                style={[
                  styles.quickButton,
                  amount === quickAmount && styles.quickButtonActive,
                ]}
                onPress={() => setAmount(quickAmount)}
              >
                <Text
                  style={[
                    styles.quickButtonText,
                    amount === quickAmount && styles.quickButtonTextActive,
                  ]}
                >
                  {parseInt(quickAmount).toLocaleString('fr-FR')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  inputCard: {
    marginBottom: Spacing.md,
  },
  cardLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  amountInput: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    padding: 0,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  currencySelector: {
    flex: 1,
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  currencyFlag: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  currencyName: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  pickerCard: {
    marginBottom: Spacing.md,
    padding: 0,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerItemSelected: {
    backgroundColor: `${Colors.primary}10`,
  },
  pickerFlag: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  pickerCode: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    width: 50,
  },
  pickerName: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  resultCard: {
    backgroundColor: Colors.secondary,
    marginBottom: Spacing.lg,
  },
  resultLabel: {
    fontSize: FontSize.sm,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: Spacing.xs,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  resultAmount: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  resultCurrency: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  resultConversion: {
    fontSize: FontSize.sm,
    color: Colors.white,
    opacity: 0.8,
  },
  quickAmounts: {
    marginTop: Spacing.md,
  },
  quickTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  quickButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    ...Shadow.sm,
  },
  quickButtonActive: {
    backgroundColor: Colors.primary,
  },
  quickButtonText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  quickButtonTextActive: {
    color: Colors.white,
  },
});
