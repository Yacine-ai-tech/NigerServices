import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../constants';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
}) => {
  return (
    <View style={[styles.base, styles[variant], styles[`${padding}Padding`], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
  },
  
  // Variants
  default: {
    ...Shadow.sm,
  },
  elevated: {
    ...Shadow.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  // Padding
  nonePadding: {
    padding: 0,
  },
  smallPadding: {
    padding: Spacing.sm,
  },
  mediumPadding: {
    padding: Spacing.md,
  },
  largePadding: {
    padding: Spacing.lg,
  },
});
