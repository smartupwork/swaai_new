import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with your preferred library
import COLORS from '../../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AddressUpdateModal from '../../../components/AddressUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { profile, updateAddress } from '../../../redux/slices/apiSlice';

const SettingScreen = ({navigation}) => {
 
    const [modalVisible, setModalVisible] = useState(false);
      const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedCurrency, setSelectedCurrency] = useState('');
const[selectedLanguage,setselectedLanguage]=useState("")
const [modalAddressVisible, setModalAddressVisible] = useState(false);
const [savedAddress, setSavedAddress] = useState('');
const dispatch = useDispatch();
// const {loading, error} = useSelector(state => state.address);
   const[bID,setBID]=useState("")
useEffect(() => {
  const fetchProfileData = async () => {
    console.log("profile");
    
    try {
      // Dispatch the thunk
      const response = await dispatch(profile()).unwrap();
      console.log('Subscription plans:', response.data);

      setBID(response?.data?.business_id);
    } catch (error) {
      console.error('Error fetching subscription plans:', err);

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

  fetchProfileData();
}, [dispatch]);
const handleSave = async address => {
  const user = await AsyncStorage.getItem('user');

  const id = JSON.parse(user);
  setSavedAddress(address);
  setModalAddressVisible(false);
  const data = {
   
    business_address: address,
  };
  console.log('id', bID,"business_address", address);
   try {
     const response = await dispatch(
       updateAddress({id:bID, business_address: address}),
     ).unwrap();

     //  setIsLoading(false);
     Alert.alert('Success', response?.message);
     // fetchCards();updateUserMeta

     // navigation.navigate('SplashBusiness2');
   } catch (err) {
       // setIsLoading(false);
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
  // dispatch(updateAddress({id: id.id, business_address: address}));
};
// const handleSave = address => {
//   setSavedAddress(address);
//   setModalAddressVisible(false);
// };
      // Function to fetch selected country from AsyncStorage
      const fetchSelectedCountry = async () => {
        try {
          const country = await AsyncStorage.getItem('country');
          if (country) {
            setSelectedCountry(country); // Update the state
          }
           const currency = await AsyncStorage.getItem('currency');
           if (currency) {
             setSelectedCurrency(currency); // Update the state
           }
           const language = await AsyncStorage.getItem('language');
           if (language) {
             setselectedLanguage(language); // Update the state
           }
        } catch (error) {
          console.error('Error fetching selected country:', error);
        }
      };

      // useEffect to fetch selected country when the component mounts
       useFocusEffect(
         useCallback(() => {
           fetchSelectedCountry();
         }, []),
       );

 const logout = async () => {
   await AsyncStorage.removeItem('user');
   await AsyncStorage.removeItem('token');
 };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Personal Section */}
      <View style={styles.section}>
        <Text
          onPress={() => navigation.navigate('ChatScreen')}
          style={[styles.sectionTitle, {fontFamily: 'Poppins-SemiBold'}]}>
          Personal
        </Text>
        <View style={{marginTop: scale(14)}}>
          <Text style={styles.darkText}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingYourProfile')}
            style={styles.row}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Icon name="chevron-right" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={{marginTop: scale(14)}}>
          <Text style={styles.darkText}>Location</Text>
          <TouchableOpacity
            onPress={() => setModalAddressVisible(true)}
            style={styles.row}>
            <Text style={styles.sectionTitle}>Business address</Text>
            <Icon name="chevron-right" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>
      <AddressUpdateModal
        visible={modalAddressVisible}
        onClose={() => setModalAddressVisible(false)}
        onSave={handleSave}
      />
      {/* Payment Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Payment</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SavedPaymentMethod')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Payment methods</Text>
          <Icon name="chevron-right" size={20} color="#808080" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>

      {/* Country Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Country</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('BussinessCountryScreen')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Country</Text>
          <Text style={styles.value}>
            {selectedCountry} {'>'}
          </Text>
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.darkText}>Currency</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('BussinessCurrencyScreen')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Currency</Text>
          <Text style={styles.value}>
            {' '}
            {selectedCurrency} {'>'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Terms Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Terms</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          <Icon name="chevron-right" size={20} color="#808080" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Language</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('BussinessLanguageScreen')}
          style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>
            {selectedLanguage} {'>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      {/* Logout Section */}
            <View style={styles.section}>
              <Text style={styles.darkText}>Logout</Text>
              <TouchableOpacity
                onPress={() =>{
                  logout();
                //  navigation.navigate('RoleScreen');
                   navigation.reset({
                     index: 0,
                     routes: [{name: 'RoleScreen'}],
                   });
      
                }}
                style={styles.row}>
                <Text style={styles.label}>Logout</Text>
                <Text style={styles.value}> {'>'}</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
      <>
        <SafeAreaView style={styles.centeredView}>
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
                <Text style={styles.modalText}>Terms and Condition</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '16@s',
  },
  header: {
    fontSize: '24@s',
    fontFamily: 'Poppins-SemiBold',
    marginVertical: '16@vs',
  },
  section: {
    marginBottom: '24@vs',
  },
  sectionTitle: {
    fontSize: '16@s',
    fontFamily: 'Poppins-Medium',
    color: '#202020',
    //  marginBottom: '8@vs',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
    // paddingVertical: '12@vs',
  },
  label: {
    fontSize: '16@s',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    flex: 1,
  },
  value: {
    fontSize: '16@s',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  darkText: {
    fontSize: '12@s',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.8)'
  },
  modalView: {
    width:"100%",
    height:'80%',
position:'absolute',
bottom:0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    position:'absolute',
    bottom:10,
    right:20
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.blue,
    paddingHorizontal:scale(18)
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SettingScreen;
