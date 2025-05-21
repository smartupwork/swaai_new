import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import { images } from '../../../assets/images';
import ButtonComp from '../../../components/ButtonComp';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { profile, updateProfile } from '../../../redux/slices/apiSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingYourProfile = ({navigation}) => {

const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
const [profileDetail, setProfileDetail] = useState([]);
const [businessName,setBusinessName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[bussinessAddress,setbussinessAddress]=useState("")
const[bID,setBID]=useState("")
 const[imageUri,setImageUri]=useState("")
  const[imageBase64,setImageBase64]=useState("")
useEffect(() => {
  const fetchProfileData = async () => {
    console.log("profile");
    
    try {
      // Dispatch the thunk
      const response = await dispatch(profile()).unwrap();
      console.log('Subscription plans:', response.data);

      setProfileDetail(response?.data);
      setBusinessName(response?.data?.business_name);
      setEmail(response.data?.email)
      setbussinessAddress(response?.data?.address);
      setImageUri(response?.data?.profile_image);
      setBID(response?.data?.business_id);
    } catch (error) {
      console.error('Error fetching subscription plans:', err);

      // Update error state
      setError(
        err.response?.data?.message ||
          err.message ||
          'An unknown error occurred.',
      );

      // Display error as an alert
      Alert.alert('Error', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  fetchProfileData();
}, [dispatch]);
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
  setIsLoading(true);

  try {
    // Get user data from AsyncStorage
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      alert('User data not found');
      setIsLoading(false);
      return;
    }

    const parsedUser = JSON.parse(user);
    const id = parsedUser.id;

    let finalBase64 = imageBase64;

    // Convert image to Base64 if not already set
    if (!imageBase64) {
      const base64 = await convertImageToBase64(profileDetail.profile_image);
      console.log('Converted Base64:', base64);

      if (!base64 || base64 === '') {
        alert('Please select a profile image');
        setIsLoading(false);
        return;
      }

      // Wait for state to update before proceeding
      setImageBase64(base64);
      finalBase64 = base64; // Use local variable to ensure updated value
    }

    // Prepare data for API request
    const data = {
      user_id: id,
      business_id: bID,
      email: email,
      business_name: businessName,
      address: bussinessAddress,
      profile_image: finalBase64, // Ensured updated image
    };

    console.log('Data being sent:', data);

    // Dispatch API call
    const response = await dispatch(updateProfile(data)).unwrap();
    console.log('Response:', response);

    Alert.alert('Success', response?.message);
  } catch (err) {
    console.error('Error:', err);

    if (typeof err === 'string') {
      alert(err);
    } else if (err && err.message) {
      alert(err.message);
    } else {
      alert('An unknown error occurred.');
    }
  } finally {
    setIsLoading(false); // Ensure loading state resets
  }
};

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
       // console.log(response);
         setImageBase64(response.assets[0].base64);
        setImageUri(response.assets[0].uri); // Save the captured image URI
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
      //  console.log(response);
        
      //  console.log(response.assets[0].uri);
        setImageBase64(response.assets[0].base64);
        setImageUri(response.assets[0].uri); // Save the selected image URI
      }
    },
  );
};

if (isLoading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading Update Profile...</Text>
    </View>
  );
}



  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>
      <Text style={[styles.subHeader, {fontFamily: 'Poppins-Bold',fontWeight:'700'}]}>Your Profile</Text>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={
            imageUri ? {uri: imageUri} : images.ImageReplace
          }
          style={styles.profileImage}
          resizeMethod='contain'
        />
        {/* <Image
          source={imageUri} // Replace with actual profile image
          style={styles.profileImage}
        /> */}
        <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Business name"
          placeholderTextColor={COLORS.black}
          value={businessName}
          onChangeText={text => setBusinessName(text)}
        />
        <TextInput
        editable={false}
          style={styles.input}
          placeholder="gmail@example.com"
          placeholderTextColor={COLORS.black}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="************"
          placeholderTextColor={COLORS.black}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.black}
          placeholder="User address"
          value={bussinessAddress}
          onChangeText={text => setbussinessAddress(text)}
        />

        {/* Payment Methods */}
        
        <TouchableOpacity
          onPress={() => navigation.navigate('SavedPaymentMethod')}
          style={styles.paymentMethod}>
          <Text style={styles.paymentText}>Payment methods</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Save Changes Button */}
      <View
        style={{
          marginBottom: scale(30),
          marginTop: scale(10),
          position: 'absolute',
          bottom: scale(10),
          width: '100%',
          alignSelf: 'center',
        }}>
        <ButtonComp
          title="Save Changes"
          backgroundColor={COLORS.blue}
          onPress={() => handleProfileChanges()}
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
  header: {
    fontSize: '24@ms',
    fontWeight: '800',
    fontFamily: 'Poppins-Bold', // Use Poppins font
    color: '#000000',
    marginBottom: '1@ms',
  },
  subHeader: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-Medium',
    color: COLORS.blue,
    marginBottom: '20@ms',
  },
  profileContainer: {
    // alignItems: 'center',
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
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F4FE',
    borderRadius: '8@ms',
    paddingVertical: '12@ms',
    paddingHorizontal: '15@ms',
  },
  paymentText: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-Regular',
  },
  arrow: {
    fontSize: '18@ms',
    color: '#000000',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: '12@ms',
    borderRadius: '8@ms',
    alignItems: 'center',
  },
  saveText: {
    fontSize: '16@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingYourProfile;
