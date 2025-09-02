import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React, {useState, useRef} from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { CameraView, useCameraPermissions} from 'expo-camera'
import { useNavigation } from '@react-navigation/native';

export default function Camera() {
  const [permission, setPermission] = useCameraPermissions()
  const [mediaPermission, setMediaPermission] = MediaLibrary.usePermissions()
  const [photo, setPhoto] = useState(null)
  const [facing, setFacing] = useState('back')
  const cameraRef = useRef(null)
  const navigation = useNavigation();

  function cameraFacing() {
    setFacing((item) => (item === "back" ? "front" : "back"));
  }

  async function saveToGallery(photoUri) {
    try {
      console.log("Saving photo with URI:", photoUri);

      // URI'nin string olduğunu kontrol et
      if (typeof photoUri !== "string") {
        throw new Error("Photo URI must be a string");
      }

      const asset = await MediaLibrary.createAssetAsync(photoUri);
      await MediaLibrary.createAlbumAsync("MyApp", asset, false);
      Alert.alert("Success ✅", "Photo saved to gallery!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("index"),
        },
      ]);
    } catch (error) {
      console.log("Error saving photo:", error);
      Alert.alert("Error ❌", "Photo could not be saved.");
    }
  }

  async function takePicture() {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        console.log("Photo taken:", photo);

        if (photo && photo.uri) {
          console.log("Photo URI:", photo.uri);
          setPhoto(photo.uri); // State'i set et
          await saveToGallery(photo.uri); // URI'yi direkt geçir
        } else {
          console.error("Photo URI is missing");
          Alert.alert("Error ❌", "Failed to capture photo.");
        }
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error ❌", "Failed to take picture.");
    }
  }
    

  if (!permission) return <View />
  if (!permission.granted) {
    return (
      <View>
        <Text>Give as Camera Permission</Text>
        <Pressable onPress={setPermission}>
          <Text>Allow</Text>
        </Pressable>
      </View>
    )
  }
  if (!mediaPermission) return <View />
  if (!mediaPermission.granted) {
    return (
      <View>
        <Text>Give as Media Permission</Text>
        <Pressable onPress={setMediaPermission}>
          <Text>Allow</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} facing={facing} style={{ flex: 1 }} />
    
      {/* Camera üzerindeki UI elementleri */}
      <Pressable
        style={styles.takePicture}
        onPress={async () => takePicture()}>
        <MaterialIcons name="camera" size={24} color="black" />
      </Pressable>
    
      <Pressable style={styles.flipCamera} onPress={cameraFacing}>
        <MaterialIcons name="flip-camera-ios" size={48} color="white" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  takePicture: {
    position: 'absolute',
    bottom: 100,
    left: 60,
    transform: [{ translateX: -18 }],
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 12,
  },
  flipCamera: {
    position: 'absolute',
    bottom: 100,
    right: 60,
    backgroundColor: 'transparent',
  },
})
