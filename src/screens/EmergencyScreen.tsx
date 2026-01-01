import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { EMERGENCY_CONTACTS, STRINGS } from '../constants';
import { EmergencyContact } from '../types';

type CategoryFilter = 'all' | 'security' | 'medical' | 'utility' | 'embassy' | 'transport' | 'emergency';

interface CategoryOption {
  id: CategoryFilter;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const categories: CategoryOption[] = [
  { id: 'all', label: 'Tous', icon: 'apps' },
  { id: 'emergency', label: 'Urgences', icon: 'alert-circle' },
  { id: 'security', label: 'Sécurité', icon: 'shield' },
  { id: 'medical', label: 'Médical', icon: 'medical' },
  { id: 'utility', label: 'Services', icon: 'construct' },
  { id: 'transport', label: 'Transport', icon: 'airplane' },
];

export const EmergencyScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const strings = STRINGS.fr;

  const handleCall = (contact: EmergencyContact) => {
    const phoneNumber = Platform.select({
      ios: `telprompt:${contact.number.replace(/\s/g, '')}`,
      android: `tel:${contact.number.replace(/\s/g, '')}`,
    });

    if (phoneNumber) {
      Linking.canOpenURL(phoneNumber)
        .then((supported) => {
          if (supported) {
            Linking.openURL(phoneNumber);
          } else {
            Alert.alert(
              'Appel non disponible',
              `Impossible d'appeler ${contact.number}. Veuillez composer manuellement ce numéro.`,
              [{ text: 'OK' }]
            );
          }
        })
        .catch((err) => {
          console.error('Error making call:', err);
          Alert.alert('Erreur', 'Une erreur est survenue lors de l\'appel.');
        });
    }
  };

  const filteredContacts = EMERGENCY_CONTACTS.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || contact.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getIconName = (iconString: string): keyof typeof Ionicons.glyphMap => {
    return iconString as keyof typeof Ionicons.glyphMap;
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'security':
        return Colors.info;
      case 'medical':
        return Colors.error;
      case 'utility':
        return Colors.warning;
      case 'embassy':
        return Colors.primary;
      case 'transport':
        return Colors.secondary;
      case 'emergency':
        return Colors.error;
      default:
        return Colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{strings.emergencyContacts}</Text>
        <Text style={styles.headerSubtitle}>Numéros d'urgence au Niger</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Card style={styles.searchCard}>
            <Ionicons name="search" size={20} color={Colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un contact..."
              placeholderTextColor={Colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
              </TouchableOpacity>
            )}
          </Card>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={selectedCategory === category.id ? Colors.white : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Important Notice */}
        <Card style={styles.warningCard}>
          <View style={styles.warningContent}>
            <Ionicons name="warning" size={24} color={Colors.warning} />
            <View style={styles.warningText}>
              <Text style={styles.warningTitle}>Urgences vitales</Text>
              <Text style={styles.warningDescription}>
                Police: 17 | Pompiers: 18 | SAMU: 15
              </Text>
            </View>
          </View>
        </Card>

        {/* Contacts List */}
        <View style={styles.contactsList}>
          {filteredContacts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>Aucun contact trouvé</Text>
            </View>
          ) : (
            filteredContacts.map((contact) => (
              <Card key={contact.id} style={styles.contactCard}>
                <TouchableOpacity
                  style={styles.contactContent}
                  onPress={() => handleCall(contact)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.contactIcon,
                      { backgroundColor: `${getCategoryColor(contact.category)}15` },
                    ]}
                  >
                    <Ionicons
                      name={getIconName(contact.icon)}
                      size={24}
                      color={getCategoryColor(contact.category)}
                    />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactDescription}>{contact.description}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>
                  </View>
                  <View style={styles.callButton}>
                    <Ionicons name="call" size={20} color={Colors.white} />
                  </View>
                </TouchableOpacity>
              </Card>
            ))
          )}
        </View>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={Colors.info} />
            <Text style={styles.infoTitle}>Information</Text>
          </View>
          <Text style={styles.infoText}>
            Ces numéros sont les contacts officiels d'urgence au Niger.
            Les numéros courts (17, 18, 15) sont gratuits et fonctionnent 24h/24.
            Fonctionne hors ligne.
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
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    padding: 0,
  },
  categoryScroll: {
    marginBottom: Spacing.md,
  },
  categoryContainer: {
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
  categoryLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  categoryLabelActive: {
    color: Colors.white,
  },
  warningCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: `${Colors.warning}10`,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  warningText: {
    flex: 1,
  },
  warningTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  warningDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  contactsList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  contactCard: {
    marginBottom: Spacing.xs,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  contactDescription: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  contactNumber: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    marginTop: 4,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textTertiary,
    marginTop: Spacing.md,
  },
  infoCard: {
    margin: Spacing.md,
    marginTop: Spacing.lg,
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
    color: Colors.textPrimary,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
