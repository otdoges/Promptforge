import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
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
        <Text style={{ color: colors.text }}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome!</Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>You&apos;re currently signed out.</Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Sign in</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.secondary, marginTop: 10 }]}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signedOutContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: 200, // Fixed width for buttons
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
