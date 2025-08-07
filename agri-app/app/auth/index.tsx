import { useState } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';

type UserRole = 'farmer' | 'veterinarian' | 'agronomist';

const roles: { id: UserRole; title: string; image: any }[] = [
  { id: 'farmer', title: 'Farmer', image: require('@/assets/images/farmer.jpg') },
  { id: 'veterinarian', title: 'Veterinarian', image: require('@/assets/images/veterinarian.jpg') },
  { id: 'agronomist', title: 'Agronomist', image: require('@/assets/images/agronomist.jpg') },
];

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();
  const setRole = useAuthStore((state) => state.setRole);

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      router.push('/auth/signUp');
    }
  };

  return (
    <View className="flex-1 bg-green-50 items-center p-6">
      {/* Header */}
      <Text className="text-3xl font-bold mt-12 text-black">Select Your Role</Text>
      <Text className="text-gray-500 text-sm text-center mt-1">
        Be it a Farmer or Vet, get tools tailored to your needs.
      </Text>

      {/* Role Selection */}
      <View className="w-full mt-8 space-y-4">
        {roles.map((role) => (
          <Pressable
            key={role.id}
            onPress={() => setSelectedRole(role.id)}
            className={`rounded-lg overflow-hidden border-2 ${
              selectedRole === role.id ? 'border-green-700' : 'border-transparent'
            }`}
          >
            <ImageBackground source={role.image} className="w-full h-36 justify-end mb-1">
              <View className="bg-white/80 p-4">
                <Text className="text-lg font-bold">{role.title}</Text>
                <Text className="text-gray-500 text-xs">
                  Minim dolor in amet nulla laboris enim dolore.
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </View>

      {/* Next Button */}
      <Pressable
        onPress={handleContinue}
        disabled={!selectedRole}
        className={`mt-20 w-full py-3 rounded-lg ${
          selectedRole ? 'bg-green-700' : 'bg-green-200'
        }`}
      >
        <Text className="text-white text-center font-bold">
          {selectedRole ? 'Next' : 'Select a Role'}
        </Text>
      </Pressable>

      {/* Login Redirect */}
      <Pressable onPress={() => router.push('/auth/login')}>
        <Text className="mt-6 text-black font-bold">Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

// import { useRouter } from 'expo-router';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useAuthStore } from '../../store/useAuthStore';

// type UserRole = 'farmer' | 'veterinarian' | 'agronomist';
// const roles: UserRole[] = ['farmer', 'veterinarian', 'agronomist'];

// export default function SelectRole() {
//   const router = useRouter();
//   const setRole = useAuthStore((state) => state.setRole);

//   const handleRoleSelect = (role: UserRole) => {
//     setRole(role);
//     router.push('/auth/signUp');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Your Role</Text>
//       {roles.map((role) => (
//         <TouchableOpacity key={role} style={styles.button} onPress={() => handleRoleSelect(role)}>
//           <Text style={styles.buttonText}>{role.toUpperCase()}</Text>
//         </TouchableOpacity>
        
//       ))}
//       <TouchableOpacity onPress={() => router.push('/auth/login')}>
//         <Text style={{ marginTop: 20, color: '#4CAF50', fontWeight: 'bold' }}>Already have an account? Login</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 100,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 40,
//     fontWeight: 'bold',
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#4CAF50',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
