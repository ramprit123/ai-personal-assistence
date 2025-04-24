import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { COLORS } from '../constants';

type ExpenseCardProps = {
  category: string;
  amount: number;
  time: string;
  icon: string;
};

export const ExpenseCard = ({ category, amount, time, icon }: ExpenseCardProps) => {
  return (
    <Animated.View 
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.container}
    >
      <View style={styles.leftSection}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.details}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  category: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1C1C1E',
  },
});