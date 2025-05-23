import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../assets/images';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/color';

const HeaderComp = ({leftClick, rightClick, msgClick}) => {
  return (
    <View style={styles.headerCont}>
      <TouchableOpacity style={{width:'33%',}} onPress={leftClick}>
        <FontAwesome name="" size={18} color="#323232" />
      </TouchableOpacity>
      <View style={{width:'33%',}}>
      <Image source={images.headerLogo} style={styles.logoImg} />
     </View>
      <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'flex-end', gap: 5,width:'33%',}}>
        {
          msgClick?
        
        <TouchableOpacity onPress={msgClick}>
          <FontAwesome name="commenting-o" size={25} color={COLORS.cyan}/>
        </TouchableOpacity>
:<Text></Text>
        }
        <TouchableOpacity  onPress={rightClick}>
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
    
   // alignItems: 'center',
    justifyContent: 'space-between',
   // paddingHorizontal: scale(12),
    // backgroundColor:'pink'
  },
  logoImg: {width: scale(77), height: scale(77), resizeMode: 'cover'},
  rightImg: {width: scale(55), height: scale(55), resizeMode: 'contain'},
});