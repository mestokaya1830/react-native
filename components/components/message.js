import React from "react";  
import { View, Text } from "react-native"; 

export default function Message({msg}) {
  return (
    <View>
      <Text>{msg}</Text>
    </View>
  );
}   