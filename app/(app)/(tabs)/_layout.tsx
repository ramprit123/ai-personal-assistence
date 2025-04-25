import { Tabs } from 'expo-router';
import { Bell, DollarSign, Chrome as Home, User } from 'lucide-react-native';


export default function TabLayout() {
 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF9500',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 85, // Increased height to account for iPhone's bottom safe area
          paddingBottom: 25, // Increased padding for better touch targets
          backgroundColor: '#FFFFFF', // Explicit background color
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5, // For Android
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 11, // Slightly smaller for better iOS appearance
          marginBottom: 8, // Better spacing between icon and label
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, size }) => (
            <DollarSign size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}