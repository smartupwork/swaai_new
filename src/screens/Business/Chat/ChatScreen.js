// import React, {useState, useCallback, useEffect} from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import { scale } from 'react-native-size-matters';
// import { images } from '../../../assets/images';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import COLORS from '../../../constants/color';


// export function ChatScreen({navigation}) {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerCont}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome name="angle-left" size={scale(24)} color={COLORS.blue} />
//         </TouchableOpacity>
//         <Text style={styles.txt}>John Fantasia</Text>
//         {/* <Image source={images.headerLogo} style={styles.logoImg} /> */}
//         <TouchableOpacity>
//           <Image source={images.headerLogo2} style={styles.rightImg} />
//         </TouchableOpacity>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCont: {
//     backgroundColor: '#fff',
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(12),
//   },
//   logoImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
//   rightImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
//   txt:{
//     fontSize:scale(16),
//     fontFamily:'Poppins-SemiBold'
//   }
// });


import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {images} from '../../../assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/color';
import {useDispatch} from 'react-redux';
import {
  getChatByUserId,
  readChat,
  saveChat,
} from '../../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChatScreen({navigation, route}) {
  const uid = route?.params?.uid; // Receiver's ID
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null); // Logged-in user's ID
  const flatListRef = useRef(null); // Ref for FlatList

  // Fetch the logged-in user's ID from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log('Fetched user from AsyncStorage:', user); // Debug log
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log('Parsed user ID:', parsedUser.id); // Debug log
          setUserId(parsedUser.id); // Set the logged-in user's ID
        } else {
          console.error('No user found in AsyncStorage'); // Debug log
        }
      } catch (error) {
        console.error('Error fetching user from AsyncStorage:', error); // Debug log
      }
    };
    fetchUserId();
  }, []);

  // Fetch chat data from the API
  const fetchChatData = async () => {
    try {
      // Step 1: Fetch chat data
      const response = await dispatch(getChatByUserId(uid)).unwrap();
      console.log('API response for chat:', response); // Debug log

      // Step 2: Format messages for the chat
      const formattedMessages = response.map(msg => {
        console.log(
          'Mapping message - sender_id:',
          msg.sender_id,
          'userId:',
          userId,
        ); // Debug log

        // Determine if the message was sent by the current user
        const isCurrentUser = msg.sender_id == userId;

        return {
          _id: msg.id,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.sender_id, // Use sender_id from the API response
            name: isCurrentUser ? 'You' : `User ${msg.sender_id}`, // Display "You" for current user
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
      });

      console.log('Formatted messages:', formattedMessages); // Debug log

      // Step 3: Update messages state
      setMessages(formattedMessages);

      // Step 4: Scroll to the bottom of the chat
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    } catch (error) {
      console.error('Error fetching chat data:', error); // Debug log
    }
  };

  // Auto-refresh chat data every 5 seconds
  useEffect(() => {
    if (userId) {
      fetchChatData(); // Fetch data immediately when the component mounts
      const interval = setInterval(fetchChatData, 5000); // Fetch data every 5 seconds
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [userId]);

  // Handle sending new messages
  const handleSend = async () => {
    if (inputText.trim() == '') return; // Don't send empty messages
setInputText("")
    try {
      // Step 1: Create a new message object
      const newMessage = {
        _id: messages.length + 1, // Temporary ID (replace with API response ID)
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: userId, // Logged-in user's ID
          name: 'You', // Display "You" for the current user
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      // Step 2: Append the new message to the local state
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Step 3: Clear the input field
      setInputText('');

      // Step 4: Save the new message to the API
      const data = {
        sender_id: userId, // Logged-in user's ID
        receiver_id: uid, // Receiver's ID
        message: inputText,
      };

      console.log('Data to save:', data); // Debug log

      const response = await dispatch(saveChat(data)).unwrap();
      console.log('Response from saveChat API:', response); // Debug log

      // Step 5: Fetch updated chat data after sending the message
      fetchChatData();
    } catch (err) {
      console.error('Error sending message:', err); // Debug log
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  // Render a single message bubble
  const renderMessage = ({item}) => {
    const isCurrentUser = item.user._id == userId;

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerCont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={scale(24)} color={COLORS.blue} />
        </TouchableOpacity>
        <Text style={styles.txt}>John Fantasia</Text>
        <TouchableOpacity>
          <Image source={images.headerLogo2} style={styles.rightImg} />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item._id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
          keyboardShouldPersistTaps="handled"

      />

      {/* Input Box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust this value based on your header height

        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCont: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
  },
  logoImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
  rightImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
  txt: {
    fontSize: scale(16),
    fontFamily: 'Poppins-SemiBold',
  },
  messagesList: {
    padding: scale(10),
  },
  messageContainer: {
    maxWidth: '70%',
    padding: scale(10),
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.blue,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGray,
  },
  messageText: {
    fontSize: scale(14),
    color: COLORS.black,
  },
  messageTime: {
    fontSize: scale(10),
    color: COLORS.darkGray,
    marginTop: scale(5),
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: scale(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    marginRight: scale(10),
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: scale(14),
  },
});