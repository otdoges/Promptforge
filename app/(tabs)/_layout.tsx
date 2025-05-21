import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            elevation: 4,
            borderTopWidth: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: 'relative' }}>
              <IconSymbol size={26} name="house.fill" color={color} />
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.tint,
                    transform: [{ translateX: -2 }],
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'AI Tools',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: 'relative' }}>
              <IconSymbol size={26} name="sparkles" color={color} />
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.tint,
                    transform: [{ translateX: -2 }],
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: 'relative' }}>
              <IconSymbol size={26} name="folder.fill" color={color} />
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.tint,
                    transform: [{ translateX: -2 }],
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
