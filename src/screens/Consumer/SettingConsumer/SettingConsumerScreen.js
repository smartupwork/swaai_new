import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with your preferred library
import COLORS from '../../../constants/color';
import { useDispatch } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingConsumerScreen = ({navigation}) => {
  const dispatch = useDispatch();
   const [selectedCountry, setSelectedCountry] = useState('United States');
    const [selectedCurrency, setSelectedCurrency] = useState('');
  const[selectedLanguage,setselectedLanguage]=useState("")
  const [modalVisible, setModalVisible] = useState(false);
    const fetchSelectedCountry = async () => {
      try {
        const country = await AsyncStorage.getItem('country');
        if (country) {
          setSelectedCountry(country); // Update the state
        }
        const currency = await AsyncStorage.getItem('currency');
        if (currency) {
          setSelectedCurrency(currency); // Update the state
        }
        const language = await AsyncStorage.getItem('language');
        if (language) {
          setselectedLanguage(language); // Update the state
        }
      } catch (error) {
        console.error('Error fetching selected country:', error);
      }
    };

    // useEffect to fetch selected country when the component mounts
    useFocusEffect(
      useCallback(() => {
        fetchSelectedCountry();
      }, []),
    );
     const logout = async () => {
       await AsyncStorage.removeItem('user');
       await AsyncStorage.removeItem('token');
     };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Personal Section */}
      <View style={styles.section}>
        <Text
          onPress={() => navigation.navigate('ChatScreen')}
          style={[styles.sectionTitle, {fontFamily: 'Poppins-SemiBold'}]}>
          Personal
        </Text>
        <View style={{marginTop: scale(14)}}>
          <Text style={styles.darkText}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingYourProfileConsumer')}
            style={styles.row}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Icon name="chevron-right" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={{marginTop: scale(14)}}>
          <Text style={styles.darkText}>Shipping</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <Icon name="chevron-right" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>

      {/* Payment Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Payment</Text>
        <TouchableOpacity
        disabled
          onPress={() => navigation.navigate('SavedPaymentMethod')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Payment methods</Text>
          <Icon name="chevron-right" size={20} color="#808080" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>

      {/* Country Section */}
      <Text
        // onPress={() => navigation.navigate('ChatScreen')}
        style={[styles.sectionTitle, {fontFamily: 'Poppins-SemiBold'}]}>
        Shop
      </Text>
      <View style={styles.section}>
        <Text style={styles.darkText}>Country</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConsumerCountryScreen')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Country</Text>
          <Text style={styles.value}>
            {' '}
            {selectedCountry} {'>'}
          </Text>
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.darkText}>Currency</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConsumerCurrencyScreen')}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Currency</Text>
          <Text style={styles.value}>
            {selectedCurrency} {'>'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Terms Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Terms</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.row}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          <Icon name="chevron-right" size={20} color="#808080" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Language</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConsumerLanguageScreen')}
          style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>
            {' '}
            {selectedLanguage} {'>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      {/* Logout Section */}
      <View style={styles.section}>
        <Text style={styles.darkText}>Logout</Text>
        <TouchableOpacity
          onPress={() =>{
            logout();
          //  navigation.navigate('RoleScreen');
             navigation.reset({
               index: 0,
               routes: [{name: 'RoleScreen'}],
             });

          }}
          style={styles.row}>
          <Text style={styles.label}>Logout</Text>
          <Text style={styles.value}> {'>'}</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      <>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Terms and Condition</Text>
                <ScrollView>
                <Text style={{fontFamily:'Poppins-SemiBold',fontSize:14,paddingBottom:25,textAlign:'justify'}}>
                  
                
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
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '16@s',
  },
  header: {
    fontSize: '24@s',
    fontWeight:'800',
    fontFamily: 'Poppins-Bold',
    marginVertical: '16@vs',
  },
  section: {
    marginBottom: '24@vs',
  },
  sectionTitle: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#202020',
    // fontWeight:'600'
    //  marginBottom: '8@vs',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
    // paddingVertical: '12@vs',
  },
  label: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#202020',
    // fontWeight:'600',
    flex: 1,
  },
  value: {
    fontSize: '16@s',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  darkText: {
    fontSize: '12@s',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
    margin: 20,
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
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: scale(18),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SettingConsumerScreen;
