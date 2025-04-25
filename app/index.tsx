import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONT } from '@/constants';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { SplashScreen } from 'expo-router';
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Get started by signing in or creating an account.
      </Text>

      <View style={styles.buttonContainer}>
        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sign-up" asChild>
          <TouchableOpacity style={[styles.button, styles.signUpButton]}>
            <Text style={[styles.buttonText, styles.signUpButtonText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.white, // Assuming COLORS.white exists
  },
  title: {
    fontFamily: FONT.bold, // Assuming FONT.bold exists
    fontSize: 32,
    color: COLORS.black, // Assuming COLORS.black exists
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONT.regular, // Assuming FONT.regular exists
    fontSize: 18,
    color: COLORS.gray, // Assuming COLORS.gray exists
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.primary, // Assuming COLORS.primary exists
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: FONT.semiBold, // Assuming FONT.semiBold exists
    fontSize: 16,
    color: COLORS.white,
  },
  signUpButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  signUpButtonText: {
    color: COLORS.primary,
  },
});
