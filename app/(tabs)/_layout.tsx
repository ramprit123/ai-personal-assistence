import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { SplashScreen, Tabs } from 'expo-router';
import { Bell, DollarSign, Chrome as Home, User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF9500',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#E5E5EA',
          height: Platform.select({
            ios: 85,
            android: isLandscape ? 45 : 55,
          }),
          paddingBottom: Platform.select({
            ios: 30,
            android: 5,
          }),
          paddingTop: Platform.select({
            ios: 10,
            android: 5,
          }),
          backgroundColor: '#FFFFFF',
          elevation: 8,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: Platform.select({
            ios: 11,
            android: isLandscape ? 10 : 12,
          }),
          marginTop: Platform.select({
            ios: 0,
            android: 0,
          }),
          paddingBottom: Platform.select({
            ios: 5,
            android: 0,
          }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({
            ios: 0,
            android: 0,
          }),
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={isLandscape ? size - 4 : size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, size }) => (
            <DollarSign size={isLandscape ? size - 4 : size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, size }) => (
            <Bell size={isLandscape ? size - 4 : size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={isLandscape ? size - 4 : size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
