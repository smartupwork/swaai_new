import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Main from './src/navigations/Main'
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
// const STRIPE_PUBLISHABLE_KEY =
//   'pk_test_51P18o5D7VDcQ5LWGHa1Tvmu755UouKGFndbuaXc0FQw2e1hFLrCLaR0ORYkpsjTBW1szZMxk0jZAHdoerYvEm77d00HUJiIf6c';
  const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51QrhQ9HDHNBsarPnHpbwTq4R9WtN09EZInksM24Q4WprDpTXEOVbMbBRe1uLA550TNHzHJAmwf9XLreP8sSyHdZ300lkLW4iUY';
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <PaperProvider>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Main />
            </View>
          </SafeAreaView>
        </PaperProvider>
      </StripeProvider>
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({})





// import React from 'react';
// import {View, Button, Alert, StyleSheet} from 'react-native';
// import {
//   StripeProvider,
//   CardField,
//   useStripe,
// } from '@stripe/stripe-react-native';

// export default function App() {
//   return (
//     <StripeProvider publishableKey="pk_test_51P18o5D7VDcQ5LWGHa1Tvmu755UouKGFndbuaXc0FQw2e1hFLrCLaR0ORYkpsjTBW1szZMxk0jZAHdoerYvEm77d00HUJiIf6c">
//       <PaymentScreen />
//     </StripeProvider>
//   );
// }

// function PaymentScreen() {
//   const {createToken} = useStripe();

//   const handlePayment = async () => {
//     console.log('handlePayment called');

//     try {
//       console.log('Creating token...');

//       // Create token using CardField
//       const {token, error} = await createToken({
//         type: 'Card',
//       });

//       if (error) {
//         console.error('Error creating token:', error);
//         Alert.alert(
//           'Error',
//           error.localizedMessage || 'Card details not complete',
//         );
//       } else {
//        await createSubscription(token);
//         console.log('Generated Token:', token);
//         Alert.alert('Success', `Token generated: ${token.id}`);
//       }
//     } catch (err) {
//       console.error('Unexpected Error in handlePayment:', err);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   const createSubscription = async token => {
//     const body = JSON.stringify({
//       user_id: 2,
//       price_id: 'price_1QFzpLD7VDcQ5LWGOhYCTXGr', // Use state value
//       token: token.id, // Directly use the passed argument
//       product: 'golden yearly plan', // Use state value
//       card_number: '4242424242424242',
//       expiry_date: '12/34',
//       cvc: 123,
//       zip_code: '94103',
//       billing_address1: 'null',
//       billing_address2: 'null',
//       city: 'null',
//       state: 'null',
//       postal_code: '94103',
//     });

//     try {
//       const response = await fetch(
//         'http://127.0.0.1:8000/api/create-subscription',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body,
//         },
//       );

//       const result = await response.json();
//       Alert.alert('Subscription', 'Subscription successful!', [{text: 'OK'}]);
//       console.log('Subscription Result:', result);
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong with the subscription.', [
//         {text: 'OK'},
//       ]);
//       console.error('Subscription Error:', error);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {/* CardField to collect card details */}
//       <CardField
//         postalCodeEnabled={true}
//         placeholder={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={{
//           backgroundColor: '#FFFFFF',
//           textColor: '#000000',
//         }}
//         style={{
//           width: '100%',
//           height: 50,
//           marginVertical: 30,
//         }}
//         onCardChange={cardDetails => {
//           console.log('Card details:', cardDetails);
//         }}
//       />

//       <Button title="Generate Token" onPress={handlePayment} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor:'#fff'
//   },
// });  
