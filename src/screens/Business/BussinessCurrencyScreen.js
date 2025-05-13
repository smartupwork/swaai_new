import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { userMeta } from '../../redux/slices/apiSlice';


const BussinessCurrencyScreen = ({navigation,route}) => {
  const path = route?.params?.path;
  console.log(path);
  const dispatch=useDispatch()
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
 await AsyncStorage.setItem('currency', item);        setSelectedCurrency(item);
        const country = '';
        const language = '';
        const currency = selectedCurrency;
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
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Currency</Text>
      {currency.map(Currency => (
        <TouchableOpacity
          key={Currency}
          style={[
            styles.languageOption,
            selectedCurrency === Currency && styles.selectedOption,
          ]}
          onPress={()=>handleUpdate(Currency)}
          // onPress={async () => {
          //   try {
          //     await AsyncStorage.setItem('currency', Currency);
          //     setSelectedCurrency(Currency);
          //     navigation.goBack();
          //   } catch (error) {
          //     console.error('Error saving selected country:', error);
          //   }
          // }}
          // onPress={() => {
          //   setSelectedCurrency(Currency);
          //   {
          //     navigation.goBack();
          //   }
          // }}
        >
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

export default BussinessCurrencyScreen;
