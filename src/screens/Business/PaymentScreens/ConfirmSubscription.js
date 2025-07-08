import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonComp from '../../../components/ButtonComp';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionPlans } from '../../../redux/slices/apiSlice';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmSubscription = ({navigation,route}) => {
  console.log('ConfirmSubscription:', route?.params);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedPriceId, setSelectedPriceId] = useState('');
  const {paymentData} = route?.params;
  const [loader,setLoader]=useState(false);
const {plans, loading, error} = useSelector(state => state.api);
  useEffect(() => {
    if (paymentData) {
      setSelectedPlan(paymentData.product); // Set the plan name
      setSelectedPriceId(paymentData.price_id); // Set the price ID
    }
  }, [paymentData]);
console.log('plans:', plans);
   const {initPaymentSheet, presentPaymentSheet, createPaymentMethod} =
     useStripe();

const handlePayment = async () => {
  setLoader(true);
  
  // Validate all required card fields
  if (!paymentData?.cardNumber || !paymentData?.expirationDate || !paymentData?.securityCode) {
    setLoader(false);
    Alert.alert('Error', 'Please complete all card details');
    return;
  }

  try {
    // 1. Create PaymentMethod with explicit type
    const { paymentMethod, error } = await createPaymentMethod({
      type: 'card', // Explicit payment method type (lowercase as per Stripe docs)
      billingDetails: {
        address: {
          city: paymentData.city,
          country: 'US',
          line1: paymentData.billingAddress1,
          line2: paymentData.billingAddress2,
          postalCode: paymentData.postalCode,
          state: paymentData.state,
        },
        email: paymentData.email, // Add if available
        name: paymentData.name || 'Asdf', // Default to "Asdf" if not provided
      },
      card: {
        number: paymentData.cardNumber.replace(/\s/g, ''), // Remove spaces
        expMonth: parseInt(paymentData.expirationDate.split('/')[0]),
        expYear: parseInt(paymentData.expirationDate.split('/')[1]),
        cvc: paymentData.securityCode,
      },
    });

    if (error) {
      setLoader(false);
      Alert.alert('Payment Error', error.message || 'Failed to create payment method');
      return;
    }

    // Validate payment method creation
    if (!paymentMethod?.id || paymentMethod?.type !== 'card') {
      setLoader(false);
      Alert.alert('Error', 'Valid card payment method is required');
      return;
    }

    console.log('PaymentMethod created:', {
      id: paymentMethod.id,
      type: paymentMethod.type
    });
    
    // 2. Proceed with subscription
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;

    await createSubscription(
      id, 
      paymentMethod.id, 
      paymentMethod.type, // 'card'
      paymentData.price_id,
      paymentData.product
    );
    
  } catch (err) {
    setLoader(false);
    Alert.alert('Error', err.message || 'Payment processing failed');
    console.error('Payment error:', err);
  }
};

const createSubscription = async (
  userId, 
  paymentMethodId, 
  paymentMethodType,
  priceId,
  productName
) => {
  // Validate all required parameters
  if (!userId || !paymentMethodId || !paymentMethodType || !priceId || !productName) {
    setLoader(false);
    Alert.alert('Validation Error', 'All payment details are required');
    return;
  }

  const body = JSON.stringify({
    user_id: userId,
    price_id: priceId,
    product: productName,
    payment_method_id: paymentMethodId,
    payment_method_type: paymentMethodType, // Explicitly send type
    billing_details: {
      address: {
        city: paymentData.city,
        state: paymentData.state,
        postal_code: paymentData.postalCode,
        line1: paymentData.billingAddress1,
        line2: paymentData.billingAddress2 || '' // Handle optional field
      },
      name: paymentData.name || 'Asdf' // Default name
    }
  });

  const token = await AsyncStorage.getItem('token');
  
  try {
    const response = await fetch(
      'https://swaai.net/api/create-subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Subscription failed');
    }

    setLoader(false);
    Alert.alert('Success', 'Subscription created successfully', [
      {text: 'OK', onPress: () => navigation.navigate('SelectBusinessType')}
    ]);
    
  } catch (error) {
    setLoader(false);
    Alert.alert('Subscription Error', 
      error.message || 'Failed to create subscription. Please try again.');
    console.error('Subscription Error:', {
      error,
      requestBody: body
    });
  }
};
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading subscription plans...</Text>
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load subscription plans.</Text>
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
        <Text style={styles.header}>Confirm your subscription</Text>
        {plans?.map(item => {
          return (
            <View style={{marginTop: scale(8)}}>
              <TouchableOpacity
                style={[
                  styles.planContainer,
                  selectedPlan == item.product && styles.selectedPlan,
                ]}
                onPress={() => {
                  setSelectedPlan(item.product);
                  setSelectedPriceId(item.price_id);
                }}>
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
                      <Text style={styles.discountText}>{item.product=="Monthly"?"":"-16% discount"}</Text>
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
          {
            loader?
            <ActivityIndicator/>:
          
          <ButtonComp
            title="Confirm & Subscribe"
            backgroundColor={COLORS.blue}
            onPress={()=>handlePayment()}
         //   onPress={() => navigation.navigate('SelectBusinessType')}
          />
}
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
    textAlign: 'right',
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

export default ConfirmSubscription;
