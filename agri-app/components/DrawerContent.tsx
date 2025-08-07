// components/DrawerContent.tsx
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../store/useAuthStore';
import { LogoutButton } from './LogoutButton';

export const DrawerContent = (props: any) => {
  const role = useAuthStore((state) => state.role);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="items-center mt-8">
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }} // Placeholder avatar
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-lg font-bold mt-4 capitalize">Welcome, {role}</Text>
      </View>

      <View className="flex-1 px-4 mt-8">
        <DrawerItemList {...props} />
      </View>
      

      <View className="px-4 pb-8">
        <LogoutButton />
      </View>
    </DrawerContentScrollView>
   
  );
};