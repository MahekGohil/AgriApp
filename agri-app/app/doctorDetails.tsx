import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function DoctorDetails() {
  const params = useLocalSearchParams(); // Get params

  if (!params || !params.name) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Doctor details not found!</Text>
      </View>
    );
  }

  // Function to dial the phone number
  const handleCall = () => {
    const phoneNumber = `tel:${params.phone}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
        } else {
          Alert.alert("Error", "Dialer is not supported on this device.");
        }
      })
      .catch(() => Alert.alert("Error", "Unable to open dialer."));
  };

  // Function to open Google Maps
  const handleOpenMaps = () => {
    const locationString = String(params.location); // Convert location to string
    const locationQuery = encodeURIComponent(locationString); // Convert location to URL-friendly format
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
    Linking.openURL(mapsUrl).catch(() => Alert.alert("Error", "Unable to open Maps"));
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: String(params.image)}} style={styles.profileImage} 
      resizeMode="cover" />
  
      <Text style={styles.name}>{params.name}</Text>
      <Text style={styles.specialty}>{params.specialty}</Text>
  
      <TouchableOpacity onPress={handleCall}>
        <Text style={styles.detail}>
          <Text style={styles.label}>📞 Contact: </Text>
          <Text style={styles.link}>{params.phone}</Text>
        </Text>
      </TouchableOpacity>
  
      <Text style={styles.detail}><Text style={styles.label}>🎓 Qualification: </Text>{params.qualification}</Text>
      <Text style={styles.detail}><Text style={styles.label}>🩺 Experience: </Text>{params.experience}</Text>
  
      <TouchableOpacity onPress={handleOpenMaps}>
        <Text style={styles.detail}>
          <Text style={styles.label}>📍 Location: </Text>
          <Text style={styles.link}>{params.location}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
    container: 
    { 
      flex: 1, 
      padding: 20, 
      alignItems: "flex-start", // Align items to the left
      justifyContent: "flex-start", // Align content to the top 
      backgroundColor: "#E8EBE0"     //light green backgrond 
    },
    detailsContainer: {
      width: "100%", // Take full width to align content to the left
    },
    name: 
    { 
      fontSize: 24, 
      fontWeight: "bold", 
      color: "#006400", // Dark Green
      marginBottom: 5  
    },
    specialty: 
    { 
      fontSize: 18, 
      color: "#000000", // Black
      marginBottom: 15 
    },
    linkContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    detailContainer: {
      flexDirection: "row",
      alignItems: "flex-start", // Align text in the same line
      marginBottom: 5,
    },
    phone: 
    { 
      fontSize: 20, 
      fontWeight: "bold", 
      color: "#007BFF" 
    },
    detail: 
    { 
      fontSize: 16, 
      color: "#333", 
      marginBottom: 5 
    },
    label: 
    { 
      fontWeight: "bold", 
      marginRight: 5,
      color: "#000"
    },
    detailText: {
      fontSize: 16,
      color: "#333",
      flexShrink: 1, // Prevent text overflow
    },
    link: { 
      fontSize: 16, 
      color: "#007BFF", 
      flexShrink: 1, // Prevent text overflow
      textDecorationLine: "underline" 
    },
    error: 
    { 
      fontSize: 20, 
      color: "red", 
      fontWeight: "bold" 
    },
    profileImage: {
      width: 160,
      height: 160,
      borderRadius: 80,
      alignSelf: "flex-start",
      marginBottom: 20,
      marginTop: 40,
      overflow: "hidden",
      backgroundColor: "#ccc",
    },  
    card: {
      flexDirection: "row",
      alignItems: "center",
    },  
  });