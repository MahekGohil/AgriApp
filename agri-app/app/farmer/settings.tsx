// app/farmer/settings.tsx
// import { View, Text } from 'react-native';

// export default function SettingsScreen() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-xl font-bold">Settings</Text>
//     </View>
//   );
// }

import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { FontAwesome5, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AuthLayout from '../../components/AuthLayout';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6 text-center mt-10">Settings</Text>

      {/* Account Section */}
      <View className="mb-6">
        <Text className="text-xl font-semibold text-gray-700 mb-2">Account</Text>
        <Pressable className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl mb-3">
          <View className="flex-row items-center space-x-4">
            <Feather name="user" size={20} color="#333" />
            <Text className="text-base text-gray-800">Edit Profile</Text>
          </View>
        </Pressable>
        <Pressable className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-4">
            <MaterialIcons name="logout" size={20} color="#333" />
            <Text className="text-base text-gray-800">Logout</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" onPress={handleLogout} />
        </Pressable>
      </View>

      {/* Preferences Section */}
      <View className="mb-6">
        <Text className="text-xl font-semibold text-gray-700 mb-2">Preferences</Text>
        <View className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl mb-3">
          <View className="flex-row items-center space-x-4">
            <Ionicons name="moon" size={20} color="#333" />
            <Text className="text-base text-gray-800">Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? '#4ade80' : '#ccc'}
          />
        </View>
        <View className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-4">
            <Ionicons name="notifications" size={20} color="#333" />
            <Text className="text-base text-gray-800">Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? '#4ade80' : '#ccc'}
          />
        </View>
      </View>

      {/* Help & Support */}
      <View className="mb-10">
        <Text className="text-xl font-semibold text-gray-700 mb-2">Help & Support</Text>
        <Pressable className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl mb-3">
          <View className="flex-row items-center space-x-4">
            <Feather name="help-circle" size={20} color="#333" />
            <Text className="text-base text-gray-800">FAQs</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </Pressable>
        <Pressable className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-4">
            <FontAwesome5 name="envelope" size={20} color="#333" />
            <Text className="text-base text-gray-800">Contact Us</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
