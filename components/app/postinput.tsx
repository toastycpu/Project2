import { StyleSheet, View, TextInput, Pressable, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";

interface PostInputProps {
  postText: string;
  setPostText: (text: string) => void;
  addPost: (imageUri?: string | null, location?: { lat: number; lng: number } | null) => void;
}

export default function PostInput({ postText, setPostText, addPost }: PostInputProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera access is required to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission is required to tag your yard sale.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    alert("📍 Location captured!");
  };

  const handleAddPost = () => {
    addPost(imageUri, location);
    setImageUri(null);
    setLocation(null);
  };

  return (
    <View style={styles.inputContainer}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Describe your sale..."
          value={postText}
          onChangeText={setPostText}
          multiline
          returnKeyType="done"
          onSubmitEditing={handleAddPost}
        />

        <Pressable style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButtonText}>📸</Text>
        </Pressable>

        <Pressable style={styles.locationButton} onPress={getLocation}>
          <Text style={styles.cameraButtonText}>📍</Text>
        </Pressable>

        <Pressable style={styles.postButton} onPress={handleAddPost}>
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cameraButton: {
    backgroundColor: "#B7CFA0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },
  locationButton: {
    backgroundColor: "#A6BBA8",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },
  cameraButtonText: {
    fontSize: 18,
  },
  postButton: {
    backgroundColor: "#8FA31E",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },
  postButtonText: { color: "#fff", fontWeight: "bold" },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
});

