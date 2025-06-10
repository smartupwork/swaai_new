import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {getChatList} from '../../../redux/slices/apiSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const chatData = [
  {
    id: '1',
    name: 'Darlene Steward',
    message: 'Pls take a look at the images.',
    time: '18.31',
    unreadCount: 5,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Fullsnack Designers',
    message: 'Hello guys, we have discussed about ...',
    time: '16.04',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Lee Williamson',
    message: "Yes, that's gonna work, hopefully.",
    time: '06.12',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Ronald Mccoy',
    message: 'Thanks dude 😊',
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '5',
    name: 'Albert Bell',
    message: "I'm happy this anime has such grea...",
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

const BussinessChatListingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  const fetchData = async () => {
    try {
      const response1 = await dispatch(getChatList()).unwrap();
      setChat(response1);
      //  setbusinesses(response1);
      console.log('chat list !!!!!!', response1);
    } catch (error) {
      console.error('Error chat listl:', error);
    }
  };
  return (
    <View style={styles.container}>
           <View style={{flexDirection:'row',alignItems:'center',gap:8,marginBottom:8}}>
     
      <Text style={styles.header}>Recent Chats</Text>
       <TouchableOpacity style={{width:'33%',}} onPress={()=>navigation.goBack()}>
              <FontAwesome name="angle-left" size={18} color="#323232" />
            </TouchableOpacity>
      </View>
      <FlatList
        data={chat}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatScreen', {uid: item.user_id})
            }
            style={styles.chatItem}>
            <Image source={{uri: item.profile_image}} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.updated_at}</Text>
              </View>
              <Text style={styles.chatMessage}>{item.last_message}</Text>
            </View>
            {item.unread_count ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread_count}</Text>
              </View>
            ) : null}
            {/* {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )} */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: '15@ms',
  },
  header: {
    fontSize: '20@ms',
    fontWeight: 'bold',
    // marginBottom: '15@ms',
    color: '#000',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10@ms',
    borderWidth:0.2,
    borderColor:'gray',
    borderRadius: '10@ms',
    marginBottom: '10@ms',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
    // backgroundColor:'red'
  },
  avatar: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: '25@ms',
  },
  chatInfo: {
    flex: 1,
    marginLeft: '10@ms',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  chatTime: {
    fontSize: '12@ms',
    color: 'gray',
  },
  chatMessage: {
    fontSize: '14@ms',
    color: 'gray',
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    width: '22@ms',
    height: '22@ms',
    borderRadius: '11@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: '12@ms',
    fontWeight: 'bold',
  },
});

export default BussinessChatListingScreen;
