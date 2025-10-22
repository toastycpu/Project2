import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface Post {
  id: string;
  text: string;
  lat: number;
  lng: number;
  createdAt: number;
}

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{post.text}</Text>
      <Text style={styles.postMeta}>{new Date(post.createdAt).toLocaleString()}</Text>

      <Pressable
        style={styles.mapLink}
        onPress={() =>
          router.push({
            pathname: "/map",
            params: { lat: post.lat, lng: post.lng, text: post.text },
          })
        }
      >
        <Text style={styles.mapLinkText}>
          📍 View on Map
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  postMeta: { fontSize: 12, color: "#666", marginBottom: 6 },
  mapLink: { marginTop: 6 },
  mapLinkText: { fontSize: 14, color: "#8FA31E", fontWeight: "bold" },
});
