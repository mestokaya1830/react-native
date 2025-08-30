import { Text, View, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.text}>About Page</Text>
    </View>
  );
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
