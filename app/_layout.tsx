import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import 'react-native-reanimated';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Gradient } from '@/components/ui/Gradient';


// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();

function SplashScreenComponent() {
  return (
    <View style={styles.splashContainer}>
      <Gradient 
        variant="primary" 
        intensity="medium"
        style={styles.splashGradient}
      >
        <Image
          source={require('../assets/images/react-logo.png')}
          style={styles.splashLogo}
        />
        <Text style={styles.splashTitle}>Vibe Coding</Text>
        <Text style={styles.splashSubtitle}>AI-Powered App Creator</Text>
      </Gradient>
    </View>
  );
}

// Initialize the Convex client
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(convexUrl);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) {
      console.warn(error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Simulate some loading time
      const timer = setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!isReady) {
    return <SplashScreenComponent />;
  }

  return (
    <ClerkProvider 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ConvexProvider client={convex}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
  },
  splashGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
