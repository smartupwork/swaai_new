import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../../assets/images'
import { scale } from 'react-native-size-matters';
import COLORS from '../../constants/color';

const SplashConsumer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.SplashConsumer} style={styles.logo} />
      <Text style={styles.txt}>
        Shop with Purpose. Share with Intent. Find your Impact.
      </Text>
      <View style={styles.bottomSec}>
        <Text style={styles.txtPre}>Prev</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInConsumerScreen')}>
          <Text style={styles.txtNext}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashConsumer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
  txt: {
    fontSize: scale(25),
    fontFamily: 'Poppins-Bold',
    width: '80%',
    textAlign: 'center',
    marginTop: scale(30),
  },
  bottomSec: {
    position: 'absolute',
    bottom: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(20),
  },
  txtPre: {
    color: '#C4C4C4',
    fontFamily: 'Poppins-SemiBold',
  },
  txtNext: {
    color: COLORS.green,
    fontFamily: 'Poppins-SemiBold',
  },
});