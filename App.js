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


