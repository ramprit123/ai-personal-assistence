import { AddExpenseForm } from '@/components/AddExpenseForm';
import { ExpenseCard } from '@/components/ExpenseCard';
import { COLORS } from '@/constants';
import { Settings } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExpensesScreen() {
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Sample expense data
  const expenses = [
    {
      id: '1',
      category: 'Food',
      amount: 25.5,
      time: 'Today, 2:30 PM',
      icon: '🍔',
    },
    {
      id: '2',
      category: 'Transport',
      amount: 35.0,
      time: 'Today, 11:20 AM',
      icon: '🚕',
    },
    {
      id: '3',
      category: 'Shopping',
      amount: 120.8,
      time: 'Yesterday, 5:15 PM',
      icon: '👕',
    },
    {
      id: '4',
      category: 'Healthcare',
      amount: 75.0,
      time: 'Yesterday, 3:45 PM',
      icon: '💊',
    },
    {
      id: '5',
      category: 'Entertainment',
      amount: 45.99,
      time: 'Apr 18, 7:30 PM',
      icon: '🎬',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses</Text>
        <TouchableOpacity>
          <Settings size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Expenses</Text>
        <Text style={styles.summaryAmount}>$2,458.35</Text>
        <Text style={styles.summaryPeriod}>April 2024</Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '70%' }]} />
        </View>
        <Text style={styles.progressText}>70% of monthly budget</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Expenses</Text>

      <ScrollView style={styles.expensesList}>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            category={expense.category}
            amount={expense.amount}
            time={expense.time}
            icon={expense.icon}
          />
        ))}
      </ScrollView>

      {showAddExpense ? (
        <AddExpenseForm onClose={() => setShowAddExpense(false)} />
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddExpense(true)}
        >
          <Text style={styles.addButtonText}>Add New Expense</Text>
        </TouchableOpacity>
      )}
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
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  summaryAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginTop: 8,
    color: '#1C1C1E',
  },
  summaryPeriod: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    color: '#1C1C1E',
  },
  expensesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});
