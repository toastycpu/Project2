import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { savePosts, loadPosts } from "@/storage/storage";

export default function CreatePostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

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

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need location access to tag your yard sale.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });

    Alert.alert(
      "📍 Location captured!",
      `Lat: ${loc.coords.latitude.toFixed(4)}, Lng: ${loc.coords.longitude.toFixed(4)}`
    );
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Missing info", "Please include a title and description for your sale.");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      text: `${title.trim()} - ${description.trim()}`,
      lat: location?.lat ?? 37.0965,
      lng: location?.lng ?? -113.5654,
      createdAt: Date.now(),
      imageUri: imageUri || null,
    };

    try {
      const existing = (await loadPosts()) || [];
      const updated = [newPost, ...existing];
      await savePosts(updated);

      Alert.alert("✅ Post Created!", "Your post has been submitted successfully.");
      setTimeout(() => router.back(), 500);
    } catch (err) {
      console.error("Error saving post:", err);
      Alert.alert("❌ Error", "Unable to save your post.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "YARDLY",
          headerStyle: { backgroundColor: "#ddb035ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image" size={50} color="#ddd" />
              <Text style={styles.placeholderText}>No photo selected</Text>
            </View>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a short title..."
            placeholderTextColor="#555"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Describe your sale..."
            placeholderTextColor="#555"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.cameraButton} onPress={takePhoto}>
            <Text style={styles.cameraButtonText}>📸</Text>
          </Pressable>

          <Pressable style={styles.cameraButton} onPress={pickImage}>
            <Text style={styles.cameraButtonText}>🖼️</Text>
          </Pressable>

          <Pressable style={styles.locationButton} onPress={getUserLocation}>
            <Text style={styles.cameraButtonText}>📍</Text>
          </Pressable>

          <Pressable style={styles.postButton} onPress={handleSubmit}>
            <Text style={styles.postButtonText}>Post</Text>
          </Pressable>
        </View>

        {location && (
          <Text style={styles.locationText}>
            Current Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9EBC8A",
    padding: 16,
  },
  imageContainer: {
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  placeholder: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    marginTop: 6,
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  cameraButton: {
    backgroundColor: "#eae585ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  locationButton: {
    backgroundColor: "#b3d2deff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#8FA31E",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cameraButtonText: {
    fontSize: 18,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  locationText: {
    color: "#444444ff",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
});
