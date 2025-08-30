import { Slot } from "expo-router";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Header</Text>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
      <View>
        <Text style={styles.footer}>Footer</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  footer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
});
