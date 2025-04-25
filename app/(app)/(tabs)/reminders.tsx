import { NewReminderModal } from '@/components/NewReminderModal';
import { ReminderCard } from '@/components/ReminderCard';
import { COLORS } from '@/constants';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RemindersScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const tabs = ['All', 'Today', 'Upcoming', 'Completed'];

  // Sample reminder data
  const todayReminders = [
    {
      id: '1',
      title: 'Team Meeting',
      time: '10:00 AM',
      repeat: 'Daily',
      description: 'Discuss project timeline and deliverables',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Dentist Appointment',
      time: '2:30 PM',
      repeat: '',
      description: 'Bring insurance card and ID',
      isCompleted: false,
    },
  ];

  const tomorrowReminders = [
    {
      id: '3',
      title: 'Grocery Shopping',
      time: '4:00 PM',
      repeat: 'Weekly',
      description: 'Buy vegetables, fruits, and milk',
      isCompleted: true,
    },
    {
      id: '4',
      title: 'Pay Rent',
      time: '11:59 PM',
      repeat: 'Monthly',
      description: "Transfer to landlord's account",
      isCompleted: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              title={reminder.title}
              time={reminder.time}
              repeatType={reminder.repeat}
              description={reminder.description}
              isCompleted={reminder.isCompleted}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tomorrow</Text>
          {tomorrowReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              title={reminder.title}
              time={reminder.time}
              repeatType={reminder.repeat}
              description={reminder.description}
              isCompleted={reminder.isCompleted}
            />
          ))}
        </View>
      </ScrollView>

      {/* New Reminder Modal */}
      <NewReminderModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1C1C1E',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
    color: '#1C1C1E',
  },
});
