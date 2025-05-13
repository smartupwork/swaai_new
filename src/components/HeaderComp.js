import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../assets/images';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';

const HeaderComp = ({leftClick, rightClick, msgClick}) => {
  return (
    <View style={styles.headerCont}>
      <TouchableOpacity onPress={leftClick}>
        <FontAwesome name="navicon" size={18} color="#323232" />
      </TouchableOpacity>
      <Image source={images.headerLogo} style={styles.logoImg} />
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        {
          msgClick?
        
        <TouchableOpacity onPress={msgClick}>
          <FontAwesome name="commenting-o" size={25} color={COLORS.cyan}/>
        </TouchableOpacity>
:<Text></Text>
        }
        <TouchableOpacity onPress={rightClick}>
          <Image source={images.headerLogo2} style={styles.rightImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComp

const styles = StyleSheet.create({
  headerCont: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
  },
  logoImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
  rightImg: {width: scale(44), height: scale(44), resizeMode: 'contain'},
});