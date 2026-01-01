import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { NIGER_CITIES, STRINGS } from '../constants';
import { prayerTimeService } from '../services';
import { PrayerTimes, City } from '../types';

interface PrayerCardProps {
  name: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  isNext?: boolean;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ name, time, icon, isNext }) => (
  <Card style={[styles.prayerCard, isNext && styles.prayerCardNext]}>
    <View style={[styles.prayerIconContainer, isNext && styles.prayerIconContainerNext]}>
      <Ionicons
        name={icon}
        size={24}
        color={isNext ? Colors.white : Colors.primary}
      />
    </View>
    <View style={styles.prayerInfo}>
      <Text style={[styles.prayerName, isNext && styles.prayerNameNext]}>{name}</Text>
      {isNext && <Text style={styles.nextLabel}>Prochaine</Text>}
    </View>
    <Text style={[styles.prayerTime, isNext && styles.prayerTimeNext]}>{time}</Text>
  </Card>
);

export const PrayerScreen: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(NIGER_CITIES[0]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    calculatePrayerTimes();
    
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const calculatePrayerTimes = () => {
    const times = prayerTimeService.calculatePrayerTimes(new Date(), selectedCity);
    setPrayerTimes(times);
  };

  const getNextPrayer = (): string | null => {
    if (!prayerTimes) return null;
    
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const prayers = [
      { name: 'fajr', time: prayerTimes.fajr },
      { name: 'sunrise', time: prayerTimes.sunrise },
      { name: 'dhuhr', time: prayerTimes.dhuhr },
      { name: 'asr', time: prayerTimes.asr },
      { name: 'maghrib', time: prayerTimes.maghrib },
      { name: 'isha', time: prayerTimes.isha },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      if (prayerMinutes > now) {
        return prayer.name;
      }
    }
    return 'fajr'; // Next day's Fajr
  };

  const nextPrayer = getNextPrayer();
  const strings = STRINGS.fr;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Heures de prière</Text>
        <Text style={styles.headerDate}>{formatDate(currentTime)}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* City Selector */}
        <TouchableOpacity
          style={styles.citySelector}
          onPress={() => setShowCityPicker(!showCityPicker)}
          activeOpacity={0.7}
        >
          <Card style={styles.citySelectorCard}>
            <View style={styles.cityIcon}>
              <Ionicons name="location" size={24} color={Colors.primary} />
            </View>
            <View style={styles.cityInfo}>
              <Text style={styles.cityLabel}>Ville sélectionnée</Text>
              <Text style={styles.cityName}>{selectedCity.name}</Text>
            </View>
            <Ionicons
              name={showCityPicker ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={Colors.textSecondary}
            />
          </Card>
        </TouchableOpacity>

        {/* City Picker */}
        {showCityPicker && (
          <Card style={styles.pickerCard}>
            {NIGER_CITIES.map(city => (
              <TouchableOpacity
                key={city.id}
                style={[
                  styles.cityItem,
                  city.id === selectedCity.id && styles.cityItemSelected,
                ]}
                onPress={() => {
                  setSelectedCity(city);
                  setShowCityPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.cityItemText,
                    city.id === selectedCity.id && styles.cityItemTextSelected,
                  ]}
                >
                  {city.name}
                </Text>
                {city.id === selectedCity.id && (
                  <Ionicons name="checkmark" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* Prayer Times List */}
        {prayerTimes && (
          <View style={styles.prayerList}>
            <PrayerCard
              name={strings.fajr}
              time={prayerTimes.fajr}
              icon="moon"
              isNext={nextPrayer === 'fajr'}
            />
            <PrayerCard
              name={strings.sunrise}
              time={prayerTimes.sunrise}
              icon="sunny"
              isNext={nextPrayer === 'sunrise'}
            />
            <PrayerCard
              name={strings.dhuhr}
              time={prayerTimes.dhuhr}
              icon="sunny"
              isNext={nextPrayer === 'dhuhr'}
            />
            <PrayerCard
              name={strings.asr}
              time={prayerTimes.asr}
              icon="partly-sunny"
              isNext={nextPrayer === 'asr'}
            />
            <PrayerCard
              name={strings.maghrib}
              time={prayerTimes.maghrib}
              icon="cloudy-night"
              isNext={nextPrayer === 'maghrib'}
            />
            <PrayerCard
              name={strings.isha}
              time={prayerTimes.isha}
              icon="moon"
              isNext={nextPrayer === 'isha'}
            />
          </View>
        )}

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={Colors.info} />
            <Text style={styles.infoTitle}>Information</Text>
          </View>
          <Text style={styles.infoText}>
            Les heures de prière sont calculées selon la méthode de la Ligue Islamique Mondiale (Muslim World League).
            Les calculs fonctionnent hors ligne.
          </Text>
        </Card>
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
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerDate: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textTransform: 'capitalize',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  citySelector: {
    marginBottom: Spacing.md,
  },
  citySelectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  cityIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.round,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  cityInfo: {
    flex: 1,
  },
  cityLabel: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  cityName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  pickerCard: {
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cityItemSelected: {
    backgroundColor: `${Colors.primary}10`,
  },
  cityItemText: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  cityItemTextSelected: {
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  prayerList: {
    gap: Spacing.sm,
  },
  prayerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  prayerCardNext: {
    backgroundColor: Colors.primary,
  },
  prayerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.round,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  prayerIconContainerNext: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  prayerNameNext: {
    color: Colors.white,
  },
  nextLabel: {
    fontSize: FontSize.xs,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  prayerTime: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  prayerTimeNext: {
    color: Colors.white,
  },
  infoCard: {
    marginTop: Spacing.lg,
    backgroundColor: `${Colors.info}10`,
    borderLeftWidth: 3,
    borderLeftColor: Colors.info,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.info,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
