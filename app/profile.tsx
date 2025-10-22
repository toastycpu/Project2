import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#9EBC8A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>👤</Text>
        <Text style={styles.subtitle}>Coming Soon!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#8FA31E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
