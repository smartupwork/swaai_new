// RoleScreen.js
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { scale } from 'react-native-size-matters';
import ButtonComp from '../../components/ButtonComp';
import COLORS from '../../constants/color';


const RoleScreen = ({ navigation }) => {


  const handleButtonPress = useCallback((role) => {
    // Navigate to the relevant screen based on the role
    navigation.navigate(role);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a:</Text>
      <ButtonComp
        title="Business"
        backgroundColor={COLORS.blue}
        onPress={() => navigation.navigate('SplashBusiness')}
      />
      <ButtonComp
        title="Consumer"
        backgroundColor={COLORS.green}
        onPress={() => handleButtonPress('SplashConsumer')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(24),
    fontFamily: 'Poppins-ExtraBold',
   // fontWeight:'bold',
    marginBottom: scale(20),
    color: '#000',
  },
});

export default RoleScreen;




// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchPosts, fetchUsers, addPost, addUser } from './redux/slices/apiSlice';
// import { View, Text, Button, ScrollView } from 'react-native';

// const Home = () => {
//   // Get the necessary state from Redux
//   const dispatch = useDispatch();
//   const { posts, users, loading, error } = useSelector((state) => state.api);

//   // Fetch posts and users on component mount
//   useEffect(() => {
//     dispatch(fetchPosts());
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   // Function to handle adding a post
//   const handleAddPost = () => {
//     const newPost = { title: 'New Post', body: 'This is a new post' };
//     dispatch(addPost(newPost));
//   };

//   // Function to handle adding a user
//   const handleAddUser = () => {
//     const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
//     dispatch(addUser(newUser));
//   };

//   return (
//     <ScrollView>
//       <View>
//         <Text>API Data</Text>

//         {/* Show loading indicator if data is still being fetched */}
//         {loading && <Text>Loading...</Text>}

//         {/* Show error message if there's any error */}
//         {error && <Text>Error: {error}</Text>}

//         {/* Display the list of posts */}
//         <Text>Posts:</Text>
//         {posts.map((post) => (
//           <Text key={post.id}>{post.title}</Text>
//         ))}

//         {/* Display the list of users */}
//         <Text>Users:</Text>
//         {users.map((user) => (
//           <Text key={user.id}>{user.name}</Text>
//         ))}

//         {/* Buttons to trigger the POST actions */}
//         <Button title="Add Post" onPress={handleAddPost} />
//         <Button title="Add User" onPress={handleAddUser} />
//       </View>
//     </ScrollView>
//   );
// };

// export default Home;
