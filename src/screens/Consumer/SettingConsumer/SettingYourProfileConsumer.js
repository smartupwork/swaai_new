// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
// } from 'react-native';
// import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
// import COLORS from '../../../constants/color';
// import { images } from '../../../assets/images';
// import ButtonComp from '../../../components/ButtonComp';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { getConsumerProfile, updateConsumerProfile } from '../../../redux/slices/apiSlice';
// import { useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {Buffer} from 'buffer';
// import RNFS from 'react-native-fs';

// const SettingYourProfileConsumer = ({navigation}) => {
//   const dispatch = useDispatch();
  
  
//   const[imageUri,setImageUri]=useState("")
//   const [profileDetail, setProfileDetail] = useState([]);
  
//     const[imageBase64,setImageBase64]=useState("")
// const [businessName,setBusinessName]=useState("")
// const[email,setEmail]=useState("")
// const[password,setPassword]=useState("")
// const[loading,setLoading]=useState(false)
// useEffect(() => {
//   const fetchProfileData = async () => {
//     console.log("profile-----");
    
//     try {
//       // Dispatch the thunk
//       const response = await dispatch(getConsumerProfile()).unwrap();
//       console.log('Subscription plans:', response);

//       setProfileDetail(response?.data);
//       setBusinessName(response?.data?.first_name);
//       setEmail(response.data?.email)
//       setImageUri(response?.data?.profile_image);
//       setPassword(response?.data?.last_name);
//     //  setPassword(response?.data?.password)
//     } catch (error) {
//       console.error('Error fetching subscription plans:', error);

//       // Update error state
//       // setError(
//       //   err.response?.data?.message ||
//       //     err.message ||
//       //     'An unknown error occurred.',
//       // );

//       // Display error as an alert
//       Alert.alert('Error', error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   fetchProfileData();
// }, [dispatch]);
//     const handleEditPress = () => {
//       Alert.alert(
//         'Choose Image Source',
//         'Select an option to pick an image:',
//         [
//           {
//             text: 'Camera',
//             onPress: () => openCamera(),
//           },
//           {
//             text: 'Gallery',
//             onPress: () => openGallery(),
//           },
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//         ],
//         {cancelable: true},
//       );
//     };
//     const openCamera = () => {
//       launchCamera(
//         {
//           mediaType: 'photo',
//           includeBase64: true,
//           maxWidth: 500,
//           maxHeight: 500,
//         },
//         response => {
//           if (response.assets) {
//            // console.log(response);
//              setImageBase64(response.assets[0].base64);
//             setImageUri(response.assets[0].uri); // Save the captured image URI
//           }
//         },
//       );
//     };
    
//     const openGallery = () => {
//       launchImageLibrary(
//         {
//           mediaType: 'photo',
//           includeBase64: true,
//           maxWidth: 500,
//           maxHeight: 500,
//         },
//         response => {
//           if (response.assets) {
//           //  console.log(response);
            
//           //  console.log(response.assets[0].uri);
//             setImageBase64(response.assets[0].base64);
//             setImageUri(response.assets[0].uri); // Save the selected image URI
//           }
//         },
//       );
//     };
// const convertImageToBase64 = async imageUrl => {
// console.log("imageURL",imageUrl);

//   try {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();

//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the data URL prefix
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to Base64:', error);
//     return null;
//   }
// };

//     const handleProfileChanges = async () => {
//     //  setIsLoading(true);
//    convertImageToBase64(imageUri).then(base64 => {
//      console.log('Base64 Image:', base64);
//      setImageBase64(base64);
//    });
//       console.log('imageBase64', imageUri);
//       console.log('businessName', businessName);
//       console.log('email', email);
//   //    console.log('password', password)
//       const user = await AsyncStorage.getItem('user');
//       const parsedUser = JSON.parse(user);

//       const id = parsedUser.id;
//       const data = {
//         user_id: id,
//         email: email,
//         first_name: businessName,
//         last_name: password,
//         profile_image: imageBase64,
//       };
//       console.log('data', data);

//       try {
//         const response = await dispatch(updateConsumerProfile(data)).unwrap();
//         console.log('response:', response);

//       //  setIsLoading(false);
//         Alert.alert('Success', response?.message);
//         // navigation.navigate('SplashBusiness2');
//       } catch (err) {
//         //setIsLoading(false);
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
//     };
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>Settings</Text>
//       <Text style={styles.subHeader}>Your Profile</Text>

//       {/* Profile Image */}
//       <View style={styles.profileContainer}>
//         {/* <Image
//           source={images.avatar} // Replace with actual profile image
//           style={styles.profileImage}
//         /> */}
//         <Image
//           source={imageUri ? {uri: imageUri} : images.ImageReplace}
//           style={styles.profileImage}
//           resizeMethod="contain"
//         />
//         <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
//           <Text style={styles.editText}>✏️</Text>
//         </TouchableOpacity>
//       </View>/

//       {/* Input Fields */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Business name..."
//           placeholderTextColor={COLORS.black}
//           value={businessName}
//           onChangeText={text => setBusinessName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Last Name"
//           placeholderTextColor={COLORS.black}
//          // secureTextEntry
//           value={password}
//           onChangeText={text => setPassword(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="gmail@example.com"
//           placeholderTextColor={COLORS.black}
//           value={email}
//           onChangeText={text => setEmail(text)}
//         />
//         {/* <TextInput
//           style={styles.input}
//           placeholder="************"
//           placeholderTextColor={COLORS.black}
//           secureTextEntry
//           value={password}
//           onChangeText={text => setPassword(text)}
//         /> */}
//       </View>

//       {/* Save Changes Button */}
//       <View
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
//           backgroundColor={COLORS.green}
//           onPress={() => handleProfileChanges()}
//           //   onPress={() => navigation.navigate('SettingConsumerScreen')}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: '20@ms',
//   },
//   header: {
//     fontSize: '24@ms',
//     fontWeight: '600',
//     fontFamily: 'Poppins-SemiBold', // Use Poppins font
//     color: '#000000',
//     marginBottom: '1@ms',
//   },
//   subHeader: {
//     fontSize: '14@ms',
//     fontFamily: 'Poppins-Medium',
//     color: COLORS.green,
//     marginBottom: '20@ms',
//   },
//   profileContainer: {
//     // alignItems: 'center',
//     marginBottom: '20@ms',
//   },
//   profileImage: {
//     width: '80@ms',
//     height: '80@ms',
//     borderRadius: '40@ms',
//     backgroundColor: '#E0E0E0',
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: '50@ms',
//     left: '50@ms',
//     backgroundColor: '#FFFFFF',
//     borderRadius: '20@ms',
//     padding: '5@ms',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     backgroundColor: COLORS.darkBlue,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editText: {
//     fontSize: '12@ms',
//   },
//   inputContainer: {
//     marginBottom: '20@ms',
//   },
//   input: {
//     backgroundColor: '#F1F4FE',
//     borderRadius: '8@ms',
//     paddingVertical: '12@ms',
//     paddingHorizontal: '15@ms',
//     fontSize: '14@ms',
//     fontFamily: 'Poppins-Regular',
//     marginBottom: '10@ms',
//   },
//   paymentMethod: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F1F4FE',
//     borderRadius: '8@ms',
//     paddingVertical: '12@ms',
//     paddingHorizontal: '15@ms',
//   },
//   paymentText: {
//     fontSize: '14@ms',
//     fontFamily: 'Poppins-Regular',
//   },
//   arrow: {
//     fontSize: '18@ms',
//     color: '#000000',
//   },
//   saveButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: '12@ms',
//     borderRadius: '8@ms',
//     alignItems: 'center',
//   },
//   saveText: {
//     fontSize: '16@ms',
//     fontFamily: 'Poppins-SemiBold',
//     color: '#FFFFFF',
//   },
// });

// export default SettingYourProfileConsumer;


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import {images} from '../../../assets/images';
import ButtonComp from '../../../components/ButtonComp';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  getConsumerProfile,
  updateConsumerProfile,
} from '../../../redux/slices/apiSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingYourProfileConsumer = ({navigation}) => {
  const dispatch = useDispatch();

  const [imageUri, setImageUri] = useState('');
  const [profileDetail, setProfileDetail] = useState({});
  const [imageBase64, setImageBase64] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await dispatch(getConsumerProfile()).unwrap();
        console.log('Profile data:', response);
        
        setProfileDetail(response?.data);
        setBusinessName(response?.data?.first_name || '');
        setEmail(response?.data?.email || '');
        setImageUri(response?.data?.profile_image || '');
        setPassword(response?.data?.last_name || '');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', error.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const handleEditPress = () => {
    Alert.alert(
      'Choose Image Source',
      'Select an option to pick an image:',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
      },
      response => {
        if (response.assets) {
          setImageBase64(response.assets[0].base64);
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
      },
      response => {
        if (response.assets) {
          setImageBase64(response.assets[0].base64);
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const convertImageToBase64 = async imageUrl => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      return null;
    }
  };

  const handleProfileChanges = async () => {
    setIsSaving(true);
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const id = parsedUser.id;

      // Prepare the data object with only updated fields
      const updatedData = {user_id: id};

      if (businessName !== profileDetail.first_name) {
        updatedData.first_name = businessName;
      }
      if (email !== profileDetail.email) {
        updatedData.email = email;
      }
      if (password !== profileDetail.last_name) {
        updatedData.last_name = password;
      }
      if (imageUri !== profileDetail.profile_image) {
        const base64 = await convertImageToBase64(imageUri);
        updatedData.profile_image = base64;
      }

      // Only call the API if there are changes
      if (Object.keys(updatedData).length > 1) {
        const response = await dispatch(
          updateConsumerProfile(updatedData),
        ).unwrap();
        console.log("update ",response);
                  await AsyncStorage.setItem('userPic', `https://r6u.585.mytemp.website/public/${response?.user?.profile_image}`);

           await AsyncStorage.setItem('user', JSON.stringify(response.user));
        Alert.alert('Success', response?.message);
      } else {
        Alert.alert('Info', 'No changes detected.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      Alert.alert('Error', err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>Your Profile</Text>

      <View style={styles.profileContainer}>
        <Image
          source={imageUri ? {uri: imageUri} : images.ImageReplace}
          style={styles.profileImage}
          resizeMethod="contain"
        />
        <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name..."
          placeholderTextColor={COLORS.black}
          value={businessName}
          onChangeText={setBusinessName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={COLORS.black}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
        // editable={false}
          style={styles.input}
          placeholder="gmail@example.com"
          placeholderTextColor={COLORS.black}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <ButtonComp
          title={isSaving ? 'Saving...' : 'Save Changes'}
          backgroundColor={COLORS.green}
          onPress={handleProfileChanges}
          disabled={isSaving}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: '20@ms',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: '24@ms',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginBottom: '1@ms',
  },
  subHeader: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-Medium',
    color: COLORS.green,
    marginBottom: '20@ms',
  },
  profileContainer: {
    //  alignItems: 'center',
    marginBottom: '20@ms',
  },
  profileImage: {
    width: '80@ms',
    height: '80@ms',
    borderRadius: '40@ms',
    backgroundColor: '#E0E0E0',
  },
  editIcon: {
        position: 'absolute',
        bottom: '50@ms',
        left: '50@ms',
        backgroundColor: '#FFFFFF',
        borderRadius: '20@ms',
        padding: '5@ms',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: COLORS.darkBlue,
        alignItems: 'center',
        justifyContent: 'center',
  },
  editText: {
    fontSize: '12@ms',
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: '20@ms',
  },
  input: {
    backgroundColor: '#F1F4FE',
    borderRadius: '8@ms',
    paddingVertical: '12@ms',
    paddingHorizontal: '15@ms',
    fontSize: '14@ms',
    fontFamily: 'Poppins-Regular',
    marginBottom: '10@ms',
  },
  saveButtonContainer: {
    marginBottom: scale(30),
    marginTop: scale(10),
    position: 'absolute',
    bottom: scale(10),
    width: '100%',
    alignSelf: 'center',
  },
});

export default SettingYourProfileConsumer;