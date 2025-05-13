import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunities } from '../../../redux/slices/apiSlice';

const MyCommunity = ({viewFun}) => {
   const navigation = useNavigation();
     const dispatch = useDispatch();

  const [selectedMenu, setSelectedMenu] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await dispatch(getCommunities()).unwrap();
        console.log('Success:', response1);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchData();
  }, [dispatch]);
const {community, loading, error} = useSelector(state => state.api);
console.log('community', community.community);
  const menuData = [
    // {id: '1', title: 'All', color: '#757575'},
    {id: '2', title: 'Boston Thrifts', color: '#8BC34A'},
    {id: '3', title: 'FOBs', color: '#4DB6AC'},
    {id: '4', title: 'LGBTQ+', color: COLORS.darkBlue},
    {id: '5', title: 'Coming Soon', color: '#388E3C'},
    
  ];

  const communityData = [
    {
      id: '1',
      title: 'Boston Thrifts',
      members: '10K+',
      color: '#8BC34A',
      category: 'Boston Thrifts',
    },
    {
      id: '2',
      title: 'Family Owned Biz (FOBs)',
      members: '10K+',
      color: '#4DB6AC',
      category: 'FOBs',
    },
    {
      id: '3',
      title: 'LGBTQ+',
      members: '10K+',
      color: COLORS.darkBlue,
      category: 'LGBTQ+',
    },
    {
      id: '4',
      title: 'Coming Soon',
      members: '10K+',
      color: '#388E3C',
      category: 'Coming Soon',
    },
    {
      id: '5',
      title: 'Boston Thrifts',
      members: '10K+',
      color: '#8BC34A',
      category: 'Boston Thrifts',
    },
    {
      id: '9',
      title: 'Boston Thrifts',
      members: '10K+',
      color: '#8BC34A',
      category: 'Boston Thrifts',
    },
    {
      id: '6',
      title: 'Family Owned Biz (FOBs)',
      members: '10K+',
      color: '#4DB6AC',
      category: 'FOBs',
    },
  
    {
      id: '8',
      title: 'Coming Soon',
      members: '10K+',
      color: '#388E3C',
      category: 'Coming Soon',
    },
  ];

  const filteredData =
    selectedMenu === ''
      ? communityData
      : communityData.filter(item => item.category === selectedMenu);

  return (
    <ScrollView style={styles.container}>
      {/* Menu Section */}

      <View style={styles.menuContainer}>
        {community?.community?.map(menu => {
          const randomColor =
            menuData[Math.floor(Math.random() * menuData.length)].color;

          return (
            <View>
              <TouchableOpacity
                key={menu.id}
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: randomColor,
                  },
                ]}
                onPress={() => setSelectedMenu(menu.name)}>
                <View
                  style={[styles.menuCircle, {backgroundColor: randomColor}]}
                />
                <Text></Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.menuText,
                  {
                    color:
                      selectedMenu === menu.name ? menu.randomColor : '#374151',
                  },
                ]}>
                {menu.name}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Community Section */}
      <FlatList
        data={community?.community}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
           const randomColor =
             menuData[Math.floor(Math.random() * menuData.length)].color;

          return (
            <View style={[styles.card, {backgroundColor: randomColor}]}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>({item.members} members)</Text>
              <TouchableOpacity
                style={styles.button}
               // onPress={viewFun}
                onPress={() =>
                  navigation.navigate('ViewCommunityConsumerScreen',{item})
                }>
                <Text style={styles.buttonText}>View Community</Text>
              </TouchableOpacity>
            </View>
          );}}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  menuContainer: {
    flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems:'center',
    marginHorizontal: '10@ms',
    marginVertical: '15@ms',
   // backgroundColor:'red'
  },
  menuItem: {
   // flex: 1,
    alignItems: 'center',
  //  paddingVertical: '10@ms',
    borderRadius: '25@ms',
  //  borderWidth: '2@ms',
    marginHorizontal: '5@ms',
    width:scale(50),
    height:scale(50),
    backgroundColor:'pink'
  },
  menuCircle: {
    width: '20@ms',
    height: '20@ms',
    borderRadius: '10@ms',
    marginBottom: '5@ms',
  },
  menuText: {
    fontFamily: 'Poppins-Medium',
    fontSize: '12@ms',
    textAlign: 'center',
    marginTop:'8@s',
    color:COLORS.black
  },
  listContainer: {
    paddingHorizontal: '10@ms',
    marginTop: '10@ms',
  },
  card: {
    padding: '15@ms',
    borderRadius: '10@ms',
    marginBottom: '15@ms',
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: '16@ms',
    color: '#FFFFFF',
    marginBottom: '5@ms',
  },
  cardSubtitle: {
    fontFamily: 'Poppins',
    fontSize: '14@ms',
    color: '#FFFFFF',
    marginBottom: '10@ms',
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: '15@ms',
    paddingVertical: '8@ms',
    backgroundColor: '#FFFFFF',
    borderRadius: '20@ms',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: '14@ms',
    color: '#000',
  },
});

export default MyCommunity;
