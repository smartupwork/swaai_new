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
import {ActivityIndicator, Button} from 'react-native-paper';
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
import { forgotPassword } from '../../../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
 const[loading,setLoading]=useState(false)

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);
  const [flatTextSecureEntryc, setFlatTextSecureEntryc] = useState(true);
  const handleUserName = text => {
    setUserName(text);
  };
const handleForgotPassword = async () => {
  if (!userName) {
    alert('Please enter username or email');
    return;
  }
  setLoading(true)
  const data = {email: userName};
  try {
    const response = await dispatch(forgotPassword(data)).unwrap();
    console.log('response:', response);
    setUserName('');
    Alert.alert('Success', 'Please check your email for further instructions');
    setLoading(false)
        navigation.navigate('SignInScreen');

   // navigation.navigate('ConsumerTabNavigator');
  } catch (err) {
    setLoading(false)
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
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <TextInputComp
        leftIcon="user"
        placeholder="Enter your email address"
        placeholderTextColor="#676767"
        value={userName}
        onChangeText={text => handleUserName(text)}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>
          <Text style={{color: '#FF4B26'}}>* </Text>We will send you a message
          to set or reset your new password
        </Text>
      </TouchableOpacity>
      <View style={{marginBottom: scale(30), marginTop: scale(10)}}>
        {
          loading ? <ActivityIndicator size="large" color={COLORS.blue} /> : 
        
        <ButtonComp
          title="Submit"
          backgroundColor={COLORS.blue}
          onPress={() => handleForgotPassword()}
         // onPress={() => navigation.navigate('SplashBusiness')}
        />
        }
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
    width: '84%',
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
    color: '#08A5F4',
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
