import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const colors = useThemeColor()

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
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={colors.placeholderText}
          onChangeText={(code) => setCode(code)}
          style={[
            styles.inputField,
            { 
              color: colors.text, 
              backgroundColor: colors.inputBackground,
            }
          ]}
        />
        <TouchableOpacity onPress={onVerifyPress} style={[styles.button, { backgroundColor: colors.accent }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Verify Email</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Create an account</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={colors.placeholderText}
        onChangeText={(email) => setEmailAddress(email)}
        style={[
          styles.inputField,
          { 
            color: colors.text, 
            backgroundColor: colors.inputBackground,
          }
        ]}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor={colors.placeholderText}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={[
          styles.inputField,
          { 
            color: colors.text, 
            backgroundColor: colors.inputBackground,
          }
        ]}
      />
      <TouchableOpacity onPress={onSignUpPress} style={[styles.button, { backgroundColor: colors.accent }]}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Sign up</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={{ color: colors.text }}>Already have an account? </Text>
        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity>
            <Text style={{ color: colors.accent }}>Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
