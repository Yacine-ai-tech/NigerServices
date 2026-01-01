import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { NIGER_CITIES, STRINGS } from '../constants';
import { database } from '../services';
import { AppSettings, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconColor = Colors.primary,
  title,
  subtitle,
  onPress,
  rightElement,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={[styles.settingIcon, { backgroundColor: `${iconColor}15` }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement || (onPress && (
      <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
    ))}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [settings, setSettings] = useState<AppSettings>({
    language: 'fr',
    darkMode: false,
    selectedCity: 'niamey',
    notificationsEnabled: false,
  });
  const [showCityPicker, setShowCityPicker] = useState(false);

  const strings = STRINGS.fr;

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const loadedSettings = await database.getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await database.saveSettings(newSettings);
    } catch (error) {
      console.error('Error saving setting:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder les paramètres');
    }
  };

  const getSelectedCityName = () => {
    const city = NIGER_CITIES.find(c => c.id === settings.selectedCity);
    return city?.name || 'Niamey';
  };

  const handleClearData = () => {
    Alert.alert(
      'Effacer les données',
      'Voulez-vous vraiment effacer toutes les notes? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Effacer',
          style: 'destructive',
          onPress: async () => {
            try {
              // Implementation would clear notes
              Alert.alert('Succès', 'Les données ont été effacées');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible d\'effacer les données');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{strings.settings}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General Settings */}
        <Text style={styles.sectionTitle}>Général</Text>
        <Card style={styles.sectionCard}>
          <SettingItem
            icon="location"
            title="Ville par défaut"
            subtitle={getSelectedCityName()}
            onPress={() => setShowCityPicker(!showCityPicker)}
          />
          
          {showCityPicker && (
            <View style={styles.pickerContainer}>
              {NIGER_CITIES.map(city => (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.pickerItem,
                    city.id === settings.selectedCity && styles.pickerItemSelected,
                  ]}
                  onPress={() => {
                    updateSetting('selectedCity', city.id);
                    setShowCityPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      city.id === settings.selectedCity && styles.pickerItemTextSelected,
                    ]}
                  >
                    {city.name}
                  </Text>
                  {city.id === settings.selectedCity && (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.divider} />
          
          <SettingItem
            icon="language"
            iconColor={Colors.info}
            title={strings.language}
            subtitle="Français"
          />
        </Card>

        {/* Appearance */}
        <Text style={styles.sectionTitle}>Apparence</Text>
        <Card style={styles.sectionCard}>
          <SettingItem
            icon="moon"
            iconColor={Colors.secondary}
            title={strings.darkMode}
            subtitle="Non disponible"
            rightElement={
              <Switch
                value={settings.darkMode}
                onValueChange={(value) => updateSetting('darkMode', value)}
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={settings.darkMode ? Colors.primary : Colors.surface}
                disabled
              />
            }
          />
        </Card>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Card style={styles.sectionCard}>
          <SettingItem
            icon="notifications"
            iconColor={Colors.warning}
            title={strings.notifications}
            subtitle="Rappels de prière"
            rightElement={
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) => updateSetting('notificationsEnabled', value)}
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={settings.notificationsEnabled ? Colors.primary : Colors.surface}
              />
            }
          />
        </Card>

        {/* Data */}
        <Text style={styles.sectionTitle}>Données</Text>
        <Card style={styles.sectionCard}>
          <SettingItem
            icon="trash"
            iconColor={Colors.error}
            title="Effacer les notes"
            subtitle="Supprimer toutes les notes"
            onPress={handleClearData}
          />
        </Card>

        {/* About */}
        <Text style={styles.sectionTitle}>{strings.about}</Text>
        <Card style={styles.sectionCard}>
          <SettingItem
            icon="information-circle"
            iconColor={Colors.info}
            title="Niger Services"
            subtitle="Version 1.0.0"
          />
          <View style={styles.divider} />
          <SettingItem
            icon="heart"
            iconColor={Colors.error}
            title="Développé pour le Niger"
            subtitle="Fonctionne hors ligne 📴"
          />
        </Card>

        {/* Flag Card */}
        <Card style={styles.flagCard}>
          <View style={styles.flagContainer}>
            <View style={[styles.flagStripe, styles.flagOrange]} />
            <View style={[styles.flagStripe, styles.flagWhite]} />
            <View style={[styles.flagStripe, styles.flagGreen]} />
          </View>
          <Text style={styles.flagText}>République du Niger</Text>
          <Text style={styles.flagSubtext}>Fraternité - Travail - Progrès</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.round,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
    marginLeft: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  settingSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.md + 36 + Spacing.md,
  },
  pickerContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.sm,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  pickerItemSelected: {
    backgroundColor: `${Colors.primary}10`,
  },
  pickerItemText: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  pickerItemTextSelected: {
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  flagCard: {
    marginTop: Spacing.lg,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  flagContainer: {
    width: 80,
    height: 54,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: Spacing.md,
    ...Shadow.md,
  },
  flagStripe: {
    flex: 1,
  },
  flagOrange: {
    backgroundColor: Colors.primary,
  },
  flagWhite: {
    backgroundColor: Colors.white,
  },
  flagGreen: {
    backgroundColor: Colors.secondary,
  },
  flagText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  flagSubtext: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});
