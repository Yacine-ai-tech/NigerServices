import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HomeScreen } from './src/screens/HomeScreen';
import { CurrencyScreen } from './src/screens/CurrencyScreen';
import { PrayerScreen } from './src/screens/PrayerScreen';
import { EmergencyScreen } from './src/screens/EmergencyScreen';
import { NotesScreen } from './src/screens/NotesScreen';
import { NoteDetailScreen } from './src/screens/NoteDetailScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AIScreen } from './src/screens/AIScreen';
import { Colors, FontSize, FontWeight } from './src/constants';
import { database } from './src/services';
import { RootStackParamList, MainTabParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Currency':
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
              break;
            case 'Prayer':
              iconName = focused ? 'moon' : 'moon-outline';
              break;
            case 'Emergency':
              iconName = focused ? 'call' : 'call-outline';
              break;
            case 'Notes':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'AI':
              iconName = focused ? 'sparkles' : 'sparkles-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: FontWeight.medium,
          paddingBottom: 6,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Accueil' }}
      />
      <Tab.Screen 
        name="Currency" 
        component={CurrencyScreen}
        options={{ tabBarLabel: 'Devises' }}
      />
      <Tab.Screen 
        name="Prayer" 
        component={PrayerScreen}
        options={{ tabBarLabel: 'Prières' }}
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyScreen}
        options={{ tabBarLabel: 'Urgences' }}
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen}
        options={{ tabBarLabel: 'Notes' }}
      />
      <Tab.Screen 
        name="AI" 
        component={AIScreen}
        options={{ tabBarLabel: 'Assistant' }}
      />
    </Tab.Navigator>
  );
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingContent}>
      <View style={styles.flagContainer}>
        <View style={[styles.flagStripe, styles.flagOrange]} />
        <View style={[styles.flagStripe, styles.flagWhite]} />
        <View style={[styles.flagStripe, styles.flagGreen]} />
      </View>
      <Text style={styles.loadingTitle}>Niger Services</Text>
      <ActivityIndicator size="large" color={Colors.primary} style={styles.spinner} />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  </View>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await database.initialize();
      // Simulate a brief loading for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to initialize app:', err);
      setError('Erreur lors du chargement de l\'application');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={Colors.error} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.background}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen 
              name="NoteDetail" 
              component={NoteDetailScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  flagContainer: {
    width: 80,
    height: 54,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  loadingTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  spinner: {
    marginVertical: 16,
  },
  loadingText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: FontSize.lg,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 16,
  },
});
