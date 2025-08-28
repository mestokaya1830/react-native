import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];
  
export default function Users() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Users Content</Text>
      {users.map((user) => (
        <View key={user.id} style={styles.userContainer}>
          <Text style={[styles.text, styles.text2]}>{user.name}</Text>
          <Link key={user.id} href={`/users/${user.id}`} style={styles.links}>
            View Details
          </Link>
        </View>
      ))}
      <Link href="/" style={styles.links}>
        Home
      </Link>
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
    marginTop: 20,
  },
  links: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "blue",
  },
  text2: {
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
