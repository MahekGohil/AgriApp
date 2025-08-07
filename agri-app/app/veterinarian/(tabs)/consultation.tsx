import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function Consultation() {
  const router = useRouter();

  const consultants = [
    { 
      id: "1", 
      name: "Dr. Prabhat Dave", 
      specialty: "Plant Diseases", 
      phone: "9876543210",
      experience: "10 years",
      qualification: "Ph.D. in Plant Pathology",
      location: "Delhi, India",
      image: require("@/assets/images/doctor3.jpg")
    },
    { 
      id: "2", 
      name: "Dr. Shakshi Joshi", 
      specialty: "Animal Diseases", 
      phone: "9876543211",
      experience: "8 years",
      qualification: "M.V.Sc. in Veterinary Medicine",
      location: "Mumbai, India",
      image: require("@/assets/images/doctor1.jpg")
    },
    { 
      id: "3", 
      name: "Dr. Neha Jain", 
      specialty: "Plant Diseases", 
      phone: "9876543212",
      experience: "7 years",
      qualification: "M.Sc. in Botany",
      location: "Bangalore, India",
      image: require("@/assets/images/doctor2.jpg")
    },
    { 
      id: "4", 
      name: "Dr. Aditi Roy", 
      specialty: "Animal Diseases", 
      phone: "9876543211",
      experience: "18 years",
      qualification: "M.V.Sc. in Veterinary Medicine",
      location: "Ooty, India",
      image: require("@/assets/images/doctor8.jpg")
    },
    { 
      id: "5", 
      name: "Dr. Harsh Thakkar", 
      specialty: "Plant Diseases", 
      phone: "9876543210",
      experience: "4 years",
      qualification: "M.V.Sc. in Veterinary Medicine",
      location: "Madras, India",
      image: require("@/assets/images/doctor4.jpg")
    },
    { 
      id: "6", 
      name: "Dr. Shaurya Yadav", 
      specialty: "Plant Diseases", 
      phone: "98796643211",
      experience: "5 years",
      qualification: "M.Sc. in Veterinary Medicine",
      location: "Coimbtore, India",
      image: require("@/assets/images/doctor6.jpg")
    },
    { 
      id: "7", 
      name: "Dr. Vansh Gupta", 
      specialty: "Animal Diseases", 
      phone: "9876543101",
      experience: "12 years",
      qualification: "M.V.Sc. in Veterinary Medicine",
      location: "Pune, India",
      image: require("@/assets/images/doctor7.jpg")
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consult an Expert</Text>
      <FlatList
        data={consultants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "../../doctorDetails",  // Ensure the correct route
                params: { ...item }, // Pass entire object directly
              })
            }
          >
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E8EBE0" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#1f2937" },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  info: { alignItems: "center" },
  name: { fontSize: 18, fontWeight: "bold", color: "#6DD5FA" },
  specialty: { fontSize: 16, color: "#000000", marginTop: 5 },
});