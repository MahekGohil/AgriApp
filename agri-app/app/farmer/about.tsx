import { ScrollView, View, Text, Image, Pressable, ImageBackground, Linking  } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AuthLayout from '../../components/AuthLayout';
const developers = [
  {
    name: 'Samriddhi Gupta',
    
    image: require('../../assets/devs/sam.jpg'),
    email: '22bt04132@gsfcuniversity.ac.in',
    linkedIn: 'https://www.linkedin.com/in/samriddhi-gupta-823713252/',
  },
  {
    name: 'Mahek Gohil',
    
    image: require('../../assets/devs/Mahek.jpg'),
    email: '22bt04035@gsfcuniversity.ac.in',
    linkedIn: 'https://www.linkedin.com/in/mahek-gohil-8abb44283/',
  },
  {
    name: 'Arundhati Sahu',
    
    image: require('../../assets/devs/dhoti.jpg'),
    email: '22bt04130@gsfcuniversity.ac.in',
    linkedIn: 'https://www.linkedin.com/in/arundhati-sahu-24b3bb2a6/',
  },
  {
    name: 'Arpita Jani',
    
    image: require('../../assets/devs/apple.jpg'),
    email: '22bt04043@gsfcuniversity.ac.in',
    linkedIn: 'https://www.linkedin.com/in/arpita-jani-2470092a6/',
  },
];

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mybg.png')} // change to your background image
      resizeMode="cover"
      className="flex-1"
    >

      <ScrollView className="flex-1 bg-white/50 px-4 py-6">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6 mt-10">About the App</Text>
        <Text className="text-base text-gray-700 mb-4 text-center">
        Our AI-Based Crop and Cattle Disease Detection System empowers farmers with cutting-edge technology. Through advanced image recognition and real-time expert consultation, we aim to enhance agricultural productivity and improve livestock health. This app is a result of continuous innovation and collaboration.This application is developed as part of our academic project to help farmers and agricultural experts diagnose plant and cattle diseases using AI and simplify communication with professionals.
        </Text>

        <Text className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Meet the Developers</Text>

        {developers.map((dev, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 150)}
            className="bg-sky-100 rounded-2xl p-4 mb-4 shadow-md"
          >
            <View className="flex-row items-center">
              <Image source={dev.image} className="w-24 h-24 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{dev.name}</Text>
                <Text className="text-sm text-gray-600">{dev.role}</Text>
                <View className="flex-row mt-2 space-x-4">
                  <Pressable onPress={() => Linking.openURL(`mailto:${dev.email}`)}>
                    <MaterialCommunityIcons name="email" size={20} color="#333" />
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL(dev.linkedIn)}>
                    <FontAwesome name="linkedin-square" size={20} color="#0077B5" />
                  </Pressable>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

// import { ScrollView, View, Text, Image, Pressable, ImageBackground, Linking  } from 'react-native';
// import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// import Animated, { FadeInUp } from 'react-native-reanimated';
// import AuthLayout from '../../components/AuthLayout';
// const developers = [
//   {
//     name: 'Samriddhi Gupta',
//     role: '',
//     image: require('../../assets/devs/sam.jpg'),
//     email: '22bt04132@gsfcuniversity.ac.in',
//     linkedIn: 'https://www.linkedin.com/in/samriddhi-gupta-823713252/',
//   },
//   {
//     name: 'Mahek Gohil',
//     role: '',
//     image: require('../../assets/devs/Mahek.jpg'),
//     email: '22bt04035@gsfcuniversity.ac.in',
//     linkedIn: 'https://www.linkedin.com/in/mahek-gohil-8abb44283/',
//   },
//   {
//     name: 'Arundhati Sahu',
//     role: '',
//     image: require('../../assets/devs/dhoti.jpg'),
//     email: '22bt04130@gsfcuniversity.ac.in',
//     linkedIn: 'https://www.linkedin.com/in/arundhati-sahu-24b3bb2a6/',
//   },
//   {
//     name: 'Arpita Jani',
//     role: '',
//     image: require('../../assets/devs/apple.jpg'),
//     email: '22bt04043@gsfcuniversity.ac.in',
//     linkedIn: 'https://www.linkedin.com/in/arpita-jani-2470092a6/',
//   },
// ];

// export default function AboutScreen() {
//   const openLink = (url: string) => {
//     Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/images/mybg.png')} // change to your background image
//       resizeMode="cover"
//       className="flex-1"
//     >

//       <ScrollView className="flex-1 bg-white/50 px-4 py-6">
//         <Text className="text-3xl font-bold text-center text-gray-800 mb-6 mt-10">About the App</Text>
//         <Text className="text-base text-gray-700 mb-4 text-center">
//         Our AI-Based Crop and Cattle Disease Detection System empowers farmers with cutting-edge technology. Through advanced image recognition and real-time expert consultation, we aim to enhance agricultural productivity and improve livestock health. This app is a result of continuous innovation and collaboration.This application is developed as part of our academic project to help farmers and agricultural experts diagnose plant and cattle diseases using AI and simplify communication with professionals.
//         </Text>

//         <Text className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Meet the Developers</Text>

//         {developers.map((dev, index) => (
//           <Animated.View
//             key={index}
//             entering={FadeInUp.delay(index * 150)}
//             className="bg-sky-100 rounded-2xl p-4 mb-4 shadow-md"
//           >
//             <View className="flex-row items-center">
//               <Image source={dev.image} className="w-24 h-24 rounded-full mr-4" />
//               <View className="flex-1">
//                 <Text className="text-lg font-bold text-gray-800">{dev.name}</Text>
//                 <Text className="text-sm text-gray-600">{dev.role}</Text>
//                 <View className="flex-row mt-2 space-x-4">
//                   <Pressable onPress={() => Linking.openURL(mailto:${dev.email})}>
//                     <MaterialCommunityIcons name="email" size={20} color="#333" />
//                   </Pressable>
//                   <Pressable onPress={() => Linking.openURL(dev.linkedIn)}>
//                     <FontAwesome name="linkedin-square" size={20} color="#0077B5" />
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </Animated.View>
//         ))}
//       </ScrollView>
//     </ImageBackground>
//   );
// }