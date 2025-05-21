import React, { useEffect, useState } from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import StarRating from 'react-native-star-rating-widget';
import COLORS from '../../../constants/color';
import { images } from '../../../assets/images';
import HeaderComp from '../../../components/HeaderComp';
import { getReview } from '../../../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';

const dummyReviews = [
  {
    id: '1',
    name: 'Veronika',
    rating: 4.5,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    name: 'Veronika',
    rating: 4.0,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    name: 'Veronika',
    rating: 5.0,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    image: 'https://via.placeholder.com/50',
  },
];

const ReviewBusinessProfile = ({navigation,route}) => {

const id=route.params.id;
console.log("id",id);
const[review,setReview]=useState([]);
const dispatch = useDispatch();

useEffect(() => {
    fetchData();
  }, [dispatch]);
  const fetchData = async () => {
    try {
      const response1 = await dispatch(getReview(id)).unwrap();
      setReview(response1)
    //  setbusinesses(response1);
      console.log('reviw detail------!!!!!!', response1);
    } catch (error) {
      console.error('Error fetching bussiness detail:', error);
    }
  };
  const renderReviewItem = ({item}) => (
    <View style={styles.reviewContainer}>
      <Image
        source={{uri: item.profile_image}}
        //source={images.avatar}
        style={styles.avatar}
      />
      <View style={styles.reviewContent}>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
        <StarRating rating={item.rating} onChange={() => {}} starSize={20} />
        <Text style={styles.reviewText}>{item.review_text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}

      <HeaderComp
        leftClick={() => alert('heelo')}
        //rightClick={() => alert('heelo')}
        rightClick={() => alert('heelo')}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Reviews</Text>
      </View>
      <FlatList
        data={review?.reviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reviews found.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '12@s',
    paddingTop: '16@vs',
  },
  header: {
    // alignItems: 'center',
    marginBottom: '16@vs',
  },
  headerText: {
    fontSize: '20@s',
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  reviewContainer: {
    flexDirection: 'row',
    //  backgroundColor: '#f9f9f9',
    backgroundColor: '#fff',
    padding: '3@s',
    borderRadius: '8@s',
    marginBottom: '12@vs',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    marginRight: '12@s',
  },
  reviewContent: {
    flex: 1,
  },
  name: {
    fontSize: '16@s',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: '4@vs',
  },
  reviewText: {
    fontSize: '14@s',
    fontFamily: 'Poppins-Regular',
    color: '#555',
    marginTop: '8@vs',
  },
});

export default ReviewBusinessProfile;
