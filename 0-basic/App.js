import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Message from "./components/message.js";

import {
  StatusBar,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import img1 from "./assets/img1.png";
import bgImg from "./assets/bg.jpg";

export default function App() {
  const [isModel, setModel] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="red" />
        <View style={{ flex: 1}}>
          <ImageBackground source={bgImg} style={styles.bgImg}>
            <ActivityIndicator size="large" color="#0000ff" />
            <ScrollView contentContainerStyle={styles.scrollCentered}
              showsVerticalScrollIndicator={false}
              overScrollMode="never">
              <Text style={styles.text}>Merhaba Expo!</Text>
              <Image source={img1} style={styles.img} />
              <View style={styles.btn}>
                <Button
                  title="LogIn"
                  onPress={() => console.log("Button pressed!")}
                />
                <Pressable
                  onPress={() => console.log("Pressed")}
                  style={styles.pressAble}
                >
                  <Text>Pressable Image</Text>
                  <Image source={img1} style={styles.img} />
                </Pressable>
                <Button title="Open Model" onPress={() => setModel(true)} />
                <Modal
                  animationType="slide"
                  visible={isModel}
                  onRequestClose={() => setModel(false)}
                >
                  <View
                    style={{ flex: 1, backgroundColor: "red" }}
                  >
                    <Text>Model COntent</Text>
                    <Button
                      title="Close Model"
                      onPress={() => setModel(false)}
                    />
                  </View>
                </Modal>
                <View style={{ marginTop: 30 }}>
                  <Button title="Alert" onPress={() => Alert.alert("Invalid Data","Incorrect", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => console.log("OK Pressed"),
                    },
                  ])} />
                </View>
              </View>
              <Message />
              <Message />
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollCentered: {
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},
  bgImg: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    width: 300,
    height: 200,
  },
  btn: {
    marginTop: 30,
  },
  pressAble: {
    marginTop: 30,
  },
});
