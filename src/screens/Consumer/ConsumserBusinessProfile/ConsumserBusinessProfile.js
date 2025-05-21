import {
  Alert,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  LogBox,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderComp from '../../../components/HeaderComp';
import {images} from '../../../assets/images';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import StarRating from 'react-native-star-rating-widget';
import {launchCamera} from 'react-native-image-picker';
import Video from 'react-native-video';
import ButtonComp from '../../../components/ButtonComp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {
  addReview,
  availOffer,
  getBusinessDetail,
  saveAnalytics,
  toggleCheckIn,
} from '../../../redux/slices/apiSlice';
import { ActivityIndicator } from 'react-native-paper';

const ConsumerBusinessProfile = ({navigation, route}) => {
  // Refs
  const videoRef = useRef(null);
  const scrollViewRef = useRef(null);

  // State
  const [businessDetail, setBusinessDetail] = useState(null);
  const [rating, setRating] = useState(5);
  const [videoUri, setVideoUri] = useState(null);
  const [ratingModal, setRatingModal] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChkInModalVisible, setChkInModalVisible] = useState(false);
  const [availOffermodalVisible, setavailOfferModalVisible] = useState(false);
  const [availOfferData, setAvailOfferData] = useState(null);
  const [isDoneModalVisible, setDoneModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
const[reviewLoader,setReviewLoader]=useState(false)
  const dispatch = useDispatch();
  const id = route.params?.id;

  // Fetch data on mount
  useEffect(() => {
    if (!id) {
      Alert.alert('Error', 'No business ID provided');
      navigation.goBack();
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailResponse, offerResponse] = await Promise.all([
          dispatch(getBusinessDetail(id)).unwrap(),
          dispatch(availOffer(id)).unwrap(),
        ]);

        setBusinessDetail(detailResponse);

        if (offerResponse?.success) {
          setAvailOfferData(offerResponse);
          setavailOfferModalVisible(true);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        Alert.alert('Error', 'Failed to load business data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  // Review handler
  const handleReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter your review');
      return;
    }
setReviewLoader(true)
    try {
      const response = await dispatch(
        addReview({
          business_id: id,
          rating: ratingModal,
          review_text: comment,
        }),
      ).unwrap();
      setReviewLoader(false)
      setDoneModalVisible(true);
      setModalVisible(false);
      // Alert.alert('Success', response?.message || 'Review submitted');
    } catch (error) {
      setReviewLoader(false)
      console.error('Review error:', error);
      Alert.alert('Error', error?.message || 'Failed to submit review');
    }
  };

  // Check-in handler
  const handleCheckIn = async () => {
    try {
      const response = await dispatch(
        toggleCheckIn({
          business_id: businessDetail?.business?.id,
        }),
      ).unwrap();

      setChkInModalVisible(false);
      Alert.alert('Success', response?.message || 'Checked in successfully');
    } catch (error) {
      console.error('Check-in error:', error);
      Alert.alert('Error', error?.message || 'Failed to check in');
    }
  };

  // Record video
  const recordVideo = () => {
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 10,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert(
            'Error',
            response.errorMessage || 'Failed to record video',
          );
          return;
        }
        setVideoUri(response.assets?.[0]?.uri);
      },
    );
  };

  // Analytics handler
  const handleAnalytics = async eventType => {
    try {
      await dispatch(
        saveAnalytics({
          business_id: id,
          event_type: eventType,
        }),
      ).unwrap();
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // Render video component
  const renderBusinessVideo = () => {
    try {
      const videoItem = businessDetail?.media?.find(
        item =>
          item?.videos &&
          typeof item.videos === 'string' &&
          item.videos.trim() !== '',
      );

      if (!videoItem)
        return <Text style={styles.errorText}>No video available</Text>;

      const videoUrl = videoItem.videos.trim();
      if (!videoUrl.startsWith('http')) {
        console.error('Invalid video URL:', videoUrl);
        return <Text style={styles.errorText}>Invalid video URL</Text>;
      }

      return (
        <Video
          ref={videoRef}
          source={{
            uri: videoUrl,
            type: videoUrl.split('.').pop() || 'mp4',
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          
          resizeMode="cover"
          repeat={false}

          shouldPlay
          
          isLooping={false}
          style={{width: '90%',alignSelf:'center',marginVertical:10, height: 200}}
          onPlay={() => handleAnalytics('video_play')}
          onError={error => {
            console.error('Video error:', error);
            Alert.alert('Error', 'Failed to play video');
          }}
        />
      );
    } catch (error) {
      console.error('Video render error:', error);
      return <Text style={styles.errorText}>Error loading video</Text>;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderComp
        leftClick={() => navigation.goBack()}
        // rightClick={() => Alert.alert('Menu')}
      />

      <ScrollView ref={scrollViewRef}>
        <View style={styles.headerCont}>
          <Image
            source={{uri: businessDetail?.profile_image}}
            style={styles.headerImg}
          />
          <View>
            <Text style={styles.headerTxt}>
              {businessDetail?.business?.name}
            </Text>
            <ImageBackground source={images.Violet} style={styles.VioletImg}>
              <Text style={styles.viotetTxt}>Family-Owned</Text>
            </ImageBackground>
          </View>
          <Text></Text>
        </View>
        <View
          style={{
            gap: scale(8),
            width: '100%',
            blackgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(12),
            marginTop: scale(12),
          }}>
          <View style={{gap: scale(8)}}>
            <StarRating
              rating={rating}
              onChange={setRating}
              maxStars={5}
              starSize={19}
              starStyle={{width: scale(8)}}
              style={{alignSelf: 'flex-end'}}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.reviewBtn}>
              <Text style={styles.reviewTxt}>Review</Text>
            </TouchableOpacity>
          </View>
          <View style={{gap: scale(8)}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReviewBusinessProfile', {
                  id: businessDetail?.business?.id,
                })
              }
              style={styles.viewAllBtn}>
              <Text style={styles.viewAllTxt}>View all →</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChkInModalVisible(true)}
              style={styles.checkInBtn}>
              <Text style={styles.checkInTxt}>Check-in →</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: scale(12)}}>
        <TouchableOpacity
  onPress={async () => {
    const rawUrl = businessDetail?.business?.website_url;
    if (rawUrl) {
      const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
      try {
        handleAnalytics('click');
        await Linking.openURL(url);
      } catch (error) {
        console.error('Failed to open URL:', error);
        Alert.alert('Error', 'Unable to open the website.');
      }
    } else {
      Alert.alert('Error', 'Website URL not available');
    }
  }}
>
  <Text
    style={styles.businessAddress}
    accessible={true}
    accessibilityRole="link"
  >
    Visit Business Website
  </Text>
</TouchableOpacity>

          <View style={styles.companySummary}>
            <Text style={styles.companySummaryTitle}>
              {businessDetail?.business?.description}
            </Text>
            <Text style={styles.companySummarySubtitle}>
              {businessDetail?.business?.business_address}
            </Text>
          </View>
        </View>

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

        {renderBusinessVideo()}

        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            {businessDetail?.media?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item?.image_redirect_url) {
                      handleAnalytics('click');
                      Linking.openURL(item.image_redirect_url);
                    }
                  }}
                  key={index}
                  style={{
                    width: 150,
                    backgroundColor: '#F8F9FE',
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginRight: 15,
                  }}>
                  <Image
                    source={{uri: item.images}}
                    style={{
                      width: '100%',
                      height: 100,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={{padding: 8, textAlign: 'center'}}>
                    Image #{index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ConsumerChatScreen', {
              uid: businessDetail?.business?.user_id,
            })
          }
          style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.reviewBox}>
            <Text style={styles.title}>Review</Text>

            <View style={styles.gymContainer}>
              <Image
                source={{uri: businessDetail?.profile_image}}
                style={styles.gymImage}
              />
              <Text style={styles.gymName}>
                {businessDetail?.business?.name}
              </Text>
            </View>

            <StarRating
              rating={ratingModal}
              onChange={setRatingModal}
              color="gold"
              starSize={moderateScale(30)}
              maxStars={5}
              enableHalfStar={false}
            />

            <TextInput
              style={styles.commentBox}
              placeholder="Your comment"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <View style={{width: '115%', alignSelf: 'center'}}>
              {
                reviewLoader?<View style={{ width: '90%',
                  paddingVertical: scale(5),
                  borderRadius: scale(8),
                  alignItems: 'center',
                  marginVertical: scale(8),
                  alignSelf:'center',
                  backgroundColor:COLORS.green}}>
                  <ActivityIndicator size={20} color='white'/>
                  </View>
              :
              <ButtonComp
                title="Say it!"
                backgroundColor={COLORS.green}
                onPress={handleReview}
              />
}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDoneModalVisible}
        animationType="fade"
        transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setDoneModalVisible(false);
          }}
          style={{flex: 1}}>
          <View style={styles.modalOverlay}>
            <View style={styles.doneBox}>
              <View style={styles.iconContainer}>
                <View style={styles.checkIcon}>
                  <Icon name="check-bold" size={20} color="#fff" />
                </View>
              </View>
              <Text style={styles.doneTitle}>Done!</Text>
              <Text style={styles.doneSubtitle}>Thank you for your review</Text>
              <View style={styles.starsContainer}>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <Text key={index} style={styles.star}>
                      ★
                    </Text>
                  ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isChkInModalVisible}
        animationType="fade"
        transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setChkInModalVisible(false);
          }}
          style={{flex: 1}}>
          <View style={styles.modalOverlay}>
            <View style={styles.doneBox}>
              <Image
                source={images.avatar}
                style={{width: scale(50), height: 50, resizeMode: 'cover'}}
              />
              <Text style={styles.doneTitle}>
                {businessDetail?.business?.name} !
              </Text>
              <View style={{width: '110%'}}>
                <ButtonComp
                  title="Check In"
                  backgroundColor={COLORS.green}
                  onPress={handleCheckIn}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent visible={availOffermodalVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.starContainer}>
              <Icon name="star" size={scale(24)} color="#E2B93B" />
            </View>
            <Text style={styles.title}>{availOfferData?.message}</Text>
            <Text style={styles.subtitle}>
              {availOfferData?.offer?.success}{' '}
            </Text>
            <View style={styles.couponContainer}>
              <Text style={styles.couponCode}>
                {availOfferData?.offer?.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setavailOfferModalVisible(false);
                handleAnalytics('video_play');
              }}>
              <Text style={styles.closeText}>Close</Text>
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
    backgroundColor: '#fff',
  },
  headerCont: {
    width: '99%',
    paddingHorizontal: scale(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImg: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain ',
    borderRadius: 70 / 2,
  },
  headerTxt: {
    fontSize: scale(20),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.cyan,
    textAlign: 'center',
  },
  VioletImg: {
    width: scale(128),
    height: scale(24),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viotetTxt: {
    fontSize: scale(10),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  reviewBtn: {
    borderWidth: 2,
    borderColor: COLORS.green,
    borderRadius: scale(8),
    alignItems: 'center',
    width: scale(60),
    alignSelf: 'flex-end',
  },
  reviewTxt: {
    fontSize: scale(11),
    fontFamily: 'Poppins-Medium',
    color: COLORS.green,
  },
  viewAllBtn: {
    backgroundColor: COLORS.green,
    borderRadius: scale(6),
    alignItems: 'center',
    padding: scale(4),
  },
  viewAllTxt: {
    fontSize: scale(11),
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
    paddingVertical: scale(1),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  checkInBtn: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: scale(6),
    alignItems: 'center',
    padding: scale(5),
  },
  checkInTxt: {
    fontSize: scale(11),
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
    paddingVertical: scale(1),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  businessAddress: {
    fontSize: scale(15),
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: scale(6),
    textAlign: 'center',
    marginTop: scale(12),
  },
  companySummary: {
    backgroundColor: COLORS.blue,
    padding: scale(18),
    borderRadius: scale(8),
    marginBottom: scale(16),
  },
  companySummaryTitle: {
    fontSize: scale(16),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
  },
  companySummarySubtitle: {
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
  },
  videoPitchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: '16@vs',
    paddingHorizontal: scale(12),
  },
  videoPlaceholder: {
    width: '100%',
    height: '200@vs',
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
    left: 20,
  },
  messageButton: {
    backgroundColor: COLORS.cyan,
    paddingVertical: '4@vs',
    paddingHorizontal: '8@vs',
    borderRadius: '8@s',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: scale(12),
  },
  messageButtonText: {
    fontSize: '12@s',
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  reviewBox: {
    width: '99%',
    backgroundColor: 'white',
    borderRadius: '10@s',
    padding: '20@s',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: '10@s',
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: '18@s',
    marginBottom: '20@s',
  },
  gymContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@s',
  },
  gymImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    marginRight: '10@s',
  },
  gymName: {
    fontFamily: 'Poppins-Medium',
    fontSize: '16@s',
  },
  commentBox: {
    height: '100@s',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: '8@s',
    padding: '10@s',
    fontFamily: 'Poppins-Regular',
    fontSize: '14@s',
    marginTop: '10@s',
    marginBottom: '20@s',
    backgroundColor: '#F8FAFF',
  },
  doneBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: '12@s',
    padding: '20@s',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: '10@s',
    elevation: 5,
  },
  iconContainer: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15@s',
    position: 'absolute',
    top: '-15@s',
    marginBottom: '25@s',
  },
  checkIcon: {
    width: '25@s',
    height: '25@s',
    backgroundColor: '#4CAF50',
    borderRadius: '15@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: '20@s',
    marginBottom: '5@s',
    marginTop: '25@s',
  },
  doneSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: '14@s',
    color: '#757575',
    marginBottom: '15@s',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: '20@s',
    color: 'gold',
    marginHorizontal: '2@s',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: '20@s',
    borderRadius: '10@s',
    alignItems: 'center',
    position: 'relative',
  },
  starContainer: {
    position: 'absolute',
    top: '-15@s',
    backgroundColor: '#fff',
    padding: '10@s',
    borderRadius: '50@s',
    elevation: 5,
  },
  subtitle: {
    fontSize: '14@s',
    color: '#666',
    textAlign: 'center',
    marginVertical: '10@s',
  },
  couponContainer: {
    width: '90%',
    backgroundColor: '#8BC34A',
    paddingVertical: '10@s',
    paddingHorizontal: '20@s',
    borderRadius: '5@s',
    marginTop: '10@s',
  },
  couponCode: {
    fontSize: '16@s',
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: '15@s',
    paddingVertical: '8@s',
    paddingHorizontal: '20@s',
    backgroundColor: COLORS.gray2,
    borderRadius: '5@s',
  },
  closeText: {
    color: '#fff',
    fontSize: '14@s',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: scale(10),
  },
});

export default ConsumerBusinessProfile;
