import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams

const ContactUs = () => {
  const params = useLocalSearchParams();

  const companyName = "Agriapp";
  const address = "Vadodara, Gujarat, India"; // You might want to get this from params if needed
  const phone = "+91 7016474486";
  const email = "support@agriconnect.com";
  const website = "https://agriconnect.com";

  const handleOpenMaps = () => {
    if (params?.location) {
      const locationString: string = String(params.location);
      const locationQuery = encodeURIComponent(locationString);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=$${locationQuery}`; // Corrected template literal
      Linking.openURL(mapsUrl).catch(() => Alert.alert("Error", "Unable to open Maps"));
    } else {
      Alert.alert("Error", "Location data is not available.");
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${phone}`).catch(() => Alert.alert("Error", "Unable to open dialer."));
  };

  const handleSendEmail = () => {
    Linking.openURL(`mailto:${email}`).catch(() => Alert.alert("Error", "Unable to open email app."));
  };

  const handleOpenWebsite = () => {
    Linking.openURL(website).catch(() => Alert.alert("Error", "Unable to open website."));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{companyName}</Text>
      <Text style={styles.specialty}>Contact Information</Text>

      <TouchableOpacity style={styles.linkContainer} onPress={handleCall}>
        <Ionicons name="call-outline" size={20} color="#007BFF" style={styles.icon} />
        <Text style={styles.link}>{phone}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkContainer} onPress={handleOpenMaps}>
        <Ionicons name="location-outline" size={20} color="#007BFF" style={styles.icon} />
        <Text style={styles.link}>{address}</Text> {/* Consider using params.location here if dynamic */}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkContainer} onPress={handleSendEmail}>
        <Ionicons name="mail-outline" size={20} color="#007BFF" style={styles.icon} />
        <Text style={styles.link}>{email}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkContainer} onPress={handleOpenWebsite}>
        <Ionicons name="globe-outline" size={20} color="#007BFF" style={styles.icon} />
        <Text style={styles.link}>{website}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#E8EBE0",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 5,
  },
  specialty: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 15,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    flexShrink: 1,
  },
});

export default ContactUs;