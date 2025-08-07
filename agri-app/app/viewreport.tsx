import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Dictionary of all disease treatments (crop + cattle)
const diseaseTreatments: Record<string, string> = {
  // Crop diseases
  "Pepper_bell__Bacterial_spot": "Use copper-based fungicides and avoid overhead watering.",
  "Pepper_bell__healthy": "No treatment needed. Plant is healthy.",
  "Potato__Early_blight": "Apply fungicides containing chlorothalonil or mancozeb.",
  "Potato__Late_blight": "Use fungicides like metalaxyl and remove infected plants.",
  "Potato__healthy": "No treatment needed. Plant is healthy.",
  "Tomato_Bacterial_spot": "Use copper sprays and remove infected leaves.",
  "Tomato_Early_blight": "Use fungicides and rotate crops yearly.",
  "Tomato_Late_blight": "Apply systemic fungicides and destroy infected plants.",
  "Tomato_Leaf_Mold": "Ensure good air circulation and use fungicides.",
  "Tomato_Septoria_leaf_spot": "Remove lower leaves and apply fungicides.",
  "Tomato_Spider_mites_Two_spotted_spider_mite": "Use miticides or neem oil.",
  "Tomato_Target_Spot": "Apply chlorothalonil-based fungicides.",
  "Tomato_Tomato_YellowLeaf_Curl_Virus": "Control whiteflies and remove infected plants.",
  "Tomato_Tomato_mosaic_virus": "Destroy infected plants and disinfect tools.",
  "Tomato_healthy": "No treatment needed. Plant is healthy.",

  // Cattle diseases (examples; full list can be extended)
  "Anthrax disease": "Use deep burial or burning of infected carcasses. Improve pasture drainage.",
  "Black leg disease": "Feed neem and tulsi. Apply warm compresses to swollen areas.",
  "Foot and mouth disease": "Use turmeric paste with neem oil. Provide soft feed.",
  "Healthy": "No Action Needed.",
  "Johnes disease": "Add probiotics. Feed high-fiber diets.",
  "Lumpy skin disease": "Apply neem paste. Use turmeric and honey for immunity.",
  "Mastitis": "Massage udder with warm coconut oil. Apply turmeric and mustard oil paste.",
  "Rinderpest disease": "Provide electrolytes and tulsi water.",
  "Swollen joints": "Apply turmeric and castor oil paste. Use warm neem baths.",
  "Acidosis": "Feed more fiber (grass/hay). Avoid sudden diet change.",
  "Acetonaemia (Ketosis)": "Provide glucose and energy-rich feed.",
  "Actinobacillosis (Wooden Tongue)": "Use penicillin. Offer soft feed.",
  "Bloat": "Use simethicone or mineral oil to relieve pressure.",
  "Botulism": "Give antitoxins. Ensure proper vaccination.",
  "Bovine Respiratory Disease": "Use prescribed antibiotics.",
  "Bovine Viral Diarrhoea Virus": "Vaccinate. Isolate infected cattle.",
  "Bovine Johne’s Disease": "Cull infected animals. Improve biosecurity.",
  "Enterotoxaemia": "Vaccinate and feed balanced diet.",
  "Cobalt Deficiency": "Give cobalt supplements.",
  "Coccidiosis": "Administer anticoccidial medications.",
  "Copper Deficiency": "Add copper supplements.",
  "Diarrhoea (Neonatal)": "Give electrolytes. Ensure nutrition.",
  "Diarrhoea (Older Calves)": "Use antibiotics. Keep clean surface.",
  "Eye Cancer": "Consult vet for treatment/surgery.",
  "Foot Abscess": "Clean and disinfect. Use antibiotics.",
  "Grass Tetany": "Supplement magnesium. Feed good forage.",
  "Hardware Disease": "Use stomach magnets.",
  "Heat Stress": "Provide shade and cool water.",
  "Hypocalcaemia": "Give calcium via IV.",
  "Lead Poisoning": "Use chelation therapy under vet care.",
  "Leptospirosis": "Vaccinate and maintain hygiene.",
  "Lice": "Use insecticides or pour-ons.",
  "Malignant Catarrhal Fever": "Supportive fluids. Isolate infected.",
  "Nitrate Poisoning": "Use methylene blue. Avoid nitrate-rich plants.",
  "Papillomatosis": "Remove warts surgically if needed.",
  "Phalaris Toxicity": "Remove from pasture. Give supportive care.",
  "Photosensitisation": "Provide shade and apply sunscreen.",
  "Pink Eye": "Treat with antibiotics. Keep environment clean.",
};

const ViewReport = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, 'diagnosisResults'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const date = new Date(item.timestamp.seconds * 1000);
    const formattedDate = date.toLocaleString();
    const treatment = diseaseTreatments[item.disease] || "Treatment not available.";

    return (
      <Animated.View
        entering={FadeInDown.duration(500).springify()}
        style={styles.card}
      >
        <Text style={styles.diseaseTitle}>Disease: {item.disease}</Text>
        <Text style={styles.text}>Confidence: {item.confidence}%</Text>
        <Text style={styles.date}>{formattedDate}</Text>

        <Text style={styles.treatmentHeading}>Treatment:</Text>
        <Text style={styles.treatmentText}>{treatment}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Diagnosis Reports</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : reports.length === 0 ? (
        <Text style={styles.emptyText}>No diagnosis reports found.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ViewReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F3F4F6',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  diseaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  date: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 12,
  },
  treatmentHeading: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  treatmentText: {
    color: '#4B5563',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 30,
  },
});
