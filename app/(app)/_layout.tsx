import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuthStore } from '@/store/useAuthStore';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const { isAuthenticated, loading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  console.log('isAuthenticated', isAuthenticated, loading, segments);
  useEffect(() => {
    if (loading) return; // Wait until auth state is loaded
    const inAuthGroup = segments[0] === '(auth)';
     if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    }
  }, [isAuthenticated, loading, segments, router]);

  if (loading) {
    // Show a loading indicator while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
