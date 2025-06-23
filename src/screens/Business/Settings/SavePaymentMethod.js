// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   Modal,
//   KeyboardAvoidingView,
//   TextInput,
//   Alert,

// } from 'react-native';
// import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import COLORS from '../../../constants/color';
// import ButtonComp from '../../../components/ButtonComp';
// import { useDispatch } from 'react-redux';
// import { addCard, getCards, makeCardDefault } from '../../../redux/slices/apiSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const paymentMethods = [
//   {id: '1', type: 'Mastercard', number: '**** **** **** 1234', selected: true},
//   {id: '2', type: 'Visa', number: '**** **** **** 9876', selected: false},
// ];

// const SavedPaymentMethod = ({navigation}) => {
// const dispatch=useDispatch();
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);
// const[cards,setCards]=useState([]);

//  useEffect(() => {
//     fetchCards();
//   }, [dispatch]);
//   const fetchCards = async () => {
//     //  setIsLoading(true);
//     try {
//       // Dispatch the thunk
//       const response = await dispatch(getCards()).unwrap();
     
//       console.log('response cards', response.cards);
//      setCards(response?.cards);
//       // setUserDetail(response?.data?.user?.user);
//     } catch (error) {
//       console.log('Error fetching subscription plans:', error.message);

//       // Update error state
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           'An unknown error occurred.',
//       );

//       // Display error as an alert
//       Alert.alert('Error', error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

// const [cardNumber, setCardNumber] = useState('');
// const [expiryDate, setExpiryDate] = useState('');
// const [cvc, setCvc] = useState('');
// const [name, setName] = useState('');
// const[visible,setVisible]=useState(false);
// const [isEditing, setIsEditing] = useState(false);
// const[cardId,setCardId]=useState("")
// const[stripe_card_id,setstripe_card_id]=useState("")
// const [editingCardId, setEditingCardId] = useState(null);

// const [errors, setErrors] = useState({
//   cardNumber: '',
//   expiryDate: '',
//   cvc: '',
//   name: '',
// });

// // Validation Functions
// const validateCardNumber = number =>
//   /^[0-9]{16}$/.test(number.replace(/\s/g, ''));
// const validateExpiryDate = date => {
//   const regex = /^(0[1-9]|1[0-2])\/(20[2-9][0-9])$/; // MM/YYYY format
//   if (!regex.test(date)) return false;

//   const [month, year] = date.split('/').map(Number);
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth() + 1;
//   const currentYear = currentDate.getFullYear();

//   return year > currentYear || (year === currentYear && month >= currentMonth);
// };
// const validateCVC = cvc => /^[0-9]{3,4}$/.test(cvc);
// const validateName = name => name?.trim()?.length > 0;

// // Handle Validation
// const handleValidation = (field, value) => {
//   let errorMessage = '';
//   if (field === 'cardNumber' && !validateCardNumber(value)) {
//     errorMessage = 'Card number must be 16 digits.';
//   } else if (field === 'expiryDate' && !validateExpiryDate(value)) {
//     errorMessage = 'Enter a valid expiry date (MM/YYYY) that is not expired.';
//   } else if (field === 'cvc' && !validateCVC(value)) {
//     errorMessage = 'CVC must be 3 or 4 digits.';
//   } else if (field === 'name' && !validateName(value)) {
//     errorMessage = 'Name cannot be empty.';
//   }

//   setErrors(prevErrors => ({
//     ...prevErrors,
//     [field]: errorMessage,
//   }));
// };

// const handleExpiryDateChange = value => {
//   // Automatically add `/` after MM
//   let formattedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//   if (formattedValue.length > 2) {
//     formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
//       2,
//       6,
//     )}`;
//   }
//   setExpiryDate(formattedValue);

//   // Validate as the user types
//   if (formattedValue.length === 7) {
//     handleValidation('expiryDate', formattedValue);
//   }
// };

// const handleSubmit = () => {
//   // Validate all fields
//   handleValidation('cardNumber', cardNumber);
//   handleValidation('expiryDate', expiryDate);
//   handleValidation('cvc', cvc);
//   handleValidation('name', name);

//   // Check for errors
// if (!errors.cardNumber && !errors.expiryDate && !errors.cvc && !errors.name) {
//     if (isEditing) {
//       handleUpdateCard();
//     } else {
//       handleSave();
//     }
//   } else {
//     Alert.alert('Error', 'Please fix the errors before submitting.');
//   }
// };
// const handleUpdateCard = async () => {
//   const user = await AsyncStorage.getItem('user');
//   const id = JSON.parse(user);
//       const token = await AsyncStorage.getItem('token');

//   const payload = {
//     user_id: id.id,
//     card_id: cardId,
//     stripe_card_id: stripe_card_id, // Replace with actual stripe_card_id if dynamic
//     card_number: cardNumber,
//     expiry_date: expiryDate,
//     cvc: cvc,
//     name: name,
//   };
// console.log("payload",payload);

//   try {
//     const response = await axios({
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://r6u.585.mytemp.website/api/card/edit',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//       },
//       data: JSON.stringify(payload),
//     });

//     console.log('Update response:', response.data);
//     Alert.alert('Success', 'Card updated successfully!');
//     setVisible(false);
//     setCardNumber('');
//     setExpiryDate('');
//     setCvc('');
//     setName('');
//     setIsEditing(false);
//     setEditingCardId(null);
//     fetchCards();
//   } catch (err) {
//     console.error('Update error:', err.response?.data || err.message);
//     Alert.alert('Error', err.response?.data?.message || err.message || 'Something went wrong');
//   }
// };


//   const handleSave = async () => {
//     const user = await AsyncStorage.getItem('user');

//     const id = JSON.parse(user);
//     const data = {
//       user_id: id.id,
//       card_number: cardNumber,
//       expiry_date: expiryDate,
//       cvc: cvc,
//       name:name,
//     };

//     try {
//       const response = await dispatch(addCard(data)).unwrap();

//       setIsLoading(false);
//       Alert.alert('Success', response?.message);
//      fetchCards();

//       // Close the modal
//       setVisible(false);
//       setCardNumber('');
//       setExpiryDate('');
//       setCvc('');
//       setName('');

//       // navigation.navigate('SplashBusiness2');
//     } catch (err) {
//       setIsLoading(false);
//       console.log('error', err);

//       if (typeof err === 'string') {
//         // Handle string error
//         console.error('Error:', err);
//         alert(err);
//       } else if (err && err.message) {
//         // Handle object error with message property
//         console.error('Error message:', err.message);
//         alert(err.message);
//       } else {
//         console.error('Unhandled error:', err);
//         alert('An unknown error occurred.');
//       }
//     }
//     fetchUserDetail();
//     setModalVisible(false);
//   };
//     const handleCardDefault = async (sID) => {
//       const user = await AsyncStorage.getItem('user');

//       const id = JSON.parse(user);
//       const data = {
//         user_id: id.id,
//         stripe_payment_method_id: sID,
//       };

//       try {
//         const response = await dispatch(makeCardDefault(data)).unwrap();

//         setIsLoading(false);
//         Alert.alert('Success', response?.message);
//         fetchCards();

//         // Close the modal
      

//         // navigation.navigate('SplashBusiness2');
//       } catch (err) {
//         setIsLoading(false);
//         console.log('error', err);

//         if (typeof err === 'string') {
//           // Handle string error
//           console.error('Error:', err);
//           alert(err);
//         } else if (err && err.message) {
//           // Handle object error with message property
//           console.error('Error message:', err.message);
//           alert(err.message);
//         } else {
//           console.error('Unhandled error:', err);
//           alert('An unknown error occurred.');
//         }
//       }
//       fetchUserDetail();
//       setModalVisible(false);
//     };
//   const [selectedMethod, setSelectedMethod] = useState('1');
//   const [isApplePaySelected, setIsApplePaySelected] = useState(false);

//   const handleMethodSelect = id => {
//     setSelectedMethod(id);
//     setIsApplePaySelected(false);
//   };

//   const handleApplePaySelect = () => {
//     setIsApplePaySelected(true);
//     setSelectedMethod(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Saved payment methods</Text>

//       <Text style={styles.optionLabel}>Option 3</Text>
//       <View style={styles.cardContainer}>
//         <TouchableOpacity
//           style={styles.radioContainer}
//           onPress={() => setIsApplePaySelected(false)}>
//           <FontAwesome
//             name={selectedMethod ? 'circle' : 'circle-o'}
//             size={moderateScale(20)}
//             color={selectedMethod ? COLORS.blue : COLORS.gray2}
//           />
//           <Text style={styles.radioText}>Credit Card</Text>
//         </TouchableOpacity>
//         <FlatList
//           data={cards}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <View>
//             <TouchableOpacity

//               style={[
//                 styles.cardItem,
//                 item.is_default==1 && styles.selectedCardItem,
//               ]}
//               //onPress={() => handleMethodSelect(item.id)}
//               onPress={() => handleCardDefault(item.id)}
//               >
//               <View style={styles.cardDetails}>
//                 <Text style={styles.cardText}>{item.brand}</Text>
//                 <Text style={styles.cardNumber}>************{item.last4}</Text>
//               </View>
//               {item.is_default==1 && (
//                 <FontAwesome5
//                   name="check-circle"
//                   size={moderateScale(20)}
//                   color="#007BFF"
//                 />
//               )}
//             </TouchableOpacity>

//   <TouchableOpacity
//     onPress={() => {
//       setVisible(true);
//       setIsEditing(true);
//       setEditingCardId(item.id);
//       setCardNumber(`*********${item.last4}`);  // Replace with actual key
// setExpiryDate(`${item.exp_month.toString().padStart(2, '0')}/${item.exp_year}`);
//       setCvc(item.cvc);    
//       setCardId(item.card_id)   
//       setstripe_card_id(item.card_stripe_id)        // Replace with actual key
//       setName(item.name);               // Replace with actual key
//     }}
//     style={{width:65,alignItems:'center',alignSelf:'center',marginVertical:8,padding:8, marginLeft: 10, backgroundColor: 'none', padding: 5, borderRadius: 5 ,borderWidth:2,borderColor:COLORS.blue}}
//   >
//     <Text style={{ color: COLORS.blue, fontSize: 14 ,}}>Edit</Text>
//   </TouchableOpacity>
//             </View>
//           )}
//         />
//         <TouchableOpacity onPress={() => setVisible(true)}>
//           <Text style={styles.addCardText}>+ Add new card</Text>
//         </TouchableOpacity>
//       </View>

//       {/* <Text style={styles.optionLabel}>Option 4</Text> */}
//       {/* <View style={styles.cardContainer}>
//         <TouchableOpacity
//           style={styles.radioContainer}
//           onPress={handleApplePaySelect}>
//           <FontAwesome
//             name={isApplePaySelected ? 'circle' : 'circle-o'}
//             size={moderateScale(20)}
//             color={isApplePaySelected ? COLORS.blue : COLORS.gray2}
//           />
//           <Text style={styles.radioText}>Apple Pay</Text>
//         </TouchableOpacity>
//       </View> */}

//       {/* Save Changes Button */}
//       {/* <View
//         style={{
//           marginBottom: scale(30),
//           marginTop: scale(10),
//           position: 'absolute',
//           bottom: scale(10),
//           width: '100%',
//           alignSelf: 'center',
//         }}>
//         <ButtonComp
//           title="Save Changes"
//           backgroundColor={COLORS.blue}
//           onPress={() => navigation.navigate('SplashBusiness')}
//         />
//       </View> */}
      
//       <Modal visible={visible} transparent animationType="slide">
//         <KeyboardAvoidingView behavior="padding" style={styles2.modalContainer}>
//           <View style={styles2.modal}>
//             <Text style={styles2.title}>Enter Card Information</Text>

//             {/* Card Number */}
//             <TextInput
//               style={[
//                 styles2.input,
//                 errors.cardNumber ? styles2.inputError : null,
//               ]}
//               placeholder="Card Number"
//               placeholderTextColor="#aaa"
//               keyboardType="numeric"
//               value={cardNumber}
//               onChangeText={value => {
//                 setCardNumber(value);
//                 handleValidation('cardNumber', value);
//               }}
//               maxLength={19}
//             />
//             {errors.cardNumber ? (
//               <Text style={styles2.errorText}>{errors.cardNumber}</Text>
//             ) : null}

//             {/* Expiry Date */}
//             <TextInput
//               style={[
//                 styles2.input,
//                 errors.expiryDate ? styles2.inputError : null,
//               ]}
//               placeholder="Expiry Date (MM/YYYY)"
//               placeholderTextColor="#aaa"
//               keyboardType="numeric"
//               value={expiryDate}
//               onChangeText={handleExpiryDateChange}
//               maxLength={7}
//             />
//             {errors.expiryDate ? (
//               <Text style={styles2.errorText}>{errors.expiryDate}</Text>
//             ) : null}

//             {/* CVC */}
//             <TextInput
//               style={[styles2.input, errors.cvc ? styles2.inputError : null]}
//               placeholder="CVC"
//               keyboardType="numeric"
//               placeholderTextColor="#aaa"
//               value={cvc}
//               onChangeText={value => {
//                 setCvc(value);
//                 handleValidation('cvc', value);
//               }}
//               maxLength={4}
//             />
//             {errors.cvc ? (
//               <Text style={styles2.errorText}>{errors.cvc}</Text>
//             ) : null}

//             {/* Name */}
//             <TextInput
//               style={[styles2.input, errors.name ? styles2.inputError : null]}
//               placeholder="Name on Card"
//               placeholderTextColor="#aaa"
//               value={name}
//               onChangeText={value => {
//                 setName(value);
//                 handleValidation('name', value);
//               }}
//             />
//             {errors.name ? (
//               <Text style={styles2.errorText}>{errors.name}</Text>
//             ) : null}

//             {/* Submit Button */}
//             <TouchableOpacity
//               style={styles2.submitButton}
//               onPress={handleSubmit}>
//               <Text style={styles2.submitText}>Submit</Text>
//             </TouchableOpacity>

//             {/* Close Button */}
//             <TouchableOpacity
//               onPress={() => setVisible(false)}
//               style={styles2.closeButton}>
//               <Text style={styles2.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(20),
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: moderateScale(32),
//     fontFamily: 'Poppins-SemiBold',
//     marginBottom: moderateScale(20),
//   },
//   optionLabel: {
//     fontSize: moderateScale(16),
//     color: '#D4D6DD',
//     fontFamily: 'Poppins-Regular',
//     marginBottom: moderateScale(8),
//   },
//   cardContainer: {
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: '#ddd',
//     padding: moderateScale(10),
//     marginBottom: moderateScale(16),
//     backgroundColor: '#f9f9f9',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: moderateScale(10),
//   },
//   radioText: {
//     fontSize: moderateScale(16),
//     fontFamily: 'Poppins-Regular',
//     marginLeft: moderateScale(8),
//   },
//   cardItem: {
//     paddingVertical: moderateScale(12),
//     paddingHorizontal: moderateScale(10),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     marginBottom: moderateScale(8),
//   },
//   selectedCardItem: {
//     borderColor: '#007BFF',
//     borderWidth: 1,
//     backgroundColor: '#e6f7ff',
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   cardText: {
//     fontSize: moderateScale(16),
//     fontFamily: 'Poppins-Regular',
//   },
//   cardNumber: {
//     fontSize: moderateScale(14),
//     color: '#aaa',
//     fontFamily: 'Poppins-Light',
//   },
//   addCardText: {
//     color: '#007BFF',
//     fontSize: moderateScale(16),
//     fontFamily: 'Poppins-Regular',
//     marginTop: moderateScale(10),
//     textAlign: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#007BFF',
//     padding: moderateScale(14),
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: moderateScale(20),
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontFamily: 'Poppins-Bold',
//   },
// });
// const styles2 = ScaledSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modal: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: '10@s',
//     padding: '20@s',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: '18@s',
//     fontWeight: 'bold',
//     marginBottom: '15@s',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: '8@s',
//     padding: '10@s',
//     marginBottom: '10@s',
//     fontSize: '14@s',
//   },
//   inputError: {
//     borderColor: '#FF0000',
//   },
//   errorText: {
//     color: '#FF0000',
//     fontSize: '12@s',
//     marginBottom: '10@s',
//     textAlign: 'left',
//     width: '100%',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: '8@s',
//     paddingVertical: '10@s',
//     paddingHorizontal: '15@s',
//     marginTop: '10@s',
//     width: '100%',
//     alignItems: 'center',
//   },
//   submitText: {
//     color: '#fff',
//     fontSize: '16@s',
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     marginTop: '10@s',
//   },
//   closeText: {
//     color: '#007BFF',
//     fontSize: '14@s',
//   },
// });
// export default SavedPaymentMethod;



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SavedPaymentMethod = ({ route, navigation }) => {
  const { url } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>goBack</Text>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
};

export default SavedPaymentMethod;

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 2,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
