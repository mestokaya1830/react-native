import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

export default function App() {
  const [users, getUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.31.182:4000/users");
      const data = await response.json();
      console.log(data);
      getUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const validate = () => {
    // Güvenli kontrol - undefined durumunu handle et
    const nameLength = newUser?.name?.length || 0;
    const passwordLength = newUser?.password?.length || 0;

    let errorStatus = {};
    if (nameLength < 3) errorStatus.name = "Name must min 3";
    if (passwordLength < 3) errorStatus.password = "Password must min 3";

    setErrors(errorStatus);
    return Object.keys(errorStatus).length === 0;
  };

  const submitNewUser = async () => {
    if (validate()) {
      console.log(newUser);
      alert("Form submitted!");
      try {
        const response = await fetch("http://192.168.31.182:4000/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const data = await response.json();
        if (data.success) {
          setNewUser({ name: "", password: "" });
          setErrors({});
          alert(data.message);
          fetchUsers(); // Refresh the user list after adding a new user
        } else {
          alert("Failed to add user: " + data.message);
        }
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Error adding user: " + error.message);
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://192.168.31.182:4000/deleteuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
        fetchUsers(); // Refresh the user list after deleting a user
      } else {
        alert("Failed to delete user: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error.message);
    }
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={"green"} />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="green" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={"green"} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <Text style={styles.text}>Add User</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={newUser.name || ""}
            onChangeText={(item) =>
              setNewUser((prev) => ({ ...prev, name: item }))
            }
          />
          <Text style={styles.errors}>{errors.name}</Text>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={newUser.password || ""}
            onChangeText={(item) =>
              setNewUser((prev) => ({ ...prev, password: item }))
            }
            secureTextEntry
          />
          <Text style={styles.errors}>{errors.password}</Text>

          <Pressable onPress={submitNewUser} style={styles.submit}>
            <Text style={styles.textSubmit}>Add User</Text>
          </Pressable>
        </KeyboardAvoidingView>
        {/* <ActivityIndicator size="large" color="green" style={{flex: 1}} />   */}
        <Text style={styles.text}>Content</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return (
              <View key={item._id} style={styles.list}>
                <Text style={styles.textId}>{item._id}</Text>
                <Text style={styles.textTitle}>{item.name}</Text>
                <Pressable onPress={() => handleDelete(item._id)}>
                  <Text style={styles.delete}>Delete</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => <View style={{ height: 50 }} />}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                No data found
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
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
      width: "300",
      padding: 10,
      borderBlockColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "white",
    },
    textId: {
      fontSize: 18,
      marginBottom: 5,
    },
    textTitle: {
      fontSize: 16,
    },
    input: {
      width: 300,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
    },
    submit: {
      width: 300,
      height: 44,
      backgroundColor: "#2B91EB",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    label: {
      fontSize: 18,
    },
    errors: {
      fontSize: 18,
      color: "red",
    },
    textSubmit: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    delete: {
      color: "red",
      fontSize: 16,
      marginTop: 10,
    },
  });
