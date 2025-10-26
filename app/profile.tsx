import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Stack } from "expo-router";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const { user, toggleRole } = useAppContext();

  const handleToggleRole = () => {
    if (user.role === "user") {
      Alert.alert("Admin Mode", "You are now in Admin mode 🛠️");
    } else {
      Alert.alert("User Mode", "You have returned to User mode 👤");
    }
    toggleRole();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#ddb035ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    <View style={styles.container}>
      <Text style={styles.info}>Username: {user.username}</Text>
      <Pressable style={styles.button} onPress={handleToggleRole}>
        <Text style={styles.buttonText}>
          {user.role === "user" ? "Switch to Admin Mode" : "Switch to User Mode"}
        </Text>
      </Pressable>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8e85b3ff",
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: "#8FA31E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

