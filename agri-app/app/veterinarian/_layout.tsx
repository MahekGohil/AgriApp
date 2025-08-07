// app/farmer/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { withLayoutContext } from 'expo-router';
import { DrawerContent } from '@/components/DrawerContent';
import Ionicons from '@expo/vector-icons/Ionicons';

const DrawerLayout = withLayoutContext(Drawer);

export default function Layout() {
  return (
    <DrawerLayout
      drawerContent={(props:any) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#4CAF50',
        drawerLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen
        name="(tabs)" // This wraps your tab navigation
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: ' App Settings',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'About',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
          name="previousReports" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Previous Reports',
            title: 'Previous Reports',
          }}
        />
        <Drawer.Screen
          name="tutorials" 
          options={{
            drawerLabel: 'Tutorial',
            title: 'Tutorial',
          }}
        />
      <Drawer.Screen
      name="contactUs" // This is the name of the page and must match the url from root
      options={{
        drawerLabel: 'Contact Us',
        title:'Contact Us',
      }}
    />

    </DrawerLayout>
  );
}
