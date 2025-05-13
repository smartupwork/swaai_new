import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { userMeta } from '../../redux/slices/apiSlice';

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'United States',
];

const BussinessCountryScreen = ({navigation}) => {

  const dispatch=useDispatch()
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const filteredCountries = countryList.filter(country =>
    country.toLowerCase().includes(search.toLowerCase()),
  );
 const fetchSelectedCountry = async () => {
   try {
     const country = await AsyncStorage.getItem('country');
     if (country) {
       setSelectedCountry(country); // Update the state
     }
   } catch (error) {
     console.error('Error fetching selected country:', error);
   }
 };

 // useEffect to fetch selected country when the component mounts
 useEffect(() => {
   fetchSelectedCountry();
 }, []);
  const handleUpdate =async (item) => {
    console.log("item",item);
     try {
         const user = await AsyncStorage.getItem('user');

         const id = JSON.parse(user);
         await AsyncStorage.setItem('country', item);
         setSelectedCountry(item);
         const country = item;
         const language = "";
         const currency = "";
       //  dispatch(userMeta({id: id.id, country, language, currency}));

       const response = await dispatch(
         userMeta({id: id.id, country, language, currency}),
       ).unwrap();

       Alert.alert('Success', response?.message);
navigation.goBack();

       // navigation.navigate('SplashBusiness2');
     } catch (err) {
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
 
      // try {
      //   const user = await AsyncStorage.getItem('user');

      //   const id = JSON.parse(user);
      //   await AsyncStorage.setItem('country', item);
      //   setSelectedCountry(item);
      //   const country = item;
      //   const language = "";
      //   const currency = "";
      //  dispatch(userMeta({id: id.id, country, language, currency}));

      //   navigation.goBack();
      // } catch (error) {
      //   console.error('Error saving selected country:', error);
      // }
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subheader}>Country</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search country"
        value={search}
        onChangeText={text => setSearch(text)}
      />

      {/* Country List */}
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.countryItem}
            onPress={()=>handleUpdate(item)}
            // onPress={() => {setSelectedCountry(item);{
            //      navigation.goBack()
            // }
            // }}
          >
            <Text style={styles.countryText}>{item}</Text>
            {item === selectedCountry && (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BussinessCountryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginVertical: 8,
    fontFamily:"Poppins-Medium",
    color:'#000'
  },
  searchBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  countryText: {
    fontSize: 16,
  },
});
