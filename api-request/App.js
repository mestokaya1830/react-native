import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function App() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={"green"} />
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="green" style={{flex: 1}} />   */}
        <Text style={styles.text}>Content</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return (
              <View key={item.id} style={styles.list}>
                <Text style={styles.textId}>{item.id}</Text>
                <Text style={styles.textTitle}>{item.title}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={{ height: 50 }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: 70 }} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                No data found
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  list: {
    justifyContent: "center",
    height: "auto",
    width: "100%",
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  textId: {
    fontSize: 18,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: 16,
  },
});
