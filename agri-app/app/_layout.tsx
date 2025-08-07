import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import '../global.css';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBE0',
  },
});


// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { View, StyleSheet } from 'react-native';

// // Import your global CSS file
// import "../global.css";

// export default function RootLayout() {
//   return (
//     <View style={styles.container}>
//       <Stack screenOptions={{ headerShown: false}}>
//         <Stack.Screen name="index" options={{ title: 'Home' }} />
//         <Stack.Screen name="auth" options={{ headerShown: false }} />
//         <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//         <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//         <Stack.Screen name="farmer" options={{ headerShown: false }} />
//         <Stack.Screen name="agronomist" options={{ headerShown: false }} />
//         <Stack.Screen name="veterinarian" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="light" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8EBE0', // Ensure the background fills the screen
//   },
// });
