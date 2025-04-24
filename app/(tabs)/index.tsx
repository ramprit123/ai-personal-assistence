import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';
import { HomeHeader } from '../../components/HomeHeader';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { CategoryBreakdown } from '../../components/CategoryBreakdown';
import { UpcomingPayments } from '../../components/UpcomingPayments';
import { RecentTransactions } from '../../components/RecentTransactions';
import { COLORS, FONT } from '../../constants';

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Today', 'Week', 'Month', 'Custom'];
  
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader 
        title="ExpenseWise" 
        rightIcon={<Settings size={24} color={COLORS.primary} />}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ExpensesSummary 
          totalAmount="$3,705.35" 
          period="April 2024"
          percentOfBudget={70}
          comparison={{ value: 32, text: 'higher than last month' }}
        />
        
        <View style={styles.analyticsContainer}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <CategoryBreakdown />
        </View>
        
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text 
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <UpcomingPayments />
        
        <RecentTransactions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  analyticsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
    color: '#1C1C1E',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F2F2F7',
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeFilterText: {
    color: 'white',
  },
});