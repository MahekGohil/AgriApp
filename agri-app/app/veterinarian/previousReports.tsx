import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Report {
  id: string;
  date: string;
  category: 'cattle' | 'crop';
  disease: string;
  symptoms: string[];
  treatment: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    date: '2025-04-15',
    category: 'cattle',
    disease: 'Foot Rot',
    symptoms: ['Lameness', 'Swelling', 'Foul odor'],
    treatment:
      'Clean the foot thoroughly. Apply topical antibiotics. In severe cases, administer systemic antibiotics as prescribed by a veterinarian.',
  },
  {
    id: '2',
    date: '2025-04-16',
    category: 'crop',
    disease: 'Powdery Mildew',
    symptoms: ['White powdery spots on leaves', 'Distorted leaf growth'],
    treatment:
      'Remove affected plant parts. Ensure good air circulation. Apply fungicides like neem oil or sulfur-based products early in the infection.',
  },
];

const PreviousReportScreen = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      setTimeout(() => {
        setReports(mockReports);
        setLoading(false);
      }, 1000);
    };
    fetchReports();
  }, []);

  const renderReport = ({ item }: { item: Report }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons
          name={item.category === 'cattle' ? 'paw' : 'leaf'}
          size={22}
          color={item.category === 'cattle' ? '#00796B' : '#388E3C'}
        />
        <Text style={styles.cardCategory}>{item.category.toUpperCase()}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      <Text style={styles.cardTitle}>🦠 {item.disease}</Text>

      <Text style={styles.cardLabel}>📝 Symptoms:</Text>
      <Text style={styles.cardText}>{item.symptoms.join(', ')}</Text>

      <Text style={styles.cardLabel}>💊 Treatment:</Text>
      <Text style={styles.cardText}>{item.treatment}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#64B5F6" />
        <Text style={{ marginTop: 10 }}>Loading previous reports...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌾 Previous Diagnoses</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderReport}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default PreviousReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0277BD', // Sky blue
    marginBottom: 20,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#F5FFF8', // Very light greenish tint
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FFEB3B', // Yellow accent
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardCategory: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
    color: '#4CAF50', // Green for categories
  },
  cardDate: {
    marginLeft: 'auto',
    fontSize: 13,
    color: '#757575',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
    color: '#D32F2F', // Red for disease
  },
  cardLabel: {
    fontWeight: '600',
    marginTop: 8,
    color: '#0288D1',
  },
  cardText: {
    color: '#424242',
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
