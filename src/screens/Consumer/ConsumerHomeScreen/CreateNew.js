import React, { useState } from 'react';
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
import {moderateScale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import { images } from '../../../assets/images';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addCommunity, getCommunities } from '../../../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';

const CreateNew = () => {
  const dispatch=useDispatch();
  const[communityName, setCommunityName] = useState('');
  const[description, setDescription] = useState('');
   const [imageBase64, setimageBase64] = useState('');
    const [image, setImage] = useState('');
    const[createloading,setCreateLoading]=useState(false)
      const handleSave = async () => {
        setCreateLoading(true)
        const user = await AsyncStorage.getItem('user');

        const id = JSON.parse(user);
        console.log('id', id.id);
        if (!communityName) {
          Alert.alert('Error', 'Please enter community name');
          setCreateLoading(false)
          return;
        }else if (!description) {
          setCreateLoading(false)
          Alert.alert('Error', 'Please enter description');
          return;
        }else if (!image) {
          setCreateLoading(false)
          Alert.alert('Error', 'Please upload image');
          return;
        }
        
        const data = {
          user_id: id.id,
        cat_id: "",
    name: communityName,
    description:description,
    members: 100,
    banner_image: imageBase64,
   };
console.log('data',data.user_id,
  data.cat_id,
   data.name,
   data.description,
  data.members);

        try {
          console.log('data');
          
          const response = await dispatch(addCommunity(data)).unwrap();

         // setIsLoading(false);
         setCommunityName('');
         setDescription('');
         setImage('');
         setimageBase64('');
         setCreateLoading(false)
          Alert.alert('Success', response?.message);
          const response1 = await dispatch(getCommunities(data)).unwrap();
console.log('response1',response1);

          // navigation.navigate('SplashBusiness2');
        } catch (err) {
          setCreateLoading(false)
       //   setIsLoading(false);
          console.log('error', err);

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
        const uploadImage = () => {
          Alert.alert(
            'Upload Image',
            'Choose an option',
            [
              {
                text: 'Camera',
                onPress: () => {
                  const options = {
                    mediaType: 'photo',
                    quality: 1,
                    includeBase64: true,
                    // base64: true,
                  };
                  ImagePicker.launchCamera(options, response => {
                    if (response.didCancel) {
                      console.log('User cancelled camera');
                    } else if (response.errorCode) {
                      console.error('Camera Error: ', response.errorMessage);
                    } else {
                      setImage(response.assets[0].uri);
                      setimageBase64(response.assets[0].base64);
                      const selectedImage = response.assets[0]?.uri;
                     
                    }
                  });
                },
              },
              {
                text: 'Gallery',
                onPress: () => {
                  const options = {
                    mediaType: 'photo',
                    quality: 1,
                    includeBase64: true,
                    //  base64: true,
                  };
                  ImagePicker.launchImageLibrary(options, response => {
                    if (response.didCancel) {
                      console.log('User cancelled gallery');
                    } else if (response.errorCode) {
                      console.error('Gallery Error: ', response.errorMessage);
                    } else {
                      setimageBase64(response.assets[0].base64);
                            setImage(response.assets[0].uri);

                     
                    }
                  });
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        };
      
      
       const [isUploading, setIsUploading] = useState(false); // State for upload progress
      
       const requestCameraPermission = async () => {
         try {
           const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.CAMERA,
             {
               title: 'Camera Permission',
               message: 'This app needs access to your camera to record videos.',
               buttonNeutral: 'Ask Me Later',
               buttonNegative: 'Cancel',
               buttonPositive: 'OK',
             },
           );
           return granted === PermissionsAndroid.RESULTS.GRANTED;
         } catch (err) {
           console.warn(err);
           return false;
         }
       };
  return (
    <View style={styles.container}>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Community Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCommunityName(text)}
          value={communityName}
          placeholder="Enter community name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Enter description"
          placeholderTextColor="#999"
          multiline
        />

        <Text style={styles.label}>Banner Image</Text>
        <TouchableOpacity
          onPress={uploadImage}
          style={styles.bannerPlaceholder}>
            {
              image ? 

                <Image source={{uri: image}} style={styles.bannerImage} />
            :
          <Image source={images.ImageReplace} style={styles.bannerImage} />
              }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.createButton}>
          {
            createloading?<ActivityIndicator size={20} color={COLORS.white}/>:
          
          <Text style={styles.createButtonText}>Create Community</Text>
}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(16),
  },

  form: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(13),
    color: '#666',
    marginBottom: moderateScale(8),
    fontFamily: 'Poppins-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.cyan,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    marginBottom: moderateScale(16),
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: moderateScale(100),
    textAlignVertical: 'top',
  },
  bannerPlaceholder: {
    height: moderateScale(150),
    borderWidth: 1,
    borderColor: COLORS.cyan,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f9ff',
    marginBottom: moderateScale(16),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8), // resizeMode:'contain'
    // tintColor: '#ccc',
  },
  createButton: {
    backgroundColor: '#2DB6AC',
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  createButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default CreateNew;
