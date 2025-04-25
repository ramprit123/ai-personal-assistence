import { ErrorMessage } from '@/components/ErrorMessage';
import { COLORS, FONT } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
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
      router.replace('/(app)/(tabs)');
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
        {error && <ErrorMessage message={error} visible />}
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
            <View
              style={[
                styles.passwordContainer,
                errors.password && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput} // Remove array style
                placeholder="Create your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: '', submit: '' }));
                }}
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
            {errors.password && (
              <View style={styles.errorContainer}>
                <AlertCircle size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}
            <Text style={styles.passwordHint}>
              Must be at least 8 characters
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[
                styles.passwordContainer,
                errors.confirmPassword && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput} // Remove array style
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
            {errors.confirmPassword && (
              <View style={styles.errorContainer}>
                <AlertCircle size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name (Optional)</Text>
            <TextInput
              style={styles.input} // No error state needed for optional field
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                setAgreeToTerms(!agreeToTerms);
                setErrors((prev) => ({ ...prev, terms: '', submit: '' }));
              }}
            >
              <View
                style={[
                  styles.checkboxInner,
                  agreeToTerms && styles.checkboxChecked,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.link}>Terms of Service</Text>{' '}
              and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
          {errors.terms && (
            <View style={styles.errorContainer}>
              <AlertCircle size={16} color={COLORS.error} />
              <Text style={styles.errorText}>{errors.terms}</Text>
            </View>
          )}

          {errors.submit && (
            <View style={[styles.errorContainer, { marginTop: 16 }]}>
              <AlertCircle size={16} color={COLORS.error} />
              <Text style={styles.errorText}>{errors.submit}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              (!agreeToTerms || loading) && styles.buttonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={!agreeToTerms || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
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
            {/* TODO: Add Google Icon */}
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            {/* TODO: Add Apple Icon */}
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
        </View>
      </View>
    </ScrollView>
  );
}

// Styles are defined above
// const styles = StyleSheet.create({

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 24,
    paddingTop: 60, // Match sign-in padding
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
  inputError: {
    borderColor: COLORS.error,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ultraLightGray,
    borderRadius: 8,
    position: 'relative', // Needed for absolute positioning of eye icon
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontFamily: FONT.regular,
    fontSize: 16,
    paddingRight: 48, // Make space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
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
    marginTop: 8, // Adjust spacing
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  link: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  button: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16, // Adjust spacing
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightGray,
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
    flexDirection: 'row',
    gap: 12,
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
    paddingBottom: 24, // Add padding at the bottom for scroll view
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.error,
  },
});
