import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

const users = {
  1: { id: 1, name: "John Doe" },
  2: { id: 2, name: "Jane Smith" },
  3: { id: 3, name: "Alice Johnson" },
};

export default function Users() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.text}>Users Page</Text>
      <View style={styles.listContainer}>
        {Object.values(users).map((user) => (
          <View key={user.id} style={styles.list}>
            <Text>{user.name}</Text>
            <Link href={`/users/${user.id}`} style={{color:"red"}}>
              View Details
            </Link>
          </View>
        ))}
        <Link href="/" style={styles.links}>
          Go to Home
        </Link>
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
  listContainer: {
    width: 320,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
});
