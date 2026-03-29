import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>SMOKE TAP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 3,
    color: C.TEXT_MUTED,
  },
});
