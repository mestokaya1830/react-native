import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableOpacity,
} from "react-native";


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={"green"} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Open Modal</Text>
        </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text>Modal Content</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Close Modal
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
 
  openBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
  },
  closeBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    color: "white",
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(133, 168, 233, 0.5)",
    padding: 20,
    alignItems: "center",
  }
});
