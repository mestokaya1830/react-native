import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Message from "./components/message";
import Users from "./components/users";

export default function App(){
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="green" style={{flex: 1}} />   */}
        <Text style={styles.text}>Content</Text>
        <Message msg="Hello Component!" />
        <Users />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  }
});
