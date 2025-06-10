import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking, AppState, BackHandler} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonComp from '../../../components/ButtonComp';
import { useDispatch } from 'react-redux';
import { subscriptionPlans } from '../../../redux/slices/apiSlice';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionPlans = ({navigation,route}) => {
  console.log('SubscriptionPlans:', route.params);
  
 const appState = useRef(AppState.currentState);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // 1. Enhanced Deep Link Handler
  const handleDeepLink = (url) => {
    console.log('[Deep Link] Handling URL:', url);
    if (!url) return;

    if (url.includes('payment-status')) {
      const success = url.includes('success=true');
      console.log(`[Deep Link] Payment ${success ? 'successful' : 'failed'}`);
      
      Alert.alert(
        success ? '✅ Payment Successful' : '❌ Payment Failed',
        success ? 'Thank you for your purchase!' : 'Payment was not completed',
        [{
          text: 'OK',
          onPress: () => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignInScreen' }],
            })
          )
        }]
      );
      return true; // Indicate successful handling
    }
    return false;
  };

  // 2. Comprehensive Linking Setup
  useEffect(() => {
    console.log('[Setup] Initializing deep link listeners');

    // Handle cold starts (app launched via URL)
    const getInitialUrl = async () => {
      try {
        const url = await Linking.getInitialURL();
        console.log('[Initial URL]', url);
        if (url) handleDeepLink(url);
      } catch (error) {
        console.error('[Initial URL Error]', error);
      }
    };

    // Handle warm starts (app already running)
    const linkingListener = Linking.addEventListener('url', ({ url }) => {
      console.log('[URL Event]', url);
      handleDeepLink(url);
    });

    // Handle Android back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (paymentInitiated) {
        checkPaymentStatus();
        return true;
      }
      return false;
    });

    getInitialUrl();

    return () => {
      linkingListener.remove();
      backHandler.remove();
    };
  }, [paymentInitiated]);

  // 3. App State Management
  useEffect(() => {
    const handleAppStateChange = async (nextState) => {
      console.log(`[App State] Changed from ${appState.current} to ${nextState}`);

      if (paymentInitiated && 
          appState.current.match(/inactive|background/) && 
          nextState === 'active') {
        console.log('[App State] App returned from payment');
        await checkPaymentStatus();
      }

      appState.current = nextState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [paymentInitiated]);

  // 4. Payment Status Checker
  const checkPaymentStatus = async () => {
    console.log('[Payment] Checking payment status');
    try {
      // Option 1: Check with your backend
      // const status = await api.checkPaymentStatus();
      // if (status) handleDeepLink(`myapp://payment-status?success=${status.success}`);

      // Option 2: Fallback to navigation
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        })
      );
    } catch (error) {
      console.error('[Payment Check Error]', error);
    } finally {
      setPaymentInitiated(false);
    }
  };

  // 5. Initiate Payment
  const handleSubscribe = async () => {
    console.log('[Payment] Initiating payment');
    setPaymentInitiated(true);

    const returnUrl = 'myapp://payment-status?success=true';
    const paymentUrl = `https://your-payment-gateway.com?return_url=${encodeURIComponent(returnUrl)}`;

    try {
      console.log('[Payment] Opening URL:', paymentUrl);
      const supported = await Linking.canOpenURL(paymentUrl);
      if (!supported) {
        Alert.alert('Error', "This payment method isn't available");
        return;
      }

      await Linking.openURL(paymentUrl);
    } catch (error) {
      console.error('[Payment Error]', error);
      Alert.alert('Error', 'Failed to open payment page');
      setPaymentInitiated(false);
    }
  };
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
                      <Text style={styles.discountText}>{item.product=="Yearly"&&"-16% discount"}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.planPrice}>$ {item.product=="Yearly"?"49.95":item.price}</Text>
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
//             onPress={async () => {
//   if (!selectedPlan) {
//     Alert.alert('Please select a plan');
//     return;
//   }

//   try {
//     const token = await AsyncStorage.getItem('token');
//     const userJson = await AsyncStorage.getItem('user');
//     const user = userJson ? JSON.parse(userJson) : {};
//     const email = user?.email || 'user@example.com';

//     const returnUrl = 'myapp://payment-status?success=true';
//     const baseUrl = 'https://r6u.585.mytemp.website/subscribe';

//     const url = `${baseUrl}?token=${encodeURIComponent(token)}&user_id=${user?.id}&product=${encodeURIComponent(selectedPlan)}&price_id=${encodeURIComponent(selectedPriceId)}&email=${encodeURIComponent(email)}`;

//     navigation.navigate('PaymentWebView', { stripeUrl: url });
//   } catch (err) {
//     Alert.alert('Error', 'Something went wrong');
//   }
// }}

onPress={async () => {
  if (!selectedPlan) {
    Alert.alert('Please select a plan');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    const userJson = await AsyncStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : {};

    const email = user?.email || 'user@example.com';

    if (!token || !email) {
      Alert.alert('Missing user info', 'Token or email is missing.');
      return;
    }

    const returnUrl = 'myapp://payment-status?success=true'; // Your app’s scheme
    const baseUrl = 'https://r6u.585.mytemp.website/subscribe';

    const url = `${baseUrl}?token=${encodeURIComponent(token)}&user_id=${user?.id}&product=${selectedPlan}&price_id=${selectedPriceId}&email=${encodeURIComponent(email)}`;

    console.log('Stripe Payment URL:', url);
    console.log('Stripe Payment URL (FULL):');
for (let i = 0; i < url.length; i += 100) {
  console.log(url.substring(i, i + 100));
}
setTimeout(() => {
   navigation.reset({
              index: 0,
              routes: [{ name: 'SignInScreen' }],
            })
}, 2000);

    Linking.openURL(url).catch(err =>
      Alert.alert('Failed to open subscription link', err.message),
    );
  } catch (err) {
    Alert.alert('Error', 'Failed to retrieve user info from storage.');
  }
}}


            // onPress={() =>
            //   !selectedPlan?Alert.alert('Please select a plan'):
            //   navigation.navigate('PaymentMethodScreen', {
            //     product: selectedPlan,
            //     price_id: selectedPriceId,
            //   })
            // }
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
