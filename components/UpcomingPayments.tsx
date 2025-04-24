import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT } from '../constants';
import { Shield, Building } from 'lucide-react-native';

type PaymentCardProps = {
  icon: React.ReactNode;
  title: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
};

const PaymentCard = ({ icon, title, amount, dueDate, daysLeft }: PaymentCardProps) => {
  return (
    <View style={styles.paymentCard}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.paymentDetails}>
        <Text style={styles.paymentTitle}>{title}</Text>
        <View style={styles.dueContainer}>
          <Text style={styles.dueText}>Due {dueDate}</Text>
          <Text style={styles.daysText}>({daysLeft} days)</Text>
        </View>
      </View>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

export const UpcomingPayments = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Payments</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.paymentsContainer}>
        <PaymentCard 
          icon={<Building size={24} color="#FF9500" />}
          title="Hospital Bill"
          amount="$250"
          dueDate="Feb 28"
          daysLeft={5}
        />
        <PaymentCard 
          icon={<Shield size={24} color="#FF9500" />}
          title="Insurance Premium"
          amount="$120"
          dueDate="Mar 05"
          daysLeft={10}
        />
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
  paymentsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dueText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  daysText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FF3B30',
    marginLeft: 4,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1C1C1E',
  },
});