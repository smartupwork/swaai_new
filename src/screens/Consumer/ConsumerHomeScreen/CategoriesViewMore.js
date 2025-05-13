import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import HeaderComp from '../../../components/HeaderComp';
import {images} from '../../../assets/images';
import COLORS from '../../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {getRecommendedBusinesses, saveAnalytics} from '../../../redux/slices/apiSlice';
import {useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

const CategoriesViewMore = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const getName = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log('name', parsedUser);
        setName(parsedUser.first_name + ' ' + parsedUser.last_name);
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getName();
      getCurrentLocation();
      getRecmmendedBusnessFun();
    }, []),
  );
  const getRecmmendedBusnessFun = async () => {
    setLoading(true);
    const data = {
      latitude: location?.latitude,
      longitude: location?.longitude,
      // latitude: '33.64285890',
      // longitude: '73.06924390',
    };
    console.log(' getRecmmendedBusnessFun daaaaa', data);

    try {
      const response = await dispatch(getRecommendedBusinesses(data)).unwrap();
      setBusinesses(response);
      //  setModalVisible(false);
      //  setSelectedFilters({});
      setLoading(false);
      Alert.alert('Success', response?.message);
    } catch (err) {
      setLoading(false);
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
      //setModalVisible(false);
      // setSelectedFilters({});
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Location access is required to use this feature.',
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
      },
      error => {
        console.log(error);
        Alert.alert('Error', 'Failed to get location: ' + error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openWebsite = async url => {
    console.log('url', url);

    // Ensure the URL has a protocol (http:// or https://)
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(formattedUrl);
    if (supported) {
      await Linking.openURL(formattedUrl); // Open the URL
    } else {
      console.log("Can't open the URL:", formattedUrl);
      Alert.alert('Error', `Can't open the URL: ${formattedUrl}`);
    }
  };
  const handlesaveAnalytics = async (bid) => {
    console.log("handlesaveAnalytics");
  
    
    const data = {
      business_id: bid,
      event_type: 'click',
    };
    console.log('data', data);
  
    console.log('data', data);

    try {
      const response = await dispatch(saveAnalytics(data)).unwrap();
      //setDoneModalVisible(true);
      Alert.alert('Success', response?.message);
    } catch (err) {
      //   setIsLoading(false);
      console.log('error', err);

      if (typeof err === 'string') {
        // Handle string error
        console.error('Error:', err);
        alert(err);
      } else if (err && err.message) {
        // Handle object error with message property
        console.error('Error message:', err.message);
        alert(err.message);
      } else {
        console.error('Unhandled error:', err);
        alert('An unknown error occurred.');
      }
    }
  };
  if (loading) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.green} />
    </View>;
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}

      <HeaderComp
        leftClick={() => alert('heelo')}
        //rightClick={() => alert('heelo')}
        rightClick={() => alert('heelo')}
      />
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* <Text style={styles.cardText}>search</Text> */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search anything..."
        />
      </View>

      {/* Recommended Section */}
      <Text style={styles.sectionTitle}>
        Recommended for <Text style={styles.highlight}>{name}</Text>:
      </Text>
      {businesses?.recommended_businesses?.length == 0 ? (
        <View style={styles.cardContainer}>
          <View style={{padding: 15}}>
            <Text style={{color: COLORS.red, fontSize: 18}}>
              No Record Found
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row', // Ensures items are in a row
            alignItems: 'center', // Aligns items properly
            paddingHorizontal: 16,
          }}>
          {businesses?.recommended_businesses?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handlesaveAnalytics(item.id);
                openWebsite(item.website_url);
              }}
              style={styles.card}>
              <Image source={images.ImageReplace} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* Featured Section */}
      <Text style={styles.sectionTitle}>Featured near you:</Text>
      {businesses?.nearby_businesses?.length == 0 ? (
        <View style={styles.cardContainer}>
          <View style={{padding: 15}}>
            <Text style={{color: COLORS.red, fontSize: 18}}>
              No Record Found
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row', // Ensures items are in a row
            alignItems: 'center', // Aligns items properly
            paddingHorizontal: 16,
          }}>
          {businesses?.nearby_businesses?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handlesaveAnalytics(item.id);
                openWebsite(item.website_url);
              }}
              style={styles.card}>
              <Image source={images.ImageReplace} style={styles.cardImage} />
              <Text style={styles.cardText}>
                {item.name}
               
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Footer Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewAllBusinesses')}
        style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Businesses near you</Text>
        <Text style={styles.viewAll}>View all →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '10@s',
    backgroundColor: '#FFFFFF',
  },

  searchContainer: {
    marginBottom: '20@s',
    paddingHorizontal: scale(4),
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: '10@s',
    borderRadius: '10@s',
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: '16@s',
    fontWeight: '600',
    marginVertical: '10@s',
    fontFamily: 'Poppins-SemiBold',
  },
  highlight: {
    color: '#4CAF50',
  },
  cardContainer: {
    width: '320@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@s',
  },
  card: {
    width: 150, // Set a specific width for the cards
    backgroundColor: '#F8F9FE',
    borderRadius: '10@s',
    marginRight: 10, // Add some margin between cards
  },
  cardImage: {
    width: '100%',
    height: moderateScale(98),
    resizeMode: 'cover',
    borderTopLeftRadius: '10@s',
    borderTopRightRadius: '10@s',
    marginBottom: '10@s',
  },
  cardText: {
    fontSize: '12@s',
    fontFamily: 'Poppins-Regular',
    marginBottom: '10@s',
    paddingLeft: '8@s',
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    padding: '8@s',
    paddingHorizontal: '12@s',
    borderRadius: '10@s',
    marginTop: '25@s',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
  },
  viewAll: {
    color: '#FFFFFF',
    fontSize: '13@s',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(1),
    borderRadius: 5,
  },
});

export default CategoriesViewMore;
