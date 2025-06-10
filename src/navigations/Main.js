import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import COLORS from '../constants/color';
import {images} from '../assets/images';
import {ActivityIndicator, Alert, Image, Linking, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  SettingScreen,
  SearchScreen,
  ProfileSetting,
  SavedScreen,
  SplashBusiness2,
  SelectBusinessType,
  ConfirmSubscription,
  PaymentMethodScreen,
  SubscriptionPlans,
  ForgotPassword,
  SignUpScreen,
  SignInScreen,
  SplashBusiness,
  RoleScreen,
  OnboardingScreenTwo,
  OnboardingScreenOne,
  CurrencyScreen,
  LanguageScreen,
  CountryScreen,
  SplashScreenTwo,
  SplashScreenOne,
  BusinessHomeScreen,
  EditBusiness,
  SettingYourProfile,
  SavedPaymentMethod,
  ChatScreen,
  BussinessCurrencyScreen,
  BussinessCountryScreen,
  BussinessLanguageScreen,
  BussinessChatListingScreen,
  PaymentWebView,
} from '../screens/Business';
import {
  CategoriesViewMore,
  CheckInBusiness,
  ConsumerChatListingScreen,
  ConsumerChatScreen,
  ConsumerCountryScreen,
  ConsumerCurrencyScreen,
  ConsumerHomeScreen,
  ConsumerLanguageScreen,
  ConsumserBusinessProfile,
  EditProfileScreen,
  ForgotPasswordConsumer,
  ProfileConsumerScreen,
  ReviewBusinessProfile,
  SavedConsumerScreen,
  SearchConsumerScreen,
  SettingConsumerScreen,
  SettingYourProfileConsumer,
  SignInConsumerScreen,
  SignUpConsumerScreen,
  SplashConsumer,
  ViewAllBusinesses,
  ViewCommunityConsumerScreen,
} from '../screens/Consumer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Additional screens go here...

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ConsumerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#EB3030',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          // paddingBottom: 3,
          fontSize: 12,
          fontFamily: 'Inter_24-Regular',
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let tintColor = focused ? '#EB3030' : '#000000';

          switch (route.name) {
            case 'ConsumerHomeScreen':
              iconName = images.home;
              break;
            case 'SavedConsumerScreen':
              iconName = images.heart;
              break;
            case 'ProfileConsumerScreen':
              return (
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: '#fff',
                    borderRadius: scale(30),
                    width: scale(50),
                    height: scale(50),
                    alignSelf: 'center',
                    justifyContent: 'center',

                    resizeMode: 'contain',
                    position: 'absolute',
                    bottom: 2,
                    borderWidth: focused ? 2 : 0,
                    borderBlockColor: focused ? '#EB3030' : '#fff',
                  }}>
                  <Image
                    source={images.userProfile}
                    style={{
                      // backgroundColor: '#848',
                      // borderRadius: 25,
                      width: scale(32),
                      height: scale(32),
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      tintColor: tintColor,
                      // resizeMode: 'contain',
                      // position: 'absolute',
                      // bottom: 15,
                    }}
                  />
                </View>
              );
            case 'SearchConsumerScreen':
              iconName = images.search;
              break;
            case 'SettingConsumerScreen':
              iconName = images.settings;
              break;
            default:
              break;
          }

          return (
            <Image
              source={iconName}
              style={{
                tintColor: tintColor,
                width: scale(25),
                height: scale(25),
                resizeMode: 'contain',
                // marginBottom: 3,
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="ConsumerHomeScreen"
        component={ConsumerHomeScreen}
        options={{tabBarLabel: 'Home'}} // Custom label
      />
      <Tab.Screen
        name="SavedConsumerScreen"
        component={SavedConsumerScreen}
        options={{tabBarLabel: 'Saved'}} // Custom label
      />
      <Tab.Screen
        name="ProfileConsumerScreen"
        component={ProfileConsumerScreen}
        options={{tabBarLabel: ''}} // Custom label
      />
      <Tab.Screen
        name="SearchConsumerScreen"
        component={SearchConsumerScreen}
        options={{tabBarLabel: 'Search'}} // Custom label
      />
      <Tab.Screen
        name="SettingConsumerScreen"
        component={SettingConsumerScreen}
        options={{tabBarLabel: 'Settings'}} // Custom label
      />
    </Tab.Navigator>
  );
}

function BusinessTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#EB3030',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          // paddingBottom: 3,
          fontSize: 12,
          fontFamily: 'Inter_24-Regular',
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let tintColor = focused ? '#EB3030' : '#000000';

          switch (route.name) {
            case 'BusinessHomeScreen':
              iconName = images.home;
              break;
            case 'SavedScreen':
              iconName = images.heart;
              break;
            case 'ProfileSetting':
              return (
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: '#fff',
                    borderRadius: scale(30),
                    width: scale(50),
                    height: scale(50),
                    alignSelf: 'center',
                    justifyContent: 'center',

                    resizeMode: 'contain',
                    position: 'absolute',
                    bottom: 2,
                    borderWidth: focused ? 2 : 0,
                    borderBlockColor: focused ? '#EB3030' : '#fff',
                  }}>
                  <Image
                    source={images.userProfile}
                    style={{
                      // backgroundColor: '#848',
                      // borderRadius: 25,
                      width: scale(32),
                      height: scale(32),
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      tintColor: tintColor,
                      // resizeMode: 'contain',
                      // position: 'absolute',
                      // bottom: 15,
                    }}
                  />
                </View>
              );
            case 'SearchScreen':
              iconName = images.search;
              break;
            case 'SettingScreen':
              iconName = images.settings;
              break;
            default:
              break;
          }

          return (
            <Image
              source={iconName}
              style={{
                tintColor: tintColor,
                width: scale(25),
                height: scale(25),
                resizeMode: 'contain',
                // marginBottom: 3,
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="BusinessHomeScreen"
        component={BusinessHomeScreen}
        options={{tabBarLabel: 'Home'}} // Custom label
      />
      <Tab.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{tabBarLabel: 'SBS'}} // Custom label
      />
      <Tab.Screen
        name="ProfileSetting"
        component={EditBusiness}
        options={{tabBarLabel: ''}} // Custom label
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{tabBarLabel: 'Search'}} // Custom label
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{tabBarLabel: 'Settings'}} // Custom label
      />
    </Tab.Navigator>
  );
}

function ConsumerDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      {/* <Drawer.Screen name="Tabs" component={ConsumerTabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} /> */}
      {/* Additional consumer drawer items */}
    </Drawer.Navigator>
  );
}

function BusinessDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      {/* <Drawer.Screen name="Tabs" component={BusinessTabNavigator} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Settings" component={Settings} /> */}
      {/* Additional business drawer items */}
    </Drawer.Navigator>
  );
}

function AuthStack() {
 // console.log('AuthStack');

  return (
    <Stack.Navigator initialRouteName="SplashScreenOne">
      <Stack.Screen
        name="OnboardingScreenOne"
        component={OnboardingScreenOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingScreenTwo"
        component={OnboardingScreenTwo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CountryScreen"
        component={CountryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CurrencyScreen"
        component={CurrencyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RoleScreen"
        component={RoleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashBusiness"
        component={SplashBusiness}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubscriptionPlans"
        component={SubscriptionPlans}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmSubscription"
        component={ConfirmSubscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectBusinessType"
        component={SelectBusinessType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashBusiness2"
        component={SplashBusiness2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BusinessTabNavigator"
        component={BusinessTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBusiness"
        component={EditBusiness}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingYourProfile"
        component={SettingYourProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedPaymentMethod"
        component={SavedPaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="BussinessChatListingScreen"
        component={BussinessChatListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BussinessCurrencyScreen"
        component={BussinessCurrencyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BussinessCountryScreen"
        component={BussinessCountryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BussinessLanguageScreen"
        component={BussinessLanguageScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="CurrencyScreen"
        component={CurrencyScreen}
        options={{headerShown: false}}
      /> */}
      {/* =====Consumer Screens==== */}
      <Stack.Screen
        name="SplashConsumer"
        component={SplashConsumer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInConsumerScreen"
        component={SignInConsumerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordConsumer"
        component={ForgotPasswordConsumer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpConsumerScreen"
        component={SignUpConsumerScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ConsumerHomeScreen"
        component={ConsumerHomeScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ConsumerTabNavigator"
        component={ConsumerTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewCommunityConsumerScreen"
        component={ViewCommunityConsumerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoriesViewMore"
        component={CategoriesViewMore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewAllBusinesses"
        component={ViewAllBusinesses}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumserBusinessProfile"
        component={ConsumserBusinessProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewBusinessProfile"
        component={ReviewBusinessProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingYourProfileConsumer"
        component={SettingYourProfileConsumer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumerChatScreen"
        component={ConsumerChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumerChatListingScreen"
        component={ConsumerChatListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BussinessChatListingScreen"
        component={BussinessChatListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumerCountryScreen"
        component={ConsumerCountryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumerCurrencyScreen"
        component={ConsumerCurrencyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConsumerLanguageScreen"
        component={ConsumerLanguageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Main() {
  const [userType, setUserType] = useState(null); // 'null' for not logged in, 'consumer', or 'business'
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('');
  // const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      console.log("Deep link received:", url);

      if (url?.startsWith('myapp://payment-status')) {
        const success = url.includes('success=true');
        if (success) {
          Alert.alert('✅ Payment Successful');
                      setInitialRouteName('SignInScreen');

          // navigation.navigate('Home'); // or your desired screen
        } else {
          Alert.alert('❌ Payment Failed');
                      setInitialRouteName('SignInScreen');

          // navigation.goBack(); // or any fallback
        }
      }
    };

    // Listen for incoming links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle cold starts
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => subscription.remove();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user and token from AsyncStorage
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');

        if (user && token) {
          const parsedUser = JSON.parse(user);
          setIsLoggedIn(true);
          // Check role_id to determine user type
          if (parsedUser.role_id === 1) {
            setUserType('business');
            setInitialRouteName('BusinessTabNavigator');
          } else {
            setUserType('consumer');
            setInitialRouteName('ConsumerTabNavigator');
          }
        } else {
          const country = await AsyncStorage.getItem('country');
          const currency = await AsyncStorage.getItem('currency');
          const language = await AsyncStorage.getItem('language');
          if (currency && language && country) {
            setInitialRouteName('RoleScreen');
          } else {
            setUserType('null');
            setInitialRouteName('OnboardingScreenOne');
          }
          // If no user or token, set userType to 'null'
        }
        //setInitialRouteName(userType)
        console.log('userType', userType);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserType('null'); // Default to 'null' in case of error
      } finally {
        setIsLoading(false); // End the loading state
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking AsyncStorage
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    ); // Replace with your custom loading screen component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {/* {isLoggedIn ? (
          <>
            {userType === 'business' ? (
              <Stack.Screen
                name="BusinessTabNavigator"
                component={BusinessTabNavigator}
                options={{headerShown: false}}
              />
            ) : (
              <Stack.Screen
                name="ConsumerTabNavigator"
                component={ConsumerTabNavigator}
                options={{headerShown: false}}
              />
            )}
          </>
        ) : (
          <> */}
        <Stack.Screen
          name="OnboardingScreenOne"
          component={OnboardingScreenOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardingScreenTwo"
          component={OnboardingScreenTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CountryScreen"
          component={CountryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CurrencyScreen"
          component={CurrencyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RoleScreen"
          component={RoleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashBusiness"
          component={SplashBusiness}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubscriptionPlans"
          component={SubscriptionPlans}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethodScreen"
          component={PaymentMethodScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
        options={{headerShown: false}}
      />
        <Stack.Screen
          name="ConfirmSubscription"
          component={ConfirmSubscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectBusinessType"
          component={SelectBusinessType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashBusiness2"
          component={SplashBusiness2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BusinessTabNavigator"
          component={BusinessTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditBusiness"
          component={EditBusiness}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingYourProfile"
          component={SettingYourProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavedPaymentMethod"
          component={SavedPaymentMethod}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BussinessCurrencyScreen"
          component={BussinessCurrencyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BussinessCountryScreen"
          component={BussinessCountryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BussinessLanguageScreen"
          component={BussinessLanguageScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
        name="CurrencyScreen"
        component={CurrencyScreen}
        options={{headerShown: false}}
      /> */}
        {/* =====Consumer Screens==== */}
        <Stack.Screen
          name="SplashConsumer"
          component={SplashConsumer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignInConsumerScreen"
          component={SignInConsumerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordConsumer"
          component={ForgotPasswordConsumer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpConsumerScreen"
          component={SignUpConsumerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerHomeScreen"
          component={ConsumerHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerTabNavigator"
          component={ConsumerTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewCommunityConsumerScreen"
          component={ViewCommunityConsumerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoriesViewMore"
          component={CategoriesViewMore}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewAllBusinesses"
          component={ViewAllBusinesses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumserBusinessProfile"
          component={ConsumserBusinessProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReviewBusinessProfile"
          component={ReviewBusinessProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingYourProfileConsumer"
          component={SettingYourProfileConsumer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckInBusiness"
          component={CheckInBusiness}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerChatScreen"
          component={ConsumerChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerChatListingScreen"
          component={ConsumerChatListingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BussinessChatListingScreen"
          component={BussinessChatListingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerCountryScreen"
          component={ConsumerCountryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerCurrencyScreen"
          component={ConsumerCurrencyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConsumerLanguageScreen"
          component={ConsumerLanguageScreen}
          options={{headerShown: false}}
        />
        {/* Add other unauthenticated screens */}
        {/* </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
