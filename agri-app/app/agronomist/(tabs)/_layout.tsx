import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#dim gray',  // Active tab icon color
        tabBarInactiveTintColor: 'dim gray',
        headerStyle: {
          backgroundColor: '#A3E29F',
        },
        headerShadowVisible: false,
        headerTintColor: 'dim gray',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#A3E29F', // Dark background for the tab bar
          paddingBottom: 0,
          height: 60,
          borderTopWidth: 0,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={24} color="dimgray" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{
          title: 'Diagnosis',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'medkit' : 'medkit-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="consultation"
        options={{
          title: 'Consultation',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}


