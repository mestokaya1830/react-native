import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Button
} from "react-native";

import { useNavigation } from '@react-navigation/native';

export default AboutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { itemId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="green" style={{flex: 1}} />   */}
        <Text style={styles.text}>About Content</Text>
        <Text style={styles.text}>itemId: {JSON.stringify(itemId)}</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home", { itemId: 42 })}
        />
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
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  }
});
