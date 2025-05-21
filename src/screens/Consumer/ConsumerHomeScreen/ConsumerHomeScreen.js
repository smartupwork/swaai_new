import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ScaledSheet, s, scale, verticalScale, vs} from 'react-native-size-matters';
import HeaderComp from '../../../components/HeaderComp';
import COLORS from '../../../constants/color';
import {PieChart} from 'react-native-gifted-charts';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '../../../assets/images';
import MyFeed from './MyFeed';
import MyCommunity from './MyCommunity';
import CreateNew from './CreateNew';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { calculateImpact, categories } from '../../../redux/slices/apiSlice';
import { useFocusEffect } from '@react-navigation/native';

const ConsumerHomeScreen = ({navigation}) => {
   const width = Dimensions.get('window').width;
   const dispatch = useDispatch();

   const [categoriesItem, setCategoriesItem] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
     const[calImpact,setCalImpact]=useState([])
     const[pieData,setPieData]=useState([])
          useEffect(() => {
       fetchData();
     }, [dispatch]);
const fetchData = async () => {
  try {
    const response1 = await dispatch(calculateImpact()).unwrap();
    setCalImpact(response1);

    // Define an array of colors to use for the pie chart segments
    const colors = [
      '#6BC841', // Blue
      '#5B7083', // Light Blue
      '#1B4250', // Dark Blue
      '#1D135C', // Teal
      '#027A48', // Green
      '#08A5F4', // Yellow-Green
      '#2B799D', // Medium Blue
    ];

    // Format the data for the pie chart
    const pieData = response1.map((category, index) => ({
      value: category.impact_percentage,
      color: colors[index % colors.length],
      gradientCenterColor: colors[index % colors.length],
      focused: index === 0, // Focus the first item by default
    }));

    setPieData(pieData);

    console.log('Formatted pieData:', pieData);
    console.log('API response:', response1);
  } catch (error) {
    console.error('Error getting impact data:', error);
  }
};
const [user, setUser] = useState('');

useFocusEffect(
  useCallback(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log('user', user);
      setUser(JSON.parse(user));
    };

    getUser();
  }, []),
);
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
}, [dispatch]);
  // const pieData = [
  //   {
  //     value: 20,
  //     color: '#237490',
  //     gradientCenterColor: '#237490',
  //     focused: false,
  //   },
  //   {value: 20, color: '#EBFCFB', gradientCenterColor: '#EBFCFB'},
  //   {value: 20, color: '#13355C', gradientCenterColor: '#13355C'},

  //   {value: 20, color: '#28C0B4', gradientCenterColor: '#28C0B4'},
  //   {value: 20, color: '#72C54B', gradientCenterColor: '#72C54B'},
  // ];

  const renderDot = color => (
    <View style={[styles.dot, {backgroundColor: color}]} />
  );
  const data = [
    
      {txt: 'Local impact', color: COLORS.green},
      {txt: 'Family impact', color: COLORS.cyan},
      {txt: 'Cultural impact', color: COLORS.blue},
      {txt: 'Sustainable impact', color: COLORS.darkBlue},
      {txt: 'Nonprofit impact', color: COLORS.fullGreen},
     
    
  ];
  const slider = [images.sliderImg, images.sliderImg];
  const [selectedTab, setSelectedTab] = useState('myCommunity');
 const [imageBase64, setimageBase64] = useState('');
  const [image, setImage] = useState('');


    const handleSave = async () => {
      const user = await AsyncStorage.getItem('user');

      const id = JSON.parse(user);
      const data = {
        user_id: id.id,
        media_id: mediaId ? mediaId : '',
        image: `data:image/jpeg;base64,${imageBase64}`,
        title: title,
        description: description,
        image_redirect_url: redirectUrl,
      };

      try {
        const response = await dispatch(insertImage(data)).unwrap();

        setIsLoading(false);
        Alert.alert('Success', response?.message);
        // navigation.navigate('SplashBusiness2');
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
      fetchUserDetail();
      setModalVisible(false);
    };
      const logout = async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
      };
    const c=["#6BC841","#CCCCCC","#1B4250","#1D135C","#027A48","#08A5F4","#6BC841","#CCCCCC","#1B4250","#1D135C","#027A48","#08A5F4"]
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <HeaderComp
        // leftClick={() => {
        //   logout();
        //   navigation.navigate('SignInConsumerScreen');
        // }}
        // leftClick={() => alert('heelo')}
        //rightClick={() => alert('heelo')}
        msgClick={() => navigation.navigate('ConsumerChatListingScreen')}
        rightClick={() => navigation.navigate('ProfileConsumerScreen')}
      />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search anything..."
          placeholderTextColor="#A9A9A9"
          style={styles.searchInput}
        />
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>
          Hello <Text style={styles.highlight}>{user?.first_name},</Text>
        </Text>
        <Text style={styles.subText}>
          what impact are you looking to create?
        </Text>
      </View>

      {/* Pie Chart Section */}
      {/* Pie Chart Section */}
      <View style={styles.impactSection}>
        <View style={styles.impactTextContainer}>
          {calImpact.map((category, index) => (
            <Text
              key={index}
              style={[
                styles.impactText,
                {color: pieData[index]?.color || COLORS.green},
              ]}>
              {category.category_name}{' '}
              <Text style={styles.highlight}>
                {category.impact_percentage}%
              </Text>
            </Text>
          ))}
        </View>
        <View style={styles.pieChartWrapper}>
          <PieChart
            data={pieData}
            donut
            showGradient
            // sectionAutoFocus
            radius={scale(65)}
            innerRadius={scale(36)}
            innerCircleColor="#F4F4F4"
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelSubtext}>Check Your Impact</Text>
              </View>
            )}
          />
        </View>
      </View>

      {/* Feature Section */}
      <View style={{flex: 1, marginBottom: verticalScale(30)}}>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Feature</Text>
          <TouchableOpacity>
            <Text style={styles.featureLink}>Visit business profile {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: -10}}>
          <Carousel
            width={width} // Full width of the screen
            height={width / 2.5} // Half the width for height
            data={slider} // Array with 6 items (0 to 5)
            scrollAnimationDuration={500} // Animation duration
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center', // Center content horizontally and vertically
                  borderColor: '#ccc',
                  backgroundColor: index % 2 === 0 ? '#e0f7fa' : '#ffebee', // Alternate background colors
                }}>
                <Image
                  source={item}
                  style={{width: width, height: width / 2.5}}
                />
              </View>
            )}
          />
        </View>
      </View>
      {/* Categories */}
      <Text style={styles.categoriesTitle}>
        Categories of{' '}
        <Text style={[styles.highlight, {color: COLORS.fullGreen}]}>
          IMPACT
        </Text>{' '}
        :
      </Text>

      <View style={styles.categories}>
        {/* {[
          {label: 'Geo-targeting', color: COLORS.green},
          {label: 'Family', color: COLORS.cyan},
          {label: 'Cultural & Diverse', color: COLORS.darkBlue},
          {label: 'Sustainable', color: '#13355C'},
          {label: 'Nonprofit', color: '#027A48'},
        ].map((category, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoriesViewMore')}
            key={index}
            style={[styles.categoryButton, {backgroundColor: category.color}]}>
            <Text style={styles.categoryText}>{category.label}</Text>
            <Text style={styles.viewMore}>View more {'>'}</Text>
          </TouchableOpacity>
        ))} */}
        {categoriesItem.map((category, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoriesViewMore')}
            key={index}
            style={[styles.categoryButton, {backgroundColor: c[index]}]}>
            <Text style={styles.categoryText}>{category.name}</Text>
            <Text style={styles.viewMore}>View more {'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Community */}
      <View>
        <Text style={styles.categoriesTitle}>
          Explore the
          <Text style={[styles.highlight, {color: COLORS.cyan}]}>
            Swaai
          </Text>{' '}
          Community:
        </Text>
        <Image
          source={images.consumerHome}
          style={{width: width, height: width / 2.4, marginLeft: -15}}
        />
        {/* Tab */}
        <View style={styles.tabCont}>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedTab == 'myFeed' && 2,
              borderBottomColor: selectedTab == 'myFeed' && COLORS.cyan,

              paddingBottom: scale(8),
            }}
            onPress={() => setSelectedTab('myFeed')}>
            <Text
              style={[
                styles.tabTxt,
                {
                  color: selectedTab == 'myFeed' && COLORS.cyan,
                  fontFamily: selectedTab == 'myFeed' && 'Poppins-SemiBold',
                },
              ]}>
              My feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedTab == 'myCommunity' && 2,
              borderBottomColor: selectedTab == 'myCommunity' && COLORS.cyan,

              paddingBottom: scale(8),
            }}
            onPress={() => setSelectedTab('myCommunity')}>
            <Text
              style={[
                styles.tabTxt,
                {
                  color: selectedTab == 'myCommunity' && COLORS.cyan,
                  fontFamily:
                    selectedTab == 'myCommunity' && 'Poppins-SemiBold',
                },
              ]}>
              My communities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedTab == 'createNew' && 2,
              borderBottomColor: selectedTab == 'createNew' && COLORS.cyan,
              paddingBottom: scale(8),
            }}
            onPress={() => setSelectedTab('createNew')}>
            <Text
              style={[
                styles.tabTxt,
                {
                  color: selectedTab == 'createNew' && COLORS.cyan,
                  fontFamily: selectedTab == 'createNew' && 'Poppins-SemiBold',
                },
              ]}>
              Create new
            </Text>
          </TouchableOpacity>
        </View>

        {/* My Feed */}
        {selectedTab == 'myFeed' ? (
          <MyFeed />
        ) : selectedTab == 'myCommunity' ? (
          <MyCommunity
            viewFun={() => navigation.navigate('ViewCommunityConsumerScreen')}
          />
        ) : (
          <CreateNew />
        )}
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: '16@s',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  logo: {
    width: '50@s',
    height: '50@vs',
    resizeMode: 'contain',
  },
  icon: {
    width: '24@s',
    height: '24@vs',
    tintColor: '#34448B',
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: '8@s',
    padding: '8@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  searchInput: {
    flex: 1,
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  greeting: {
    marginBottom: '16@vs',
  },
  greetingText: {
    fontSize: '20@s',
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
  },
  subText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Medium',
    color: COLORS.black,
  },
  highlight: {
    // color: COLORS.fullGreen,
    fontFamily: 'Poppins-Bold',
  },
  impactSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  impactTextContainer: {
    flex: 1,
   //  backgroundColor:'red'
  },
  impactText: {
    fontSize: '13@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#555',
    marginBottom: '4@vs',
  },
  pieChart: {
    width: '120@s',
    height: '120@vs',
    borderRadius: '60@s',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieText: {
    fontSize: '12@s',
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8@vs',
  },
  featureText: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  featureLink: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBolds',
    color: COLORS.green,
  },
  categoriesTitle: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: '16@vs',
  },
  categories: {
    marginBottom: '16@vs',
   
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '12@s',
    paddingVertical: '9@s',
    paddingHorizontal: '10@s',
    borderRadius: '8@s',
    marginBottom: '8@vs',
  },
  categoryText: {
    fontSize: '16@s',
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
  },
  viewMore: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    borderWidth: 1,
    padding: '2@s',
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: scale(8),
  },

  pieChartWrapper: {
    //  margin: scale(8),
    alignItems: 'center',
    // backgroundColor: '#F4F4F4',
    // flex: 1,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  centerLabelSubtext: {
    fontSize: scale(10),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginRight: 20,
  },
  legendText: {
    color: 'white',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tabCont: {
    width: '100%',
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  tabTxt: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
});

export default ConsumerHomeScreen;
