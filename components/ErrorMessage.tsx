import { FONT } from '@/constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ErrorMessageProps = {
  message: string;
  visible: boolean;
};

export function ErrorMessage({ message, visible }: ErrorMessageProps) {
  if (!visible || !message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  text: {
    color: '#D92D20',
    fontFamily: FONT.medium,
    fontSize: 14,
  },
});