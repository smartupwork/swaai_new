import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {images} from '../../../assets/images';
import COLORS from '../../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {getConsumerProfile, getUserMedia, insertImage} from '../../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const profileConsumerScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState(null); // State for video URI
  const [offerItem, setOfferItem] = useState([]);
  const [offerName, setOfferName] = useState('');
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
    const [profileDetail, setProfileDetail] = useState({});
  
 useEffect(() => {
   

    fetchProfileData();
  }, [dispatch]);
   const fetchProfileData = async () => {
     // setLoading(true);
      try {
        const response = await dispatch(getConsumerProfile()).unwrap();
        setProfileDetail(response?.data);
        setSummary(response?.data?.summary_desc)
       console.log('response profile deail', response.data);
       
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', error.message || 'Failed to fetch profile data');
      } finally {
       // setLoading(false);
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
      console.log('response------', response.data);
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
    // setIsLoading(true);
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    const id = parsedUser.id;
    const data = {
      offer_id: offerItem?.id,
      user_id: id,
      business_id: offerItem?.business_id,
      name: offerName,
      description: 'offer description',
    };

    try {
      const response = await dispatch(saveOffers(data)).unwrap();

      setIsLoading(false);
      Alert.alert('Success', response?.message);
      closeModal();
      // navigation.navigate('SplashBusiness2');
    } catch (err) {
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
   // setImage(imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : '');
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
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 string
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    return null;
  }
};
const [loaderImage,setLoaderImage]=useState(false)
  // Handle Save Post
const handleSave = async () => {
  try {
    setLoaderImage(true);

    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);

    let base64 = imageBase64; // Store existing imageBase64

    if (!imageBase64) {
      const imageUrl = selectedItem?.image_url;

      // Wait for base64 conversion before proceeding
      base64 = await convertImageToBase64(imageUrl);
      setimageBase64(base64); // Update state
    }

    // Construct data payload
    const data = {
      user_id: id?.id || '',
      media_id: mediaId || '',
      image: base64 ? `data:image/jpeg;base64,${base64}` : '',
      title: title,
      description: description,
      image_redirect_url: redirectUrl,
    };

    console.log('data:', data);

    // Call API
    const response = await dispatch(insertImage(data)).unwrap();

    // Reset form
    setMediaId('');
    setDescription('');
    setTitle('');
    setRedirectUrl('');
    setimageBase64('');
    setLoaderImage(false);

    Alert.alert('Success', response?.message);
  } catch (err) {
    console.error('Error:', err);

    setLoaderImage(false);
    setMediaId('');
    setDescription('');
    setTitle('');
    setRedirectUrl('');
    setimageBase64('');

    // Handle different error types
    if (typeof err === 'string') {
      alert(err);
    } else if (err?.message) {
      alert(err.message);
    } else {
      alert('An unknown error occurred.');
    }
  }

  fetchUserDetail();
  setModalVisible(false);
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
          // onPress={() => Linking.openURL(item.image_redirect_url || '')}>
         
onPress={async () => {
  const url = item.image_redirect_url;

  if (!url) {
    Alert.alert('Invalid URL', 'No redirect URL provided.');
    return;
  }

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open the provided URL.');
    }
  } catch (error) {
    Alert.alert('Error', 'Invalid  URL.');
    console.error('Linking error:', error);
  }
}}
>
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
                  durationLimit: 15, // 15 seconds max duration
                },
                response => handleVideoResponse(response),
              );
            } else {
              Alert.alert('Camera permission is required to record videos.');
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
              response => handleVideoResponse(response),
            );
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{uri: profileDetail?.profile_image}} // Replace with your icon
          />
          <Text style={styles.name}>
            {profileDetail?.first_name} {profileDetail?.last_name}
          </Text>
          <Text style={styles.location}>Boston, MA</Text>
        </View>

        {/* Personal Summary */}
        <TouchableOpacity
          // onPress={() => navigation.navigate('EditProfileScreen')}
          onPress={() => setModalVisibleSummary(true)} 
          style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Personal Summary/Description</Text>
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
        {/* About Me Section */}
        <Text style={styles.aboutTitle}>About me</Text>
        {/* <View style={styles.imageContainer}>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={images.ImageReplace} />
            <Text style={styles.imageText}>Image #1</Text>
          </View>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={images.ImageReplace} />
            <Text style={styles.imageText}>Image #2</Text>
          </View>
        </View> */}
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
                {
                  loaderImage?
                  <View>
                    <ActivityIndicator size="small" color={COLORS.cyan}/>
                    </View>
                :
                <Button disabled={loaderImage} title="Save" onPress={handleSave} />
}
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="red"
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* More Actions */}
        {/* <View style={styles.actionsContainer}>
          <Text style={styles.moreActions}>MORE ACTIONS</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search in Conversation"
          />
        </View> */}
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Select a User</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ConsumerChatScreen', {
                senderId: 'user1',
                receiverId: 'user2',
              })
            }
            style={{padding: 10, backgroundColor: 'blue', margin: 10}}>
            <Text style={{color: '#fff'}}>Chat as User 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ConsumerChatScreen', {
                senderId: 'user2',
                receiverId: 'user1',
              })
            }
            style={{padding: 10, backgroundColor: 'green', margin: 10}}>
            <Text style={{color: '#fff'}}>Chat as User 2</Text>
          </TouchableOpacity>
        </View> */}
        {/* MessaConsumerChatScreenge Button */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ConsumerChatScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CheckInBusiness')}
          style={styles.button}>
          <Text style={styles.buttonText}>Check In Businesses</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '16@ms',
    paddingTop: '20@ms',
  },
  header: {
    alignItems: 'center',
    marginBottom: '20@ms',
  },
  logo: {
    width: '80@ms',
    height: '80@ms',
    borderRadius: '40@ms',
    marginBottom: '10@ms',
  },
  name: {
    fontSize: '20@ms',
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  location: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: COLORS.cyan,
    borderRadius: '10@ms',
    padding: '16@ms',
    marginBottom: '20@ms',
  },
  summaryTitle: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginBottom: '4@ms',
  },
  summaryText: {
    fontSize: '12@ms',
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  aboutTitle: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-Regular',
    color: '#999',
    marginBottom: '8@ms',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@ms',
    //  backgroundColor:'red'
  },
  imageBox: {
    flex: 1,
    //  alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: '10@ms',
    marginHorizontal: '5@ms',
    // padding: '16@ms',
    //  backgroundColor:'pink'
  },
  image: {
    width: '100%',
    height: '120@ms',
    borderTopLeftRadius: '12@s',
    borderTopRightRadius: '12@s',
    //  marginBottom: '8@ms',
  },
  imageText: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    paddingVertical: '16@s',
    paddingHorizontal: '8@s',
  },
  actionsContainer: {
    marginBottom: '20@ms',
  },
  moreActions: {
    fontSize: '12@ms',
    fontFamily: 'Poppins-Medium',
    color: '#999',
    marginBottom: '8@ms',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '8@ms',
    padding: '10@ms',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#76C043',
    borderRadius: '8@ms',
    paddingVertical: '12@ms',
    alignItems: 'center',
    marginBottom: '12@s',
  },
  buttonText: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
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

export default profileConsumerScreen;
