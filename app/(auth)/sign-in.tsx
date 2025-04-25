import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONT } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loading, error } = useAuthStore();

  const handleSignIn = async () => {
    try {
      await signIn({ email, password });
      router.replace('/(app)/(tabs)');
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account to continue</Text>
        {error && <ErrorMessage message={error} visible />}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={COLORS.gray} />
                ) : (
                  <Eye size={20} color={COLORS.gray} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Link href="/forgot-password" asChild>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 28,
    color: COLORS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.ultraLightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ultraLightGray,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  button: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.ultraLightGray,
  },
  dividerText: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  socialButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.ultraLightGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialButtonText: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  footerLink: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
});