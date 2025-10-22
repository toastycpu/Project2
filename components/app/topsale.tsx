import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface TopSaleProps {
  topSalePost: {
    id: string;
    text: string;
    lat: number;
    lng: number;
    createdAt: number;
  };
  setLocation: (loc: { lat: number; lng: number }) => void;
}

export default function TopSale({ topSalePost }: TopSaleProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.title}> Top Sale</Text>
      <Text style={styles.text}>{topSalePost.text}</Text>

      <Pressable
        style={styles.mapButton}
        onPress={() =>
          router.push({
            pathname: "/map",
            params: {
              lat: topSalePost.lat.toString(),
              lng: topSalePost.lng.toString(),
              text: topSalePost.text,
            },
          })
        }
      >
        <Text style={styles.mapButtonText}>📍 View on Map</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: "#8FA31E",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
