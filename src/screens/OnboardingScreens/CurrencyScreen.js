import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CurrencyScreen = ({navigation,route}) => {
 const path = route?.params?.path;
 console.log(path);
  const [selectedCurrency, setSelectedCurrency] = useState('$ USD');
  const currency = ['$ USD', '$ EURO', '$ VND', '$ RUB'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Currency</Text>
      {currency.map(currency => (
        <TouchableOpacity
          key={currency}
          style={[
            styles.languageOption,
            selectedCurrency === currency && styles.selectedOption,
          ]}
          onPress={async () => {
            try {
              // Save selected country to AsyncStorage
              await AsyncStorage.setItem('currency', currency);

              // Update the selected country state
              setSelectedCurrency(currency);

              // Navigate to the appropriate screen
              if (path !== 'setting') {
                navigation.navigate('RoleScreen');
              } else {
                navigation.navigate('SettingScreen');
              }
            } catch (error) {
              console.error('Error saving selected country:', error);
            }
          }}
          // onPress={() => {setSelectedLanguage(language);
          //   {
          //     path!=="setting"
          //   ?
          //   navigation.navigate("RoleScreen")
          //   :navigation.navigate("SettingScreen")
          //   }
          // }}
        >
          <Text style={styles.languageText}>{currency}</Text>
          {selectedCurrency === currency ? (
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

export default CurrencyScreen;
