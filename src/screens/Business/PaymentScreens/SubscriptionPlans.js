import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonComp from '../../../components/ButtonComp';
import { useDispatch } from 'react-redux';
import { subscriptionPlans } from '../../../redux/slices/apiSlice';
import { ActivityIndicator } from 'react-native-paper';

const SubscriptionPlans = ({navigation,route}) => {
  console.log('SubscriptionPlans:', route.params);
  
  const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedPriceId, setSelectedPriceId] = useState('');

const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
const [plans, setPlans] = useState([]);

 useEffect(() => {
   const fetchSubscriptionPlans = async () => {
     try {
       // Dispatch the thunk
       const response = await dispatch(subscriptionPlans()).unwrap();
       console.log('Subscription plans:', response);
       
       setPlans(response);
     } catch (error) {
      console.error('Error fetching subscription plans:', err);

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

   fetchSubscriptionPlans();
 }, [dispatch]);

 if (isLoading) {
   return (
     <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color="#0000ff" />
       <Text>Loading subscription plans...</Text>
     </View>
   );
 }

 if (plans.length === 0) {
   return (
     <View style={styles.container}>
       <Text>No subscription plans available.</Text>
     </View>
   );
 }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Text style={styles.header}>Choose your subscription plan</Text>
        {plans?.map(item => {
          return (
            <View style={{marginTop: scale(8)}}>
              <TouchableOpacity
                style={[
                  styles.planContainer,
                  selectedPlan == item.product && styles.selectedPlan,
                ]}
                onPress={() => {setSelectedPlan(item.product);setSelectedPriceId(item.price_id)}}>
                <View
                //style={styles.planHeader}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome
                      name="circle-o"
                      size={20}
                      color={
                        selectedPlan === item.product ? COLORS.blue : '#C5C6CC'
                      }
                    />
                    <View style={{marginLeft: scale(6)}}>
                      <Text style={styles.planTitle}>{item.product}</Text>
                      <Text style={styles.discountText}>-30% discount</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.planPrice}>$ {item.price}</Text>
                  <Text style={styles.planPeriod}>{item.product}</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
              style={[
                styles.planContainer,
                selectedPlan === 'monthly' && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan('monthly')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name="circle-o"
                  size={25}
                  color={selectedPlan === 'monthly' ? COLORS.blue : '#C5C6CC'}
                />
                <Text style={[styles.planTitle, {marginLeft: scale(5)}]}>
                  Monthly
                </Text>
              </View>
              <View>
                <Text style={styles.planPrice}>$ 5.95</Text>
                <Text style={styles.planPeriod}>every month</Text>
              </View>
            </TouchableOpacity> */}
            </View>
          );
        })}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>You'll get:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="star" size={16} color={COLORS.blue} />
            <Text style={styles.featureItem}>
              Consumer insights & analytics
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="star" size={16} color={COLORS.blue} />
            <Text style={styles.featureItem}>
              Geo-targeted promotions & reach
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="star" size={16} color={COLORS.blue} />
            <Text style={styles.featureItem}>
              Fully customized profiles with unlimited updates
            </Text>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <ButtonComp
            title="Subscribe"
            backgroundColor={COLORS.blue}
            onPress={() =>
              !selectedPlan?Alert.alert('Please select a plan'):
              navigation.navigate('PaymentMethodScreen', {
                product: selectedPlan,
                price_id: selectedPriceId,
              })
            }
            //   onPress={() => navigation.navigate('PaymentMethodScreen')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: '16@s',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: '28@s',
    fontFamily: 'Poppins-SemiBold',
    // textAlign: 'center',
    marginBottom: '15@vs',
    marginTop: '30@vs',
    paddingHorizontal: scale(18),
  },
  planContainer: {
    paddingVertical: '16@s',
    paddingHorizontal: '12@s',
    borderRadius: '10@s',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: '10@vs',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderStartColor:'red'
  },
  selectedPlan: {
    backgroundColor: '#F3F3F3',
    // borderColor: '#007AFF',
    // backgroundColor:'reds'
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5@vs',
  },
  planTitle: {
    fontSize: '15@s',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  discountText: {
    fontSize: '10@s',
    color: COLORS.blue,
    marginLeft: '5@s',
    fontFamily: 'Poppins-Regular',
  },
  planPrice: {
    fontSize: '16@s',
    textAlign:'right',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-ExtraBold',
  },
  planPeriod: {
    fontSize: '12@s',
    color: '#1F2024',
    fontFamily: 'Poppins-Regular',
  },
  featuresContainer: {
    padding: '16@s',
    borderRadius: '14@s',
    backgroundColor: '#F3F3F3',
    marginVertical: '20@vs',
  },
  featuresTitle: {
    fontSize: '16@s',
    fontWeight: 'bold',
    fontFamily: 'Poppins-ExtraBold',
    marginBottom: '10@vs',
  },
  featureItem: {
    fontSize: '14@s',
    color: '#71727A',
    fontFamily: 'Poppins-Regular',
    marginLeft: scale(5),
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: '12@vs',
    borderRadius: '10@s',
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: '16@s',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});

export default SubscriptionPlans;
