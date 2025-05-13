import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For icons
const CommentModal = ({visible, onClose}) => {
  const [comments, setComments] = useState([
    {id: '1', text: 'Great post!', replies: []},
    {id: '2', text: 'Nice picture!', replies: [{id: '2-1', text: 'I agree!'}]},
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const addComment = () => {
    if (newComment.trim()) {
      if (replyingTo) {
        setComments(prev =>
          prev.map(comment =>
            comment.id === replyingTo
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {id: Date.now().toString(), text: newComment},
                  ],
                }
              : comment,
          ),
        );
        setReplyingTo(null);
      } else {
        setComments([
          ...comments,
          {id: Date.now().toString(), text: newComment, replies: []},
        ]);
      }
      setNewComment('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 300}}>
        <TouchableOpacity onPress={onClose} style={{alignSelf: 'flex-end'}}>
          <FontAwesome name="close" size={24} />
        </TouchableOpacity>
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{padding: 10, borderBottomWidth: 1, borderColor: '#ddd'}}>
              <Text style={{fontWeight: 'bold'}}>{item.text}</Text>
              <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
                <Text style={{color: 'blue', marginTop: 5}}>Reply</Text>
              </TouchableOpacity>
              {item.replies.length > 0 && (
                <FlatList
                  data={item.replies}
                  keyExtractor={reply => reply.id}
                  renderItem={({item}) => (
                    <Text style={{marginLeft: 20, color: '#555'}}>
                      ↳ {item.text}
                    </Text>
                  )}
                />
              )}
            </View>
          )}
        />
        <TextInput
          placeholder={replyingTo ? 'Replying...' : 'Write a comment...'}
        //   value={newComment}
        //   onChangeText={setNewComment}
          style={{borderWidth: 1, borderRadius: 5, padding: 10, marginTop: 10}}
        />
        <TouchableOpacity
       //   onPress={addComment}
          style={{backgroundColor: 'blue', padding: 10, marginTop: 10}}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Post</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CommentModal;
