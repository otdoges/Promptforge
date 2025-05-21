import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Gradient } from '@/components/ui/Gradient';

export interface Template {
  id: string;
  name: string;
  description: string;
  imageUri: string;
  tags: string[];
  category: string;
}

interface TemplateCardProps {
  template: Template;
  onPress: (template: Template) => void;
}

export function TemplateCard({ template, onPress }: TemplateCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(template);
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: colors.cardBackground }
      ]} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: template.imageUri }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Gradient variant="accent" style={styles.gradientBadge}>
            <Text style={styles.categoryText}>{template.category}</Text>
          </Gradient>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text 
          style={[styles.title, { color: colors.text }]} 
          numberOfLines={1}
        >
          {template.name}
        </Text>
        
        <Text 
          style={[styles.description, { color: colors.icon }]} 
          numberOfLines={2}
        >
          {template.description}
        </Text>
        
        <View style={styles.tagsContainer}>
          {template.tags.slice(0, 3).map((tag, index) => (
            <View 
              key={index} 
              style={[
                styles.tag, 
                { backgroundColor: colorScheme === 'dark' ? '#2D2D2D' : '#F0F0F0' }
              ]}
            >
              <Text 
                style={[
                  styles.tagText, 
                  { color: colors.text }
                ]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.actionButton, 
          { backgroundColor: colors.tint }
        ]}
        onPress={handlePress}
      >
        <IconSymbol name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  gradientBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
  },
  actionButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
