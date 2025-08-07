import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { db } from '../firebaseConfig'; 
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddPostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp; 
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Add a New Post</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 p-3 rounded mb-4"
      />
      <TextInput
        placeholder="Write something..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        className="border border-gray-300 p-3 rounded mb-4 h-32 text-top"
      />
      {/* <Button title="Post" onPress={handleSubmit} /> */}
    </View>
  );
}