import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import Carousel from 'react-native-reanimated-carousel';
import {images} from '../../../assets/images';

const SavedScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Business Spotlight Card */}
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.spotlightText}>Small Business Spotlight</Text>
          <Text style={styles.bizPlaceholder}>Insert Biz Name Here</Text>
        </View>

        {/* Carousel Section */}
        <View style={styles.carouselWrapper}>
          <Carousel
            width={width - scale(40)}
            height={verticalScale(180)}
            data={[images.sliderImg, images.sliderImg]}
            scrollAnimationDuration={500}
            renderItem={({item}) => (
              <Image
                source={item}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            )}
          />
        </View>

        {/* Footer Link */}
        <TouchableOpacity style={styles.profileLink} onPress={()=>navigation.navigate("ViewAllBusinesses")}>
          <Text style={styles.linkText}>Visit business profile </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom: verticalScale(15),
  },
  header: {
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(15),
    alignItems: 'center',
  },
  spotlightText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#00ACC1', // Cyan color
    marginBottom: verticalScale(5),
  },
  bizPlaceholder: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#000',
  },
  bizName: {
    fontSize: scale(14),
    color: '#333',
    marginTop: verticalScale(2),
  },
  carouselWrapper: {
    marginTop: verticalScale(15),
    height: verticalScale(180),
  },
  carouselImage: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  profileLink: {
    alignSelf: 'flex-end',
    paddingRight: scale(20),
    paddingTop: verticalScale(10),
  },
  linkText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#4CAF50', // Green color
  },
});
