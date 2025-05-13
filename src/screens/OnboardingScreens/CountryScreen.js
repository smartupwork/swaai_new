import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const CountryScreen = ({navigation,route}) => {
  console.log(route);
  
  const path = route?.params?.path;
  console.log(path);
  
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const filteredCountries = countryList.filter(country =>
    country.toLowerCase().includes(search.toLowerCase()),
  );

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
            // onPress={() => {setSelectedCountry(item);{
            //   path !== 'setting'
            //     ? navigation.navigate('LanguageScreen')
            //     : navigation.navigate('SettingScreen');
            // }
            // }}
            onPress={async () => {
              try {
                // Save selected country to AsyncStorage
                await AsyncStorage.setItem('country', item);

                // Update the selected country state
                setSelectedCountry(item);

                // Navigate to the appropriate screen
                if (path !== 'setting') {
                  navigation.navigate('LanguageScreen');
                } else {
                  navigation.navigate('SettingScreen');
                }
              } catch (error) {
                console.error('Error saving selected country:', error);
              }
            }}>
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

export default CountryScreen;

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
