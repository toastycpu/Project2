import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePosts = async (posts: any[]) => {
  try {
    await AsyncStorage.setItem('posts', JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving posts:', e);
  }
};

export const loadPosts = async (): Promise<any[]> => {
  try {
    const json = await AsyncStorage.getItem('posts');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading posts:', e);
    return [];
  }
};

export const saveComments = async (comments: any[]) => {
  try {
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
  } catch (e) {
    console.error('Error saving comments:', e);
  }
};

export const loadComments = async (): Promise<any[]> => {
  try {
    const json = await AsyncStorage.getItem('comments');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading comments:', e);
    return [];
  }
};


