import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import AuthLayout from '../../components/AuthLayout';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = useAuthStore((state) => state.role);
  const router = useRouter();

  const handleSignup = async () => {
    if (!role) return Alert.alert('Error', 'Please select a role first');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        role,
        email,
      });
      Alert.alert('Success', `Signed up as ${role}`);
      router.replace('/'); // Redirect to index.tsx
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        Alert.alert('Signup Error', error.message);
      } else {
        Alert.alert('Signup Error', 'Something went wrong.');
      }
    }
  };

  return (
    <AuthLayout title={`Signup as ${role?.toUpperCase()}`}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-lg p-4 mb-4"
      />
  
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-lg p-4 mb-6"
      />
  
      <TouchableOpacity className="bg-green-600 p-4 rounded-lg" onPress={handleSignup}>
        <Text className="text-white font-bold text-center">Signup</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}