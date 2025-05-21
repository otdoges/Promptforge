import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CardProps {
  title: string;
  description?: string;
  imageUri?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'highlight' | 'outline';
}

export function Card({
  title,
  description,
  imageUri,
  onPress,
  icon,
  rightComponent,
  style,
  variant = 'default',
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const getCardStyle = () => {
    switch (variant) {
      case 'highlight':
        return {
          backgroundColor: colorScheme === 'dark' ? '#2D2057' : '#EFE9FF',
          borderColor: colors.tint,
          borderWidth: 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.divider,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: colors.cardBackground,
        };
    }
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, getCardStyle(), style]}
      onPress={onPress ? handlePress : undefined}
      activeOpacity={0.9}
    >
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
            {description && (
              <Text style={[styles.description, { color: colors.icon }]} numberOfLines={2}>
                {description}
              </Text>
            )}
          </View>
        </View>
        {rightComponent && <View style={styles.rightComponentContainer}>{rightComponent}</View>}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 160,
  },
  contentContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  rightComponentContainer: {
    marginLeft: 12,
  },
});
