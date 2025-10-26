import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useRouter, Stack, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "@/context/AppContext";
import { savePosts, loadPosts, saveComments, loadComments } from "@/storage/storage";

import PostCard from "../components/app/postcard";
import TopSale from "../components/app/topsale";
import BottomNav from "../components/app/bottomnav";

interface Post {
  id: string;
  text: string;
  lat: number;
  lng: number;
  createdAt: number;
  imageUri?: string | null;
}

interface Comment {
  id: string;
  postId: string;
  text: string;
  createdAt: number;
}

const dummyPosts: Post[] = [
  {
    id: "1",
    text: "Yard sale! Tons of clothes, toys, and books.",
    lat: 37.0965,
    lng: -113.5684,
    createdAt: Date.now(),
  },
  {
    id: "2",
    text: "Moving out sale! Furniture and electronics.",
    lat: 37.1,
    lng: -113.57,
    createdAt: Date.now(),
  },
  {
    id: "3",
    text: "Baby clothes and toys, everything must go!",
    lat: 37.095,
    lng: -113.565,
    createdAt: Date.now(),
  },
];

export default function FeedScreen() {
  const router = useRouter();
  const { user } = useAppContext();

  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [comments, setComments] = useState<Comment[]>([]);
  const [topSalePost] = useState<Post>(dummyPosts[0]);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.0965,
    lng: -113.5654,
  });

  const deletePost = (id: string) => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setPosts((prev) => prev.filter((p) => p.id !== id)),
      },
    ]);
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
  };

  useEffect(() => {
    (async () => {
      const storedPosts = (await loadPosts()) || [];
      const storedComments = (await loadComments()) || [];
      if (storedPosts.length > 0) setPosts(storedPosts);
      if (storedComments.length > 0) setComments(storedComments);
      await getUserLocation();
    })();
  }, []);

  // 🔁 Reload posts every time this screen gains focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const storedPosts = (await loadPosts()) || [];
        setPosts(storedPosts);
      })();
    }, [])
  );

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "YARDLY",
          headerStyle: { backgroundColor: "#b7b3d9ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <FlatList
            data={posts}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <PostCard post={item} userRole={user.role} deletePost={deletePost} />
            )}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            nestedScrollEnabled={true}
            removeClippedSubviews={false}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            contentContainerStyle={{ paddingBottom: 140 }}
            ListHeaderComponent={
              <>
                <TopSale topSalePost={topSalePost} setLocation={setLocation} />
                <Text style={[styles.sectionTitle, { marginLeft: 16 }]}>
                  New on the Block
                </Text>
              </>
            }
          />
          <BottomNav />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b7b3d9ff" },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
});

