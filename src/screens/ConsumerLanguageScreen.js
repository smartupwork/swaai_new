import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { userConsumerMeta } from '../redux/slices/apiSlice';

const ConsumerLanguageScreen = ({navigation,route}) => {
   const path = route?.params?.path;
     const dispatch = useDispatch();
   console.log(path);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Français', 'Русский', 'Tiếng Việt'];
 const fetchSelectedLanguage = async () => {
   try {
     const language = await AsyncStorage.getItem('language');
     if (language) {
       setSelectedLanguage(language); // Update the state
     }
   } catch (error) {
     console.error('Error fetching selected country:', error);
   }
 };

 // useEffect to fetch selected country when the component mounts
 useEffect(() => {
   fetchSelectedLanguage();
 }, []);
 const handleUpdate = async item => {
   console.log('item', item);
   try {
     const user = await AsyncStorage.getItem('user');

     const id = JSON.parse(user);
     await AsyncStorage.setItem('language', item);
     setSelectedLanguage(item);
     const country = '';
     const language = item;
     const currency = '';
     //  dispatch(userMeta({id: id.id, country, language, currency}));

     const response = await dispatch(
       userConsumerMeta({ country, language, currency}),
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
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Language</Text>
      {languages.map(language => (
        <TouchableOpacity
          key={language}
          style={[
            styles.languageOption,
            selectedLanguage === language && styles.selectedOption,
          ]}
          onPress={() => handleUpdate(language)}

          // onPress={() =>{ setSelectedLanguage(language);
          //   {
          //   navigation.goBack();
          //   }
          // }}
        >
          <Text style={styles.languageText}>{language}</Text>
          {selectedLanguage === language ? (
            <Icon name="check-circle" size={s(20)} color="#4CAF50" />
          ) : (
            <Icon name="fiber-manual-record" size={s(25)} color="#F8CECE" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: vs(20),
    paddingHorizontal: s(20),
  },
  title: {
    fontSize: '24@s',
    fontWeight: 'bold',
    marginBottom: vs(20),
  },
  subtitle: {
    fontSize: '18@s',
    color: '#555555',
    marginBottom: vs(10),
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(10),
    paddingHorizontal: s(15),
    borderRadius: s(10),
    backgroundColor: '#F9F9F9',
    marginBottom: vs(10),
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
  },
  languageText: {
    fontSize: '16@s',
  },
});

export default ConsumerLanguageScreen;
