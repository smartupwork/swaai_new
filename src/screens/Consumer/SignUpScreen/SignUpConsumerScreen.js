import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
    const[isTC,setIsTC]=useState(false)
      const [modalVisible, setModalVisible] = useState(false);
  const[loader,setLoder]=useState(false)
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
      setLoder(true)
      if (!userName) {
        setLoder(false)
        alert('Please enter username or email');
        return;
      }
      if (!password) {
        setLoder(false)
        alert('Please enter password');
        return;
      }
      if (!confirmPass) {
        setLoder(false)
        alert('Please enter confirm password');
        return;
      }
      if (password !== confirmPass) {
        setLoder(false)
        alert('Password and confirm password do not match');
        return;
      }
      if(!isTC){
setModalVisible(true)
 setLoder(false)
return;
}
      const data = {
        email: userName,
        role_id: 2,
        password: password,
        password_confirmation: confirmPass,
      };
        setLoder(true)
      try {
        const response = await dispatch(signUp(data)).unwrap();
        console.log('response:', response);
        setUserName("")
        setPassword("")
        setConfirmPass("")
        Alert.alert('Success', 'User created successfully');
         setLoder(false)
        navigation.navigate('SignInConsumerScreen');
      } catch (err) {
         setLoder(false)
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
     <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback 
    // onPress={Keyboard.dismiss}
    >
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <SafeAreaView style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.');
                  // setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Terms and Condition</Text>
                                    <ScrollView>
                                    <Text style={{fontFamily:'Poppins-Medium',fontSize:14,paddingBottom:25,textAlign:'justify'}}>
                                      
                                    
                    {'\n'}{'\n'}
                    Last Updated: [December 2024]{'\n'}{'\n'}
                    Welcome to SWAAI ! By downloading, accessing, or using our app, you agree to comply with
                    and be bound by the following Terms and Conditions. If you do not agree, please do not use the
                    app.{'\n'}{'\n'}
                    1. Acceptance of Terms
                    These Terms and Conditions ("Terms") govern your use of SWAAI , including all features,
                    functionalities, and services offered.{'\n'}{'\n'}
                    2. User Eligibility
                    You must be at least 18 years old to use SWAAI. By using the app, you represent and warrant
                    that you meet this age requirement.{'\n'}{'\n'}
                    3. Prohibited Activities
                    When using SWAAI you agree not to engage in the following:{'\n'}
                    • Illegal Activity: Any activities that violate applicable laws, regulations, or third-party rights.{'\n'}
                    • Harmful Behavior: Harassment, discrimination, defamation, or spamming of other users.{'\n'}
                    • Content Violations: Uploading or sharing content that is obscene, offensive, or infringes on
                    intellectual property rights.{'\n'}
                    • Misrepresentation: False claims, deceptive profiles, or impersonating another individual or
                    entity.{'\n'}
                    • Data Exploitation: Collecting or storing personal information of other users without consent.{'\n'}
                    Violation of these terms may result in suspension or termination of your account.{'\n'}{'\n'}
                    4. User Content
                    You retain ownership of any content you submit, post, or display on SWAAI. However, by
                    submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display,
                    and distribute your content in connection with the app's operation.
                    5. Privacy Policy
                    Our use of your information is governed by our Privacy Policy. Please review it to understand
                    our practices.{'\n'}{'\n'}
                    6. Account Security
                    You are responsible for maintaining the confidentiality of your account login information. Notify
                    us immediately of unauthorized access or use of your account.{'\n'}{'\n'}
                    7. Termination of Use
                    We reserve the right to terminate or suspend your access to SWAAI at our sole discretion,
                    without prior notice, for conduct that we deem to be in violation of these Terms or harmful to the
                    app, its users, or third parties.{'\n'}{'\n'}
                    8. Disclaimer of Warranties
                    SWAAI is provided "as is" without warranties of any kind, either express or implied. We do not
                    guarantee the accuracy, reliability, or availability of the app or its content.{'\n'}{'\n'}
                    9. Limitation of Liability
                    To the fullest extent permitted by law, SWAAI and its affiliates will not be liable for any indirect,
                    incidental, or consequential damages resulting from your use of the app.{'\n'}{'\n'}
                    10. Changes to Terms
                    We may update these Terms periodically. Continued use of the app after changes have been
                    made constitutes your acceptance of the new Terms{'\n'}{'\n'}
                    11. Community Guidelines{'\n'}
                    • Treat all users with professionalism and respect.{'\n'}
                    • Do not engage in spamming, offensive language, or posting inappropriate content.{'\n'}
                    • Users are encouraged to report violations through our in-app reporting feature.{'\n'}{'\n'}
                    12. Intellectual Property{'\n'}
                    • SWAAI owns all intellectual property rights to its software, design, and features.{'\n'}
                    • Users may not copy, modify, or distribute app content without authorization.{'\n'}
                    • If you believe your intellectual property rights have been infringed, contact us at [email
                    address] to file a DMCA request.{'\n'}{'\n'}
                    13. Payment and Subscription Terms{'\n'}
                    • Some features may require payment or subscription. Details will be provided in-app.{'\n'}
                    • Payments are non-refundable except as required by law.{'\n'}
                    • Automatic renewals apply unless canceled before the renewal date.{'\n'}{'\n'}
                    14. Dispute Resolution{'\n'}
                    • Governing Law: These Terms are governed by the laws of Massachusetts.{'\n'}
                    • Arbitration: Disputes will be resolved through binding arbitration in Massachusetts.{'\n'}
                    • Class Action Waiver: You waive your right to participate in class-action lawsuits.{'\n'}{'\n'}
                    15. Advertising and Sponsorship{'\n'}
                    SWAAI may display advertisements or sponsored content.{'\n'}
                    • We are not responsible for the accuracy or legality of advertised products or services.{'\n'}{'\n'}
                    16. Push Notifications and Marketing
                    By using SWAAI you consent to receive push notifications and marketing messages. You can
                    manage preferences in the app settings.{'\n'}{'\n'}
                    17. Accessibility
                    We strive to make SWAAI accessible to all users. If you encounter barriers, contact us at [email
                    address] for support.{'\n'}{'\n'}
                    18. Contact Us
                    For questions or concerns about these Terms, please contact us at [email)
                                      </Text></ScrollView>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisible(!modalVisible);setIsTC(true);handleSignUp()}}>
                      <Text style={styles.textStyle}>Agree</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
             
            </SafeAreaView>
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
          {loader?
        <View style={ {width: '90%',
    paddingVertical: scale(5),
    borderRadius: scale(8),
    alignItems: 'center',
    marginVertical: scale(8),
    alignSelf:'center',
    backgroundColor:COLORS.blue}}>
          <ActivityIndicator size={25} color={COLORS.white}/>
        </View>
        :
        <ButtonComp
          title="Create Account"
          backgroundColor={COLORS.green}
          onPress={() => handleSignUp()}
          // onPress={() => navigation.navigate('SplashBusiness')}
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
        <Text style={styles.signupText}>I Already Have an Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInConsumerScreen')}>
          <Text style={styles.signupLink}> Login</Text>
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
    // backgroundColor:'yellow'
  },
  title: {
    fontSize: '38@s',
    fontFamily: 'Poppins-SemiBold',
    // textAlign: 'center',
    marginBottom: '15@vs',
    marginTop: '30@vs',
    paddingHorizontal: scale(18),
    // backgroundColor:'pink'
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width:'100%',
    height:'100%',
   // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.green,
    alignSelf:'flex-end',
    paddingHorizontal:20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 25,
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold'
  },
});
