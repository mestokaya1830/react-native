import { Link } from "expo-router";
import {StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.button}>
        <Link href="/camera">Open Camera</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    marginTop: 20,
    fontSize: 20,
    backgroundColor: "lightgreen",
    padding: 10,
    color: "#000",
    fontWeight: "bold",
    borderRadius: 5
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});