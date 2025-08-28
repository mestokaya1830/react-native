import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Home Content</Text>
      <Link href="/settings" style={styles.links}>Settings</Link>
      <Link href="/users" style={styles.links}>Users</Link>
    </View>
  );
}

export function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Not Found</Text>
    </View>
  );
}

export function Error() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Error</Text>
    </View>
  );
}

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop:20
  },
  links: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "blue"
  }
})