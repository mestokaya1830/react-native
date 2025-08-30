import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{flex: 1, alignItems: "center"}}>
      <Text style={styles.text}>Home Page</Text>
      <View>
        <Link href="/users" style={styles.links}>Go to Users</Link>
        <Link href="/about" style={styles.links}>Go to About</Link>
      </View>
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
