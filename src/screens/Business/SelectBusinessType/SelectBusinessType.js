import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {ScaledSheet, moderateScale, s, scale} from 'react-native-size-matters';
import ButtonComp from '../../../components/ButtonComp';
import COLORS from '../../../constants/color';
import { useDispatch } from 'react-redux';
import { categories, createbusiness } from '../../../redux/slices/apiSlice';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

const businessTypes = [
  {label: 'Local (Geo-targeted)', color: '#71C54B'},
  {label: 'Family', color: '#CCCCCC'},
  {label: 'Cultural & Diverse', color: '#1B4250'},
  {label: 'Sustainable', color: '#1D135C'},
  {label: 'Nonprofit', color: '#027A48'},
  {label: 'Other', color: '#08A5F4'},
];
const businessTypeCategories = [
  {label: 'Food & Beverage', value: 'food-beverage'},
  {label: 'Clothing & Accessories', value: 'clothing-accessories'},
  {label: 'Health, Wellness & Beauty', value: 'health-wellness-beauty'},
  {label: 'Service-Based', value: 'service-based'},
  {label: 'Arts, Media & Entertainment', value: 'arts-media-entertainment'},
];
const SelectBusinessType = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesItem, setCategoriesItem] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
    const [businessType, setBussinessType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [selectedCat2, setSelectedCat2] = useState('');

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        // Dispatch the thunk
        const response = await dispatch(categories()).unwrap();
        console.log('categories:', response);

        setCategoriesItem(response);
      } catch (error) {
        console.error('Error fetching categories:', err);

        // Update error state
        setError(
          err.response?.data?.message ||
            err.message ||
            'An unknown error occurred.',
        );

        // Display error as an alert
        Alert.alert('Error', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchcategories();
    fetchSelectedCountry();
  }, [dispatch]);
  const fetchSelectedCountry = async () => {
    try {
      const country = await AsyncStorage.getItem('country');
      if (country) {
        setCountry(country); // Update the state
      }
    } catch (error) {
      console.error('Error fetching selected country:', error);
    }
  };
  const handleConfirmSub = async () => {
    if (!selectedCat) {
      alert('Please select Business type');
      return;
    }
    // if (!selectedCat2) {
    //   alert('Please select Business Category');
    //   return;
    // }
    if (!businessName || !description) {
      alert('Please enter Business type and description');
      return;
    }
    if (!websiteUrl) {
      Alert.alert('Alert', 'Please enter website URL');
      return;
    }
    if (!street) {
      Alert.alert('Alert', 'Please enter Street');
      return;
    }
    if (!city) {
      Alert.alert('Alert', 'Please enter City');
      return;
    }
    if (!state) {
      Alert.alert('Alert', 'Please enter State');
      return;
    }
    if (!zipcode) {
      Alert.alert('Alert', 'Please enter Zipcode');
      return;
    }
    setIsLoading(true);
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    const id = parsedUser.id;
    const data = {
      user_id: id,
      cat_id: parseInt(selectedCat),
      business_type:businessType,
      business_name: businessName,
      description: description,
      website_url: websiteUrl,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
    };
    console.log('data', data);

    try {
      const response = await dispatch(createbusiness(data)).unwrap();
      console.log('response:', response.data);
      await AsyncStorage.setItem('business', JSON.stringify(response.data));
 await AsyncStorage.setItem(
   'business_id',
   response.data.id.toString(),
 );
      setIsLoading(false);
      Alert.alert('Success', response?.message);

      navigation.navigate('SplashBusiness2');
    } catch (err) {
      setIsLoading(false);
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
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        {/* <Text>Loading subscription plans...</Text> */}
      </View>
    );
  }

  if (categories?.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Categories available.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust if needed
  >
    <View style={styles.container}>
      <Text style={styles.title}>Select business type</Text>

      {categoriesItem?.map((type, index) => (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedCat(type.id);
          //  Alert.alert("Alert"+type.id);
          }}
          // onPress={() => setSelectedCat(type.id)}
          key={index}
          style={[
            styles.option,
            {backgroundColor: businessTypes[index].color},
          ]}>
          <Text
            style={[
              styles.optionText,
              {color: selectedCat == type.id ? '#000' : '#fff'},
            ]}>
            {type.name} 
          </Text>
        </TouchableOpacity>
      ))}

      <View style={{position: 'absolute', bottom: scale(8), width: '110%'}}>
        <ButtonComp
          title="Confirm & Subscribe"
          backgroundColor={COLORS.blue}
          onPress={() => handleConfirmSub()}
          // onPress={() => navigation.navigate('SplashBusiness2')}
          //onPress={() => navigation.replace('SplashBusiness2')}
        />
      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust if needed
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>{selectedCat}</Text> */}
            <ScrollView style={{flex: 1, width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: scale(40),
                  paddingBottom: scale(75),
                }}>
                {/* Dropdown for Business Type Categories */}
                <Text style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>Select business type</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={businessTypeCategories}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Business Type"
                  value={selectedCat}
                  onChange={item => {setBussinessType(item.value)}}
                 // onChange={item => setSelectedCat(item.value)}
                />

                {/* Business Name */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Business Name
                </Text>
                <TextInput
                  placeholder="Please Enter business name"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setBusinessName(text)}
                  value={businessName}
                />

                {/* Business Description */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Business Description
                </Text>
                <TextInput
                  placeholder="Please Enter business description"
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setDescription(text)}
                  value={description}
                />

                {/* Website URL */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Website URL
                </Text>
                <TextInput
                  placeholder="Enter website URL"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setWebsiteUrl(text)}
                  value={websiteUrl}
                />

                {/* Street */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Street
                </Text>
                <TextInput
                  placeholder="Enter street address"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setStreet(text)}
                  value={street}
                />

                {/* City */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  City
                </Text>
                <TextInput
                  placeholder="Enter city"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setCity(text)}
                  value={city}
                />

                {/* State */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  State
                </Text>
                <TextInput
                  placeholder="Enter state"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setState(text)}
                  value={state}
                />

                {/* Zipcode */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Zipcode
                </Text>
                <TextInput
                  placeholder="Enter zipcode"
                  placeholderTextColor="gray"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={text => setZipcode(text)}
                  value={zipcode}
                />

                {/* Country */}
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: '#000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: scale(14),
                    },
                  ]}>
                  Country
                </Text>
                <TextInput
                  // editable={false}
                  placeholder="Enter country"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => setCountry(text)}
                  value={country}
                />
              </View>
            </ScrollView>
            {/* Modal Buttons */}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: scale(20),
                position: 'absolute',
                bottom: 0,
                paddingBottom: scale(40),
                paddingTop: scale(10),
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if(!businessType){
                    alert("Please select Business Type")
                    return
                  }
                  if (!businessName) {
                    alert('Please enter Business Name ');
                    return;
                  }
                  if (!description) {
                    alert('Please enter Business Description ');
                    return;
                  }
                  if (!websiteUrl) {
                    Alert.alert('Alert', 'Please enter website URL');
                    return;
                  }
                  if (!street) {
                    Alert.alert('Alert', 'Please enter Street');
                    return;
                  }
                  if (!city) {
                    Alert.alert('Alert', 'Please enter City');
                    return;
                  }
                  if (!state) {
                    Alert.alert('Alert', 'Please enter State');
                    return;
                  }
                  if (!zipcode) {
                    Alert.alert('Alert', 'Please enter Zipcode');
                    return;
                  }
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    </View>
      </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: '15@s',
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: '26@s',
    fontFamily: 'Poppins-Bold',
    fontWeight:'600',
    // textAlign: 'center',
    marginBottom: '20@vs',
    marginTop: '30@vs',
    paddingHorizontal: scale(8),
  },
  option: {
    paddingVertical: '12@s',
    paddingHorizontal: '10@s',
    borderRadius: '10@s',
    marginBottom: '18@s',
    fontFamily: 'Poppins-Medium',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: '16@s',

    // textAlign: 'center',
  },
  confirmButton: {
    marginTop: '30@s',
    paddingVertical: '15@s',
    borderRadius: '10@s',
    backgroundColor: '#56A9FF',
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // backgroundColor:'pink',
    bottom: 0,
    position: 'absolute',
    width: '98%',
    alignSelf: 'center',
    height: '80%',
    paddingTop: scale(40),
    paddingBottom:moderateScale(200)
  },
  input: {
    width: '90%',
    // flex:1,
    //  height: scale(34),
    margin: scale(12),
    borderWidth: 0.5,
    padding: scale(12),
    borderRadius: 8,
    alignSelf: 'center',
  },
  button: {
    width: '40%',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.blue,
    //pa:scale(40)
  },
  buttonClose: {
    backgroundColor: COLORS.gray2,
  },
  dropdown: {
    width:'90%',
    marginHorizontal: scale(18),
    marginBottom: '18@s',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
  },
  placeholderStyle: {
    fontSize: '16@s',
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: '16@s',
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default SelectBusinessType;
