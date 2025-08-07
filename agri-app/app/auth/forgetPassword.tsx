import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Make sure this points to your Firebase config
import { useRouter } from 'expo-router';
import AuthLayout from '../../components/AuthLayout';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Missing Info', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'Check your email for reset instructions.');
      router.back(); // Go back to login screen
    } catch (error) {
      console.error('Password reset error:', error);
      if (error instanceof Error) {
        Alert.alert('Reset Error', error.message);
      } else {
        Alert.alert('Reset Error', 'Something went wrong.');
      }
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <TextInput
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-lg p-4 mb-6"
      />
  
      <TouchableOpacity className="bg-green-600 p-4 rounded-lg mb-4" onPress={handlePasswordReset}>
        <Text className="text-white font-bold text-center">Send Reset Email</Text>
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-green-600 text-center font-medium underline">Back to Login</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
  
}

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Your Password</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor="#aaa"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
//         <Text style={styles.buttonText}>Send Reset Email</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.back()}>
//         <Text style={styles.link}>Back to Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100,
//     paddingHorizontal: 24,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   link: {
//     textAlign: 'center',
//     color: '#4CAF50',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//   },
// });
