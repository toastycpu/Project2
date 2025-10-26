import { StyleSheet, View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons} from "@expo/vector-icons";

export default function BottomNav() {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <Pressable style={styles.navButton} onPress={() => router.push("/map")}>
         <Feather name="map-pin" size={26} color="#fff" />
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => router.push("/create")}>
        <Ionicons name="add-outline" size={30} color="#fff" />
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => router.push("/profile")}>
        <Ionicons name="person-outline" size={30} color="#fff" />
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
    backgroundColor: "#ddb035ff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  navButton: { alignItems: "center" },
});