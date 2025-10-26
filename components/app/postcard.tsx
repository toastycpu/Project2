import { StyleSheet, View, Text, Pressable, Alert, Image } from "react-native";
import { useRouter } from "expo-router";

interface Post {
  id: string;
  text: string;
  lat: number;
  lng: number;
  createdAt: number;
  imageUri?: string | null;
}

interface PostCardProps {
  post: Post;
  userRole: string;
  deletePost: (id: string) => void;
}

export default function PostCard({ post, userRole, deletePost }: PostCardProps) {
  const router = useRouter();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePost(post.id),
        },
      ]
    );
  };

  return (
    <View style={styles.postCard}>
      {/* Image preview */}
      {post.imageUri && (
        <Image
          source={{ uri: post.imageUri }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.postTitle}>{post.text}</Text>
      <Text style={styles.postMeta}>
        {new Date(post.createdAt).toLocaleString()}
      </Text>

      <Pressable
        style={styles.mapLink}
        onPress={() =>
          router.push({
            pathname: "/map",
            params: { lat: post.lat, lng: post.lng, text: post.text },
          })
        }
      >
        <Text style={styles.mapLinkText}>📍 View on Map</Text>
      </Pressable>

      {userRole === "admin" && (
        <Pressable style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    letterSpacing: 0.3,
  },
  postMeta: { fontSize: 15, color: "#666", marginBottom: 6 },
  mapLink: { marginTop: 6, paddingVertical: 10, alignItems: "flex-start" },
  mapLinkText: { fontSize: 14, color: "#ddb035ff", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#E76F51",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    minHeight: 44,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});