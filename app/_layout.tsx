import { Stack } from 'expo-router';
import React from 'react';

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)"></Stack.Screen>
      <Stack.Screen name="(auth)"></Stack.Screen>
      <Stack.Screen name="+not-found"></Stack.Screen>
    </Stack>
  );
};

export default MainLayout;
