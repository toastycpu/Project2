import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
} from "react-native";
import * as Location from "expo-location";
import { useRouter, Stack } from "expo-router";
import { useState, useEffect } from "react";
import {useUser} from '@/context/UserContext';
import { savePosts, loadPosts, saveComments, loadComments } from '@/storage/storage';

// Import components from app/appcomponents
import PostInput from "../components/app/postinput";
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
    text: "Moving out! Furniture and electronics.",
    lat: 37.1,
    lng: -113.57,
    createdAt: Date.now(),
  },
  {
    id: "3",
    text: "Baby clothes and toys giveaway, everything must go!",
    lat: 37.095,
    lng: -113.565,
    createdAt: Date.now(),
  },
];

export default function FeedScreen() {
  const router = useRouter();
  const [postText, setPostText] = useState<string>("");
  const [topSalePost] = useState<Post>(dummyPosts[0]);
  const [posts, setPosts] = useState<Post[]>(dummyPosts.slice(1));
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.0965,
    lng: -113.5654,
  });

  const { user, toggleRole } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);

  const addPost = (imageUri?: string | null) => {
    const trimmed = postText.trim();
    if (!trimmed && !imageUri) return;

    const newPost: Post = {
      id: Date.now().toString(),
      text: trimmed,
      lat: location.lat,
      lng: location.lng,
      createdAt: Date.now(),
      imageUri,
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
  };

    useEffect(() => {
    (async () => {
      const storedPosts = (await loadPosts()) || [];
      const storedComments = (await loadComments()) || [];
      if (storedPosts.length > 0) setPosts(storedPosts);
      if (storedComments.length > 0) setComments(storedComments);
      })();
    }, []);

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
          title: "ReFind",
          headerStyle: { backgroundColor: "#9EBC8A" },
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
            renderItem={({ item }) => <PostCard post={item} />}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            nestedScrollEnabled={true}
            removeClippedSubviews={false}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            contentContainerStyle={{ paddingBottom: 140 }}
            ListHeaderComponent={
              <>
                {/* New Post input */}
                <PostInput
                  postText={postText}
                  setPostText={setPostText}
                  addPost={addPost}
                />

                {/* Top Sale */}
                <TopSale topSalePost={topSalePost} setLocation={setLocation} />

                <Text style={[styles.sectionTitle, { marginLeft: 16 }]}>
                 New on the Block
                </Text>

                <Text style={{ color: '#fff', textAlign: 'center', marginVertical: 8 }}>
                  Logged in as: {user.role}
                </Text>

              </>
            }
          />

          {/* Bottom Nav */}
          <BottomNav />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9EBC8A" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
});
