import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface GradientProps {
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'accent' | 'mixed';
  intensity?: 'light' | 'medium' | 'strong';
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  children?: React.ReactNode;
}

export function Gradient({
  style,
  variant = 'primary',
  intensity = 'medium',
  direction = 'diagonal',
  children,
}: GradientProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getGradientColors = () => {
    const alpha = intensity === 'light' ? '80' : intensity === 'medium' ? 'B3' : 'FF';
    
    switch (variant) {
      case 'primary':
        return [
          `${colors.tint}${alpha}`,
          colorScheme === 'dark' ? '#3A236E' : '#DDD2FF',
        ];
      case 'secondary':
        return [
          `${colors.secondary}${alpha}`,
          colorScheme === 'dark' ? '#8B2626' : '#FFDDDD',
        ];
      case 'accent':
        return [
          `${colors.accent}${alpha}`,
          colorScheme === 'dark' ? '#006B7F' : '#D6FEFF',
        ];
      case 'mixed':
        return [
          colors.tint,
          colors.accent,
          colors.secondary,
        ];
      default:
        return [
          `${colors.tint}${alpha}`,
          colorScheme === 'dark' ? '#3A236E' : '#DDD2FF',
        ];
    }
  };

  const getDirection = () => {
    switch (direction) {
      case 'horizontal':
        return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
      case 'vertical':
        return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
      case 'diagonal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
      default:
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={[styles.gradient, style]}
      {...getDirection()}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
