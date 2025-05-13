import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userConsumerMeta } from '../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ConsumerCurrencyScreen = ({navigation,route}) => {
 const path = route?.params?.path;
   const dispatch = useDispatch();
 console.log(path);
  const [selectedLanguage, setSelectedLanguage] = useState('$ USD');
    const [selectedCurrency, setSelectedCurrency] = useState('');
  
  const currency = ['$ USD', '$ EURO', '$ VND', '$ RUB'];
  const fetchSelectedCurrency = async () => {
    try {
      const Currency = await AsyncStorage.getItem('currency');
      if (Currency) {
        setSelectedCurrency(Currency); // Update the state
      }
    } catch (error) {
      console.error('Error fetching selected country:', error);
    }
  };

  // useEffect to fetch selected Currency when the component mounts
  useEffect(() => {
    fetchSelectedCurrency();
  }, []);
const handleUpdate = async item => {
  console.log('item', item);
  try {
    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);

    // Save the selected currency to AsyncStorage
    await AsyncStorage.setItem('currency', item);

    // Update the state
    setSelectedCurrency(item);

    const country = '';
    const language = '';
    const currency = item; // Use the newly selected currency directly

    // Dispatch the action with the updated currency
    const response = await dispatch(
      userConsumerMeta({country, language, currency}),
    ).unwrap();

    Alert.alert('Success', response?.message);
    navigation.goBack();
  } catch (err) {
    console.log('error', err);

    if (typeof err === 'string') {
      console.error('Error:', err);
      alert(err);
    } else if (err && err.message) {
      console.error('Error message:', err.message);
      alert(err.message);
    } else {
      console.error('Unhandled error:', err);
      alert('An unknown error occurred.');
    }
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Currency</Text>
      {currency.map(Currency => (
        <TouchableOpacity
          key={Currency}
          style={[
            styles.languageOption,
            selectedCurrency === Currency && styles.selectedOption,
          ]}
          // onPress={() => {
          //   setSelectedLanguage(Currency);
          //   {
          //     navigation.goBack();
          //   }
          //}}
          onPress={() => handleUpdate(Currency)}>
          <Text style={styles.languageText}>{Currency}</Text>
          {selectedCurrency === Currency ? (
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
    color: '#000',
    marginBottom: vs(10),
    fontFamily: 'Poppins-Medium',
    color: '#000',
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

export default ConsumerCurrencyScreen;
