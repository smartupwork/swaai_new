import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../../assets/images'
import { scale } from 'react-native-size-matters';
import COLORS from '../../constants/color';

const SplashBusiness = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.SplashBusiness} style={styles.logo} />
      <Text style={styles.txt}>
        Spread awareness.{'\n'}
        Elevate your brand voice.{'\n'}
        Find your consumers.
      </Text>
      <View style={styles.bottomSec}>
        {/* <Text style={styles.txtPre}>Prev</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.txtNext}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashBusiness

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
    fontSize: scale(20),
    fontFamily: 'Poppins-Bold',
    width: '80%',
    textAlign: 'center',
    marginTop: scale(30),
  },
  bottomSec: {
    // position: 'absolute',
    // bottom: scale(50),
   //flexDirection: 'row',
  //  justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(20),
    marginTop: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    
  },
  txtPre: {
    color: '#C4C4C4',
    fontFamily: 'Poppins-SemiBold',
  },
  txtNext: {
    color: COLORS.blue,
    fontFamily: 'Poppins-SemiBold',
    textAlign:'center',
    alignSelf:'center'
  },
});