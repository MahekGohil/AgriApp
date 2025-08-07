import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";

// Predefined questions and their answers
const predefinedData = {
  Farmer: [
    { 
      question: "What are the best crops for my region?", 
      answer: "The best crops depend on soil type and climate. Wheat, rice, or maize may be suitable."
    },
    { 
      question: "How can I prevent pest infestations?", 
      answer: "Use natural repellents, crop rotation, and integrated pest management strategies."
    },
    { 
      question: "What fertilizers should I use?", 
      answer: "Use nitrogen-rich fertilizers for leafy crops and phosphorus for root development."
    },
  ],
  Agronomist: [
    { 
      question: "What are the latest agricultural trends?", 
      answer: "Precision farming, AI-driven monitoring, and hydroponics are emerging trends."
    },
    { 
      question: "How can I get soil sample data?", 
      answer: "You can send samples to local agricultural labs or use digital soil testers."
    },
    { 
      question: "What are sustainable farming methods?", 
      answer: "Agroforestry, no-till farming, and organic composting help sustainability."
    },
  ],
  Vetenarian: [
    { 
      question: "Where can I find fresh organic produce?", 
      answer: "Local farmer’s markets, organic-certified stores, and online organic retailers."
    },
    { 
      question: "How do I verify farm certifications?", 
      answer: "Check for government-approved labels like USDA Organic or FSSAI certification."
    },
    { 
      question: "What is the best season for buying crops?", 
      answer: "It depends on the crop. For example, mangoes in summer, apples in fall."
    },
  ],
};

// Dummy expert phone number (replace with actual)
const expertPhoneNumber = "7016474486"; // Change this to the expert’s actual contact

const Chatbot: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<{ question: string; answer: string } | null>(null);
  const [showConnectOption, setShowConnectOption] = useState(false);
  const router = useRouter();

  // Function to initiate a call
  const connectToExpert = () => {
    Linking.openURL(`tel:${expertPhoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with AgriBot 🤖</Text>

      {/* Role Selection */}
      {!selectedRole ? (
        <View>
          <Text style={styles.subtitle}>Select Your Role:</Text>
          {Object.keys(predefinedData).map((role) => (
            <TouchableOpacity key={role} style={styles.roleButton} onPress={() => setSelectedRole(role)}>
              <Text style={styles.roleText}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : !selectedQuestion ? (
        // Show predefined questions
        <View>
          <Text style={styles.subtitle}>Predefined Questions for {selectedRole}:</Text>
                    <FlatList
            data={predefinedData[selectedRole as keyof typeof predefinedData]}
            keyExtractor={(item) => item.question}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.questionButton} 
                onPress={() => { setSelectedQuestion(item); setShowConnectOption(false); }}
              >
                <Text style={styles.questionText}>{item.question}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedRole(null)}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Show Answer and "Connect to Expert" Option
        <View>
          <Text style={styles.subtitle}>You asked:</Text>
          <Text style={styles.selectedQuestion}>{selectedQuestion.question}</Text>
          <Text style={styles.chatbotResponse}>🤖 AgriBot: {selectedQuestion.answer}</Text>

          {!showConnectOption ? (
            <TouchableOpacity style={styles.askExpertButton} onPress={() => setShowConnectOption(true)}>
              <Text style={styles.askExpertText}>Would you like to connect with an expert?</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.callButton} onPress={connectToExpert}>
              <Text style={styles.callText}>📞 Connect to Expert</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedQuestion(null)}>
            <Text style={styles.backText}>Back to Questions</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Exit Chat */}
      <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
        <Text style={styles.exitText}>Exit Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  roleButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, marginBottom: 10 },
  roleText: { color: "white", fontSize: 16, fontWeight: "bold" },
  questionButton: { backgroundColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 10 },
  questionText: { fontSize: 16 },
  selectedQuestion: { fontSize: 18, fontWeight: "bold", color: "#333", marginVertical: 10 },
  chatbotResponse: { fontSize: 16, color: "#555", fontStyle: "italic", marginBottom: 20 },
  askExpertButton: { backgroundColor: "#007BFF", padding: 12, borderRadius: 8, marginBottom: 10 },
  askExpertText: { color: "white", fontSize: 16, fontWeight: "bold" },
  callButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, marginBottom: 10 },
  callText: { color: "white", fontSize: 16, fontWeight: "bold" },
  backButton: { backgroundColor: "#FFA500", padding: 10, borderRadius: 8, marginTop: 10 },
  backText: { color: "white", fontSize: 16, fontWeight: "bold" },
  exitButton: { marginTop: 20, backgroundColor: "red", padding: 10, borderRadius: 8 },
  exitText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
