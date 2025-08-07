import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Platform } from 'react-native';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDpEc_ldRGSlY2oqsFUDVr0YyhB1_a0OMQ",
  authDomain: "agriapp-4035.firebaseapp.com",
  projectId: "agriapp-4035",
  storageBucket: "agriapp-4035.firebasestorage.app",
  messagingSenderId: "225677887989",
  appId: "1:225677887989:web:fdda86873826dc0016f8bc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});


export { auth };