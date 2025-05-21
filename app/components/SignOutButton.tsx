import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to the root route
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.tint }]} 
      onPress={handleSignOut}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
