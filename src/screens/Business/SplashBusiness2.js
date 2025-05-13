import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../constants/color'
import { images } from '../../assets/images'

const SplashBusiness2 = ({navigation}) => {
  return (
    <TouchableOpacity
      // onPress={() =>navigation.navigate('BusinessTabNavigator')}
      onPress={() =>
        navigation.reset({index: 0, routes: [{name: 'BusinessTabNavigator'}]})
      }
      style={styles.conainer}>
      <Image source={images.pitchMe} style={styles.img} />
    </TouchableOpacity>
  );
}

export default SplashBusiness2

const styles = StyleSheet.create({
    conainer:{
        flex:1,
        backgroundColor:COLORS.white
    },
    img:{
        width:"100%",
        height:'100%',
        resizeMode:'contain'
    }
})