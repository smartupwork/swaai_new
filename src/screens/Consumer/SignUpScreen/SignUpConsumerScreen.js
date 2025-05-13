import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
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
import {images} from '../../../assets/images';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../redux/slices/apiSlice';


export default function SignUpConsumerScreen({navigation}) {
 const dispatch=useDispatch()
  const text = '';
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);
  const [flatTextSecureEntryc, setFlatTextSecureEntryc] = useState(true);
  const handleUserName = text => {
    setUserName(text);
  };
  const handlePassword = text => {
    setPassword(text);
  };
  const handleConfPassword = text => {
    setConfirmPass(text);
  };
    const handleSignUp = async () => {
      if (!userName) {
        alert('Please enter username or email');
        return;
      }
      if (!password) {
        alert('Please enter password');
        return;
      }
      if (!confirmPass) {
        alert('Please enter confirm password');
        return;
      }
      if (password !== confirmPass) {
        alert('Password and confirm password do not match');
        return;
      }
      const data = {
        email: userName,
        role_id: 2,
        password: password,
        password_confirmation: confirmPass,
      };
      try {
        const response = await dispatch(signUp(data)).unwrap();
        console.log('response:', response);
        setUserName("")
        setPassword("")
        setConfirmPass("")
        Alert.alert('Success', 'User created successfully');
        navigation.navigate('SignInConsumerScreen');
      } catch (err) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInputComp
        leftIcon="user"
        placeholder="Email"
        placeholderTextColor="#676767"
        value={userName}
        onChangeText={text => handleUserName(text)}
      />
      <TextInputPassComp
        leftIcon="lock"
        placeholder=" Password"
        value={password}
        onChange={text => handlePassword(text)}
        rightIco=""
        flatTextSecureEntry={flatTextSecureEntry}
        isflatTextSecureEntry={() =>
          setFlatTextSecureEntry(!flatTextSecureEntry)
        }
      />
      <TextInputPassComp
        leftIcon="lock"
        placeholder="Confirm password"
        value={confirmPass}
        onChange={text => handleConfPassword(text)}
        rightIco=""
        flatTextSecureEntry={flatTextSecureEntryc}
        isflatTextSecureEntry={() =>
          setFlatTextSecureEntryc(!flatTextSecureEntryc)
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

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>
          By clicking the<Text style={{color: COLORS.green}}> Register</Text>{' '}
          button, you agree to the public offer
        </Text>
      </TouchableOpacity>
      <View style={{marginBottom: scale(30), marginTop: scale(10)}}>
        <ButtonComp
          title="Create Account"
          backgroundColor={COLORS.green}
          onPress={() => handleSignUp()}
          // onPress={() => navigation.navigate('SplashBusiness')}
        />
      </View>
      <Text style={styles.orText}>- OR Continue with -</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.googleLogo} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.appleLogo} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageCont}>
          <Image source={images.facebookIcon} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>I Already Have an Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInConsumerScreen')}>
          <Text style={styles.signupLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: '20@s',
    backgroundColor: 'white',
  },
  title: {
    fontSize: '38@s',
    fontFamily: 'Poppins-SemiBold',
    // textAlign: 'center',
    marginBottom: '15@vs',
    marginTop: '30@vs',
    paddingHorizontal: scale(18),
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
    color: '#676767',
    fontFamily: 'Poppins-Regular',
    fontSize: '13@s',
    width:'84%'
    // textAlign: 'right',
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
});
