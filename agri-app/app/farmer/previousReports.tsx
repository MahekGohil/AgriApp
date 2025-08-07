import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const previousReports = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Redirect to ViewReport
    navigation.replace('viewreport');
  }, [navigation]);

  return null; // No UI needed since it's just a redirect
};

export default previousReports;
