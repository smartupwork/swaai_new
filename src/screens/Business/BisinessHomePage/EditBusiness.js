// import React, { useState } from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet, Modal} from 'react-native';
// import {ScaledSheet, s, vs} from 'react-native-size-matters';
// import { images } from '../../../assets/images';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import COLORS from '../../../constants/color';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Video from 'react-native-video';
// // Import react-native-video

// const EditBusiness = ({navigation}) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [videoUri, setVideoUri] = useState(null); // State for video URI

//   const openModal = () => setIsModalVisible(true);
//   const closeModal = () => setIsModalVisible(false);
//   const recordVideo = () => {
//     const options = {
//       mediaType: 'video', // Set mediaType to 'video'
//       videoQuality: 'high', // Set video quality ('low', 'medium', or 'high')
//       durationLimit: 10, // Set maximum duration in seconds
//     };

//     launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled video recording');
//       } else if (response.errorCode) {
//         console.log('Video recording error: ', response.errorMessage);
//       } else {
//         console.log('Video URI: ', response.assets[0].uri);
//         setVideoUri(response.assets[0].uri); // Save the video URI to state
//       }
//     });
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <FontAwesome name="angle-left" size={20} color="#000" />
//       </TouchableOpacity>
//       {/* Profile Image Section */}
//       <View style={styles.profileContainer}>
//         <Image source={images.avatar} style={styles.profileImage} />
//         <TouchableOpacity style={styles.editIcon}>
//           <Text style={styles.editIconText}>✏️</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Business Address Section */}
//       <View style={styles.addressContainer}>
//         <Text style={styles.addressLabel}>Business Address</Text>
//         <TouchableOpacity onPress={openModal} style={styles.specialOfferButton}>
//           <Text style={styles.specialOfferText}>Edit/View Special Offer</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Personal Summary/Description Section */}
//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryTitle}>Personal Summary/Description</Text>
//         <Text style={styles.summaryText}>
//           Supporting family owned, small businesses. Avid thrifter.
//         </Text>
//       </View>
//       {/* Video Pitch Section */}
//       <TouchableOpacity
//         onPress={recordVideo}
//         style={styles.videoPitchContainer}>
//         {videoUri ? (
//           <Video
//             source={{uri: videoUri}}
//             style={styles.videoPlaceholder}
//             controls
//             resizeMode="cover"
//           />
//         ) : (
//           <>
//             <Image
//               source={images.ImageReplace}
//               style={styles.videoPlaceholder}
//             />
//             <Text style={styles.videoPitchText}>Edit Video Pitch</Text>
//           </>
//         )}
//       </TouchableOpacity>
//       {/* Edit Video Pitch Section */}
//       {/* <TouchableOpacity
//         onPress={() => recordVideo()}
//         style={styles.videoPitchContainer}>
//         <Image source={images.ImageReplace} style={styles.videoPlaceholder} />
//         <Text style={styles.videoPitchText}>Edit Video Pitch</Text>
//       </TouchableOpacity> */}

//       {/* Bottom Image Placeholders */}
//       <View style={styles.imageRow}>
//         <Image source={images.ImageReplace} style={styles.imagePlaceholder} />
//         <Image source={images.ImageReplace} style={styles.imagePlaceholder} />
//       </View>
//       {/* Special Offer Modal */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={isModalVisible}
//         onRequestClose={closeModal}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <TouchableOpacity onPress={closeModal} style={styles.editButton}>
//               <Text style={styles.editButtonText}>Edit Special Offer</Text>
//             </TouchableOpacity>

//             <View style={styles.iconContainer}>
//               <Text style={styles.starIcon}>⭐</Text>
//             </View>

//             <Text style={styles.modalTitle}>Special Offer!</Text>
//             <TouchableOpacity style={styles.offerButton}>
//               <Text style={styles.offerButtonText}>15% off first order</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={closeModal} style={styles.saveButton}>
//               <Text style={styles.saveButtonText}>SAVE</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     padding: '16@s',
//     backgroundColor: 'white',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: '15@vs',
//   },
//   profileImage: {
//     width: '100@s',
//     height: '100@s',
//     borderRadius: '50@s',
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: 0,
//     // right:20,
//     left: '55%',
//     right: '5@s',
//     backgroundColor: COLORS.blue,
//     width: '24@s',
//     height: '24@s',
//     borderRadius: '12@s',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editIconText: {
//     fontSize: '12@s',
//     color: 'white',
//   },
//   addressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '16@vs',
//   },
//   addressLabel: {
//     fontFamily: 'Inter',
//     fontSize: '14@s',
//     fontWeight: '600',
//     color: '#000',
//   },
//   specialOfferButton: {
//     borderWidth: 1,
//     borderColor: '#32CD32',
//     paddingVertical: '2@vs',
//     paddingHorizontal: '10@s',
//     borderRadius: '5@s',
//   },
//   specialOfferText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: '11@s',
//     color: '#32CD32',
//   },
//   summaryContainer: {
//     backgroundColor: COLORS.blue,
//     padding: '12@s',
//     borderRadius: '8@s',
//     marginBottom: '16@vs',
//   },
//   summaryTitle: {
//     fontFamily: 'Inter',
//     fontSize: '14@s',
//     fontWeight: '600',
//     color: 'white',
//   },
//   summaryText: {
//     fontFamily: 'Inter',
//     fontSize: '12@s',
//     color: 'white',
//     marginTop: '4@vs',
//   },
//   videoPitchContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: '16@vs',
//     // backgroundColor:'pink'
//   },
//   videoPlaceholder: {
//     width: '100%',
//     backgroundColor: '#E0E0E0',
//     borderRadius: '8@s',
//   },
//   videoPitchText: {
//     fontFamily: 'Inter',
//     fontSize: '14@s',
//     fontWeight: '600',
//     color: '#000',
//     marginTop: '8@vs',
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//   },
//   imageRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '10@vs',
//     width: '100%',
//   },
//   imagePlaceholder: {
//     width: '100@s',
//     height: '120@vs',
//     backgroundColor: '#E0E0E0',
//     borderRadius: '8@s',
//     width: '48%',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: '16@s',
//     padding: '20@s',
//     alignItems: 'center',
//   },
//   editButton: {
//     borderWidth: 1,
//     borderColor:COLORS.green,
//     color: COLORS.green,
//     paddingVertical: '3@vs',
//     paddingHorizontal: '10@s',
//     borderRadius: '8@s',
//     marginBottom: '16@vs',
//     width: '90%',
//     alignItems:'center',
//     justifyContent:'center'
//   },
//   editButtonText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: '14@s',
//     color: COLORS.green,
//   },
//   iconContainer: {
//     width: '60@s',
//     height: '60@s',
//     backgroundColor: '#E0E0E0',
//     borderRadius: '30@s',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '12@vs',
//   },
//   starIcon: {
//     fontSize: '28@s',
//     color: '#FFA500', // Star color
//   },
//   modalTitle: {
//     fontFamily: 'Inter',
//     fontSize: '18@s',
//     fontWeight: '600',
//     color: 'black',
//     marginBottom: '10@vs',
//   },
//   offerButton: {
//     backgroundColor: COLORS.green,
//     width:'90%',
//     alignItems:'center',
//     justifyContent:'center',
//     paddingVertical: '10@vs',
//     paddingHorizontal: '20@s',
//     borderRadius: '8@s',
//     marginBottom: '16@vs',
//   },
//   offerButtonText: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: '14@s',
//     color: 'white',
//   },
//   saveButton: {
//     borderWidth: 1,
//     borderColor: '#32CD32',
//     paddingVertical: '6@vs',
//     paddingHorizontal: '20@s',
//     borderRadius: '8@s',
//   },
//   saveButtonText: {
//     fontFamily: 'Inter',
//     fontSize: '14@s',
//     color: '#32CD32',
//   },
// });

// export default EditBusiness;

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Button,
  Linking,
  ActivityIndicator,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import {images} from '../../../assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/color';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video'; // Import react-native-video
import {useDispatch} from 'react-redux';
import {
  getUserMedia,
  insertImage,
  offers,
  profile,
  saveOffers,
  updateProfile,
  userData,
} from '../../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const EditBusiness = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState(null); // State for video URI
  const [offerItem, setOfferItem] = useState([]);
  const [offerName, setOfferName] = useState('');
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const [profileDetail, setProfileDetail] = useState([]);
 useFocusEffect(
  useCallback(() => {
    fetchProfileData();
  }, [dispatch])
);
     const fetchProfileData = async () => {
      console.log('profile');

      try {
        // Dispatch the thunk
        const response = await dispatch(profile()).unwrap();
        console.log('Subscription plans:', response.data);

        setProfileDetail(response?.data);
      } catch (error) {
        console.error('Error fetching subscription plans:', err);

        // Display error as an alert
        Alert.alert('Error', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
  const recordVideo = () => {
    const options = {
      mediaType: 'video', // Set mediaType to 'video'
      videoQuality: 'high', // Set video quality ('low', 'medium', or 'high')
      durationLimit: 10, // Set maximum duration in seconds
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video recording');
      } else if (response.errorCode) {
        console.log('Video recording error: ', response.errorMessage);
      } else {
        console.log('Video URI: ', response);

        console.log('Video URI: ', response.assets[0].uri);
        setVideoUri(response.assets[0].uri); // Save the video URI to state
      }
    });
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState([]);
  const [userMedia, setUserMedia] = useState([]);
  const[offerLoading, setofferLoading] = useState(false);
  useEffect(() => {
    fetchUserDetail();
  }, [dispatch]);
  const fetchUserDetail = async () => {
    //  setIsLoading(true);
    try {
      // Dispatch the thunk
      const response = await dispatch(getUserMedia()).unwrap();
      setMediaData(response?.data);
      setUserMedia(response?.data);
      console.log('response', response.data);
      const videoUrl = response?.data.find(
        media => media.video_url !== null,
      )?.video_url;

      if (videoUrl) {
        console.log('Video URL:', videoUrl);
        // Set the video URL in your state or use it as needed
        setVideoUri(videoUrl); // assuming setVideoUrl is a function that sets the video URL
      } else {
        console.log('No valid video URL found.');
      }
      // setUserDetail(response?.data?.user?.user);
    } catch (error) {
      console.log('Error fetching subscription plans:', error.message);

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

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Dispatch the thunk
        const response = await dispatch(offers()).unwrap();
        setOfferName(response[0].name);
        setOfferItem(response[0]);
      } catch (error) {
        console.error('Error fetching categories:', err);

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

    fetchOffer();
  }, [dispatch]);
      const [summary, setSummary] = useState('');
  const [modalVisibleSummary, setModalVisibleSummary] = useState(false);
  const [tempSummary, setTempSummary] = useState(summary);

  const handleSaveSummary = async() => {
    // setSummary(tempSummary);
    // setModalVisibleSummary(false);
    const user = await AsyncStorage.getItem('user');
     const token = await AsyncStorage.getItem('token');
   const uid = JSON.parse(user);
let data = JSON.stringify({
  "summary_desc": tempSummary
});
let config = {
  method: 'patch',
  maxBodyLength: Infinity,
  url: `https://r6u.585.mytemp.website/api/users/summary/${uid?.id}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data : data
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  Alert.alert("Success",response.data.message)
   fetchProfileData();
  setSummary(tempSummary);
     setModalVisibleSummary(false);
})
.catch((error) => {
  Alert.alert("Error",error.message)
  console.log(error);
  setSummary("");
  setModalVisibleSummary(false);
});
  };
  const handleOffers = async () => {
    console.log("offerItem");
    
    setofferLoading(true);
    // setIsLoading(true);

    const user = await AsyncStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser || !parsedUser.id) {
      console.warn('User data is missing or invalid');
      return;
    }

    const id = parsedUser.id;

    const bID = await AsyncStorage.getItem('businessDetail');
    console.log('bID', bID);
    
    const parsedBusiness = bID ? JSON.parse(bID) : null;

    if (!parsedBusiness || !parsedBusiness.business_id) {
      console.warn('Business detail is missing or invalid');
      return;
    }

    const uid = parsedBusiness.business_id;

    const data = {
      offer_id: offerItem?.id,
      user_id: id,
      business_id: uid,
      name: offerName,
      description: 'offer description',
    };
    console.log('offerItem', data);

    try {
      const response = await dispatch(saveOffers(data)).unwrap();
      console.log('response saveOffers', response);
setofferLoading(false);
      setIsLoading(false);
      Alert.alert('Success', response?.message);
      closeModal();
      // navigation.navigate('SplashBusiness2');
    } catch (err) {
      setofferLoading(false);
      setIsLoading(false);
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [imageBase64, setimageBase64] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [mediaId, setMediaId] = useState('');
  // if (userDetail.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>No User detail available.</Text>
  //     </View>
  //   );
  // }
  const handleEdit = item => {
    setMediaId(item.media_id);
    setSelectedItem(item);
    setImage(imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : '');
    setimageBase64('');
    setTitle(item.title);
    setDescription(item.description);
    setRedirectUrl(item.image_redirect_url);
    setModalVisible(true);
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
  // Handle Save Post
  // const handleSave = async () => {
  //   const user = await AsyncStorage.getItem('user');

  //   const id = JSON.parse(user);
  //   const data = {
  //     user_id: id.id,
  //     media_id: mediaId ? mediaId : '',
  //     image: `data:image/jpeg;base64,${imageBase64}`,
  //     title: title,
  //     description: description,
  //     image_redirect_url: redirectUrl,
  //   };

  //   try {
  //     const response = await dispatch(insertImage(data)).unwrap();

  //     setIsLoading(false);
  //     Alert.alert('Success', response?.message);
  //     // navigation.navigate('SplashBusiness2');
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.log('error', err);

  //     if (typeof err === 'string') {
  //       // Handle string error
  //       console.error('Error:', err);
  //       alert(err);
  //     } else if (err && err.message) {
  //       // Handle object error with message property
  //       console.error('Error message:', err.message);
  //       alert(err.message);
  //     } else {
  //       console.error('Unhandled error:', err);
  //       alert('An unknown error occurred.');
  //     }
  //   }
  //   fetchUserDetail();
  //   setModalVisible(false);

  // };
  // const handleSave = async () => {
  //   alert("lshjf")
  //   setIsLoading(true);
  
  //   try {
  //     const user = await AsyncStorage.getItem('user');
  //     if (!user) {
  //       Alert.alert('Error', 'User data not found');
  //       setIsLoading(false);
  //       return;
  //     }
  
  //     const parsedUser = JSON.parse(user);
  //     const userId = parsedUser.id;
  
  //     let finalBase64 = imageBase64;
  
  //     if (!finalBase64 && item?.image) {
  //       finalBase64 = await convertImageToBase64(item.image);
  //       console.log('Converted Base64:', finalBase64);
  //     }
  
  //     const data = {
  //       user_id: userId,
  //       media_id: mediaId || '',
  //       image: finalBase64 ? `data:image/jpeg;base64,${finalBase64}` : '',
  //       title,
  //       description,
  //       image_redirect_url: redirectUrl,
  //     };
  //     console.log('Data being sent:', data);
  //     if (!data.image) {
  //       Alert.alert('Error', 'Please select Image');
  //       setIsLoading(false);
  //       return;
  //     }
  //     if (!data.title) {
  //       Alert.alert('Error', 'Please enter title');
  //       setIsLoading(false);
  //       return;
  //     }
  //     if (!data.description) {
  //       Alert.alert('Error', 'Please enter description');
  //       setIsLoading(false);
  //       return;
  //     }
  
  //     console.log('Data being sent:', data);
  
  //     const response = await dispatch(insertImage(data)).unwrap();
  //     console.log('Response:', response);
  
  //     Alert.alert('Success', response?.message);
  //     fetchUserDetail();
  //     setModalVisible(false);
  //   } catch (err) {
  //     console.error('Error in save:', err);
  //     Alert.alert('Error Save api', err?.message || 'An unknown error occurred.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const[saveloader,setSaveloader]=useState(false)
  const handleSave = async () => {
  
  
    try {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        Alert.alert('Error', 'User data not found');
        setSaveloader(false);
        return;
      }
  
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;
  
      let finalBase64 = imageBase64;
  
      if (!finalBase64 && selectedItem?.image_url) {
        finalBase64 = await convertImageToBase64(selectedItem.image_url);
        console.log('Converted Base64:', finalBase64);
      }
  
      const data = {
        user_id: userId,
        media_id: mediaId || '',
        image: finalBase64 ? `data:image/jpeg;base64,${finalBase64}` : '',
        title,
        description,
        image_redirect_url: redirectUrl,
      };
      
      console.log('Data being sent:', data);
      
      if (!data.image) {
        Alert.alert('Error', 'Please select Image');
        setSaveloader(false);
        return;
      }
      if (!data.title) {
        Alert.alert('Error', 'Please enter title');
        setSaveloader(false);
        return;
      }
      if (!data.description) {
        Alert.alert('Error', 'Please enter description');
        setSaveloader(false);
        return;
      }
      setSaveloader(true);
      const response = await dispatch(insertImage(data)).unwrap();
      console.log('Response:', response);
  
      Alert.alert('Success', response?.message);
      fetchUserDetail();
      setSaveloader(false)
      setModalVisible(false);
    } catch (err) {
      setSaveloader(false)
      console.error('Error in save:', err);
      Alert.alert('Error Save api', err?.message || 'An unknown error occurred.');
    } finally {
      setSaveloader(false);
    }
  };

  // Handle Add New Post
  const handleAddNew = () => {
    setSelectedItem(null); // Reset modal for new post
    setImage('');
    setimageBase64('');

    setTitle('');
    setDescription('');
    setRedirectUrl('');
    setModalVisible(true);
  };

  const renderImageItem = ({item}) => (
    <View style={styles.card}>
      {item.image_url ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(item.image_redirect_url || '')}>
          <Image
            source={{uri: item.image_url}}
            style={styles.imagePlaceholder}
            resizeMethod="contain"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <Text style={styles.title}>{item.title || 'No Title'}</Text>
      <Text style={styles.description}>
        {item.description || 'No Description'}
      </Text>
      <TouchableOpacity
        onPress={() => handleEdit(item)}
        style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
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
                setimageBase64(response.assets[0].base64);
                const selectedImage = response.assets[0]?.uri;
                if (selectedImage) {
                  setSelectedItem({...selectedItem, image_url: selectedImage});
                }
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

                const selectedImage = response.assets[0]?.uri;
                if (selectedImage) {
                  setSelectedItem({...selectedItem, image_url: selectedImage});
                }
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
  if (Platform.OS === 'android') {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to record videos.',
          buttonPositive: 'OK',
        }
      );

      const micGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to capture audio with video.',
          buttonPositive: 'OK',
        }
      );

      return (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
        micGranted === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  } else {
    // iOS handles permissions via Info.plist
    return true;
  }
};
const selectVideoSource = async () => {
  Alert.alert(
    'Upload Video',
    'Choose a source',
    [
      {
        text: 'Record Video',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (hasPermission) {
            launchCamera(
              {
                mediaType: 'video',
                videoQuality: 'high',
                durationLimit: 15, // in seconds
              },
              response => handleVideoResponse(response)
            );
          } else {
            Alert.alert(
              'Permission Required',
              'Camera and microphone permissions are required to record videos.'
            );
          }
        },
      },
      {
        text: 'Select from Gallery',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'video',
            },
            response => handleVideoResponse(response)
          );
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {cancelable: true}
  );
};

  const handleVideoResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled video selection');
    } else if (response.errorCode) {
      console.log('Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const video = response.assets[0];
      setVideoUri(video.uri); // Save the video URI
      console.log('Video selected: ', video.uri);
      console.log('Video respose: ', response);

      // uploadVideo(video.uri); // Call the API to upload the video
      Alert.alert(
        'Confirm Video Upload',
        'Do you want to upload this video?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Upload cancelled'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => uploadVideo(video.uri), // Call the upload function if confirmed
          },
        ],
        {cancelable: false},
      );
    }
  };

  const uploadVideo = async uri => {
    try {
      setIsUploading(true); // Show loader
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const id = JSON.parse(user);
      if (!token) {
        throw new Error('Token not found');
      }
      // Prepare headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      // Prepare form data
      const formData = new FormData();
      formData.append('user_id', id?.id);
      formData.append('media_id', ''); // Adjust media_id as needed
      formData.append('video', {
        uri, // The URI of the video file
        type: 'video/mp4', // Adjust MIME type if needed
        name: 'uploaded-video.mp4', // Video filename
      });

      // Prepare request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };

      // Send the request using fetch
      const response = await fetch(
        'https://r6u.585.mytemp.website/api/insert-video',
        requestOptions,
      );

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const result = await response.text();
      console.log('Video uploaded successfully: ', result);
      Alert.alert('Success', 'Video uploaded successfully!');
    } catch (error) {
      console.error('Video upload failed: ', error);
      Alert.alert('Error', 'Failed to upload video.');
    } finally {
      setIsUploading(false); // Hide loader
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={20} color="#000" />
      </TouchableOpacity>
      <ScrollView>
        {/* Profile Image Section */}
        <View style={styles.profileContainer}>
          <Image
            source={profileDetail?.profile_image?{uri: profileDetail?.profile_image}:images.avatar}
            //source={images.avatar}
            style={styles.profileImage}
          />
          {/* <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editIconText}>✏️</Text>
          </TouchableOpacity> */}
        </View>
        {/* Business Address Section */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Website URL</Text>
          <TouchableOpacity
            onPress={openModal}
            style={styles.specialOfferButton}>
            <Text style={styles.specialOfferText}>Edit/View Special Offer</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Summary/Description Section */}
        {/* <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Personal Summary/Description</Text>
          <Text style={styles.summaryText}>
            Supporting family owned, small businesses. Avid thrifter.
          </Text>
        </View> */}
         <TouchableOpacity
                  // onPress={() => navigation.navigate('EditProfileScreen')}
                  onPress={() => setModalVisibleSummary(true)} 
                  style={styles.summaryContainer}>
                    {!profileDetail?.summary_desc && (
                  <Text style={styles.summaryTitle}>Personal Summary/Description</Text>
                    )}
                 <Text style={styles.summaryText}>{profileDetail?.summary_desc?profileDetail?.summary_desc:"Click here to add Summary/Description"}</Text>
                  {/* <Text style={styles.summaryText}>
                    Supporting family owned, small businesses. Avid thrifter.
                  </Text> */}
                </TouchableOpacity>
         <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleSummary}
                onRequestClose={() => setModalVisibleSummary(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Summary</Text>
                    <TextInput
                      style={styles.input}
                      value={tempSummary}
                      onChangeText={setTempSummary}
                      multiline
                      placeholder="Write something ..."
                      placeholderTextColor="#999"
                    />
                    <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisibleSummary(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.saveBtn} onPress={()=>handleSaveSummary()}>
                        <Text style={styles.saveText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
        {/* Video Pitch Section */}

        {videoUri ? (
          // Show the video if it exists
          <View style={{flex: 1}}>
            {/* <TouchableOpacity
              onPress={selectVideoSource}
              style={styles.videoPitchContainer}>
              <Text>Edit</Text>
            </TouchableOpacity> */}
            <Video
              source={{
                uri: videoUri,
              }}
                      paused={true} // ✅ This disables autoplay

              style={styles.videoPlaceholder}
              controls
              resizeMode="cover"
              
            />
            <TouchableOpacity
              onPress={selectVideoSource}
              style={styles.editVedioButton}>
              <Text style={styles.editVedioButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show the placeholder image
          <TouchableOpacity
            onPress={selectVideoSource}
            style={styles.videoPitchContainer}>
            <Image
              source={images.ImageReplace}
              style={styles.videoPlaceholder}
            />
            <Text style={styles.videoPitchText}>Edit Video Pitch</Text>
          </TouchableOpacity>
        )}

        {/* {userMedia[userMedia.length - 1] == null ? (
          <TouchableOpacity
            onPress={recordVideo}
            style={styles.videoPitchContainer}>
            <>
              <Image
                source={images.ImageReplace}
                style={styles.videoPlaceholder}
              />
              <Text style={styles.videoPitchText}>Edit Video Pitch</Text>
            </>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={recordVideo}
            style={styles.videoPitchContainer}>
            <Video
              source={{
                uri:
                  userMedia[userMedia.length - 1]?.video_url ||
                  'https://v.ftcdn.net/09/13/00/93/700_F_913009344_oduNvG1wEDeA0rQh2OeSSkPlSxOJQLnh_ST.mp4',
              }}
              //  source={{uri: userData[0]?.video_url}}
              style={styles.videoPlaceholder}
              controls
              resizeMode="cover"
            />
            <Text style={styles.videoPitchText}>
              Edit Video Pitch---{userMedia[userMedia.length - 1]?.video_url}
            </Text>
          </TouchableOpacity>
        )} */}
        {/* <TouchableOpacity
        onPress={recordVideo}
        style={styles.videoPitchContainer}>
        {videoUri ? (
          <Video
            source={{uri: videoUri}}
            style={styles.videoPlaceholder}
            controls
            resizeMode="cover"
          />
        ) : (
          <>
            <Image
              source={images.ImageReplace}
              style={styles.videoPlaceholder}
            />
            <Text style={styles.videoPitchText}>Edit Video Pitch</Text>
          </>
        )}
      </TouchableOpacity> */}

        {/* Bottom Image Placeholders */}
        <FlatList
          data={[...mediaData, {media_id: 'add-new', image_url: null}]} // Add placeholder at the end
          renderItem={({item}) =>
            item.media_id === 'add-new' ? (
              <TouchableOpacity
                style={styles.addNewPlaceholder}
                onPress={handleAddNew}>
                <Text style={styles.addNewText}>+ Add New</Text>
              </TouchableOpacity>
            ) : (
              renderImageItem({item})
            )
          }
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />

        {/* Modal for Editing */}
        <Modal visible={modalVisible} transparent>
          <View style={styles.editmodalContainer}>
             <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1,width:'100%', justifyContent: 'center'}}
      >
            <View style={styles.editmodalContent}>
              <Text style={styles.editmodalTitle}>
                {selectedItem ? 'Edit Post' : 'Add New Post'}
              </Text>
              <TouchableOpacity onPress={uploadImage}>
                <Image
                  source={{
                    uri: selectedItem?.image_url
                      ? selectedItem?.image_url
                      : images.ImageReplace,
                  }}
                  style={styles.imagePlaceholder}
                  resizeMethod="contain"
                />
                {!selectedItem?.image_url && (
                  <Text style={styles.uploadText}>Upload Image</Text>
                )}
              </TouchableOpacity>
              {/* <TextInput
                style={styles.editinput}
                placeholder="Image URL"
                placeholderTextColor={'#000'}
                value
                //value={selectedItem?.image_url || ''}
                onChangeText={text =>
                  setSelectedItem({...selectedItem, image_url: text})
                }
              /> */}
              <TextInput
                style={styles.editinput}
                placeholder="Title"
                placeholderTextColor={'#000'}
                value={title}
                onChangeText={text => setTitle(text)}
                //value={selectedItem?.title || ''}
                // onChangeText={text =>
                //   setSelectedItem({...selectedItem, title: text})
                // }
              />
              <TextInput
                style={styles.editinput}
                placeholder="Description"
                placeholderTextColor={'#000'}
                value={description}
                onChangeText={text => setDescription(text)}
                // value={selectedItem?.description || ''}
                // onChangeText={text =>
                //   setSelectedItem({...selectedItem, description: text})
                // }
              />
              <TextInput
                style={styles.editinput}
                placeholder="Redirect URL"
                placeholderTextColor={'#000'}
                value={redirectUrl}
                onChangeText={text => setRedirectUrl(text)}
                // value={selectedItem?.image_redirect_url || ''}
                // onChangeText={text =>
                //   setSelectedItem({...selectedItem, image_redirect_url: text})
                // }
              />
              <View style={styles.editmodalButtons}>
                {/* <Button title="Save" onPress={handleSave} /> */}
                <TouchableOpacity 
                disabled={saveloader}
  onPress={()=>handleSave()}
  style={[styles.saveButtonContainer,{backgroundColor:COLORS.blue}]}
>
  {
    saveloader?  <View>
                    <ActivityIndicator size="small" color={COLORS.white}/>
                    </View>
  :
  <Text style={styles.saveButtonText1}>Save</Text>
}
</TouchableOpacity>
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="red"
                />
              </View>
            </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </ScrollView>
      {/* Special Offer Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Special Offer</Text>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
              <Text style={styles.starIcon}>⭐</Text>
            </View>

            <Text style={styles.modalTitle}>Special Offer!</Text>
            {/* <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>{offerItem?.name}</Text>
            </TouchableOpacity> */}
            <TextInput
              style={styles.offerButton}
              //  value={offerItem?.name}
              onChangeText={text => {
                setOfferName(text);
              }}
              value={offerName}
              placeholder="Enter Offer Name" // Optional: placeholder for when there's no value
              placeholderTextColor={'#000'} // Optional: placeholder text color
            />
            <TouchableOpacity
              onPress={() => handleOffers()}
              style={styles.saveButton}>
                {
                offerLoading ? (
                  <ActivityIndicator size="small" color="#32CD32" />
                ) : (
                  <Text style={styles.saveButtonText}>SAVE</Text>
                )
                }
              {/* <Text style={styles.saveButtonText}>SAVE</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '16@s',
    backgroundColor: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: '15@vs',
  },
  profileImage: {
    width: '100@s',
    height: '100@s',
    borderRadius: '50@s',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    left: '55%',
    right: '5@s',
    backgroundColor: COLORS.blue,
    width: '24@s',
    height: '24@s',
    borderRadius: '12@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    fontSize: '12@s',
    color: 'white',
  },
  videoPitchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  videoPlaceholder: {
    width: '100%',
    height: '140@vs',
    backgroundColor: '#E0E0E0',
    borderRadius: '8@s',
  },
  videoPitchText: {
    fontFamily: 'Inter',
    fontSize: '14@s',
    fontWeight: '600',
    color: '#000',
    marginTop: '8@vs',
    position: 'absolute',
    bottom: 20,
    color: 'black',
    left: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10@vs',
    width: '100%',
  },
  imagePlaceholder: {
    width: '100@s',
    height: '120@vs',
    backgroundColor: '#E0E0E0',
    borderRadius: '8@s',
    width: '45%',
    width: '48%', // Adjust for two images per row with spacing
    aspectRatio: 1, // Maintain square shape
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: '16@s',
    padding: '20@s',
    alignItems: 'center',
  },
  editButton: {
    borderWidth: 1,
    borderColor: COLORS.green,
    color: COLORS.green,
    paddingVertical: '3@vs',
    paddingHorizontal: '10@s',
    borderRadius: '8@s',
    marginBottom: '16@vs',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
  },
  editButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '14@s',
    color: COLORS.green,
  },

  editVedioButton: {
    borderWidth: 1,
    borderColor: COLORS.green,
    color: COLORS.green,
    paddingVertical: '3@vs',
    paddingHorizontal: '10@s',
    borderRadius: '8@s',
    marginBottom: '16@vs',
    width: '20%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:-20,
    position: 'absolute',
    top: 8,
    right: 5,
    //sbackgroundColor: 'red',
  },
  editVedioButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '14@s',
    color: COLORS.green,
  },
  iconContainer: {
    width: '60@s',
    height: '60@s',
    backgroundColor: '#E0E0E0',
    borderRadius: '30@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '12@vs',
  },
  starIcon: {
    fontSize: '28@s',
    color: '#FFA500', // Star color
  },
  modalTitle: {
    fontFamily: 'Inter',
    fontSize: '18@s',
    fontWeight: '600',
    color: 'black',
    marginBottom: '10@vs',
  },
  offerButton: {
    backgroundColor: COLORS.green,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '10@vs',
    paddingHorizontal: '20@s',
    borderRadius: '8@s',
    marginBottom: '16@vs',
  },
  offerButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: '14@s',
    color: 'white',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#32CD32',
    paddingVertical: '6@vs',
    paddingHorizontal: '20@s',
    borderRadius: '8@s',
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontSize: '14@s',
    color: '#32CD32',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  addressLabel: {
    fontFamily: 'Inter',
    fontSize: '14@s',
    fontWeight: '600',
    color: '#000',
  },
  specialOfferButton: {
    borderWidth: 1,
    borderColor: '#32CD32',
    paddingVertical: '2@vs',
    paddingHorizontal: '10@s',
    borderRadius: '5@s',
  },
  specialOfferText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '11@s',
    color: '#32CD32',
  },
  summaryContainer: {
    backgroundColor: COLORS.blue,
    padding: '12@s',
    borderRadius: '8@s',
    marginBottom: '16@vs',
  },
  summaryTitle: {
    fontFamily: 'Inter',
    fontSize: '14@s',
    fontWeight: '600',
    color: 'white',
  },
  summaryText: {
    fontFamily: 'Inter',
    fontSize: '12@s',
    color: 'white',
    marginTop: '4@vs',
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  addNewPlaceholder: {
    flex: 1,
    margin: 5,
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addNewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  editmodalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editmodalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignSelf:'center',
  },
  editmodalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  editinput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    color: '#000',
  },
  editmodalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButtonContainer: {
    backgroundColor: COLORS.blue, // Or any color you prefer
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  saveButtonText1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default EditBusiness;
