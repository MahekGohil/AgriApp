import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

const PlaceholderImage = require('@/assets/images/cover.png');
const BackgroundImage = require('@/assets/images/mybg.png'); // Ensure this exists

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Image */}
      <Image source={BackgroundImage} style={styles.backgroundImage} />

      {/* Main Content */}
      <View className="absolute w-full h-full flex items-center justify-center">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-black font-bold text-5xl mt-0 mb-5"
          >
            Welcome
          </Animated.Text>
          <Text className="text-center text-gray-600 px-4">
            Empowering Farmers for Healthier Farms and Cattles. Join us in
            safeguarding crops and livestock using AI-driven solutions.
          </Text>
        </View>

        <View className="flex pt-3 pb-4 mb-10 mt-6">
          <Image source={PlaceholderImage} style={styles.image} />
        </View>

        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-black font-bold text-2xl mt-0 mb-0"
          >
            Select a Language
          </Animated.Text>
        </View>

        {/* Language Selection */}
        <Animated.View
          entering={FadeInDown.duration(1000).delay(700)}
          className="flex flex-row justify-between w-4/5 mt-4 mb-4"
        >
          <TouchableOpacity className="flex-1 bg-sky-300 py-3 rounded-xl shadow-md items-center mx-2 flex-row justify-center">
            <FontAwesome5 name="language" size={20} color="white" className="mr-2" />
            <Text className="text-white text-lg font-bold">Hindi</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-sky-300 py-3 rounded-xl shadow-md items-center mx-2 flex-row justify-center">
            <FontAwesome5 name="globe" size={20} color="white" className="mr-2" />
            <Text className="text-white text-lg font-bold">English</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Next Button */}
        <View className="flex item-center mx-4 space-y-4 mt-10">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full"
          >
            <Link href={"././onboarding"} asChild>
              <TouchableOpacity className="w-60 bg-green-700 py-3 rounded-lg mb-0 mt-6">
                <Text className="text-xl font-bold text-white text-center">Next</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure transparency
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure it covers the full screen
    opacity: 0.5, // Adjust transparency if needed
  },
  image: {
    width: 320,
    height: 280,
    borderRadius: 18,
  },
});
