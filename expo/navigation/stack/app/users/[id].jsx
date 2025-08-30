import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Link } from 'expo-router'

export default function UserDetails() {
  const { id } = useLocalSearchParams()
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.text}>{id}</Text>
      <Link href="/users" style={styles.links}>
        Go Back
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
  },
  links: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
});