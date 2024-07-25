import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function Label({ text }: { text: string }) {
  return (
    <Text style={styles.label}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  label: {
    display: "flex",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 20,
    color: '#333',
  },
});
