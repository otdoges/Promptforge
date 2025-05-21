import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Verify your email</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.divider }]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={colors.text + '80'}
          onChangeText={(code)=> setCode(code)}
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]} 
          onPress={onVerifyPress}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Sign up</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.border }]}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={colors.text + '80'}
        onChangeText={(email)=> setEmailAddress(email)}
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border }]}
        value={password}
        placeholder="Enter password"
        placeholderTextColor={colors.text + '80'}
        secureTextEntry={true}
        onChangeText={(password)=> setPassword(password)}
      />
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.tint }]} 
        onPress={onSignUpPress}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={{ color: colors.text }}>Already have an account?</Text>
        <Link href="sign-in" style={{ color: colors.tint, marginLeft: 5 }}>
          Sign in
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
