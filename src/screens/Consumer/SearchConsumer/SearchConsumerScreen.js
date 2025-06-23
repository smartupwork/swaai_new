

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  Platform,
  PermissionsAndroid,
  TextInput
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import HeaderComp from '../../../components/HeaderComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../constants/color';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {
  categories,
  getBusiness,
  saveAnalytics,
  savedBusinesses,
  searchBusiness,
} from '../../../redux/slices/apiSlice';
import Geolocation from '@react-native-community/geolocation';

const SearchConsumerScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [categoriesItem, setCategoriesItem] = useState([{label: 'Food & Beverage', value: 'food-beverage'},
  {label: 'Clothing & Accessories', value: 'clothing-accessories'},
  {label: 'Health, Wellness & Beauty', value: 'health-wellness-beauty'},
  {label: 'Service-Based', value: 'service-based'},
  {label: 'Arts, Media & Entertainment', value: 'arts-media-entertainment'},]);
  const [location, setLocation] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
const [searchTxt,setSearchTxt]=useState('')
const [isSortedAsc, setIsSortedAsc] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(categories()).unwrap();
        console.log("rep",response);
        
        // setCategoriesItem(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', error.message || 'An unknown error occurred.');
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Fetch businesses and location
  useEffect(() => {
    fetchPosts();
    getCurrentLocation();
  }, [dispatch]);

  const fetchPosts = async () => {
    try {
      const response = await dispatch(getBusiness()).unwrap();
      setBusinesses(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Save business
  const handleSaveBusiness = async id => {
    try {
      const data = {business_id: id};
      const response = await dispatch(savedBusinesses(data)).unwrap();
      Alert.alert('Success', response?.message);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
    }
  };
const handleSort = () => {
  const sorted = [...businesses].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
    return 0;
  });

  setBusinesses(sorted);
  setIsSortedAsc(prev => !prev); // toggle sorting direction
};

  // Filter data
  const filterData = [
    {
      label: 'Category',
      options: categoriesItem?.map(item => `${item.label}_${item.value}`) || [],
    },
    {
      label: 'Distance',
      options: ['5 Miles', '10 Miles', '20 Miles', '50 Miles'],
    },
    {
      label: 'Review',
      options: ['3 Stars & Above', '4 Stars & Above', '5 Stars Only'],
    },
  ];

  // Handle search business
  const handleSearchBusiness = async () => {
    console.log("selected Filters",selectedFilters);
    
    const data = {
      latitude: location?.latitude,
      longitude: location?.longitude,
      category: selectedFilters?.Category
        ? selectedFilters?.Category.split('_')[1]
        : '',
      min_reviews: selectedFilters?.Review
        ? selectedFilters?.Review.split(' ')[0]
        : '',
      max_distance: selectedFilters?.Distance
        ? selectedFilters?.Distance.split(' ')[0]
        : '',
    };
console.log("daaaaa",data);

    try {
      const response = await dispatch(searchBusiness(data)).unwrap();
      setBusinesses(response?.data);
      setModalVisible(false);
     //  setSelectedFilters({});
      Alert.alert('Success', response?.message);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
      setModalVisible(false);
      // setSelectedFilters({});
    }
  };

  // Toggle filter section
  const toggleFilter = useCallback(label => {
    setActiveFilter(prev => (prev === label ? null : label));
  }, []);

  // Handle option selection
  const handleOptionSelect = useCallback((filterLabel, optionValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterLabel]: optionValue,
    }));
  }, []);

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
 const handlesaveAnalytics = async (bid) => {
    console.log("handlesaveAnalytics");
  
    
    const data = {
      business_id: bid,
      event_type: 'visit',
    };


    try {
      const response = await dispatch(saveAnalytics(data)).unwrap();
      //setDoneModalVisible(true);
      console.log('response saveAnalytics', response);
      
      // Alert.alert('Success', response?.message);
    } catch (err) {
      //   setIsLoading(false);
      console.log('error saveAnalytics', err);

      if (typeof err === 'string') {
        // Handle string error
        console.error('Error:', err);
        // alert(err);
      } else if (err && err.message) {
        // Handle object error with message property
        console.error('Error message:', err.message);
        // alert(err.message);
      } else {
        console.error('Unhandled error:', err);
        // alert('An unknown error occurred.');
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComp
        // leftClick={() => alert('heelo')}
        rightClick={() => navigation.navigate('ProfileConsumerScreen')}
      />

      <View style={styles.filterRow}>
        <Text></Text>
        {/* <TouchableOpacity style={styles.filterButton} onPress={handleSort}>
          <Text style={styles.filterText}>↑↓ Sort</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {setModalVisible(true);setSelectedFilters({});setActiveFilter(null)}}
          style={[
            styles.filterButton,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Ionicons name="filter-outline" size={15} color="gray" />
          <Text style={styles.filterText}>Filter </Text>
          <Text
            style={[
              styles.filterText,
              {
                backgroundColor: COLORS.cyan,
                borderRadius: 8,
                width: scale(15),
                height: scale(15),
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
              },
            ]}>
            1
          </Text>
        </TouchableOpacity>
      </View>
<TextInput 
placeholder='Search anything'
placeholderTextColor="gray"
value={searchTxt}
onChangeText={(txt)=>setSearchTxt(txt)}
style={{borderWidth:1,borderRadius:5,paddingVertical:8,borderColor:'gray',paddingHorizontal:6}}
/>
      {businesses
        .filter(item => item.name.toLowerCase().includes(searchTxt.toLowerCase()))

      .map(item => (
        <View key={item.id} style={styles.card}>
          <Image
            style={{
              width: 80,
              height: 70,
              marginRight: 15,
              borderRadius: 20,
              backgroundColor: 'red',
            }}
            source={{uri: item.image}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 15,
            }}>
            <TouchableOpacity
              onPress={() => handleSaveBusiness(item.id)}
              style={styles.visitButton}>
              <Text style={styles.visitText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>{
                  handlesaveAnalytics(item.id);
                navigation.navigate('ConsumserBusinessProfile', {id: item.id,category:item.category})
              }}
              style={styles.visitButton}>
              <Text style={styles.visitText}>Visit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilters({});
                  setModalVisible(false);
                }}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContainer}>
              {filterData.map((filter, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => toggleFilter(filter.label)}>
                    <Text style={styles.filterLabel}>{filter.label}</Text>
                    <Icon
                      name={
                        activeFilter === filter.label
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={moderateScale(20)}
                      color="black"
                    />
                  </TouchableOpacity>

                  <Collapsible collapsed={activeFilter !== filter.label}>
                    <View style={styles.collapsibleContent}>
                      {filter.options.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={[
                            styles.optionItem,
                            selectedFilters[filter.label] === option && {
                              backgroundColor: '#ddd',
                            },
                          ]}
                          onPress={() =>
                            handleOptionSelect(filter.label, option)
                          }>
                          <Text style={styles.optionText}>
                            {option.split('_')[0]}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Collapsible>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleSearchBusiness}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '16@s',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '16@vs',
  },
  menuButton: {
    padding: '8@s',
  },
  menuText: {
    fontSize: '20@ms',
  },
  logo: {
    width: '50@s',
    height: '50@s',
    resizeMode: 'contain',
  },
  icon: {
    fontSize: '24@ms',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '16@vs',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '8@s',
    paddingVertical: '5@vs',
    paddingHorizontal: '16@s',
  },
  filterText: {
    fontSize: '12@ms',
    fontFamily: 'Poppins-Regular',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8@vs',
    borderRadius: '8@s',
    borderWidth: 0.2,
    paddingVertical: '12@vs',
    borderColor: '#ddd',
    paddingHorizontal: '12@s',
  },
  imagePlaceholder: {
    width: '75@s',
    height: '75@s',
    borderRadius: '8@s',
    backgroundColor: '#98A8B8',
    marginRight: '12@s',
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: '12@ms',
    fontFamily: 'Poppins-Regular',
    color: COLORS.cyan,
  },
  name: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  visitButton: {
    borderWidth: 1,
    borderColor: COLORS.cyan,
    borderRadius: '8@s',
    paddingVertical: '4@vs',
    paddingHorizontal: '14@s',
    alignSelf: 'flex-end',
  },
  visitText: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-Regular',
    color: COLORS.cyan,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: '16@s',
    borderTopRightRadius: '16@s',
    padding: '16@s',
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  cancelText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#00A29B',
  },
  headerTitle: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  clearAllText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#00A29B',
  },
  filterContainer: {
    flex: 1,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: '12@vs',
  },
  filterLabel: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  collapsibleContent: {
    backgroundColor: '#F9F9F9',
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
  },
  optionItem: {
    paddingVertical: '10@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#00A29B',
    paddingVertical: '12@vs',
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16@vs',
  },
  applyButtonText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
});

export default SearchConsumerScreen;