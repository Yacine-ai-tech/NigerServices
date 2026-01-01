// Niger-inspired color palette based on the flag: Orange, White, Green
// Plus modern complementary colors

export const Colors = {
  // Primary colors from Niger flag
  primary: '#E05206', // Niger Orange
  secondary: '#0D9F4F', // Niger Green
  white: '#FFFFFF',
  
  // Extended palette
  primaryLight: '#FF7A3D',
  primaryDark: '#B84000',
  secondaryLight: '#2AC46A',
  secondaryDark: '#087A3A',
  
  // Neutral colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F2F5',
  
  // Text colors
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A68',
  textTertiary: '#8A8AA3',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
  
  // Status colors
  success: '#0D9F4F',
  warning: '#F5A623',
  error: '#E53935',
  info: '#2196F3',
  
  // Border and divider
  border: '#E1E4E8',
  divider: '#EAECEF',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Dark mode colors
  dark: {
    background: '#1A1A2E',
    surface: '#252542',
    surfaceVariant: '#2D2D4A',
    textPrimary: '#FFFFFF',
    textSecondary: '#B8B8D0',
    textTertiary: '#7A7A98',
    border: '#3A3A58',
    divider: '#2D2D4A',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadow = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
};
