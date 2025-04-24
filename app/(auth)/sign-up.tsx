import { Link, router } from 'expo-router';
import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONT } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signUp, loading, error } = useAuthStore();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms =
        'Please agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await signUp({ email, password, fullName });
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({
        submit:
          err?.message || 'An error occurred during sign up. Please try again.',
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Please fill in the information below to create your account
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: '', submit: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <View style={styles.errorContainer}>
                <AlertCircle size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  errors.password && styles.inputError,
                ]}
                placeholder="Create your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: '', submit: '' }));
                }}
                secureTextEntry={!showPassword}
              />
            </View>
            {errors.password && (
              <View style={styles.errorContainer}>
                <AlertCircle size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}
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
          <Text style={styles.passwordHint}>Must be at least 8 characters</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: '',
                  submit: '',
                }));
              }}
              secureTextEntry={!showConfirmPassword}
            />
          </View>
          {errors.confirmPassword && (
            <View style={styles.errorContainer}>
              <AlertCircle size={16} color={COLORS.error} />
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color={COLORS.gray} />
            ) : (
              <Eye size={20} color={COLORS.gray} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View
            style={[
              styles.checkboxInner,
              agreeToTerms && styles.checkboxChecked,
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      {errors.terms && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{errors.terms}</Text>
        </View>
      )}

      {errors.submit && (
        <View style={[styles.errorContainer, styles.submitError]}>
          <AlertCircle size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{errors.submit}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !agreeToTerms && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!agreeToTerms || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or sign up with</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.error,
    flex: 1,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  submitError: {
    backgroundColor: COLORS.errorLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
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
  passwordHint: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  link: {
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
  buttonDisabled: {
    opacity: 0.5,
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
