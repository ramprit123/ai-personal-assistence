import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MoveVertical as MoreVertical, Check } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { COLORS } from '../constants';

type ReminderCardProps = {
  title: string;
  time: string;
  repeatType?: string;
  description?: string;
  isCompleted: boolean;
};

export const ReminderCard = ({ 
  title, 
  time, 
  repeatType, 
  description,
  isCompleted,
}: ReminderCardProps) => {
  const [completed, setCompleted] = useState(isCompleted);
  
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.checkCircle,
            completed && styles.checkedCircle
          ]}
          onPress={() => setCompleted(!completed)}
        >
          {completed && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Check size={16} color="white" />
            </Animated.View>
          )}
        </TouchableOpacity>
        
        <Animated.Text 
          style={[
            styles.title,
            completed && styles.completedTitle
          ]}
          layout={Layout.springify()}
        >
          {title}
        </Animated.Text>
        
        <TouchableOpacity>
          <MoreVertical size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.details}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>⏰ {time}</Text>
          {repeatType && (
            <Text style={styles.repeat}>↻ {repeatType}</Text>
          )}
        </View>
        
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    backgroundColor: COLORS.primary,
  },
  title: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1C1C1E',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  details: {
    marginLeft: 36,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 12,
  },
  repeat: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
});