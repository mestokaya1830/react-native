import { useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
 import {
   createImageManipulatorContext,
   SaveFormat,
   FlipType,
} from "expo-image-manipulator";
 
export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // Kamera izni
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Give us camera permissions</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Allow</Text>
        </Pressable>
      </View>
    );
  }

  // Gallery permission
  if (!mediaPermission) return <View />;
  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Give us gallery permissions</Text>
        <Pressable style={styles.button} onPress={requestMediaPermission}>
          <Text style={styles.text}>Allow</Text>
        </Pressable>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  }

  async function saveToGallery() {
    try {
      const asset = await MediaLibrary.createAssetAsync(photoUri);
      await MediaLibrary.createAlbumAsync("MyApp", asset, false);

      Alert.alert("Success ✅", "Photo saved to gallery!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      console.log("Error saving photo:", error);
      Alert.alert("Error ❌", "Photo could not be saved.");
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }


 // 1️⃣ Fotoğrafı 90 derece döndürme ve dikey çevirme
 const rotatePhoto = async () => {
   if (!photoUri) return;
   try {
     const context = createImageManipulatorContext(photoUri);
     context.rotate(90);
     context.flip(FlipType.Vertical); // Opsiyonel
     const image = await context.renderAsync();
     const result = await image.saveAsync({
       format: SaveFormat.PNG,
       compress: 1,
     });
     setPhotoUri(result.uri);
   } catch (error) {
     console.error("Rotate failed:", error);
   }
 };

const cropPhoto = async () => {
  if (!photoUri) return;
  try {
    const context = createImageManipulatorContext(photoUri);
    context.crop({ originX: 0, originY: 0, width: 300, height: 300 });
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
      compress: 1,
    });
    setPhotoUri(result.uri);
  } catch (error) {
    console.error("Crop failed:", error);
  }
};

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <View style={styles.previewButtons}>
            <Pressable style={styles.button} onPress={() => setPhotoUri(null)}>
              <Text style={styles.text}>Retake</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={rotatePhoto}>
              <Text style={styles.text}>Rotate</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={cropPhoto}>
              <Text style={styles.text}>Crop</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={saveToGallery}>
              <Text style={styles.text}>Save & Exit</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          <View style={styles.overlay}>
            <Pressable style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </Pressable>
            <Pressable onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-ios" size={40} color="white" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  text: { fontSize: 16, fontWeight: "bold", color: "white" },
  previewContainer: { flex: 1, justifyContent: "center" },
  preview: { flex: 1 },
  previewButtons: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
