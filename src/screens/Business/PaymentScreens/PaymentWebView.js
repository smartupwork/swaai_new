import React, { useState } from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { CommonActions } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../assets/images';
import COLORS from '../../../constants/color';

const PaymentWebView = ({ route, navigation }) => {
  const { stripeUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // JavaScript to inject to fix Stripe input fields
  const injectedJavaScript = `
    // Enable input fields
    document.querySelectorAll('input').forEach(input => {
      input.removeAttribute('disabled');
      input.style.opacity = '1';
    });
    
    // Fix iframe styling issues
    const style = document.createElement('style');
    style.textContent = \`
      .__PrivateStripeElement iframe {
        height: 100% !important;
        width: 100% !important;
      }
      input {
        -webkit-user-select: text !important;
        user-select: text !important;
      }
    \`;
    document.head.appendChild(style);
    
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const handleNavigation = (navState) => {
    const { url } = navState;
    setLoading(navState.loading);

    if (url.includes('payment-status')) {
      const isSuccess = url.includes('success=true');
      showPaymentResult(isSuccess);
    }
  };

  const showPaymentResult = (isSuccess) => {
    Alert.alert(
      isSuccess ? 'Payment Successful' : 'Payment Failed',
      isSuccess ? 'Thank you for your purchase!' : 'Please try again or use a different payment method.',
      [
        {
          text: 'OK',
          onPress: () => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignInScreen' }],
            })
          ),
        }
      ]
    );
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView error:', nativeEvent);
    setError(true);
    setLoading(false);
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <FontAwesome name="arrow-left" size={22} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={images.headerLogo} style={styles.logo} />
        </View>

        <View style={styles.rightContainer} />
      </View>

      {/* Payment Content */}
      <View style={styles.content}>
        {error ? (
          <View style={styles.errorContainer}>
            <FontAwesome name="exclamation-circle" size={50} color={COLORS.error} />
            <Text style={styles.errorTitle}>Payment Error</Text>
            <Text style={styles.errorText}>
              Unable to load payment page. Please check your internet connection and try again.
            </Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setError(false);
                setLoading(true);
              }}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading payment gateway...</Text>
              </View>
            )} */}
            
            <WebView
              source={{ uri: stripeUrl }}
              injectedJavaScript={injectedJavaScript}
              onNavigationStateChange={handleNavigation}
              onError={handleError}
              onHttpError={handleError}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              mixedContentMode="always"
              thirdPartyCookiesEnabled={true}
              allowUniversalAccessFromFileURLs={true}
              allowFileAccess={true}
              originWhitelist={['*']}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              )}
              style={styles.webview}
              onMessage={(event) => {
                console.log('WebView message:', event.nativeEvent.data);
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: scale(5),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: scale(77),
    height: scale(77),
    resizeMode: 'contain',
  },
  rightContainer: {
    width: scale(32),
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  webview: {
    flex: 1,
    opacity: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 100,
  },
  loadingText: {
    marginTop: scale(10),
    color: COLORS.darkGray,
    fontSize: scale(14),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    backgroundColor: COLORS.background,
  },
  errorTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: COLORS.error,
    marginVertical: scale(10),
  },
  errorText: {
    fontSize: scale(14),
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: scale(20),
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(5),
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
});

export default PaymentWebView;