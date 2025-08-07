// // import React, { useLayoutEffect } from "react";
// import * as React from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   ImageSourcePropType,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { DrawerActions, useNavigation } from '@react-navigation/native';
// import { useLayoutEffect } from "react";

// const FeatureCard = ({ title, image, route }: { title: string; image: ImageSourcePropType; route: string }) => {
//   const router = useRouter();

//   return (
//     <TouchableOpacity style={styles.featureCard} onPress={() => router.push(route as any)}>
//       <ImageBackground source={image} style={styles.featureImage} imageStyle={{ borderRadius: 12 }}>
//         <View style={styles.cardOverlay}>
//           <Text style={styles.featureText}>{title}</Text>
//           <Ionicons name="chevron-forward" size={22} color="white" />
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   );
// };

// const HomeScreen: React.FC = () => {
//   const router = useRouter();
//   const navigation = useNavigation();

//   const [schemes] = React.useState([
//     { title: "PM Kisaan Samman Nidhi", description: "Get direct income support of ₹6,000 per year." },
//     { title: "PM Fasal Bima Yojana", description: "Insurance coverage for crops against natural calamities." },
//     { title: "PM Kisaan Mandhan Yojana", description: "Pension scheme for small and marginal farmers." },
//   ]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 15 }}>
//           <Ionicons name="menu" size={24} color="black" />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <ImageBackground source={require("@/assets/images/agriIndia.jpg")} style={styles.headerImage} imageStyle={{ borderRadius: 12 }}>
//           <View style={styles.overlay}>
//             <Text style={styles.headerTitle}>How We Help You?</Text>
//             <Text style={styles.headerSub}>Leveraging Cattle & Crop Disease Diagnosis</Text>
//           </View>
//         </ImageBackground>

//         <Text style={styles.description}>
//           Manage your farm efficiently with AI-powered insights. Diagnose, prevent, and stay connected to expert support.
//         </Text>

//         <Text style={styles.getStarted}>Get Started</Text>

//         <FeatureCard title="Diagnose Livestock conveniently" image={require("@/assets/images/livestock.jpg")} route="/diagnosis" />
//         <FeatureCard title="Diagnose Crops With Ease" image={require("@/assets/images/crops.jpg")} route="/diagnosis" />
//         <FeatureCard title="Engage With Your Community and more" image={require("@/assets/images/community.jpg")} route="/community" />

//         <Text style={styles.sectionTitle}>Government Schemes</Text>
//         <View style={styles.schemeContainer}>
//           {schemes.map((scheme, index) => (
//             <TouchableOpacity key={index} style={styles.schemePlainCard}>
//               <Text style={styles.schemeTitlePlain}>{scheme.title}</Text>
//               <Text style={styles.schemeSubPlain}>{scheme.description}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Contact Us</Text>
//         <View style={styles.contactBox}>
//           <Text style={styles.contactText}>📧 samarthbharat@gmail.com</Text>
//           <Text style={styles.contactText}>📞 +91 9173523989</Text>
//           <Text style={styles.contactText}>📍 GSFC University, Vadodara</Text>
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.chatbotButton} onPress={() => router.push("/chatbot" as any)}> 
//         <MaterialCommunityIcons name="robot-outline" size={32} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scroll: {
//     paddingBottom: 80,
//     paddingHorizontal: 16,
//   },
//   headerImage: {
//     height: 160,
//     justifyContent: "flex-end",
//     marginTop: 20,
//   },
//   overlay: {
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 12,
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   headerSub: {
//     color: "#ddd",
//     fontSize: 12,
//   },
//   description: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: 14,
//     marginTop: 14,
//     marginBottom: 4,
//     paddingHorizontal: 10,
//   },
//   getStarted: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//     marginBottom: 10,
//     color: "#1f2937",
//     borderBottomWidth: 2,
//     borderBottomColor: "#6EE7B7",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   featureCard: {
//     marginBottom: 12,
//   },
//   featureImage: {
//     height: 120,
//     justifyContent: "flex-end",
//   },
//   cardOverlay: {
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//   },
//   featureText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//     marginBottom: 10,
//     color: "#1f2937",
//     borderBottomWidth: 2,
//     borderBottomColor: "#6EE7B7",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   schemeContainer: {
//     gap: 10,
//     marginBottom: 20,
//   },
//   schemePlainCard: {
//     backgroundColor: "#f0fdf4",
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#d1fae5",
//   },
//   schemeTitlePlain: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#065f46",
//   },
//   schemeSubPlain: {
//     fontSize: 13,
//     color: "#047857",
//     marginTop: 4,
//   },
//   contactBox: {
//     backgroundColor: "#047857",
//     padding: 16,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   contactText: {
//     color: "#fff",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   chatbotButton: {
//     position: "absolute",
//     bottom: 30,
//     right: 20,
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 50,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
// });
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinkProps } from "expo-router";

type Props = {
  title: string;
  image: ImageSourcePropType;
  route: LinkProps["href"];
};

const HomeScreen = () => {
  const router = useRouter();

  const [schemes, setSchemes] = React.useState([
    {
      title: "PM Kisaan Samman Nidhi",
      description: "Get direct income support of ₹6,000 per year.",
    },
    {
      title: "PM Fasal Bima Yojana",
      description: "Insurance coverage for crops against natural calamities.",
    },
    {
      title: "PM Kisaan Mandhan Yojana",
      description: "Pension scheme for small and marginal farmers.",
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header Banner */}
        <ImageBackground
          source={require("@/assets/images/agriIndia.jpg")}
          style={styles.headerImage}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.headerTitle}>How We Help You?</Text>
            <Text style={styles.headerSub}>
              Leveraging Cattle & Crop Disease Diagnosis
            </Text>
          </View>
        </ImageBackground>

        {/* Description */}
        <Text style={styles.description}>
          Manage your farm efficiently with AI-powered insights. Diagnose,
          prevent, and stay connected to expert support.
        </Text>

        <Text style={styles.getStarted}>Get Started</Text>

        {/* Feature Cards */}
        <FeatureCard
          title="Diagnose Livestock conveniently"
          image={require("@/assets/images/livestock.jpg")}
          route="./diagnosis"
        />
        <FeatureCard
          title="Diagnose Crops With Ease"
          image={require("@/assets/images/crops.jpg")}
          route="./diagnosis"
        />
        <FeatureCard
          title="Engage With Your Community and more"
          image={require("@/assets/images/community.jpg")}
          route="./community"
        />

        {/* Government Schemes Section */}
        <Text style={styles.sectionTitle}>Government Schemes</Text>
        <View style={styles.schemeContainer}>
          {schemes.map((scheme, index) => (
            <TouchableOpacity key={index} style={styles.schemePlainCard}>
              <Text style={styles.schemeTitlePlain}>{scheme.title}</Text>
              <Text style={styles.schemeSubPlain}>{scheme.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Us Section */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactBox}>
          <Text style={styles.contactText}>📧 samarthbharat@gmail.com</Text>
          <Text style={styles.contactText}>📞 +91 9173288232</Text>
          <Text style={styles.contactText}>
            📍GSFC University, Vadodara
          </Text>
        </View>
      </ScrollView>

      {/* Chatbot Button */}
     <TouchableOpacity style={styles.chatbotButton} onPress={() => router.push("/chatbot" as any)}> 
         <MaterialCommunityIcons name="robot-outline" size={32} color="black" />
       </TouchableOpacity>
    </View>
  );
};

const FeatureCard = ({ title, image, route }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => router.push(route)}
    >
      <ImageBackground
        source={image}
        style={styles.featureImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.cardOverlay}>
          <Text style={styles.featureText}>{title}</Text>
          <Ionicons name="chevron-forward" size={22} color="white" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  headerImage: {
    height: 160,
    justifyContent: "flex-end",
    marginTop: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSub: {
    color: "#ddd",
    fontSize: 12,
  },
  description: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  getStarted: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#1f2937",
    borderBottomWidth: 2,
    borderBottomColor: "#6EE7B7",
    alignSelf: "center",
    paddingBottom: 4,
  },
  featureCard: {
    marginBottom: 12,
  },
  featureImage: {
    height: 120,
    justifyContent: "flex-end",
  },
  cardOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  featureText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#1f2937",
    borderBottomWidth: 2,
    borderBottomColor: "#6EE7B7",
    alignSelf: "center",
    paddingBottom: 4,
  },
  schemeContainer: {
    gap: 10,
    marginBottom: 20,
  },
  schemePlainCard: {
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },
  schemeTitlePlain: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#065f46",
  },
  schemeSubPlain: {
    fontSize: 13,
    color: "#047857",
    marginTop: 4,
  },
  contactBox: {
    backgroundColor: "#047857",
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  contactText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  chatbotButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "rgb(223, 226, 226)",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});