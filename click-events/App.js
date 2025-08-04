import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";

import img1 from "./assets/img1.jpg";

export default function App(){
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={"green"} />
      <View style={styles.container}>
        <Text style={styles.text}>Content</Text>
      </View>
      <View>
        <Text style={styles.textBtn} onPress={() => Alert.alert("Hello")}>
          Click Me
        </Text>
      </View>
      <View>
        <Pressable onPress={() => Alert.alert("Hello")}>
          <Text style={{textAlign: "center"}}>Pressable</Text>
          <Image
            source={img1}
            style={styles.img}
            onPress={() => Alert.alert("Hello")}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  textBtn: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "red",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    padding: 10,
    margin: 20
  }
  ,
  img: {  
    width: 300,
    height: 100,
    alignSelf: "center"
  }
});
