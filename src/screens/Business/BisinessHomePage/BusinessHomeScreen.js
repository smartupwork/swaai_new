import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../assets/images';
import COLORS from '../../../constants/color';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HeaderComp from '../../../components/HeaderComp';
import {PieChart} from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { checkedIn, filterAnalytics, getAnalytics } from '../../../redux/slices/apiSlice';

const analyticsData = [
  {metric: 'Page visits', count: 120, date: '2024-10-01'},
  {metric: 'Coupon code selections', count: 40, date: '2024-10-05'},
  {metric: 'Video views', count: 65, date: '2024-10-10'},
  {metric: 'Unique visits', count: 89, date: '2024-10-15'},
  {metric: 'Unique video views', count: 72, date: '2024-10-20'},
  {metric: 'Social media clicks', count: 25, date: '2024-10-25'},
  {metric: 'Rating', count: 4.5, date: '2024-10-30'},
];

const filterDataByDateRange = (data, days) => {
  const cutoffDate = moment()?.subtract(days, 'days').toDate();
  return data.filter(item => new Date(item.date) >= cutoffDate);
};

const BusinessHomeScreen = ({navigation}) => {
  const [selectedDays, setSelectedDays] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
    const [businessDetail, setBusinessDetail] = useState([]);
  const a = [
    '#14345C',
    '#2D6479',
    '#2B799D',
    '#CFDD3F',
    '#74C155',
    '#209D67',
    '#2FC1B5',
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    
    fetchData(25);
  }, [dispatch]);
const fetchData = async id => {
  try {
          const user = await AsyncStorage.getItem('business');
      const uid = JSON.parse(user);
      console.log('uid', uid);
           const businessID = await AsyncStorage.getItem('business_id');

      console.log('business', businessID);
      
    const response1 = await dispatch(getAnalytics(businessID)).unwrap();
    setBusinessDetail(response1);
console.log('setBusinessDetail', response1);
try {
 const jsonValue = JSON.stringify(response1);
  await AsyncStorage.setItem('businessDetail', jsonValue);
} catch (e) {
  console.log('Error saving data:', e);
  
  // saving error
}
    // Define an array of colors to use (consistent for both pieData and formattedData)
    const colors = [
      '#14345C',
      '#2D6479',
      '#2B799D',
      '#CFDD3F',
      '#74C155',
      '#209D67',
      '#2FC1B5',
    ];

    // Create formattedData with colors included
    const formattedData = Object.entries(response1)
      ?.filter(([key]) => key !== 'business_id')
      ?.map(([key, value], index) => ({
        metric: formatMetricLabel(key),
        count:  Number(value) || 0,
        color: colors[index % colors.length], // Add the same color as pieData
      }));

    // Create pieData (same as before)
    // const pieData = formattedData?.map((item, index) => ({
    //   value: item.count,
    //   color: colors[index % colors.length],
    //   gradientCenterColor: colors[index % colors.length],
    //   ...(index === 0 && {focused: false}),
    // }));
const pieData = formattedData
  ?.filter(item => item.count > 0)
  ?.map((item, index) => ({
    value: Number(item.count) || 0, // Ensure it's a number, default to 0 if invalid
    color: colors[index % colors.length],
    gradientCenterColor: colors[index % colors.length],
    ...(index === 0 && {focused: false}),
  }));
    setPieData(pieData);
    setFilteredData(formattedData); // Now formattedData also has colors

    console.log('pieData', pieData);
    console.log('formattedData', formattedData);
    console.log('response1', response1);
  } catch (error) {
    console.error('Error getAnalytics:', error);
  }
};
const fetchFilterData = async days => {
  try {
    const user = await AsyncStorage.getItem('user');
    const businessID = await AsyncStorage.getItem('business_id');
    const uid = JSON.parse(user);

    let day;
    if (days < 365) {
      day = `${days}_days`;
    } else if (days == 365) {
      if (days == 180) {
        day = '6_months';
      } else day = '1_year';
    } else {
      day = 'overall';
    }

    const data = {
      business_id: businessID,
      days: day,
    };

    console.log('data', data);

    const response1 = await dispatch(filterAnalytics(data)).unwrap();
    setBusinessDetail(response1?.data);

    const colors = [
      '#14345C',
      '#2D6479',
      '#2B799D',
      '#CFDD3F',
      '#74C155',
      '#209D67',
      '#2FC1B5',
    ];
  const formattedData = Object.entries(response1?.data)
    .filter(([key, value]) => key !== 'business_id' && !isNaN(value))
    .map(([key, value], index) => ({
      metric: formatMetricLabel(key),
      count: Number(value) || 0, // Ensure numeric value
      color: colors[index % colors.length],
    }));
    // const formattedData = Object.entries(response1?.data)
    //   .filter(([key]) => key !== 'business_id')
    //   .map(([key, value], index) => ({
    //     metric: formatMetricLabel(key),
    //     count: value,
    //     color: colors[index % colors.length],
    //   }));

    const pieData = formattedData?.map((item, index) => ({
      value: item.count,
      color: colors[index % colors.length],
      gradientCenterColor: colors[index % colors.length],
      ...(index === 0 && {focused: false}),
    }));

    setPieData(pieData);
    setFilteredData(formattedData);

    console.log('pieData', pieData);
    console.log('formattedData', formattedData);
    console.log('response1.data', response1?.data);
  } catch (error) {
    console.error('Error fetching business detail:', error);
  }
};

   const formatMetricLabel = key => {
     return key
       .replace(/_/g, ' ') // Replace underscores with spaces
       .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
   };
  const applyFilter = days => {
    setSelectedDays(days);
  //  setFilteredData(filterDataByDateRange(analyticsData, days));
    setModalVisible(false);
  };
const[user,setUser]=useState('');
  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log('user ', user);
      
      setUser(JSON.parse(user));
    };
    getUser();
    if (!selectedDays) {
      //setFilteredData(analyticsData); // Show all data by default
    }
  }, [selectedDays]);
  const [pieData, setPieData] = useState([]);
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
const renderLegendComponent = () => {
  // Filter out zero values for display
  const nonZeroData = filteredData.filter(item => item.count > 0);

  return (
    <View>
      {nonZeroData.map((item, index) => {
        // Render two items per row
        if (index % 2 === 0) {
          return (
            <View key={`row-${index}`} style={styles.legendRow}>
              {/* First item */}
              <View style={styles.legendItem}>
                {renderDot(item.color)}
                <Text style={styles.legendText}>
                  {item.metric}: {item.count}
                </Text>
              </View>

              {/* Second item if exists */}
              {nonZeroData[index + 1] && (
                <View style={styles.legendItem}>
                  {renderDot(nonZeroData[index + 1].color)}
                  <Text style={styles.legendText}>
                    {nonZeroData[index + 1].metric}:{' '}
                    {nonZeroData[index + 1].count}
                  </Text>
                </View>
              )}
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};
// const renderLegendComponent = () => {
//   // Calculate total for percentage calculation
//   const total = filteredData.reduce((sum, item) => sum + item.count, 0);

//   return (
//     <View>
//       {filteredData.map((item, index) => {
//         // Calculate percentage
//         const percentage =
//           total > 0 ? Math.round((item.count / total) * 100) : 0;

//         // Render two items per row
//         if (index % 2 === 0) {
//           return (
//             <View key={`row-${index}`} style={styles.legendRow}>
//               {/* First item in row */}
//               <View style={styles.legendItem}>
//                 {renderDot(item.color)}
//                 <Text style={styles.legendText}>
//                   {item.metric}: {item.count}
//                 </Text>
//               </View>

//               {/* Second item in row if exists */}
//               {filteredData[index + 1] && (
//                 <View style={styles.legendItem}>
//                   {renderDot(filteredData[index + 1].color)}
//                   <Text style={styles.legendText}>
//                     {filteredData[index + 1].metric}: {item.count}
//                     {/* {Math.round((filteredData[index + 1].count / total) * 100)}% */}
//                   </Text>
                  
//                 </View>
//               )}
//             </View>
//           );
//         }
//         return null;
//       })}
//     </View>
//   );
// };
const logout=async()=>{
  await AsyncStorage.removeItem('user');
await AsyncStorage.removeItem('token');

}
  return (
    <View style={styles.container}>
      <HeaderComp
        leftClick={() => {
          logout();
          navigation.navigate('SignInScreen');
        }}
        //rightClick={() => alert('heelo')}
        msgClick={() => navigation.navigate('BussinessChatListingScreen')}
        rightClick={() => navigation.navigate('EditBusiness')}
      />
      <ScrollView>
        <View style={{padding: moderateScale(16)}}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello {user?.first_name},</Text>
            <View style={styles.IntroCont}>
              <View>
                <Text style={styles.dashboardText}>DASHBOARD</Text>
                <Text style={styles.analyticsPrompt}>
                  View your <Text style={{color: COLORS.blue}}>analytics:</Text>
                </Text>
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.dateText}>
                  {selectedDays ? `Last${selectedDays} days` : 'All Time'}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.filterButton}>
                  <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={item => item.metric}
            renderItem={({item}) => (
              <View style={styles.metricContainer}>
                <View
                  style={{
                    width: '60%',
                    backgroundColor: COLORS.blue,
                    padding: moderateScale(8),
                    borderTopLeftRadius: scale(10),
                    borderBottomLeftRadius: scale(10),
                    backgroundColor: item.color,
                  }}>
                  <Text style={styles.metricTitle}>{item.metric}</Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    backgroundColor: COLORS.darkBlue,

                    padding: moderateScale(8),
                    borderTopLeftRadius: scale(10),
                    borderBottomLeftRadius: scale(10),
                    borderBottomRightRadius: scale(10),
                    borderTopRightRadius: scale(10),
                  }}>
                  <Text style={styles.metricValue}>{item.count}</Text>
                </View>
              </View>
            )}
          />

          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select your time frame:</Text>
                {['30', '90', '120', '180', '365', 'overall'].map(day => (
                  <TouchableOpacity
                    key={day}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                    onPress={() => {
                      const daysValue = parseInt(day);
                      setSelectedDays(daysValue);
                      fetchFilterData(daysValue);
                      setModalVisible(false);
                    }}
                    //  onPress={() =>{ setSelectedDays(parseInt(day));fetchFilterData(); setModalVisible(false);}}
                    // onPress={() => applyFilter(parseInt(day))}
                  >
                    <Text
                      style={[
                        styles.modalOption,
                        {
                          color: COLORS.white,
                          fontFamily: 'Poppins-SemiBold',
                        },
                      ]}>
                      {day === '365' ? '1 year' : `${day} days`}
                    </Text>
                    {selectedDays === parseInt(day) ? (
                      <Image
                        source={images.tick}
                        style={{
                          width: scale(25),
                          height: scale(25),
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <Text></Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.pieChartWrapper}>
          <PieChart
            data={pieData?.length ? pieData : [{value: 1, color: '#CCCCCC'}]}
           // data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={95}
            innerRadius={50}
            innerCircleColor="#F4F4F4"
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelText}></Text>
                <Text style={styles.centerLabelSubtext}></Text>
              </View>
            )}
          />
          {renderLegendComponent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: moderateScale(36),
    backgroundColor: '#F8F9FA',
  },
  header: {
    marginBottom: moderateScale(20),
  },
  greeting: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
    marginBottom: scale(12),
  },
  dashboardText: {
    fontSize: moderateScale(16),
    color: COLORS.blue,
    marginVertical: moderateScale(4),
    fontFamily: 'Poppins-Bold',
  },
  analyticsPrompt: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
  },
  filterContainer: {
    flexDirection: 'column-reverse',
    // flexDirection: 'row',
    // alignItems: 'center',
    //  justifyContent: 'space-between',
    //  marginVertical: moderateScale(10),
  },
  dateText: {
    fontSize: moderateScale(14),
    color: '#71727A',
    fontFamily: 'Poppins-Regular',
  },
  filterButton: {
    borderColor: COLORS.gray2,
    borderWidth: 1,
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(8),
    marginBottom: scale(8),
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#1F2024',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.blue,
    backgroundColor: COLORS.darkBlue,
    // padding: moderateScale(12),
    //width:'99%',
    marginVertical: moderateScale(4),
    borderRadius: moderateScale(14),
    //backgroundColor:'red'
    borderRadius: scale(22),
  },
  metricTitle: {
    fontSize: moderateScale(14),
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  metricValue: {
    fontSize: moderateScale(16),
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: scale(16),
    backgroundColor: '#FFF',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    marginBottom: moderateScale(10),
    color: '#1E88E5',
  },
  modalOption: {
    width: '85%',
    fontSize: moderateScale(16),
    paddingVertical: moderateScale(8),
    textAlign: 'center',
    backgroundColor: COLORS.blue,
    marginVertical: scale(8),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  IntroCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '99%',
  },
  pieChartWrapper: {
    margin: scale(8),
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    flex: 1,
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
    fontSize: 14,
    color: 'white',
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
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Slightly less than half to account for spacing
  },
  legendText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
});

export default BusinessHomeScreen;
