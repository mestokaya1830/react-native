import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Platform,
  Alert
} from "react-native";


export default function App(){
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="green" style={{flex: 1}} />   */}
        <Text style={styles.text}>Content</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>Platform Box</Text>
        </View>
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
    marginTop: Platform.OS === "ios" ? 50 : 100,
  },
  boxText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  box: {
    ...Platform.select({
      ios: {
        backgroundColor: "green",
        width: 100,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        marginTop: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
      },
      android: {
        backgroundColor: "red",
        width: 200,
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        marginTop: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
      },
    }),
  },
});
