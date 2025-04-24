import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { COLORS } from '../constants';

type ExpensesSummaryProps = {
  totalAmount: string;
  period: string;
  percentOfBudget: number;
  comparison?: {
    value: number;
    text: string;
  };
};

export const ExpensesSummary = ({ 
  totalAmount, 
  period, 
  percentOfBudget,
  comparison 
}: ExpensesSummaryProps) => {
  const progressStyle = useAnimatedStyle(() => ({
    width: withSpring(`${percentOfBudget}%`, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn}
      layout={Layout.springify()}
    >
      <Text style={styles.label}>Total Expenses{comparison ? ' This Month' : ''}</Text>
      <Animated.Text 
        style={styles.amount}
        entering={FadeIn.delay(200)}
      >
        {totalAmount}
      </Animated.Text>
      
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
      
      {comparison ? (
        <Animated.Text 
          style={styles.comparisonText}
          entering={FadeIn.delay(400)}
        >
          {comparison.value}% {comparison.text}
        </Animated.Text>
      ) : (
        <View style={styles.details}>
          <Text style={styles.period}>{period}</Text>
          <Text style={styles.budgetText}>{percentOfBudget}% of monthly budget</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginTop: 8,
    color: '#1C1C1E',
  },
  period: {
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
  budgetText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  details: {
    marginTop: 8,
  },
  comparisonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 8,
  },
});