import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [login, setLogin] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    // Güvenli kontrol - undefined durumunu handle et
    const nameLength = login?.name?.length || 0;
    const passwordLength = login?.password?.length || 0;

    console.log("Name length:", nameLength);
    console.log("Password length:", passwordLength);

    let errorStatus = {};
    if (nameLength < 3) errorStatus.name = "Name must min 3";
    if (passwordLength < 3) errorStatus.password = "Password must min 3";

    setErrors(errorStatus);
    return Object.keys(errorStatus).length === 0;
  };

  const loginSubmit = () => {
    if (validate()) {
      alert("Form submitted!");
      setLogin({ name: "", password: "" });
      setErrors({});
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={"green"} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <Text style={styles.text}>Login</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={login.name || ""}
            onChangeText={(item) =>
              setLogin((prev) => ({ ...prev, name: item }))
            }
          />
          <Text style={styles.errors}>{errors.name}</Text>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={login.password || ""}
            onChangeText={(item) =>
              setLogin((prev) => ({ ...prev, password: item }))
            }
            secureTextEntry
          />
          <Text style={styles.errors}>{errors.password}</Text>

          <Pressable onPress={loginSubmit} style={styles.submit}>
            <Text style={styles.textSubmit}>Login</Text>
          </Pressable>
        </KeyboardAvoidingView>
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
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 50,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
  },
  submit: {
    width: 300,
    height: 44,
    backgroundColor: "#2B91EB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
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
});
