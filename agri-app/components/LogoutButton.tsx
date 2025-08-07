// components/LogoutButton.tsx

// Import your global CSS file
// import "../global.css";

import { Pressable, Text, View } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';


export const LogoutButton = () => {
  const router = useRouter();
  const clearRole = useAuthStore((state) => state.clearRole);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearRole();
      router.replace('./auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Pressable
      className="flex-row items-center gap-2 bg-red-500 px-4 py-2 mt-4 rounded-2xl"
      onPress={handleLogout}
    >
      <LogOut color="white" size={20} />
      <Text className="text-white font-semibold text-base">Logout</Text>
    </Pressable>
  );
};