import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Ionicons } from '@expo/vector-icons'; // Make sure this is imported if you use it

const { width } = Dimensions.get('window');

interface TutorialStep {
  title: string;
  description: string;
  // image: any; // Commented out image property
}

const cattleTutorialSteps: TutorialStep[] = [
  {
    title: 'Cattle - Choose Diagnosis Method',
    description: 'On the Cattle Diagnosis screen, you will see two options: "Diagnose via Symptoms" and "Diagnose via Image". Tap the method you prefer.',
    // image: null, // Commented out image
  },
  {
    title: 'Cattle - Diagnose via Symptoms',
    description: 'If you choose "Symptoms", select the symptoms your cattle is exhibiting from the provided list. You can select multiple symptoms.',
    // image: null, // Commented out image
  },
  {
    title: 'Cattle - Diagnose via Image',
    description: 'If you choose "Image", you will be prompted to either take a photo or upload an existing image of the affected area of your cattle.',
    // image: null, // Commented out image
  },
  {
    title: 'Cattle - Review Diagnosis & Report',
    description: 'Once you have provided the symptoms or image, the AI will analyze the information and provide a potential diagnosis. You will then have the option to generate a report.',
    // image: null, // Commented out image
  },
];

const cropTutorialSteps: TutorialStep[] = [
  {
    title: 'Crop - Choose Diagnosis Method',
    description: 'On the Crop Diagnosis screen, you will see two options: "Diagnose via Symptoms" and "Diagnose via Image". Tap the method you prefer.',
    // image: null, // Commented out image
  },
  {
    title: 'Crop - Diagnose via Symptoms',
    description: 'If you choose "Symptoms", select the symptoms your crop is exhibiting from the provided list. You can select multiple symptoms.',
    // image: null, // Commented out image
  },
  {
    title: 'Crop - Diagnose via Image',
    description: 'If you choose "Image", you will be prompted to either take a photo or upload an existing image of the affected area of your crop.',
    // image: null, // Commented out image
  },
  {
    title: 'Crop - Review Diagnosis & Report',
    description: 'Once you have provided the symptoms or image, the AI will analyze the information and provide a potential diagnosis. You will then have the option to generate a report.',
    // image: null, // Commented out image
  },
];

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState<'cattle' | 'crop' | null>(null);
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [tutorialFinished, setTutorialFinished] = useState(false);

  const handleCategorySelect = (category: 'cattle' | 'crop') => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset page when a new category is selected
    setTutorialFinished(false); // Reset finished state
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const goToPreviousPage = () => {
    pagerRef.current?.setPage(currentPage - 1);
  };

  const goToNextPage = () => {
    pagerRef.current?.setPage(currentPage + 1);
  };

  useEffect(() => {
    const currentSteps = selectedCategory === 'cattle' ? cattleTutorialSteps : cropTutorialSteps;
    if (selectedCategory !== null && currentPage === currentSteps.length - 1) {
      setTutorialFinished(true);
    } else {
      setTutorialFinished(false);
    }
  }, [currentPage, selectedCategory]);

  const resetTutorial = () => {
    setSelectedCategory(null);
    setCurrentPage(0);
    setTutorialFinished(false);
  };

  if (selectedCategory === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tutorials</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelect('cattle')}>
          <Text style={styles.buttonText}>Cattle Diagnosis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelect('crop')}>
          <Text style={styles.buttonText}>Crop Diagnosis</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentSteps = selectedCategory === 'cattle' ? cattleTutorialSteps : cropTutorialSteps;
  const categoryTitle = selectedCategory === 'cattle' ? 'Cattle Diagnosis Tutorial' : 'Crop Diagnosis Tutorial';

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.header}>{categoryTitle}</Text>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
        ref={pagerRef}
        scrollEnabled={!tutorialFinished} // Disable swipe when finished
      >
        {currentSteps.map((step, index) => (
          <View key={index} style={styles.page}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <ScrollView>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </ScrollView>
          </View>
        ))}
      </PagerView>

      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPage === 0 || tutorialFinished}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          {currentSteps.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={tutorialFinished ? resetTutorial : goToNextPage}
          disabled={currentPage === currentSteps.length - 1 && !tutorialFinished}
          style={[styles.navButton, tutorialFinished && styles.finishButton]}
        >
          <Text style={styles.navButtonText}>{tutorialFinished ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


  const primaryGreen = '#4CAF50';
  const secondaryBlue = '#2196F3';
  const white = '#FFFFFF';
  const lightYellow = '#FFF9C4';
  const darkGreen = '#388E3C';
  const lightGray = '#f4f4f4';
  const darkGray = '#333';
  const mediumGray = '#555';
  const dotInactive = '#ccc';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: white,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: darkGreen,
    },
    button: {
      backgroundColor: primaryGreen,
      paddingVertical: 18,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginBottom: 25,
      elevation: 3, // Add shadow
    },
    buttonText: {
      color: white,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sliderContainer: {
      flex: 1,
      backgroundColor: lightGray,
      paddingVertical: 30,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: darkGreen,
    },
    pagerView: {
      flex: 1,
    },
    page: {
      width,
      padding: 30,
      alignItems: 'center',
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: primaryGreen,
      textAlign: 'center',
    },
    stepDescription: {
      fontSize: 18,
      lineHeight: 28,
      color: mediumGray,
      textAlign: 'center',
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingTop: 30,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: secondaryBlue,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 2, // Add shadow
    },
    navButtonText: {
      color: white,
      fontWeight: 'bold',
      fontSize: 14,
      marginLeft: 8,
      marginRight: 8,
    },
    dotsContainer: {
      flexDirection: 'row',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: dotInactive,
      marginHorizontal: 6,
    },
    activeDot: {
      backgroundColor: primaryGreen,
    },
    finishButton: {
      backgroundColor: darkGreen,
    },
  
});

export default Tutorials;

/* import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Ionicons } from '@expo/vector-icons'; // Make sure this is imported if you use it

const { width } = Dimensions.get('window');

// Import your images (replace with your actual image paths)
import cattleTakePhoto from '../../assets/cattle_take_photo.png';
import cattleSymptoms from '../../assets/cattle_symptoms.png';
import cattleDiagnosis from '../../assets/cattle_diagnosis.png';
import cattleReport from '../../assets/cattle_report.png';

import cropTakePhoto from '../../assets/crop_take_photo.png';
import cropSymptoms from '../../assets/crop_symptoms.png';
import cropDiagnosis from '../../assets/crop_diagnosis.png';
import cropReport from '../../assets/crop_report.png';

interface TutorialStep {
  title: string;
  description: string;
  image: any; // Use 'any' or a more specific type if you know the image source type
}

const cattleTutorialSteps: TutorialStep[] = [
  {
    title: 'Cattle - Choose Diagnosis Method',
    description: 'On the Cattle Diagnosis screen, you will see two options: "Diagnose via Symptoms" and "Diagnose via Image". Tap the method you prefer.',
    image: cattleTakePhoto,
  },
  {
    title: 'Cattle - Diagnose via Symptoms',
    description: 'If you choose "Symptoms", select the symptoms your cattle is exhibiting from the provided list. You can select multiple symptoms.',
    image: cattleSymptoms,
  },
  {
    title: 'Cattle - Diagnose via Image',
    description: 'If you choose "Image", you will be prompted to either take a photo or upload an existing image of the affected area of your cattle.',
    image: cattleDiagnosis,
  },
  {
    title: 'Cattle - Review Diagnosis & Report',
    description: 'Once you have provided the symptoms or image, the AI will analyze the information and provide a potential diagnosis. You will then have the option to generate a report.',
    image: cattleReport,
  },
];

const cropTutorialSteps: TutorialStep[] = [
  {
    title: 'Crop - Choose Diagnosis Method',
    description: 'On the Crop Diagnosis screen, you will see two options: "Diagnose via Symptoms" and "Diagnose via Image". Tap the method you prefer.',
    image: cropTakePhoto,
  },
  {
    title: 'Crop - Diagnose via Symptoms',
    description: 'If you choose "Symptoms", select the symptoms your crop is exhibiting from the provided list. You can select multiple symptoms.',
    image: cropSymptoms,
  },
  {
    title: 'Crop - Diagnose via Image',
    description: 'If you choose "Image", you will be prompted to either take a photo or upload an existing image of the affected area of your crop.',
    image: cropDiagnosis,
  },
  {
    title: 'Crop - Review Diagnosis & Report',
    description: 'Once you have provided the symptoms or image, the AI will analyze the information and provide a potential diagnosis. You will then have the option to generate a report.',
    image: cropReport,
  },
];

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState<'cattle' | 'crop' | null>(null);
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [tutorialFinished, setTutorialFinished] = useState(false);

  const handleCategorySelect = (category: 'cattle' | 'crop') => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset page when a new category is selected
    setTutorialFinished(false); // Reset finished state
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const goToPreviousPage = () => {
    pagerRef.current?.setPage(currentPage - 1);
  };

  const goToNextPage = () => {
    pagerRef.current?.setPage(currentPage + 1);
  };

  useEffect(() => {
    const currentSteps = selectedCategory === 'cattle' ? cattleTutorialSteps : cropTutorialSteps;
    if (selectedCategory !== null && currentPage === currentSteps.length - 1) {
      setTutorialFinished(true);
    } else {
      setTutorialFinished(false);
    }
  }, [currentPage, selectedCategory]);

  const resetTutorial = () => {
    setSelectedCategory(null);
    setCurrentPage(0);
    setTutorialFinished(false);
  };

  if (selectedCategory === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tutorials</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelect('cattle')}>
          <Text style={styles.buttonText}>Cattle Diagnosis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelect('crop')}>
          <Text style={styles.buttonText}>Crop Diagnosis</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentSteps = selectedCategory === 'cattle' ? cattleTutorialSteps : cropTutorialSteps;
  const categoryTitle = selectedCategory === 'cattle' ? 'Cattle Diagnosis Tutorial' : 'Crop Diagnosis Tutorial';

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.header}>{categoryTitle}</Text>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}
        ref={pagerRef}
        scrollEnabled={!tutorialFinished} // Disable swipe when finished
      >
        {currentSteps.map((step, index) => (
          <View key={index} style={styles.page}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Image source={step.image} style={styles.stepImage} resizeMode="contain" />
            <ScrollView>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </ScrollView>
          </View>
        ))}
      </PagerView>

      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPage === 0 || tutorialFinished}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          {currentSteps.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={tutorialFinished ? resetTutorial : goToNextPage}
          disabled={currentPage === currentSteps.length - 1 && !tutorialFinished}
          style={[styles.navButton, tutorialFinished && styles.finishButton]}
        >
          <Text style={styles.navButtonText}>{tutorialFinished ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  button: { backgroundColor: '#4CAF50', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  sliderContainer: { flex: 1, backgroundColor: '#f9f9f9', paddingVertical: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#388E3C' },
  pagerView: { flex: 1 },
  page: { width, padding: 20, alignItems: 'center' },
  stepTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2E7D32', textAlign: 'center' },
  stepImage: { width: 200, height: 200, marginBottom: 15 },
  stepDescription: { fontSize: 16, lineHeight: 24, color: '#555', textAlign: 'center' },
  navigation: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  navButton: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4CAF50', borderRadius: 5 },
  navButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  dotsContainer: { flexDirection: 'row' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ccc', marginHorizontal: 5 },
  activeDot: { backgroundColor: '#388E3C' },
  finishButton: { backgroundColor: '#2196F3' }, // Style for the finish button
});

export default Tutorials;*/