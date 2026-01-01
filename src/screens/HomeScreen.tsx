import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { MainTabParamList } from '../types';

type NavigationProp = BottomTabNavigationProp<MainTabParamList>;

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  screen: keyof MainTabParamList;
}

const quickActions: QuickAction[] = [
  { id: '1', title: 'Devises', icon: 'swap-horizontal', color: Colors.primary, screen: 'Currency' },
  { id: '2', title: 'Prières', icon: 'moon', color: Colors.secondary, screen: 'Prayer' },
  { id: '3', title: 'Urgences', icon: 'call', color: Colors.error, screen: 'Emergency' },
  { id: '4', title: 'Notes', icon: 'document-text', color: Colors.info, screen: 'Notes' },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentDate = new Date();
  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.date}>{formatDate(currentDate)}</Text>
          </View>
          <View style={styles.flagContainer}>
            <View style={[styles.flagStripe, styles.flagOrange]} />
            <View style={[styles.flagStripe, styles.flagWhite]}>
              <View style={styles.flagSun} />
            </View>
            <View style={[styles.flagStripe, styles.flagGreen]} />
          </View>
        </View>

        {/* Welcome Card */}
        <Card style={styles.welcomeCard} variant="elevated">
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Niger Services</Text>
            <Text style={styles.welcomeSubtitle}>
              Votre assistant quotidien pour les services essentiels au Niger
            </Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Did You Know Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Le saviez-vous ?</Text>
          <Card style={styles.factCard}>
            <View style={styles.factIconContainer}>
              <Ionicons name="bulb-outline" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.factContent}>
              <Text style={styles.factText}>
                Le Niger est le plus grand pays d'Afrique de l'Ouest avec une superficie de 1 267 000 km².
              </Text>
            </View>
          </Card>
        </View>

        {/* AI Assistant Promo */}
        <TouchableOpacity 
          style={styles.aiPromo}
          onPress={() => navigation.navigate('AI')}
          activeOpacity={0.9}
        >
          <View style={styles.aiPromoContent}>
            <View style={styles.aiPromoText}>
              <Text style={styles.aiPromoTitle}>Assistant Intelligent</Text>
              <Text style={styles.aiPromoSubtitle}>Posez vos questions sur le Niger, même hors-ligne !</Text>
            </View>
            <View style={styles.aiPromoIcon}>
              <Ionicons name="chatbubble-ellipses" size={32} color={Colors.white} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Fonctionne hors ligne 📴</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
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
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textTransform: 'capitalize',
  },
  flagContainer: {
    width: 48,
    height: 32,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    flexDirection: 'column',
    ...Shadow.sm,
  },
  flagStripe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  flagSun: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  welcomeCard: {
    margin: Spacing.md,
    backgroundColor: Colors.primary,
  },
  welcomeContent: {
    padding: Spacing.sm,
  },
  welcomeTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  factIconContainer: {
    marginRight: Spacing.md,
  },
  factContent: {
    flex: 1,
  },
  factText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  aiPromo: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.md,
  },
  aiPromoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiPromoText: {
    flex: 1,
    marginRight: Spacing.md,
  },
  aiPromoTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  aiPromoSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  aiPromoIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  infoValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
});
