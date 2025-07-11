import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity,TextInput, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import ButtonComp from '../../../components/ButtonComp';
import COLORS from '../../../constants/color';
import SimpleTextInput from '../../../components/SimpleTextInput';
import PasswordTextInput from '../../../components/PasswordTextInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputComp from '../../../components/TextInputComp';
import TextInputPassComp from '../../../components/TextInputPassComp';
import { images } from '../../../assets/images';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function SignInConsumerScreen({navigation}) {
  const dispatch=useDispatch() 
  const text = '';
      const[userName,setUserName]=useState("")
      const [password, setPassword] = useState("");
       const[loader,setLoader]=useState(false)
       const [isConnected, setIsConnected] = useState(true);
     
      const {loading, error} = useSelector(state => state.api);
      const [flatTextSecureEntry,setFlatTextSecureEntry]=useState(true)
        useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
  });

  // Also fetch once on mount
  NetInfo.fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  return () => unsubscribe();
}, []);
     const handleUserName=(text)=>{
      setUserName(text)
     }
      const handlePassword = (text) => {
        setPassword(text);
      };
     const handleLogin = async () => {
       const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    Alert.alert('No Internet', 'Please check your internet connection.');
    return;
  }

        if (!userName) {
          alert('Please enter username or email');
          return;
        }
        if (!password) {
          alert('Please enter password');
          return;
        }
         setLoader(true)
       const data = {email: userName, password: password};
       try {
         const response = await dispatch(login(data)).unwrap();
        
         if (response?.user?.status==1) {
          Alert.alert("Alert",'Your account has been deleted.')
             setLoader(false)
          return
         }
          await AsyncStorage.setItem('userPic', `https://swaai.net/public/${response?.user?.profile_image}`);

           await AsyncStorage.setItem('user', JSON.stringify(response.user));
           await AsyncStorage.setItem('token', response.token);
         console.log('response:', response);
          setUserName('');
          setPassword('');
         
           if(response?.user.is_reviewed==1){
           navigation.reset({index: 0, routes: [{name: 'ConsumerTabNavigator'}]});
         }
             if (response.user.role_id==2){
 navigation.reset({index: 0, routes: [{name: 'ConsumerTabNavigator'}]});
// navigation.navigate('ConsumerTabNavigator')
             }else{
              Alert.alert('Alert','Your have register as a Bussiness')
             }
                setLoader(false)
   } catch (err) {
       setLoader(false)
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
     };
     if (!isConnected) {
       return (
         <View style={styles.noInternetContainer}>
           <Image
             source={require('../../../assets/images/noiternet.jpg')} // or use a URL
             style={styles.noInternetImage}
             resizeMode="contain"
           />
           <Text style={styles.noInternetTitle}>No Internet Connection</Text>
           <Text style={styles.noInternetSubtitle}>
             Please check your Wi-Fi or mobile data.
           </Text>
           <TouchableOpacity
             style={styles.retryButton}
             onPress={() => {
              const netInfo =  NetInfo.fetch();
     if (!netInfo.isConnected) {
       Alert.alert('No Internet', 'Please check your internet connection.');
       return;
     }
             }}>
             <Text style={styles.retryButtonText}>Retry</Text>
           </TouchableOpacity>
         </View>
       );
     }
  return (
         <KeyboardAvoidingView
        style={{flex: 1,backgroundColor:"white"}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback
        // onPress={Keyboard.dismiss}
        >
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View
        style={{
          width: '80%',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={styles.title}>Welcome Back!</Text>
      </View>
      <TextInputComp
        leftIcon="user"
        placeholder="Username or Email"
        placeholderTextColor="#676767"
        value={userName}
        onChangeText={text => handleUserName(text)}
      />
      <TextInputPassComp
        leftIcon="lock"
        placeholder="Password"
        value={password}
        onChange={text => handlePassword(text)}
        rightIco=""
        flatTextSecureEntry={flatTextSecureEntry}
        isflatTextSecureEntry={() =>
          setFlatTextSecureEntry(!flatTextSecureEntry)
        }
      />
      {/* <View style={styles.inputContainer}>
        <FontAwesome
          name="lock"
          size={scale(24)}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TouchableOpacity style={styles.eyeIconContainer}>
          <Ionicons name="eye-outline" size={scale(25)} color="#888" />
        </TouchableOpacity>
      </View> */}

      {/* <SimpleTextInput
        label="Username or Email"
        placeholder="Enter Username or Email"
        leftIcon="account"
        value={userName}
        onChangeText={text => setUserName(text)}
      /> */}
      {/* <PasswordTextInput
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        leftIcon="lock"
        secureTextEntry={flatTextSecureEntry}
        rightIcon="e"
        flatTextSecureEntry={flatTextSecureEntry}
        isflatTextSecureEntry={() =>
          setFlatTextSecureEntry(!flatTextSecureEntry)
        }
      /> */}

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPasswordConsumer')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={{marginBottom: scale(20), marginTop: scale(19)}}>
          {loader?
        <View style={ {width: '90%',
    paddingVertical: scale(5),
    borderRadius: scale(8),
    alignItems: 'center',
    marginVertical: scale(8),
    alignSelf:'center',
    backgroundColor:COLORS.green}}>
          <ActivityIndicator size={25} color={COLORS.white}/>
        </View>
        :
        <ButtonComp
          title="Login"
          backgroundColor={COLORS.green}
          onPress={() => handleLogin()}
          // onPress={() => navigation.navigate('ConsumerTabNavigator')}
        />
}
      </View>
      <Text style={styles.orText}>- OR Continue with -</Text>

      {/* <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.googleLogo} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.appleLogo} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.facebookIcon} style={styles.socialIcon} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Create An Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUpConsumerScreen')}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
     </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: '20@s',
    backgroundColor: 'white',
  },
  title: {
    fontSize: '38@s',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
    marginBottom: '30@vs',
    marginTop: '40@vs',
    paddingHorizontal: '20@s',

    // width:'60%'
  },

  input: {
    marginBottom: '15@vs',
    backgroundColor: '#f7f7f7',
  },
  forgotPassword: {
    width: '90%',
    marginTop: '10@vs',
    alignSelf: 'center',
    marginBottom: '20@vs',
  },
  forgotPasswordText: {
    color: COLORS.green,
    fontFamily: 'Poppins-Regular',
    fontSize: '13@s',
    textAlign: 'right',
  },

  orText: {
    textAlign: 'center',
    color: '#575757',
    marginBottom: '20@vs',
    fontFamily: 'Poppins-Regular',
    fontSize: scale(12),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20@vs',
  },
  socialIcon: {
    width: scale(30),
    height: scale(30),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '13@s',
  },
  signupLink: {
    color: COLORS.green,
    fontFamily: 'Poppins-SemiBold',
    fontSize: '13@s',
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    width: '90%',
    marginVertical: '8@ms',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: '8@ms',
    // height:'48@vs'
    padding: '6@ms',
    // backgroundColor:'red'
  },
  inputIcon: {
    marginRight: '10@ms',
  },
  input: {
    flex: 1,
    fontSize: '16@ms',
    color: '#000',
  },
  eyeIconContainer: {
    marginLeft: '8@ms',
  },
  imageCont: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAFDFB',
    marginHorizontal: '10@s',
    borderWidth: 1,
    borderColor: '#08A5F4',
  },

  noInternetContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  paddingHorizontal: '20@s',
},
noInternetImage: {
  width: '80%',
  height: '200@vs',
  marginBottom: '20@vs',
},
noInternetTitle: {
  fontSize: '22@s',
  fontWeight: 'bold',
  color: '#222',
  marginBottom: '10@vs',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
noInternetSubtitle: {
  fontSize: '14@s',
  color: '#666',
  textAlign: 'center',
  marginBottom: '20@vs',
  fontFamily: 'Poppins-Regular',
},
retryButton: {
  backgroundColor: COLORS.blue,
  paddingVertical: '10@vs',
  paddingHorizontal: '30@s',
  borderRadius: '8@s',
},
retryButtonText: {
  color: '#fff',
  fontSize: '16@s',
  fontFamily: 'Poppins-SemiBold',
},

});
