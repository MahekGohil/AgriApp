import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useAuthStore } from '../../store/useAuthStore';
import { ActivityIndicator, View } from 'react-native';

type UserRole = 'farmer' | 'veterinarian' | 'agronomist';

export default function Index() {
  const router = useRouter();
  const setRole = useAuthStore((state:any) => state.setRole);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        const role = docSnap.data()?.role as UserRole | undefined;

        if (role === 'farmer' || role === 'veterinarian' || role === 'agronomist') {
          setRole(role);
          router.replace({ pathname: `/${role}` }); // 👈 FIXED: Cast as known route object
        } else {
          router.replace('/auth');
        }
      } else {
        router.replace('/auth');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2e7d32" />
    </View>
  );
}
