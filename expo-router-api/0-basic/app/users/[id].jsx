import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


export default function UserDetail() {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>User ID: {id}</Text>
    </View>
  )
}