import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT } from '../constants';

type TransactionItemProps = {
  icon: string;
  category: string;
  date: string;
  amount: string;
  hasReceipt?: boolean;
};

const TransactionItem = ({ icon, category, date, amount, hasReceipt }: TransactionItemProps) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.leftContent}>
        <Text style={styles.transactionIcon}>{icon}</Text>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionCategory}>{category}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.transactionAmount}>{amount}</Text>
        {hasReceipt && (
          <TouchableOpacity style={styles.receiptButton}>
            <Text style={styles.receiptText}>Receipt</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const RecentTransactions = () => {
  // Sample transaction data
  const transactions = [
    {
      id: '1',
      icon: '🏥',
      category: 'Dr. Smith Visit',
      date: 'Feb 20, 2024',
      amount: '$150',
      hasReceipt: true,
    },
    {
      id: '2',
      icon: '💊',
      category: 'Prescription Medication',
      date: 'Feb 18, 2024',
      amount: '$75',
      hasReceipt: false,
    },
    {
      id: '3',
      icon: '🧪',
      category: 'Lab Tests',
      date: 'Feb 15, 2024',
      amount: '$200',
      hasReceipt: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.transactionsContainer}>
        {transactions.map((transaction) => (
          <TransactionItem 
            key={transaction.id}
            icon={transaction.icon}
            category={transaction.category}
            date={transaction.date}
            amount={transaction.amount}
            hasReceipt={transaction.hasReceipt}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
  },
  viewAll: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  receiptButton: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  receiptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8E8E93',
  },
});