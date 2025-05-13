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
  setLoader(true)
  console.log('handlePayment');
//  if (!cardDetails?.complete) {
//    Alert.alert('Error', 'Please enter complete card details');
//    return;
//  }

//  try {
//    // Create a token
//    const {token, error} = await createToken({
//      type: 'Card',
//      address: {
//        city: 'San Francisco',
//        country: 'US',
//        line1: '510 Townsend St',
//        postalCode: '94103',
//        state: 'CA',
//      },
//    });

//    if (error) {
//      Alert.alert('Error', error.message);
//      console.log('Error', error.message);
     
//    } else {
//      // Send the token to your backend
//      console.log('Generated Token:', token.id);
//      Alert.alert('Token generated', `Token ID: ${token.id}`);
//    }
//  } catch (err) {
//   console.log('Error', 'Something went wrong');
  
//    Alert.alert('Error', 'Something went wrong');
//  }
const user = await AsyncStorage.getItem('user');
 const parsedUser = JSON.parse(user);

const id = parsedUser.id;

 
  // Use the token in your backend API call
  await createSubscription(id);
};
const createSubscription = async id => {
  const body = JSON.stringify({
    user_id: id,
    price_id: selectedPriceId, // Use state value

    product: selectedPlan, // Use state value
    card_number: paymentData.cardNumber,
    expiry_date: paymentData.expirationDate,
    cvc: paymentData.securityCode,
    zip_code: paymentData.postal_code,
    billing_address1: paymentData.billingAddress1,
    billing_address2: paymentData.billingAddress2,
    city: paymentData.city,
    state: paymentData.state,
    postal_code: paymentData.postalCode,
  });
  console.log('Request Body:', body);
  
  const token = await AsyncStorage.getItem('token');
console.log("tikm",token);

  try {
    const response = await fetch(
      'https://r6u.585.mytemp.website/api/create-subscription',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      },
    );
    const result = await response.json();
    setLoader(false)
    Alert.alert('Subscription', result.message, [{text: 'OK'}]);
    navigation.navigate('SelectBusinessType')
    console.log('Subscription Result:', result.message);
  } catch (error) {
    setLoader(false)
    Alert.alert('Error', 'Something went wrong with the subscription.', [
      {text: 'OK'},
    ]);
    console.error('Subscription Error:', error);
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
