import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const CommentItem = ({
  comment,
  replyText,
  onReplyChange,
  onReplySubmit,
  isReplying,
  onToggleReply,
}) => {
  const getTimeAgo = time => {
    return dayjs(time).fromNow();
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.postAuthor}>{comment.commented_by}</Text>
      <Text style={styles.commentText}>{comment.comment}</Text>
      <Text style={styles.commentDate}>
        {getTimeAgo(comment.comment_posted_time)}
      </Text>

      {/* Reply Button */}
      {/* <TouchableOpacity onPress={onToggleReply} style={styles.replyButton}>
        <Text style={styles.replyButtonText}>Reply</Text>
      </TouchableOpacity> */}

      {/* Reply Input */}
      {/* {isReplying && (
        <View style={styles.replyContainer}>
          <TextInput
            style={styles.replyInput}
            value={replyText}
            onChangeText={onReplyChange}
            placeholder="Write a reply..."
          />
          <TouchableOpacity onPress={onReplySubmit} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )} */}

      {/* Display Replies */}
      {/* {comment.replies && comment.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {comment.replies.map((reply, index) => (
            <View key={index} style={styles.replyItem}>
              <Text style={styles.replyAuthor}>{reply.commented_by}</Text>
              <Text style={styles.replyText}>{reply.comment}</Text>
              <Text style={styles.replyDate}>
                {getTimeAgo(reply.comment_posted_time)}
              </Text>
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  commentText: {
    marginVertical: 5,
  },
  commentDate: {
    color: '#888',
    fontSize: 12,
  },
  replyButton: {
    marginTop: 5,
  },
  replyButtonText: {
    color: '#007BFF',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  replyItem: {
    marginBottom: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
  },
  replyText: {
    marginVertical: 2,
  },
  replyDate: {
    color: '#888',
    fontSize: 11,
  },
});

export default CommentItem;
