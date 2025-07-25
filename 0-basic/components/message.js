import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Message() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a message component!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'lightblue',
    margin: 10,
  },
  text: {
    fontSize: 18,
  },
});
