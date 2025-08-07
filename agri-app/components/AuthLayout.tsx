import { ReactNode } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <View style={styles.container}>
      
      {/* Background Image with opacity */}
      <Image
        source={require('../assets/images/mybg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay content */}
      <View style={styles.overlay}>
        <View style={styles.contentBox}>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5, // lower opacity for background
    zIndex: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    zIndex: 1,
  },
  contentBox: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});


