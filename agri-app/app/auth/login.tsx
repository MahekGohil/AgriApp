import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import AuthLayout from '../../components/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setRole = useAuthStore((state) => state.setRole);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        setRole(role);
        router.replace('/');
      } else {
        Alert.alert('Login Error', 'No role assigned.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message);
      } else {
        Alert.alert('Login Error', 'An unknown error occurred.');
      }
    }
  };

  return (
    <AuthLayout title="Login">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus
        className="border border-gray-300 rounded-lg p-4 mb-4"
      />
  
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="border border-gray-300 rounded-lg p-4 mb-6"
      />
  
      <TouchableOpacity className=" bg-sky-300 p-4 rounded-lg mb-4" onPress={handleLogin}>
        <Text className="text-white font-bold text-center">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/forgetPassword')}>
        <Text style={{ color: 'black', textAlign: 'center', fontWeight: '500' }}>
          Forgot Password?{' '}
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Reset Here</Text>
        </Text>
      </TouchableOpacity>
      
  
      {/* <TouchableOpacity onPress={() => router.push('/auth/forgetPassword')}>
        <Text className="text-black text-center font-medium underline">Forgot Password? Reset Here</Text>
      </TouchableOpacity> */}
    </AuthLayout>
  );
}


//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         secureTextEntry
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} />
//       <TouchableOpacity onPress={() => router.push('/auth/forgetPassword')}>
//         <Text style={{ marginTop: 20, color: '#4CAF50', fontWeight: 'bold' }}>Forget Password? Reset Here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 20,
//     fontSize: 16,
//   },
// });