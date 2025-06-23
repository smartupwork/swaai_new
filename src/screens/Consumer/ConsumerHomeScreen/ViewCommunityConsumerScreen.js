// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
//   Alert,
//   SafeAreaView,
//   Modal,
//   FlatList
// } from 'react-native';
// import { scale, ScaledSheet } from 'react-native-size-matters';
// import HeaderComp from '../../../components/HeaderComp';
// import { images } from '../../../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import COLORS from '../../../constants/color';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Share from 'react-native-share';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For icons
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// import {
//   addPost,
//   addPosts,
//   commentInPost,
//   getPosts,
//   postShares,
//   reactToPost,
// } from '../../../redux/slices/apiSlice';

// const ViewCommunityConsumerScreen = ({ route }) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const routeParams = route.params.item;
//   console.log('routeParams', routeParams);
//   const [postText, setPostText] = React.useState('');
//   const [postDetail, setPostDetail] = useState([]);
//   const [isLiked, setIsLiked] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//     const [newComment, setNewComment] = useState('');
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
 

//     if (routeParams?.id) {
//       fetchPosts();
//     }
//   }, [dispatch, routeParams?.id]);
//      const fetchPosts = async () => {
//        try {
//          const response1 = await dispatch(getPosts(routeParams?.id)).unwrap();
//          setPostDetail(response1);
//          console.log('posts------!!!!!!', response1);
//        } catch (error) {
//          console.error('Error fetching posts:', error);
//        }
//      };
//   const handlePublishPost = async () => {
//     const user = await AsyncStorage.getItem('user');

//     const id = JSON.parse(user);
//     console.log('id', id.id);
//     if (!postText) {
//       Alert.alert('Error', 'Please enter post text');
//       return;
//     }

//     const data = {
//       user_id: id.id,
//       community_id: routeParams?.id,
//       content: postText,
//     };
//     console.log('data', data);

//     try {
//       console.log('data');

//       const response = await dispatch(addPosts(data)).unwrap();
//       console.log('response', response);

//       setPostText('');
//       Alert.alert('Success', response?.message);
//       const response1 = await dispatch(getPosts(routeParams?.id)).unwrap();
//       setPostDetail(response1);
//       console.log('response1', response1);

//       // navigation.navigate('SplashBusiness2');
//     } catch (err) {
//       //   setIsLoading(false);
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
//   };
//   const handleLike = async id => {
//   //  alert('heelo'+id);
//     setIsLiked(!isLiked);
//     const data = {
//       post_id: id,
//     };

//     try {
//       console.log('data');

//       const response = await dispatch(reactToPost(data)).unwrap();

//      // Alert.alert('Success', response?.message);
//        const response1 = await dispatch(getPosts(routeParams?.id)).unwrap();
//        setPostDetail(response1);
//       // const response1 = await dispatch(getCommunities(data)).unwrap();
//       //console.log('response1',response1);
//     } catch (err) {
//       //   setIsLoading(false);
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
//   };
//   const handleComment = async(id) => { 
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
//     const handleShare = async (content) => {
//       const shareOptions = {
//         title: 'Share via',
//         message:content,
//         url: 'https://example.com/boston-thrifts',
//       };

//       try {
//         await Share.open(shareOptions);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//   const [showReplies, setShowReplies] = useState(false);
// const [replyText, setReplyText] = useState('');
// const [replyingTo, setReplyingTo] = useState(null);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);
//   const [visibleReplies, setVisibleReplies] = useState({});

//   const handleReply =async commentId => {
//     if (replyText.trim() === '') return;
//     const newReply = {
//       post_id: selectedPost.post.id,
//       parent_comment_id: commentId,
//       content: replyText,
//     };
// console.log("new Rply",newReply);
//  try {
//        console.log('data');
  
//        const response = await dispatch(commentInPost(newReply)).unwrap();
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
//     // const updatedComments = selectedPost.comments.map(comment => {
//     //   if (comment.id === commentId) {
//     //     return {
//     //       ...comment,
//     //       replies: [...comment.replies, newReply],
//     //     };
//     //   }
//     //   return comment;
//     // });

//   //  selectedPost.comments = updatedComments;
//     setReplyText('');
//     setSelectedCommentId(null);
//   };
// const toggleReplies = useCallback(commentId => {
//   setVisibleReplies(prev => ({
//     ...prev,
//     [commentId]: !prev[commentId],
//   }));
// }, []);

//   // const toggleReplies = commentId => {
//   //   setVisibleReplies(prevState => ({
//   //     ...prevState,
//   //     [commentId]: !prevState[commentId],
//   //   }));
//   // };
// const CommentItem = React.memo(({comment}) => {
//   console.log("comment",comment);
//    const getTimeAgo = time => {
//        return dayjs(time).fromNow();
//      };
//          const isRepliesVisible = visibleReplies[comment.id] || false;

//   return (
//     <View style={styles.commentContainer}>
//       <Text style={styles.postAuthor}>{comment.commented_by}</Text>
//       <Text style={styles.commentText}>{comment.comment}</Text>
//       {/* <Text style={styles.commentText}>{comment.id}</Text>
//       <Text style={styles.commentText}>{selectedPost.post.id}</Text> */}

//       {/* <Text style={styles.commentDate}>
//         {new Date(comment.created_at).toLocaleString()}
//       </Text> */}
//       <Text style={styles.commentDate}>
//         {getTimeAgo(comment.comment_posted_time)}{' '}
//       </Text>
//       {/* Toggle Replies */}
//       <TouchableOpacity
//         onPress={() =>
//           setSelectedCommentId(
//             selectedCommentId === comment.id ? null : comment.id,
//           )
//         }>
//         <Text style={styles.replyText}>
//           {selectedCommentId === comment.id ? 'Cancel' : 'Reply'}
//         </Text>
//       </TouchableOpacity>

//       {selectedCommentId === comment.id && (
//         <View style={styles.replyInputContainer}>
//           <TextInput
//             key={`reply-input-${comment.id}`}
//             placeholder="Write a reply..."
//             placeholderTextColor="#888"
//             multiline={true}
//             value={replyText}
//             onChangeText={text => setReplyText(text)}
//             style={styles.replyInput}
//           />
//           <TouchableOpacity
//             onPress={() => handleReply(comment.id)}
//             style={styles.replyButton}>
//             <FontAwesome name="send-o" size={20} />
//           </TouchableOpacity>
//         </View>
//       )}

//       {comment.replies?.length > 0 && (
//         <TouchableOpacity onPress={() => toggleReplies(comment.id)}>
//           <Text style={styles.viewRepliesText}>
//             {isRepliesVisible ? 'Hide Replies' : 'View Replies'}
//           </Text>
//         </TouchableOpacity>
//       )}

//       {isRepliesVisible && (
//         <View style={styles.repliesContainer}>
//           {comment.replies.map(reply => (
//             <View key={reply.id} style={styles.replyItem}>
//               <Text style={styles.replyAuthor}>{reply.commented_by}</Text>
//               <Text style={styles.replyText}>{reply.comment}</Text>
//               <Text style={styles.replyDate}>
//                 {getTimeAgo(reply.comment_posted_time)}
//               </Text>
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// });
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <HeaderComp
//         leftClick={() => alert('heelo')}
//         //rightClick={() => alert('heelo')}
//         rightClick={() => alert('heelo')}
//       />
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.communityTitle}>{routeParams?.name}</Text>
//         {/* <Image
//           source={{uri: 'https://via.placeholder.com/30'}} // Replace with your logo URL
//           style={styles.logo}
//         /> */}
//       </View>

//       {/* Banner Section */}
//       <View style={styles.banner}>
//         <ImageBackground
//           source={{uri: routeParams?.banner_image}} // Replace with your banner URL
//           style={styles.bannerImage}>
//           <View style={styles.bannerContent}>
//             <Text style={styles.bannerTitle}>{routeParams?.name}</Text>
//             <Text style={styles.bannerSubtitle}>
//               ⭐ 4.3 ({routeParams?.members} members)
//             </Text>
//             <Text style={styles.bannerDescription}>
//               Let’s get thrifty {routeParams?.name}
//             </Text>
//           </View>
//         </ImageBackground>
//       </View>

//       {/* Post Input */}
//       <View style={styles.postInputContainer}>
//         <View style={styles.postInput}>
//           <Image
//             source={images.avatar} // Replace with user avatar
//             style={styles.avatar}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Write your post here"
//             placeholderTextColor="#888"
//             value={postText}
//             onChangeText={text => setPostText(text)}
//           />
//         </View>
//         <View style={styles.btnCont}>
//           <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
//             <AntDesign name="earth" size={15} color="gray" />
//             <Text style={{fontSize: scale(13), color: 'gray'}}>
//               Add your post in
//             </Text>
//             <AntDesign name="down" size={15} color="gray" />
//           </View>
//           <TouchableOpacity
//             onPress={() => handlePublishPost()}
//             style={styles.postButton}>
//             <Text style={styles.postButtonText}>Publish Post</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Post Section */}
//       {/* {postDetail?.posts?.map((item, index) => (
//         <View key={index} style={styles.post}>
//           <View style={styles.postHeader}>
//             <Text style={styles.postHeaderLeft}>
//               Posted in {postDetail?.community_name}
//             </Text>
//             <TouchableOpacity>
//               <Text style={styles.postHeaderRight}>View community</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.postBody}>
//             <Image
//               source={images.avatar} // Replace with actual user avatar source
//               style={styles.avatar}
//             />
//             <View style={styles.postContent}>
//               <Text style={styles.postAuthor}>
//                 {item?.posted_by || 'Anonymous'}
//               </Text>
//               <Text style={styles.postLocation}>
//                 {item?.city || 'Bostan'},{postDetail?.state|| 'MA'}
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.postText}>{item?.post?.content}</Text>
//           <View style={styles.postFooter}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 gap: scale(15),
//               }}>
//               <TouchableOpacity
//                 onPress={() => handleLike(item?.post?.id)}
//                 style={styles.footerButton}>
//                 {item?.reactions_count !== 0 ? (
//                   <Icon name="heart" size={20} color={COLORS.cyan} />
//                 ) : (
//                   <Icon name="heart-outline" size={20} color="#757575" />
//                 )}
//                 <Text style={styles.footerText}>{item.reactions_count}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (!modalVisible) {
//                     setSelectedPost(item); // Store the selected post
//                     setModalVisible(true);
//                   }
//                 }}
//                 style={styles.footerButton}>
//                 <Icon name="chatbox-outline" size={20} color="#757575" />
//                 <Text style={styles.footerText}>{item?.comments?.length}</Text>
//               </TouchableOpacity>
//             </View>
        
//             <TouchableOpacity
//               //        onPress={() => handleShare(item.content)}
//               onPress={() => {
//                 handleShare2(item?.post?.id);
//               }}
//               style={styles.footerButton}>
//               <Icon name="share-social-outline" size={20} color="#757575" />
//               <Text style={styles.footerText}>Share {item.shares_count}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))} */}
//       {postDetail?.posts?.map((item, index) => (
//         <View key={index} style={styles.post}>
//           <View style={styles.postHeader}>
//             <Text style={styles.postHeaderLeft}>
//               {item?.shares?.length > 0
//                 ? `Share by ${item?.shares[0]?.shared_by}`
//                 : `Posted in ${postDetail?.community_name}`}
//             </Text>
//             <TouchableOpacity>
//               <Text style={styles.postHeaderRight}>View community</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.postBody}>
//             <Image
//               source={images.avatar} // Replace with actual user avatar source
//               style={styles.avatar}
//             />
//             <View style={styles.postContent}>
//               <Text style={styles.postAuthor}>
//                 {item?.posted_by || 'Anonymous'}
//               </Text>
//               <Text style={styles.postLocation}>
//                 {item?.city || 'Bostan'}, {postDetail?.state || 'MA'}
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.postText}>{item?.post?.content}</Text>
//           <View style={styles.postFooter}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 gap: scale(15),
//               }}>
//               <TouchableOpacity
//                 onPress={() => handleLike(item?.post?.id)}
//                 style={styles.footerButton}>
//                 {item?.reactions_count !== 0 ? (
//                   <Icon name="heart" size={20} color={COLORS.cyan} />
//                 ) : (
//                   <Icon name="heart-outline" size={20} color="#757575" />
//                 )}
//                 <Text style={styles.footerText}>{item.reactions_count}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (!modalVisible) {
//                     setSelectedPost(item); // Store the selected post
//                     setModalVisible(true);
//                   }
//                 }}
//                 style={styles.footerButton}>
//                 <Icon name="chatbox-outline" size={20} color="#757575" />
//                 <Text style={styles.footerText}>{item?.comments?.length}</Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 handleShare2(item?.post?.id);
//               }}
//               style={styles.footerButton}>
//               <Icon name="share-social-outline" size={20} color="#757575" />
//               <Text style={styles.footerText}>Share {item.shares_count}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           //  Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//           setSelectedPost(null);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <TouchableOpacity
//               onPress={() => {
//                 setModalVisible(false);
//                 setSelectedPost(null);
//               }}
//               style={{alignSelf: 'flex-end'}}>
//               <FontAwesome name="close" size={24} />
//             </TouchableOpacity>

//             <View style={styles.Ccontainer}>
//               <FlatList
//                 data={selectedPost?.comments}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({item}) => <CommentItem comment={item} />}
//               />
//             </View>

//             <View style={styles.commentBox}>
//               <TextInput
//                 placeholder={'Write a comment...'}
//                 placeholderTextColor={'#888'}
//                 multiline={true}
//                 value={newComment}
//                 onChangeText={setNewComment}
//                 style={styles.commentTxt}
//               />
//               <TouchableOpacity
//                 onPress={() => handleComment()}
//                 // onPress={addComment}
//                 style={styles.commentPost}>
//                 <FontAwesome name="send-o" size={24} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: '15@s',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // justifyContent: 'space-between',
//     paddingVertical: '10@s',
//   },
//   backArrow: {
//     fontSize: '20@s',
//     color: '#000',
//   },
//   communityTitle: {
//     fontSize: '13@s',
//     fontFamily: 'Poppins-Medium',
//     flex: 1,
//     paddingLeft: scale(10),
//     // textAlign: 'center',
//     color: '#333',
//   },
//   logo: {
//     width: '30@s',
//     height: '30@s',
//     resizeMode: 'contain',
//   },
//   banner: {
//     //  backgroundColor: 'red',
//     borderRadius: '10@s',
//     marginVertical: '10@s',
//     overflow: 'hidden',
//   },
//   bannerImage: {
//     width: '100%',
//     height: '120@s',
//     resizeMode: 'cover',
//   },
//   bannerContent: {
//     padding: '16@s',
//   },
//   bannerTitle: {
//     fontSize: '18@s',
//     fontFamily: 'Poppins-Bold',
//     color: '#fff',
//   },
//   bannerSubtitle: {
//     fontSize: '14@s',
//     color: '#fff',
//     fontFamily: 'Poppins-Regular',
//     marginVertical: '5@s',
//   },
//   bannerDescription: {
//     fontSize: '12@s',
//     color: '#fff',
//     marginVertical: '5@s',
//   },
//   postInputContainer: {
//     marginVertical: '15@s',
//     backgroundColor: '#fff',
//     borderRadius: '10@s',
//     padding: '10@s',
//     // backgroundColor: 'red',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,

//     elevation: 5,
//   },
//   postInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '10@s',
//     borderBottomWidth: '0.5@s',
//     borderBottomColor: '#EBEEF0',
//   },
//   btnCont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor:'red',
//     paddingHorizontal: '10@s',
//     justifyContent: 'space-between',
//   },

//   avatar: {
//     width: '30@s',
//     height: '30@s',
//     borderRadius: '15@s',
//     marginRight: '10@s',
//   },
//   textInput: {
//     flex: 1,
//     //  borderWidth: '1@s',
//     borderColor: '#DDD',
//     borderRadius: '10@s',
//     paddingHorizontal: '10@s',
//     fontSize: '14@s',
//     height: '40@s',
//     color: '#333',
//   },
//   postButton: {
//     backgroundColor: COLORS.cyan,
//     borderRadius: '14@s',
//     paddingVertical: '5@s',
//     paddingHorizontal: '16@s',
//     alignItems: 'center',
//   },
//   postButtonText: {
//     color: '#FFF',
//     fontFamily: 'Poppins-Medium',
//     fontSize: '12@s',
//   },
//   post: {
//     backgroundColor: '#FFF',
//     borderRadius: '10@s',
//     padding: '15@s',
//     marginVertical: '10@s',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: '5@s',
//     elevation: 3,
//   },
//   postHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: '10@s',
//     paddingBottom: '8@s',
//     borderBottomWidth: '0.5@s',
//     borderBottomColor: '#EBEEF0',
//   },
//   postHeaderLeft: {
//     fontSize: '12@s',
//     color: '#666',
//   },
//   postHeaderRight: {
//     fontSize: '12@s',
//     color: 'gray',
//   },
//   postBody: {
//     flexDirection: 'row',
//   },
//   postContent: {
//     flex: 1,
//     marginLeft: '10@s',
//   },
//   postAuthor: {
//     fontSize: '14@s',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   postLocation: {
//     fontSize: '12@s',
//     color: '#777',
//     marginVertical: '5@s',
//   },
//   postText: {
//     fontSize: '14@s',
//     color: '#444',
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
//     //width: '100%',
//   },
//   commentText: {
//     fontSize: scale(12),
//     paddingVertical: scale(5),
//     color: '#000',
//   },
//   commentDate: {
//     fontSize: 12,
//     color: 'gray',
//     marginTop: 5,
//   },
//   showRepliesText: {
//     color: '#0066cc',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   replyText: {
//     color: '#007BFF',
//     marginVertical: 5,
//   },
//   replyInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   replyInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 15,
//     padding: 8,
//   },
//   replyButton: {
//     marginLeft: 10,
//   },
//   repliesContainer: {
//     marginTop: 10,
//     paddingLeft: 20,
//   },
//   replyItem: {
//     marginBottom: 10,
//   },
//   replyAuthor: {
//     fontWeight: 'bold',
//   },
//   replyDate: {
//     color: '#888',
//     fontSize: 12,
//   },
// });

// export default ViewCommunityConsumerScreen;








import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import HeaderComp from '../../../components/HeaderComp';
import {images} from '../../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../../constants/color';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
  addPost,
  addPosts,
  commentInPost,
  getCommunityMembers,
  getPosts,
  joinCommunity,
  leaveCommunity,
  postShares,
  reactToPost,
} from '../../../redux/slices/apiSlice';

dayjs.extend(relativeTime);

const ViewCommunityConsumerScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const routeParams = route.params.item;
  const [postText, setPostText] = useState('');
  const [postDetail, setPostDetail] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
const[communityMember,setCommunityMember]=useState([]);
  useEffect(() => {
    if (routeParams?.id) {
      fetchPosts();
      fetchCommunityMembers();
    }
  }, [dispatch, routeParams?.id]);

  const fetchPosts = async () => {
    try {
      const response = await dispatch(getPosts(routeParams?.id)).unwrap();
      setPostDetail(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const fetchCommunityMembers = async () => {
    try {
      const response = await dispatch(getCommunityMembers(routeParams?.id)).unwrap();
      console.log('response fetchCommunityMembers', response);
      
      setCommunityMember(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePublishPost = async () => {
    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);

    if (!postText) {
      Alert.alert('Error', 'Please enter post text');
      return;
    }

    const data = {
      user_id: id.id,
      community_id: routeParams?.id,
      content: postText,
    };

    try {
      const response = await dispatch(addPosts(data)).unwrap();
      setPostText('');
      Alert.alert('Success', response?.message);
      const updatedPosts = await dispatch(getPosts(routeParams?.id)).unwrap();
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
      const updatedPosts = await dispatch(getPosts(routeParams?.id)).unwrap();
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
 const handleJoin = async () => {

   const data = {
     id: routeParams?.id,
     
   };

   try {
     const response = await dispatch(joinCommunity(data)).unwrap();
    fetchCommunityMembers();
     Alert.alert('Success', response?.message);
    //  const updatedPosts = await dispatch(getPosts(routeParams?.id)).unwrap();
    //  setPostDetail(updatedPosts);
   } catch (err) {
     console.error('Error:', err);
     Alert.alert('Error', err.message || 'An unknown error occurred.');
   }
 };
 const handleLeave = async () => {

   const data = {
     id: routeParams?.id,
     
   };

   try {
     const response = await dispatch(leaveCommunity(data)).unwrap();
     fetchCommunityMembers();
     Alert.alert('Success', response?.message);
    //  const updatedPosts = await dispatch(getPosts(routeParams?.id)).unwrap();
    //  setPostDetail(updatedPosts);
   } catch (err) {
     console.error('Error:', err);
     Alert.alert('Error', err.message || 'An unknown error occurred.');
   }
 };
  return (
    <ScrollView style={styles.container}>
      <HeaderComp
        leftClick={() => alert('heelo')}
        rightClick={() => alert('heelo')}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.communityTitle}>{routeParams?.name}</Text>
      </View>

      <View style={styles.banner}>
        <ImageBackground
          source={{uri: routeParams?.banner_image}}
          style={[styles.bannerImage, {width: '100%', flexDirection: 'row'}]}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{routeParams?.name}</Text>
            <Text style={styles.bannerSubtitle}>
              ⭐ 4.3 ({communityMember?.members_count} members)
            </Text>
            <Text style={styles.bannerDescription}>
              Let’s get thrifty {routeParams?.name}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              alignContent: 'center',
              flex: 1,
              paddingRight: scale(20),
            }}>
              {
                communityMember?.is_member!==true ? (
                  <TouchableOpacity onPress={() => handleJoin()}>
              <Text style={[styles.bannerTitle, {color: COLORS.cyan}]}>
                Join
              </Text>
            </TouchableOpacity>
                )
            :
(

            <TouchableOpacity onPress={() => handleLeave()}>
              <Text style={[styles.bannerTitle, {}]}>Leave</Text>
            </TouchableOpacity>
)
              }
            

          </View>
        </ImageBackground>
      </View>

      <View style={styles.postInputContainer}>
        <View style={styles.postInput}>
          <Image source={images.avatar} style={styles.avatar} />
          <TextInput
            style={styles.textInput}
            placeholder="Write your post here"
            placeholderTextColor="#888"
            value={postText}
            onChangeText={setPostText}
          />
        </View>
        <View style={styles.btnCont}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            {/* <AntDesign name="earth" size={15} color="gray" /> */}
            {/* <Text style={{fontSize: scale(13), color: 'gray'}}>
              
            </Text> */}
            {/* <AntDesign name="down" size={15} color="gray" /> */}
          </View>
          <TouchableOpacity
            onPress={handlePublishPost}
            style={styles.postButton}>
            <Text style={styles.postButtonText}>Publish Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      {postDetail?.posts?.map((item, index) => (
        <View key={index} style={styles.post}>
          <View style={styles.postHeader}>
            <Text style={styles.postHeaderLeft}>
              {item?.shares?.length > 0
                ? `Share by ${item?.shares[0]?.shared_by}`
                : `Posted in ${postDetail?.community_name}`}
            </Text>
            <TouchableOpacity>
              <Text style={styles.postHeaderRight}>View community</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postBody}>
            <Image source={images.avatar} style={styles.avatar} />
            <View style={styles.postContent}>
              <Text style={styles.postAuthor}>
                {item?.posted_by || 'Anonymous'}
              </Text>
              <Text style={styles.postLocation}>
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
                <Text style={styles.footerText}>{item?.comments?.length}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleShare2(item?.post?.id)}
              style={styles.footerButton}>
              <Icon name="share-social-outline" size={20} color="#757575" />
              <Text style={styles.footerText}>Share {item.shares_count}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

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
    backgroundColor: '#fff',
    paddingHorizontal: '15@s',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10@s',
  },
  backArrow: {
    fontSize: '20@s',
    color: '#000',
  },
  communityTitle: {
    fontSize: '13@s',
    fontFamily: 'Poppins-Medium',
    flex: 1,
    paddingLeft: scale(10),
    color: '#333',
  },
  banner: {
    borderRadius: '10@s',
    marginVertical: '10@s',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '120@s',
    resizeMode: 'cover',
  },
  bannerContent: {
    padding: '16@s',
  },
  bannerTitle: {
    fontSize: '18@s',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: '14@s',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    marginVertical: '5@s',
  },
  bannerDescription: {
    fontSize: '12@s',
    color: '#fff',
    marginVertical: '5@s',
  },
  postInputContainer: {
    marginVertical: '15@s',
    backgroundColor: '#fff',
    borderRadius: '10@s',
    padding: '10@s',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@s',
    borderBottomWidth: '0.5@s',
    borderBottomColor: '#EBEEF0',
  },
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    justifyContent: 'space-between',
  },
  avatar: {
    width: '30@s',
    height: '30@s',
    borderRadius: '15@s',
    marginRight: '10@s',
  },
  textInput: {
    flex: 1,
    borderColor: '#DDD',
    borderRadius: '10@s',
    paddingHorizontal: '10@s',
    fontSize: '14@s',
    height: '40@s',
    color: '#333',
  },
  postButton: {
    backgroundColor: COLORS.cyan,
    borderRadius: '14@s',
    paddingVertical: '5@s',
    paddingHorizontal: '16@s',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontSize: '12@s',
  },
  post: {
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    padding: '15@s',
    marginVertical: '10@s',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: '5@s',
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10@s',
    paddingBottom: '8@s',
    borderBottomWidth: '0.5@s',
    borderBottomColor: '#EBEEF0',
  },
  postHeaderLeft: {
    fontSize: '12@s',
    color: '#666',
  },
  postHeaderRight: {
    fontSize: '12@s',
    color: 'gray',
  },
  postBody: {
    flexDirection: 'row',
  },
  postContent: {
    flex: 1,
    marginLeft: '10@s',
  },
  postAuthor: {
    fontSize: '14@s',
    fontWeight: 'bold',
    color: '#333',
  },
  postLocation: {
    fontSize: '12@s',
    color: '#777',
    marginVertical: '5@s',
  },
  postText: {
    fontSize: '14@s',
    color: '#444',
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
    borderRadius: 5,
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

export default ViewCommunityConsumerScreen;