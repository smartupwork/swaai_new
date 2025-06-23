import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import HeaderComp from '../../../components/HeaderComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../constants/color';

import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons'; // For dropdown icons
import {
    checkedIn,
  getSavedBusinesses,
  savedBusinesses,
} from '../../../redux/slices/apiSlice';
import {useDispatch} from 'react-redux';

const businesses = [
  {category: 'Arts & Crafts', name: "Kate's Craft's & Co.", id: 1},
  {category: 'Clothing & Accessories', name: 'Family Fare', id: 2},
  {category: 'Food', name: 'Cousins Pizza', id: 3},
  {category: 'Bakery', name: "Beth's Baked Goods", id: 4},
  {category: 'Home & Furniture', name: "Hope's Home Range", id: 5},
];

const CheckInBusiness = ({navigation}) => {
  const [activeFilter, setActiveFilter] = useState(null); // Track the active collapsible
  const [isModalVisible, setModalVisible] = useState(false);
  const [businessDetail, setBusinessDetail] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  const fetchData = async () => {
    try {
      const response1 = await dispatch(checkedIn()).unwrap();
      setBusinessDetail(response1);
      //  setbusinesses(response1);
      console.log('bussine ss d et ail------!!!!!!', response1);
    } catch (error) {
      console.error('Error fetching bussiness detail:', error);
    }
  };
  const handleSaveBusiness = async id => {
    console.log('helo saved business fu');

    const data = {
      business_id: id,
    };
    console.log('data', data);

    try {
      const response = await dispatch(savedBusinesses(data)).unwrap();
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
  // JSON data for filters
  const filterData = [
    {
      label: 'Category',
      options: ['Electronics', 'Clothing', 'Books', 'Toys', 'Furniture'],
    },
    {
      label: 'Price Range',
      options: ['$0 - $50', '$50 - $500', '$500 - $1000', '$1000 - $5000'],
    },
    {
      label: 'Distance (Miles)',
      options: ['5 Miles', '10 Miles', '20 Miles', '50 Miles'],
    },
    {
      label: 'Customer Review (Stars)',
      options: ['3 Stars & Above', '4 Stars & Above', '5 Stars Only'],
    },
  ];

  // Toggle collapsible section
  const toggleFilter = label => {
    setActiveFilter(activeFilter === label ? null : label);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <HeaderComp
        leftClick={() => alert('heelo')}
        //rightClick={() => alert('heelo')}
        rightClick={() => alert('heelo')}
      />

      {/* Sort and Filter */}
      <View style={styles.filterRow}>
        <Text></Text>
        {/* <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>↑↓ Sort</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
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

      {/* List */}
      {businessDetail.map(item => (
        <View key={item.id} style={styles.card}>
          {/* <View style={styles.imagePlaceholder} /> */}
          <Image source={{uri: item.image}} style={styles.imagePlaceholder} />
          <View style={styles.textContainer}>
            <Text style={styles.category}>{item.name}</Text>
            <Text style={styles.name}>{item.category}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              //  backgroundColor: 'red',
              gap: 15,
            }}>
            
            {/* <TouchableOpacity 
              onPress={() => handleSaveBusiness(item.id)}
              // onPress={() =>
              //   navigation.navigate('ConsumserBusinessProfile', {id: item.id})
              // }
              style={styles.visitButton}>
              <Text style={styles.visitText}>Save</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ConsumserBusinessProfile', {id: item.id,category:item.category})
              }
              style={styles.visitButton}>
              <Text style={styles.visitText}>Visit</Text>
            </TouchableOpacity> 
          </View>
        </View>
      ))}
      {/* <View style={{width:'100%',height:'90%'}}> */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={!isModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setModalVisible(!moderateScale)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Filter</Text>
              <TouchableOpacity>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <ScrollView style={styles.filterContainer}>
              {filterData.map((filter, index) => (
                <View key={index}>
                  {/* Filter Header */}
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

                  {/* Collapsible Section */}
                  <Collapsible collapsed={activeFilter !== filter.label}>
                    <View style={styles.collapsibleContent}>
                      {filter.options.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.optionItem}
                          onPress={() => console.log(`Selected ${option}`)}>
                          <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Collapsible>
                </View>
              ))}
            </ScrollView>

            {/* Apply Filters Button */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </View> */}
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
    marginBottom: '14@vs',
    borderRadius: '8@s',
    // borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: '12@s',
    // padding: '12@s',
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
    width: '80@s',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: '16@s',
    borderTopRightRadius: '16@s',
    padding: '16@s',
    height: '90%',
    // maxHeight: '80%',
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

export default CheckInBusiness;
