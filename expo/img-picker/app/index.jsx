import {Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

export default function Index() {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let imageUrl = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(imageUrl);
    if (!imageUrl.canceled) {
      setImage(imageUrl.assets[0].uri);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Expo Image Picker</Text>
        <Pressable
          style={ styles.button }
          onPress={() =>pickImage()}>
          <Text style={{ color: 'white' }}>Pick an image from camera roll</Text>
        </Pressable>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});