import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'
import { SignOutButton } from '@/app/components/SignOutButton'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function HomePage() {
  const { user } = useUser()
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.welcomeContainer}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Welcome, {user?.emailAddresses[0].emailAddress}
          </Text>
          <Text style={[styles.subheading, { color: colors.icon }]}>
            You're signed in to PromptForge
          </Text>
          <View style={styles.buttonContainer}>
            <Link href="/(tabs)/projects" style={[styles.link, { color: colors.tint }]}>
              Go to your projects
            </Link>
            <SignOutButton />
          </View>
        </View>
      </SignedIn>
      
      <SignedOut>
        <View style={styles.welcomeContainer}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Welcome to PromptForge
          </Text>
          <Text style={[styles.subheading, { color: colors.icon }]}>
            Sign in or create an account to get started
          </Text>
          <View style={styles.buttonContainer}>
            <Link href="/sign-in" style={[styles.link, { color: colors.tint }]}>
              Sign in
            </Link>
            <Link href="/sign-up" style={[styles.link, { color: colors.tint }]}>
              Sign up
            </Link>
          </View>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
  }
});
