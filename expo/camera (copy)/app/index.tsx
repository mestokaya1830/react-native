import { Text, View , Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>
        <Link href="/camera">Kamera</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  }
});
