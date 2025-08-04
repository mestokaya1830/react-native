import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar
} from "react-native";
import bgImg from "./assets/bgImg.jpg";
import img1 from "./assets/img1.png";

export default function App(){
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={'green'} />
      <ImageBackground source={bgImg} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Content</Text>
          <Image source={img1} style={styles.img1Style} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  img1Style: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginTop: 30,
  }
});
