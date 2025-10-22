import { StyleSheet, View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNav() {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <Pressable style={styles.navButton} onPress={() => router.push("/map")}>
        <Text style={styles.navText}>Map</Text>
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => router.push("/profile")}>
        <Text style={styles.navText}>Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#D2D0A0",
  },
  navButton: { alignItems: "center" },
  navText: { color: "#fff", fontWeight: "bold" },
});
