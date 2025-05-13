import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { images } from '../../assets/images';
import { scale } from 'react-native-size-matters';

const OnboardingScreenOne = ({navigation}) => {
  useEffect(()=>{
setTimeout(() => {
  navigation.navigate('OnboardingScreenTwo');
}, 3000);
  },[])
  return (
    <View style={styles.container}>
      <Image source={images.splashLogo1} style={styles.image}/>
    </View>
  )
}

export default OnboardingScreenOne

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:'center', 
       backgroundColor: '#EAFDFB',
  },
  image:{
width:'90%',
resizeMode:'contain'
  }
});