import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 

export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'communityPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddPost = async () => {
    if (newPost.trim() === '') return;

    try {
      await addDoc(collection(db, 'communityPosts'), {
        content: newPost,
        author: 'Anonymous', // You can replace this with user's name if you have login system
        createdAt: new Date(),
      });
      setNewPost('');
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Posts</Text>

      {/* Input Section */}
      <TextInput
        placeholder="Share something..."
        value={newPost}
        onChangeText={setNewPost}
        style={styles.input}
      />
      <Button title="Post" onPress={handleAddPost} />

      {/* Posts Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.author}>
                {item.author || 'Unknown User'}
              </Text>
              <Text>{item.content}</Text>
              <Text style={styles.timestamp}>
                {item.createdAt?.toDate?.().toLocaleString() || ''}
              </Text>
            </View>
          )}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  post: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  }
});