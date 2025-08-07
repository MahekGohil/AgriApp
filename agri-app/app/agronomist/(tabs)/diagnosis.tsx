// // diagnosis.tsx
// import React, { useState } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert, StyleSheet
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { auth, db } from '../../../firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';

// import cattleImage from '../../../assets/images/cattlediagnose.jpg';
// import cropImage from '../../../assets/images/cropdiagnose.jpg';

// const primaryGreen = '#81C784';
// const secondaryYellow = '#FFF59D';
// const primaryBlue = '#64B5F6';
// const white = '#FFFFFF';
// const darkGray = '#333';
// const inputBackgroundColor = '#F5F5F5';
// const inputBorderColor = '#E0E0E0';
// const lightBlueBackground = '#D1E9FF';

// const DiagnosisScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedCattleSymptoms, setSelectedCattleSymptoms] = useState<string[]>([]);
//   const [selectedCropSymptoms, setSelectedCropSymptoms] = useState<string[]>([]);
//   const [otherCattleSymptom, setOtherCattleSymptom] = useState('');
//   const [otherCropSymptom, setOtherCropSymptom] = useState('');
//   const [predictionResult, setPredictionResult] = useState('');
//   const [isDiagnosing, setIsDiagnosing] = useState(false);
//   const { t } = useTranslation();

//   const cattleSymptomsList = ['Loss of appetite', 'Fever', 'Coughing', 'Skin lesions', 'Lameness'];
//   const cropSymptomsList = ['Wilting', 'Yellowing leaves', 'Stunted growth', 'Spots on leaves', 'Root rot'];

//   const toggleSymptom = (symptom: string, isCattle: boolean) => {
//     const list = isCattle ? selectedCattleSymptoms : selectedCropSymptoms;
//     const setter = isCattle ? setSelectedCattleSymptoms : setSelectedCropSymptoms;
//     setter(list.includes(symptom) ? list.filter(s => s !== symptom) : [...list, symptom]);
//   };

//   const handleSubmitSymptoms = async () => {
//     let allSymptoms: string[] = [];
//     let type = '';
//     if (selectedCategory === 'cattle_symptoms') {
//       allSymptoms = [...selectedCattleSymptoms];
//       if (otherCattleSymptom.trim()) allSymptoms.push(otherCattleSymptom.trim());
//       type = 'Cattle';
//     } else {
//       allSymptoms = [...selectedCropSymptoms];
//       if (otherCropSymptom.trim()) allSymptoms.push(otherCropSymptom.trim());
//       type = 'Crop';
//     }

//     try {
//       setIsDiagnosing(true);
//       const response = await axios.post('http://10.205.27.180:5000/predict', {
//         symptoms: allSymptoms.join(', ')
//       });
//       const { disease } = response.data;
//       setPredictionResult(`Predicted Disease: ${disease}`);
//       await saveReportToFirebase(type, disease, 'Symptoms');
//       Alert.alert('Diagnosis Result', `Predicted Disease: ${disease}`);
//     } catch (e) {
//       Alert.alert('Error', 'Diagnosis failed. Please try again.');
//     } finally {
//       setIsDiagnosing(false);
//     }
//   };

//   const navigateToImageDiagnosis = async () => {
//     try {
//       const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (permission.status !== 'granted') {
//         Alert.alert('Permission denied', 'Camera roll permissions are required.');
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!result.canceled && result.assets.length > 0) {
//         const image = result.assets[0];
//         const formData = new FormData();
//         formData.append('image', {
//           uri: image.uri,
//           name: 'diagnosis.jpg',
//           type: 'image/jpeg',
//         } as any);

//         setIsDiagnosing(true);
//         const response = await axios.post('http://10.205.27.180:5001/predict', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         const { disease } = response.data;
//         setPredictionResult(`Predicted Disease: ${disease}`);
//         await saveReportToFirebase(selectedCategory ?? '', disease, 'Image');
//         Alert.alert('Diagnosis Result', `Predicted Disease: ${disease}`);
//       }
//     } catch (e) {
//       Alert.alert('Error', 'Image diagnosis failed. Please try again.');
//     } finally {
//       setIsDiagnosing(false);
//     }
//   };

//   const saveReportToFirebase = async (category: string, disease: string, diagnosisType: string) => {
//     try {
//       await addDoc(collection(db, 'diagnosis_reports'), {
//         category,
//         disease,
//         diagnosisType,
//         timestamp: new Date(),
//       });
//     } catch (e) {
//       console.error('Firebase error:', e);
//     }
//   };

//   const renderCategorySelection = () => (
//     <View style={styles.container}>
//       <Text style={styles.title}>What do you want to diagnose?</Text>
//       <TouchableOpacity style={styles.imageCard} onPress={() => setSelectedCategory('cattle')}>
//         <Image source={cattleImage} style={styles.cardImage} />
//         <View style={[styles.cardButton, { backgroundColor: primaryGreen }]}>
//           <Ionicons name="paw-outline" size={24} color={white} />
//           <Text style={styles.cardButtonText}>Cattle</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.imageCard} onPress={() => setSelectedCategory('crop')}>
//         <Image source={cropImage} style={styles.cardImage} />
//         <View style={[styles.cardButton, { backgroundColor: primaryGreen }]}>
//           <Ionicons name="leaf-outline" size={24} color={white} />
//           <Text style={styles.cardButtonText}>Crop</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderDiagnosisMethodSelection = () => (
//     <View style={styles.container}>
//       <Text style={styles.title}>Diagnose via:</Text>
//       <TouchableOpacity
//         style={styles.methodButton}
//         onPress={() => setSelectedCategory(`${selectedCategory}_symptoms`)}>
//         <Ionicons name="list-outline" size={24} color={primaryBlue} />
//         <Text style={styles.methodButtonText}>Enter Symptoms</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.methodButton} onPress={navigateToImageDiagnosis}>
//         <Ionicons name="camera-outline" size={24} color={primaryBlue} />
//         <Text style={styles.methodButtonText}>Upload/Capture Image</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
//         <Ionicons name="arrow-back-circle-outline" size={24} color={darkGray} />
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderSymptomSelection = () => {
//     const isCattle = selectedCategory === 'cattle_symptoms';
//     const symptomList = isCattle ? cattleSymptomsList : cropSymptomsList;
//     const selectedSymptoms = isCattle ? selectedCattleSymptoms : selectedCropSymptoms;
//     const otherSymptom = isCattle ? otherCattleSymptom : otherCropSymptom;

//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Select Symptoms</Text>
//         <ScrollView style={styles.symptomList}>
//           {symptomList.map((symptom) => (
//             <TouchableOpacity
//               key={symptom}
//               style={[
//                 styles.symptomItem,
//                 selectedSymptoms.includes(symptom) && styles.selectedSymptom,
//               ]}
//               onPress={() => toggleSymptom(symptom, isCattle)}>
//               <Ionicons
//                 name={selectedSymptoms.includes(symptom) ? 'checkbox-sharp' : 'square-outline'}
//                 size={24}
//                 color={primaryBlue}
//                 style={styles.checkbox}
//               />
//               <Text style={styles.symptomText}>{symptom}</Text>
//             </TouchableOpacity>
//           ))}
//           <TextInput
//             style={styles.otherSymptomInput}
//             placeholder="Enter other symptoms"
//             value={otherSymptom}
//             onChangeText={(text) =>
//               isCattle ? setOtherCattleSymptom(text) : setOtherCropSymptom(text)
//             }
//           />
//         </ScrollView>
//         <TouchableOpacity
//           style={[styles.submitButton, isDiagnosing && { backgroundColor: darkGray }]}
//           onPress={handleSubmitSymptoms}
//           disabled={isDiagnosing}>
//           <Text style={styles.submitButtonText}>
//             {isDiagnosing ? 'Diagnosing...' : 'Diagnose'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => setSelectedCategory(isCattle ? 'cattle' : 'crop')}>
//           <Ionicons name="arrow-back-circle-outline" size={24} color={darkGray} />
//           <Text style={styles.backButtonText}>Back</Text>
//         </TouchableOpacity>
//         {predictionResult && <Text style={styles.predictionResultText}>{predictionResult}</Text>}
//       </View>
//     );
//   };

//   if (!selectedCategory) return renderCategorySelection();
//   if (selectedCategory === 'cattle' || selectedCategory === 'crop') return renderDiagnosisMethodSelection();
//   return renderSymptomSelection();
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: lightBlueBackground },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: darkGray, textAlign: 'center' },
//   imageCard: { width: '90%', borderRadius: 15, marginBottom: 15, backgroundColor: white, elevation: 5 },
//   cardImage: { width: '100%', height: 140 },
//   cardButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
//   cardButtonText: { color: white, fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
//   methodButton: {
//     flexDirection: 'row', alignItems: 'center', backgroundColor: secondaryYellow,
//     padding: 15, borderRadius: 10, marginBottom: 15, width: '80%', justifyContent: 'center',
//   },
//   methodButtonText: { fontSize: 18, color: darkGray, marginLeft: 15 },
//   symptomList: { marginBottom: 20, width: '100%' },
//   symptomItem: {
//     flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8,
//     borderWidth: 1, borderColor: '#ccc', marginBottom: 10,
//   },
//   selectedSymptom: { backgroundColor: '#E1F5FE', borderColor: primaryBlue },
//   checkbox: { marginRight: 15 },
//   symptomText: { fontSize: 16, color: darkGray },
//   otherSymptomInput: {
//     height: 40, borderColor: inputBorderColor, borderWidth: 1, borderRadius: 8,
//     backgroundColor: inputBackgroundColor, paddingHorizontal: 10, marginBottom: 15, width: '100%',
//   },
//   submitButton: {
//     backgroundColor: primaryBlue, padding: 15, borderRadius: 10,
//     alignItems: 'center', marginBottom: 10, width: '80%',
//   },
//   submitButtonText: { color: white, fontSize: 18, fontWeight: 'bold' },
//   backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
//   backButtonText: { fontSize: 16, color: darkGray, marginLeft: 8 },
//   predictionResultText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: primaryBlue, textAlign: 'center' },
// });

// export default DiagnosisScreen;

import React, { useState } from 'react';
import {
  View, Text, Image, ActivityIndicator, Alert,
  TouchableOpacity, StyleSheet, ScrollView, TextInput
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';


import cattleImage from '../../../assets/images/cattlediagnose.jpg';
import cropImage from '../../../assets/images/cropdiagnose.jpg';
const primaryGreen = '#A3E29F'; 
const white = '#ffffff';

const cattleSymptoms = ['Loss of appetite', 'Fever', 'Coughing', 'Skin lesions', 'Lameness'];

const Diagnosis = () => {
  const [selectedCategory, setSelectedCategory] = useState<'cattle' | 'crop' | null>(null);
  const [mode, setMode] = useState<'image' | 'symptom' | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ disease: string; confidence?: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptom, setOtherSymptom] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: false,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadAndDiagnoseImage = async () => {
    if (!selectedImage || !selectedCategory) {
      Alert.alert('Please select a category and an image first.');
      return;
    }

    setLoading(true);
    try {
      const fileBase64 = await FileSystem.readAsStringAsync(selectedImage, { encoding: 'base64' });

      let url = '';
      if (selectedCategory === 'cattle') {
        url = 'http://10.205.28.74:5001/predict';
      } else if (selectedCategory === 'crop') {
        url = 'http://10.205.28.74:5002/predict';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: createFormData(selectedImage, fileBase64),
      });

      const data = await response.json();
      if (data.disease) {
        setResult(data);
        await addDoc(collection(db, 'diagnosisResults'), {
          disease: data.disease,
          confidence: data.confidence,
          type: selectedCategory,
          method: 'Image',
          timestamp: new Date(),
        });
      } else {
        Alert.alert('Prediction failed', JSON.stringify(data));
      }
    } catch (error: unknown) {
      const err = error as Error;
      Alert.alert("Upload failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomDiagnosis = async () => {
    let symptoms = [...selectedSymptoms];
    if (otherSymptom.trim()) symptoms.push(otherSymptom.trim());

    if (symptoms.length === 0) {
      Alert.alert('Please select or enter at least one symptom.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.205.28.74:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms.join(', ') }),
      });

      const data = await response.json();
      if (data.disease) {
        setResult({ disease: data.disease });
        await addDoc(collection(db, 'diagnosisResults'), {
          disease: data.disease,
          type: 'cattle',
          method: 'Symptoms',
          timestamp: new Date(),
        });
        Alert.alert('Diagnosis Result', `Predicted Disease: ${data.disease}`);
      } else {
        Alert.alert('Diagnosis failed', 'No disease predicted.');
      }
    } catch (e) {
      Alert.alert('Error', 'Symptom diagnosis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const createFormData = (uri: string, base64: string) => {
    const formData = new FormData();
    const fileName = uri.split('/').pop() ?? 'image.jpg';
    const match = /\.(\w+)$/.exec(fileName);
    const fileType = match ? `image/${match[1]}` : 'image';
    formData.append('image', {
      uri,
      name: fileName,
      type: fileType,
    } as any);
    return formData;
  };

  const resetAll = () => {
    setSelectedCategory(null);
    setMode(null);
    setSelectedImage(null);
    setSelectedSymptoms([]);
    setOtherSymptom('');
    setResult(null);
    setLoading(false);
  };

  if (!selectedCategory) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>What do you want to diagnose?</Text>


      <TouchableOpacity style={styles.imageCard} onPress={() => setSelectedCategory('crop')}>
        <Image source={cropImage} style={styles.cardImage} />
        <View style={[styles.cardButton, { backgroundColor: primaryGreen }]}>
          <Ionicons name="leaf-outline" size={24} color={white} />
          <Text style={styles.cardButtonText}>Crop</Text>
        </View>
      </TouchableOpacity>


        <TouchableOpacity style={styles.imageCard} onPress={() => setSelectedCategory('cattle')}>
          <Image source={cattleImage} style={styles.cardImage} />
          <View style={[styles.cardButton, { backgroundColor: primaryGreen }]}>
            <FontAwesome5 name="paw" size={24} color={white} />
            <Text style={styles.cardButtonText}>Cattle</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (!mode) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subHeading}>Diagnose {selectedCategory} via:</Text>
        <TouchableOpacity onPress={() => setMode('image')} style={[styles.optionButton, { backgroundColor: '#FFF9C4' }]}>
          <Ionicons name="camera-outline" size={22} color="skyblue" />
          <Text style={styles.optionButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {selectedCategory === 'cattle' && (
          <TouchableOpacity onPress={() => setMode('symptom')} style={[styles.optionButton, { backgroundColor: '#FFF9C4' }]}>
            <Ionicons name="list-outline" size={22} color="skyblue" />
            <Text style={styles.optionButtonText}>Enter Symptoms</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetAll} style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (mode === 'image') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instructions}>Upload an image of the {selectedCategory} to detect disease</Text>

        <TouchableOpacity onPress={pickImage} style={styles.optionButton}>
          <FontAwesome5 name="image" size={20} color="white" />
          <Text style={styles.optionButtonText}>Select Image</Text>
        </TouchableOpacity>

        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        <TouchableOpacity onPress={uploadAndDiagnoseImage} style={[styles.optionButton, { backgroundColor: '#388E3C' }]}>
          <FontAwesome5 name="stethoscope" size={20} color="white" />
          <Text style={styles.optionButtonText}>{loading ? 'Diagnosing...' : 'Diagnose'}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" style={{ marginTop: 15 }} />}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Disease: {result.disease}</Text>
            {result.confidence && <Text style={styles.resultText}>Confidence: {result.confidence}%</Text>}
          </View>
        )}

        <Link href="../../viewreport" asChild>
        <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#DC143C' }]}>
            <MaterialIcons name="assignment" size={22} color="white" />
            <Text style={styles.optionButtonText}>View Report</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={resetAll} style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subHeading}>Select Cattle Symptoms</Text>
      {cattleSymptoms.map((symptom) => (
        <TouchableOpacity
          key={symptom}
          onPress={() => toggleSymptom(symptom)}
          style={[
            styles.symptomBox,
            selectedSymptoms.includes(symptom) && { backgroundColor: '#E1F5FE' },
          ]}
        >
          <Ionicons
            name={selectedSymptoms.includes(symptom) ? 'checkbox' : 'square-outline'}
            size={20}
            color="#64B5F6"
            style={{ marginRight: 10 }}
          />
          <Text>{symptom}</Text>
        </TouchableOpacity>
      ))}
      <TextInput
        placeholder="Other symptom"
        value={otherSymptom}
        onChangeText={setOtherSymptom}
        style={styles.textInput}
      />

      <TouchableOpacity onPress={handleSymptomDiagnosis} style={[styles.optionButton, { backgroundColor: '#388E3C' }]}>
        <FontAwesome5 name="stethoscope" size={20} color="white" />
        <Text style={styles.optionButtonText}>{loading ? 'Diagnosing...' : 'Diagnose'}</Text>
      </TouchableOpacity>

      {result && (
        <Text style={{ color: 'green', fontSize: 16, marginTop: 10 }}>
          Predicted Disease: {result.disease}
        </Text>
      )}

      {loading && <ActivityIndicator size="large" style={{ marginTop: 15 }} />}

      <TouchableOpacity onPress={resetAll} style={{ marginTop: 20 }}>
        <Text style={{ color: 'red' }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Diagnosis;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  categoryCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
   imageCard: { width: '90%', borderRadius: 15, marginBottom: 15, backgroundColor: white, elevation: 5 },
   cardImage: { width: '100%', height: 140 },
   cardButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
   cardButtonText: { color: white, fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
   optionButton: {
    flexDirection: 'row',
    backgroundColor: '#64B5F6',
     alignItems: 'center', 
     padding: 15,
     borderRadius: 10, 
     marginBottom: 15, 
     width: '80%', 
     justifyContent: 'center',
  },
  optionButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 15,
    marginTop: 15,
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  symptomBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
});
