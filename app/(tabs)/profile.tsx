import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, User, Phone, Globe, Lock, Shield, Bell, Sun, Globe as Globe2, Database, ShieldAlert, CircleHelp as HelpCircle, MessagesSquare, Info, LogOut } from 'lucide-react-native';
import { COLORS, FONT } from '../../constants';

// Profile setting item component
const ProfileItem = ({ icon, title, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileItemLeft}>
        {icon}
        <Text style={styles.profileItemTitle}>{title}</Text>
      </View>
      <View style={styles.profileItemRight}>
        <Text style={styles.profileItemValue}>{value}</Text>
        <ChevronLeft size={20} color="#8E8E93" style={{ transform: [{ rotate: '180deg' }] }} />
      </View>
    </TouchableOpacity>
  );
};

// Toggle setting item component
const ToggleItem = ({ icon, title, value, onToggle }) => {
  return (
    <View style={styles.profileItem}>
      <View style={styles.profileItemLeft}>
        {icon}
        <Text style={styles.profileItemTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E5EA", true: "#FFD9A8" }}
        thumbColor={value ? COLORS.primary : "#FFFFFF"}
      />
    </View>
  );
};

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ChevronLeft size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Smith</Text>
          <Text style={styles.profileEmail}>john.smith@email.com</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <ProfileItem 
            icon={<User size={20} color="#8E8E93" />}
            title="Name"
            value="John Smith"
            onPress={() => {}}
          />
          <ProfileItem 
            icon={<Phone size={20} color="#8E8E93" />}
            title="Phone Number"
            value="+1 234 567 890"
            onPress={() => {}}
          />
          <ProfileItem 
            icon={<Globe size={20} color="#8E8E93" />}
            title="Language"
            value="English"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <ProfileItem 
            icon={<Lock size={20} color="#8E8E93" />}
            title="Change Password"
            value=""
            onPress={() => {}}
          />
          <ToggleItem 
            icon={<Shield size={20} color="#8E8E93" />}
            title="Two-Factor Authentication"
            value={is2FAEnabled}
            onToggle={() => setIs2FAEnabled(!is2FAEnabled)}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <ProfileItem 
            icon={<Bell size={20} color="#8E8E93" />}
            title="Notifications"
            value="Enabled"
            onPress={() => {}}
          />
          <ToggleItem 
            icon={<Sun size={20} color="#8E8E93" />}
            title="Dark Theme"
            value={isDarkMode}
            onToggle={() => setIsDarkMode(!isDarkMode)}
          />
          <ProfileItem 
            icon={<Globe2 size={20} color="#8E8E93" />}
            title="Regional Settings"
            value="USD, MM/DD/YYYY"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <ProfileItem 
            icon={<Database size={20} color="#8E8E93" />}
            title="Export Data"
            value=""
            onPress={() => {}}
          />
          <ProfileItem 
            icon={<ShieldAlert size={20} color="#8E8E93" />}
            title="Privacy Settings"
            value=""
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          <ProfileItem 
            icon={<HelpCircle size={20} color="#8E8E93" />}
            title="Help Center"
            value=""
            onPress={() => {}}
          />
          <ProfileItem 
            icon={<MessagesSquare size={20} color="#8E8E93" />}
            title="FAQs"
            value=""
            onPress={() => {}}
          />
          <ProfileItem 
            icon={<Info size={20} color="#8E8E93" />}
            title="About Us"
            value=""
            onPress={() => {}}
          />
        </View>
        
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 12,
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 8,
  },
  signOutButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});