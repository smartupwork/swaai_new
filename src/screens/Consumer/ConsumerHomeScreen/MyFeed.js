// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Alert,
//   Modal,
// } from 'react-native';
// import { ScaledSheet, scale } from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { images } from '../../../assets/images';
// import COLORS from '../../../constants/color';
// import { useDispatch, useSelector } from 'react-redux';
// import Share from 'react-native-share';
// import { addPosts, commentInPost, getMyPosts, getPosts, postShares, reactToPost } from '../../../redux/slices/apiSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For icons
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);
// const MyFeed = () => {
//   const dispatch=useDispatch();
//   const [selectedMenu, setSelectedMenu] = useState('');
//   const [postText, setPostText] = useState('');
// const {community, loading, error} = useSelector(state => state.api);
//  console.log('community------',community?.community);
 
//   const [postDetail, setPostDetail] = useState([]);
//   const [isLiked, setIsLiked] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//       const [newComment, setNewComment] = useState('');
//     const [selectedPost, setSelectedPost] = useState(null);
//    const fetchPosts = async () => {
//       try {
//         const response1 = await dispatch(getMyPosts()).unwrap();
//         setPostDetail(response1);
//         console.log('myposts------', response1);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//   useEffect(() => {
   
   
//       fetchPosts();
    
//   }, [dispatch]);
//  const handlePublishPost = async () => {
//  // alert('heelo'+selectedMenu);
//    const user = await AsyncStorage.getItem('user');

//    const id = JSON.parse(user);
//    console.log('id', id.id);
//    if (!postText) {
//      Alert.alert('Error', 'Please enter post text');
//      return;
//    }
// if(selectedMenu===''){
//   Alert.alert('Error', 'Please select community');
//       return;
// }
//    const data = {
//      user_id: id.id,
//      community_id: selectedMenu,
//      content: postText,
//    };
//    console.log('data', data);

//    try {
//      console.log('data');

//      const response = await dispatch(addPosts(data)).unwrap();
//      console.log('response', response);

//      setPostText('');
//      Alert.alert('Success', response?.message);
//      const response1 = await dispatch(getPosts(selectedMenu)).unwrap();
//      setPostDetail(response1);
//      console.log('response1', response1);

//      // navigation.navigate('SplashBusiness2');
//    } catch (err) {
//      //   setIsLoading(false);
//      console.log('error', err);

//      if (typeof err === 'string') {
//        // Handle string error
//        console.error('Error:', err);
//        alert(err);
//      } else if (err && err.message) {
//        // Handle object error with message property
//        console.error('Error message:', err.message);
//        alert(err.message);
//      } else {
//        console.error('Unhandled error:', err);
//        alert('An unknown error occurred.');
//      }
//    }
//  };
//  const handleLike = async id => {
//    //  alert('heelo'+id);
//    setIsLiked(!isLiked);
//    const data = {
//      post_id: id,
//    };

//    try {
//      console.log('data');

//      const response = await dispatch(reactToPost(data)).unwrap();

//      // Alert.alert('Success', response?.message);
//      const response1 = await dispatch(getMyPosts(selectedMenu)).unwrap();
//      setPostDetail(response1);
//      // const response1 = await dispatch(getCommunities(data)).unwrap();
//      //console.log('response1',response1);
//    } catch (err) {
//      //   setIsLoading(false);
//      console.log('error', err);

//      if (typeof err === 'string') {
//        // Handle string error
//        console.error('Error:', err);
//        alert(err);
//      } else if (err && err.message) {
//        // Handle object error with message property
//        console.error('Error message:', err.message);
//        alert(err.message);
//      } else {
//        console.error('Unhandled error:', err);
//        alert('An unknown error occurred.');
//      }
//    }
//  };
//  const handleComment = async(id) => { 
//   console.log("seled cpost",selectedPost);
//    fetchPosts();
//   if(newComment === ''){
//     Alert.alert('Alert','Please enter comment');
//     return;
//   }
//    const data = {
//      post_id: selectedPost?.post?.id,
//      parent_comment_id: '',
//      content: newComment,
//    };
//      console.log('data', data);
  
//      try {
//        console.log('data');
  
//        const response = await dispatch(commentInPost(data)).unwrap();
//        console.log('response------', response);
  
//        setNewComment('');
//        Alert.alert('Success', response?.message);
//        const response1 = await dispatch(getPosts(selectedPost?.post?.community_id)).unwrap();
//        setPostDetail(response1);
//        setModalVisible(false)
//        console.log('response111111!!!!', response1);
  
//        // navigation.navigate('SplashBusiness2');
//      } catch (err) {
//        //   setIsLoading(false);
//        console.log('error', err);
  
//        if (typeof err === 'string') {
//          // Handle string error
//          console.error('Error:', err);
//          alert(err);
//        } else if (err && err.message) {
//          // Handle object error with message property
//          console.error('Error message:', err.message);
//          alert(err.message);
//        } else {
//          console.error('Unhandled error:', err);
//          alert('An unknown error occurred.');
//        }
//       }
    
  
//   };
//     const handleShare2 = async id => {
    
//       const data = {
//         post_id: id,
//         share_to: '',
       
//       };
//       console.log('data', data);

//       try {
//         console.log('data');

//         const response = await dispatch(postShares(data)).unwrap();
//         console.log('response------', response);

//         setNewComment('');
//         Alert.alert('Success', response?.message);
//         // const response1 = await dispatch(
//         //   getPosts(selectedPost?.post?.community_id),
//         // ).unwrap();
//         // setPostDetail(response1);
//         // setModalVisible(false);
//         // console.log('response1', response1);

//         // navigation.navigate('SplashBusiness2');
//       } catch (err) {
//         //   setIsLoading(false);
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
//  const handleShare = async content => {
//    const shareOptions = {
//      title: 'Share via',
//      message: content,
//      url: 'https://example.com/boston-thrifts',
//    };

//    try {
//      await Share.open(shareOptions);
//    } catch (error) {
//      console.log(error);
//    }
//  };

//   const menuData = [
//     {id: '1', title: 'Boston Thrifts', color: '#8BC34A'},
//     {id: '2', title: 'FOBs', color: '#4DB6AC'},
//     {id: '3', title: 'LGBTQ+', color: '#1E88E5'},
//     {id: '4', title: 'Coming Soon', color: '#388E3C'},
//   ];

//   const posts = [
//     {
//       id: '1',
//       user: 'John Fantasia',
//       location: 'Boston, MA',
//       content:
//         'Hey Boston Thrifters! 👋\n\nI’m looking to score some unique finds and thought I’d tap into the wisdom of this awesome group. 🎉\n\nWhat are your favorite local thrift spots or hidden gems around the Boston area? I’m on the hunt for vintage clothing, cool home decor, and any funky accessories.\n\nAlso, if anyone has recommendations for thrift markets or pop-up events happening soon, please drop them here! Bonus points if you know any places with a great selection of fall/winter coats or boots. 🧥👢',
//       likes: 16,
//       comments: 24,
//       shares: 5,
//     },
//     {
//       id: '1',
//       user: 'John Fantasia',
//       location: 'Boston, MA',
//       content:
//         'Hey Boston Thrifters! 👋\nI’m looking to score some unique finds and thought I’d tap into the wisdom of this awesome group. 🎉\nWhat are your favorite local thrift spots or hidden gems around the Boston area? I’m on the hunt for vintage clothing, cool home decor, and any funky accessories.\nAlso, if anyone has recommendations for thrift markets or pop-up events happening soon, please drop them here! Bonus points if you know any places with a great selection of fall/winter coats or boots. 🧥👢',
//       likes: 16,
//       comments: 24,
//       shares: 5,
//     },
//   ];
// const CommentItem = ({comment}) => {
//   console.log("comment",comment);
//    const getTimeAgo = time => {
//      return dayjs(time).fromNow();
//    };
//   return (
//     <View style={styles.commentContainer}>
//       <Text style={styles.postAuthor}>{comment.commented_by}</Text>
//       <Text style={styles.commentText}>{comment.comment}</Text>
//       <Text style={styles.commentDate}>
//         {getTimeAgo(comment.comment_posted_time)}{' '}
//       </Text>
//       {/* <Text style={styles.commentDate}>
//         {new Date(comment.comment_posted_time).toLocaleString()}
//       </Text> */}
//     </View>
//   );
// };
//   return (
//     <ScrollView style={styles.container}>
//       {/* Menu Section */}
//       <View style={styles.menuContainer}>
//         {community.community?.map(menu => {
//           const randomColor =
//             menuData[Math.floor(Math.random() * menuData.length)].color;

//           return (
//             <View>
//               <TouchableOpacity
//                 key={menu.id}
//                 style={[
//                   styles.menuItem,
//                   {
//                     backgroundColor: randomColor,
//                   },
//                 ]}
//                 onPress={() => setSelectedMenu(menu.id)}>
//                 <View
//                   style={[styles.menuCircle, {backgroundColor: randomColor}]}
//                 />
//               </TouchableOpacity>
//               <Text
//                 style={[
//                   styles.menuText,
//                   {color: selectedMenu === menu.id ? 'red' : '#374151'},
//                 ]}>
//                 {menu?.name}
//               </Text>
//             </View>
//           );
//         })}
//       </View>

//       {/* Post Input Section */}
//       <View style={styles.postInputContainer}>
//         <View style={styles.inputRow}>
//           {/* <Icon name="person-circle-outline" size={30} color="#757575" /> */}
//           <Image
//             source={images.avatar}
//             style={{
//               width: scale(25),
//               height: scale(25),
//               resizeMode: 'contain',
//               //tintColor: 'yellow',
//             }}
//           />

//           <TextInput
//             style={styles.textInput}
//             placeholder="Write your post here"
//             placeholderTextColor="#9E9E9E"
//             value={postText}
//             onChangeText={setPostText}
//           />
//         </View>
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.dropdown}>
//             <Icon name="document-text-outline" size={20} color="#757575" />
//             <Text style={styles.dropdownText}>Add your post in </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handlePublishPost()}
//             style={styles.publishButton}>
//             <Text style={styles.publishButtonText}>Publish Post </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Post Section */}
//       <FlatList
//         data={postDetail?.posts}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <View style={styles.postCard}>
//             <View style={styles.topCommunity}>
//               <Text style={styles.viewCommunity}>
//                 Posted in {postDetail?.community_name}
//               </Text>
//               <TouchableOpacity>
//                 <Text style={styles.viewCommunity}>View Community</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.postHeader}>
//               <Image
//                 source={images.avatar}
//                 style={{
//                   width: scale(35),
//                   height: scale(35),
//                   resizeMode: 'contain',
//                   //tintColor: 'yellow',
//                 }}
//               />
//               {/* <Icon name="person-circle-outline" size={40} color="#1E88E5" /> */}
//               <View style={styles.userInfo}>
//                 <Text style={styles.userName}>
//                   {item?.posted_by || 'Anonymous'}
//                 </Text>
//                 <Text style={styles.userLocation}>
//                   {item?.city || 'Bostan'},{postDetail?.state || 'MA'}
//                 </Text>
//               </View>
//             </View>
//             <Text style={styles.postText}>{item?.post?.content}</Text>
//             <View style={styles.postFooter}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: scale(15),
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => handleLike(item?.post?.id)}
//                   style={styles.footerButton}>
//                   {item?.reactions_count !== 0 ? (
//                     <Icon name="heart" size={20} color={COLORS.cyan} />
//                   ) : (
//                     <Icon name="heart-outline" size={20} color="#757575" />
//                   )}
//                   <Text style={styles.footerText}>{item.reactions_count}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   // onPress={() => handleComment()}
//                   onPress={() => {
//                     if (!modalVisible) {
//                       setSelectedPost(item); // Store the selected post
//                       setModalVisible(true);
//                     }
//                   }}
//                   style={styles.footerButton}>
//                   <Icon name="chatbox-outline" size={20} color="#757575" />
//                   <Text style={styles.footerText}>
//                     {item?.comments?.length}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <TouchableOpacity
//                 onPress={() => {
//                   handleShare2(item?.post?.id);
//                 }}
//                 //  onPress={() => handleShare(item.content)}
//                 style={styles.footerButton}>
//                 <Icon name="share-social-outline" size={20} color="#757575" />
//                 <Text style={styles.footerText}>Share </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.postList}
//       />
//         <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => {
//              //  Alert.alert('Modal has been closed.');
//                 setModalVisible(!modalVisible);
//                 setSelectedPost(null);
//               }}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setModalVisible(false);
//                       setSelectedPost(null);
//                     }}
//                     style={{alignSelf: 'flex-end'}}>
//                     <FontAwesome name="close" size={24} />
//                   </TouchableOpacity>
      
//                   <View style={styles.Ccontainer}>
//                     <FlatList
//                       data={selectedPost?.comments}
//                       keyExtractor={item => item.id.toString()}
//                       renderItem={({item}) => <CommentItem comment={item} />}
//                     />
//                   </View>
      
//                   <View style={styles.commentBox}>
//                     <TextInput
//                       placeholder={'Write a comment...'}
//                       placeholderTextColor={'#888'}
//                       multiline={true}
//                       value={newComment}
//                       onChangeText={setNewComment}
//                       style={styles.commentTxt}
//                     />
//                     <TouchableOpacity
//                       onPress={() => handleComment()}
//                       // onPress={addComment}
//                       style={styles.commentPost}>
//                       <FontAwesome name="send-o" size={24} />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </Modal>
//     </ScrollView>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: '10@ms',
//     marginVertical: '15@ms',
//   },
//   menuItem: {
//     alignItems: 'center',
//     paddingVertical: '10@ms',
//     borderRadius: '25@ms',
//     width: scale(50),
//     height: scale(50),
//     //  flex: 1,
//     marginHorizontal: '5@ms',
//   },
//   menuCircle: {
//     width: '20@ms',
//     height: '20@ms',
//     borderRadius: '10@ms',
//     marginBottom: '5@ms',
//   },
//   menuText: {
//     fontFamily: 'Poppins',
//     fontSize: '12@ms',
//     textAlign: 'center',
//     marginTop: scale(10),
//   },
//   postInputContainer: {
//     backgroundColor: '#FFFFFF',
//     padding: '15@ms',
//     marginHorizontal: '10@ms',
//     marginBottom: '15@ms',
//     borderRadius: '10@ms',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     elevation: 2,
//     // backgroundColor:'pink'
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '10@ms',
//     // backgroundColor:'black'
//   },
//   textInput: {
//     flex: 1,
//     fontFamily: 'Poppins',
//     fontSize: '14@ms',
//     color: '#000',
//     marginLeft: '15@ms',
//     borderBottomWidth: '1@ms',
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: '5@ms',
//   },
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dropdownText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: '14@ms',
//     color: '#757575',
//     marginLeft: '5@ms',
//   },
//   publishButton: {
//     backgroundColor: COLORS.cyan,
//     borderRadius: '20@ms',
//     paddingHorizontal: '16@ms',
//     paddingVertical: '6@ms',
//   },
//   publishButtonText: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: '13@ms',
//     color: '#FFFFFF',
//   },
//   postCard: {
//     backgroundColor: '#FFFFFF',
//     padding: '15@ms',
//     marginHorizontal: '10@ms',
//     marginBottom: '15@ms',
//     borderRadius: '10@ms',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     elevation: 2,
//   },
//   postHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '10@ms',
//   },
//   userInfo: {
//     flex: 1,
//     marginLeft: '10@ms',
//   },
//   userName: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: '14@ms',
//     color: '#000',
//   },
//   userLocation: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: '12@ms',
//     color: '#757575',
//   },
//   topCommunity: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 0.5,
//     paddingBottom: scale(6),
//     borderBottomColor: 'gray',
//     marginBottom: scale(14),
//   },
//   viewCommunity: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: '12@ms',
//     color: '#757575',
//   },
//   postContent: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: '12@ms',
//     color: '#000',
//     marginBottom: '10@ms',
//   },
//   postFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '10@ms',
//   },
//   footerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   footerText: {
//     fontFamily: 'Poppins',
//     fontSize: '12@ms',
//     color: '#757575',
//     marginLeft: '5@ms',
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     width: '100%',
//     height: '90%',
//     bottom: 0,
//     position: 'absolute',
//     borderRadius: 20,
//     padding: '12@ms',
//     alignItems: 'center',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   commentBox: {
//     width: '100%',

//     //  backgroundColor: 'pink',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     position: 'absolute',
//     bottom: 20,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   commentTxt: {
//     //  borderWidth: 1,
//     borderRadius: 5,
//     height: '45@ms',
//     padding: 10,
//     // marginTop: 10,
//     width: '85%',
//   },
//   commentPost: {
//     //    backgroundColor: 'blue',
//     // padding: 10,
//     // marginTop: 10,
//     width: '15%',
//     height: '45@ms',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   Ccontainer: {
//     padding: '15@ms',
//     //    backgroundColor:'pink',
//     alignSelf: 'flex-start',
//     // width: '100%',
//     marginBottom: '55@ms',
//   },
//   commentContainer: {
//     marginBottom: 10,
//     padding: 10,
//     paddingHorizontal: scale(22),
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     alignSelf: 'flex-start',
//     borderRadius:15
//     //width: '100%',
//   },
//   commentText: {
//     fontSize: scale(12),
//     paddingVertical:scale(5),
//     color:'#000'
//   },
//   commentDate: {
//     fontSize: 12,
//     color: 'gray',
//     marginTop: 5,
//   },
//   postAuthor: {
//     fontSize: '13@s',
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default MyFeed;







import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../../assets/images';
import COLORS from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';
import {
  addPosts,
  commentInPost,
  getMyPosts,
  getPosts,
  postShares,
  reactToPost,
} from '../../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MyFeed = () => {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState('');
  const [postText, setPostText] = useState('');
  const {community, loading, error} = useSelector(state => state.api);
  const [postDetail, setPostDetail] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [replyText, setReplyText] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await dispatch(getMyPosts()).unwrap();
      setPostDetail(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  const handlePublishPost = async () => {
    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);

    if (!postText) {
      Alert.alert('Error', 'Please enter post text');
      return;
    }

    if (selectedMenu === '') {
      Alert.alert('Error', 'Please select community');
      return;
    }

    const data = {
      user_id: id.id,
      community_id: selectedMenu,
      content: postText,
    };

    try {
      const response = await dispatch(addPosts(data)).unwrap();
      setPostText('');
      Alert.alert('Success', response?.message);
      const updatedPosts = await dispatch(getPosts(selectedMenu)).unwrap();
      setPostDetail(updatedPosts);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
    }
  };

  const handleLike = async id => {
    setIsLiked(!isLiked);
    const data = {
      post_id: id,
    };

    try {
      const response = await dispatch(reactToPost(data)).unwrap();
      const updatedPosts = await dispatch(getMyPosts(selectedMenu)).unwrap();
      setPostDetail(updatedPosts);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
    }
  };

  const handleComment = async () => {
    if (newComment === '') {
      Alert.alert('Alert', 'Please enter comment');
      return;
    }

    const data = {
      post_id: selectedPost?.post?.id,
      parent_comment_id: '',
      content: newComment,
    };

    try {
      const response = await dispatch(commentInPost(data)).unwrap();
      setNewComment('');
      Alert.alert('Success', response?.message);
      const updatedPosts = await dispatch(
        getPosts(selectedPost?.post?.community_id),
      ).unwrap();
      setPostDetail(updatedPosts);
      setModalVisible(false);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
    }
  };

  const handleReply = async (commentId, replyText) => {
    const data = {
      post_id: selectedPost.post.id,
      parent_comment_id: commentId,
      content: replyText,
    };

    try {
      const response = await dispatch(commentInPost(data)).unwrap();
      Alert.alert('Success', response?.message);
      const updatedPosts = await dispatch(
        getPosts(selectedPost.post.community_id),
      ).unwrap();
      setPostDetail(updatedPosts);
      setModalVisible(false);
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message || 'An unknown error occurred.');
    }
  };

  const toggleReplies = useCallback(commentId => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  const CommentItem = React.memo(
    ({comment, handleReply, visibleReplies, toggleReplies}) => {
      const [replyText, setReplyText] = useState('');
      const [isReplying, setIsReplying] = useState(false);

      const getTimeAgo = time => dayjs(time).fromNow();

      const handleSubmitReply = () => {
        if (replyText.trim() === '') return;
        handleReply(comment.id, replyText);
        setReplyText('');
        setIsReplying(false);
      };

      return (
        <View style={styles.commentContainer}>
          <Text style={styles.postAuthor}>{comment.commented_by}</Text>
          <Text style={styles.commentText}>{comment.comment}</Text>
          <Text style={styles.commentDate}>
            {getTimeAgo(comment.comment_posted_time)}
          </Text>

          <TouchableOpacity onPress={() => setIsReplying(!isReplying)}>
            <Text style={styles.replyText}>
              {isReplying ? 'Cancel' : 'Reply'}
            </Text>
          </TouchableOpacity>

          {isReplying && (
            <View style={styles.replyInputContainer}>
              <TextInput
                placeholder="Write a reply..."
                placeholderTextColor="#888"
                multiline={true}
                value={replyText}
                onChangeText={setReplyText}
                style={styles.replyInput}
              />
              <TouchableOpacity
                onPress={handleSubmitReply}
                style={styles.replyButton}>
                <FontAwesome name="send-o" size={20} />
              </TouchableOpacity>
            </View>
          )}

          {comment.replies?.length > 0 && (
            <TouchableOpacity onPress={() => toggleReplies(comment.id)}>
              <Text style={styles.viewRepliesText}>
                {visibleReplies[comment.id] ? 'Hide Replies' : 'View Replies'}
              </Text>
            </TouchableOpacity>
          )}

          {visibleReplies[comment.id] && (
            <View style={styles.repliesContainer}>
              {comment.replies.map(reply => (
                <View key={reply.id} style={styles.replyItem}>
                  <Text style={styles.replyAuthor}>{reply.commented_by}</Text>
                  <Text style={styles.replyText}>{reply.comment}</Text>
                  <Text style={styles.replyDate}>
                    {getTimeAgo(reply.comment_posted_time)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    },
  );
    const menuData = [
      {id: '1', title: 'Boston Thrifts', color: '#8BC34A'},
      {id: '2', title: 'FOBs', color: '#4DB6AC'},
      {id: '3', title: 'LGBTQ+', color: '#1E88E5'},
      {id: '4', title: 'Coming Soon', color: '#388E3C'},
    ];
  return (
    <ScrollView style={styles.container}>
      {/* Menu Section */}
      <View style={styles.menuContainer}>
        {community.community?.map(menu => {
          const randomColor =
            menuData[Math.floor(Math.random() * menuData.length)].color;

          return (
            <View key={menu.id}>
              <TouchableOpacity
                style={[styles.menuItem, {backgroundColor: randomColor}]}
                onPress={() => setSelectedMenu(menu.id)}>
                <View
                  style={[styles.menuCircle, {backgroundColor: randomColor}]}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.menuText,
                  {color: selectedMenu === menu.id ? 'red' : '#374151'},
                ]}>
                {menu?.name}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Post Input Section */}
      <View style={styles.postInputContainer}>
        <View style={styles.inputRow}>
          <Image
            source={images.avatar}
            style={{width: scale(25), height: scale(25), resizeMode: 'contain'}}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Write your post here"
            placeholderTextColor="#9E9E9E"
            value={postText}
            onChangeText={setPostText}
          />
        </View>
        <View style={styles.actionRow}>
          <Text></Text>
          {/* <TouchableOpacity style={styles.dropdown}>
            <Icon name="document-text-outline" size={20} color="#757575" />
            <Text style={styles.dropdownText}>Add your post in </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={handlePublishPost}
            style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish Post </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Section */}
      <FlatList
        data={postDetail?.posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.postCard}>
            <View style={styles.topCommunity}>
              <Text style={styles.viewCommunity}>
                Posted in {postDetail?.community_name}
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewCommunity}>View Community</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.postHeader}>
              <Image
                source={images.avatar}
                style={{
                  width: scale(35),
                  height: scale(35),
                  resizeMode: 'contain',
                }}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {item?.posted_by || 'Anonymous'}
                </Text>
                <Text style={styles.userLocation}>
                  {item?.city || 'Bostan'}, {postDetail?.state || 'MA'}
                </Text>
              </View>
            </View>
            <Text style={styles.postText}>{item?.post?.content}</Text>
            <View style={styles.postFooter}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scale(15),
                }}>
                <TouchableOpacity
                  onPress={() => handleLike(item?.post?.id)}
                  style={styles.footerButton}>
                  {item?.reactions_count !== 0 ? (
                    <Icon name="heart" size={20} color={COLORS.cyan} />
                  ) : (
                    <Icon name="heart-outline" size={20} color="#757575" />
                  )}
                  <Text style={styles.footerText}>{item.reactions_count}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPost(item);
                    setModalVisible(true);
                  }}
                  style={styles.footerButton}>
                  <Icon name="chatbox-outline" size={20} color="#757575" />
                  <Text style={styles.footerText}>
                    {item?.comments?.length}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => handleShare2(item?.post?.id)}
                style={styles.footerButton}>
                <Icon name="share-social-outline" size={20} color="#757575" />
                <Text style={styles.footerText}>Share </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.postList}
      />

      {/* Modal for Comments */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedPost(null);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSelectedPost(null);
              }}
              style={{alignSelf: 'flex-end'}}>
              <FontAwesome name="close" size={24} />
            </TouchableOpacity>

            <View style={styles.Ccontainer}>
              <FlatList
                data={selectedPost?.comments}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CommentItem
                    comment={item}
                    handleReply={handleReply}
                    visibleReplies={visibleReplies}
                    toggleReplies={toggleReplies}
                  />
                )}
              />
            </View>

            <View style={styles.commentBox}>
              <TextInput
                placeholder="Write a comment..."
                placeholderTextColor="#888"
                multiline={true}
                value={newComment}
                onChangeText={setNewComment}
                style={styles.commentTxt}
              />
              <TouchableOpacity
                onPress={handleComment}
                style={styles.commentPost}>
                <FontAwesome name="send-o" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '10@ms',
    marginVertical: '15@ms',
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: '10@ms',
    borderRadius: '25@ms',
    width: scale(50),
    height: scale(50),
    marginHorizontal: '5@ms',
  },
  menuCircle: {
    width: '20@ms',
    height: '20@ms',
    borderRadius: '10@ms',
    marginBottom: '5@ms',
  },
  menuText: {
    fontFamily: 'Poppins',
    fontSize: '12@ms',
    textAlign: 'center',
    marginTop: scale(10),
  },
  postInputContainer: {
    backgroundColor: '#FFFFFF',
    padding: '15@ms',
    marginHorizontal: '10@ms',
    marginBottom: '15@ms',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@ms',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: '14@ms',
    color: '#000',
    marginLeft: '15@ms',
    borderBottomWidth: '1@ms',
    borderBottomColor: '#E0E0E0',
    paddingBottom: '5@ms',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '14@ms',
    color: '#757575',
    marginLeft: '5@ms',
  },
  publishButton: {
    backgroundColor: COLORS.cyan,
    borderRadius: '20@ms',
    paddingHorizontal: '16@ms',
    paddingVertical: '6@ms',
  },
  publishButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: '13@ms',
    color: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: '15@ms',
    marginHorizontal: '10@ms',
    marginBottom: '15@ms',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@ms',
  },
  userInfo: {
    flex: 1,
    marginLeft: '10@ms',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: '14@ms',
    color: '#000',
  },
  userLocation: {
    fontFamily: 'Poppins-Medium',
    fontSize: '12@ms',
    color: '#757575',
  },
  topCommunity: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: scale(6),
    borderBottomColor: 'gray',
    marginBottom: scale(14),
  },
  viewCommunity: {
    fontFamily: 'Poppins-Regular',
    fontSize: '12@ms',
    color: '#757575',
  },
  postText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '12@ms',
    color: '#000',
    marginBottom: '10@ms',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10@ms',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: '12@ms',
    color: '#757575',
    marginLeft: '5@ms',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '100%',
    height: '90%',
    bottom: 0,
    position: 'absolute',
    borderRadius: 20,
    padding: '12@ms',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  commentBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  commentTxt: {
    borderRadius: 5,
    height: '45@ms',
    padding: 10,
    width: '85%',
  },
  commentPost: {
    width: '15%',
    height: '45@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Ccontainer: {
    padding: '15@ms',
    alignSelf: 'flex-start',
    marginBottom: '55@ms',
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: scale(22),
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  commentText: {
    fontSize: scale(12),
    paddingVertical: scale(5),
    color: '#000',
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  postAuthor: {
    fontSize: '13@s',
    fontWeight: 'bold',
    color: '#333',
  },
  replyText: {
    color: '#007BFF',
    marginVertical: 5,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 8,
  },
  replyButton: {
    marginLeft: 10,
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  replyItem: {
    marginBottom: 10,
  },
  replyAuthor: {
    fontWeight: 'bold',
  },
  replyDate: {
    color: '#888',
    fontSize: 12,
  },
});

export default MyFeed;