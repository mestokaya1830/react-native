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

              <View style={styles.shadowBox}>
                <Text style={styles.shadowText}>Shadow Box</Text>
              </View>

              <View style={styles.box}>
                <View style={styles.textBox}><Text>Box1</Text></View>
                <View style={styles.textBox}><Text>Box2</Text></View>
                <View style={styles.textBox}><Text>Box3</Text></View>
                <View style={styles.textBox}><Text>Box4</Text></View>
                <View style={styles.textBox}><Text>Box5</Text></View>
              </View>
              <View style={styles.box2}>
                <View style={styles.textBox2}><Text>Box1</Text></View>
                <View style={styles.textBox2}><Text>Box2</Text></View>
                <View style={styles.textBox2}><Text>Box3</Text></View>
                <View style={styles.textBox2}><Text>Box4</Text></View>
                <View style={styles.textBox2}><Text>Box5</Text></View>
              </View>
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
  shadowBox: {
    width: 300,
    height: 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  box: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "lightblue",
    marginTop: 20,
  },
  textBox: {
    width: "20%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  box2: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    marginTop: 20,
    padding: 10,
  },
  textBox2: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 5,
    backgroundColor: "white",
  },
});
