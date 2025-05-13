import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '../../assets/images';
import COLORS from '../../constants/color';
import { scale } from 'react-native-size-matters';

const OnboardingScreenTwo = ({navigation}) => {
   useEffect(() => {
     setTimeout(() => {
       navigation.navigate('CountryScreen');
     }, 3000);
   }, []);
  return (
    <View style={styles.container}>
      <Image source={images.splashLogo2} style={styles.image} />
      <Text style={styles.heading}>
        Social Networking with an <Text style={{color:COLORS.green}}>IMPACT</Text>
      </Text>
      <Text style={styles.txt}>Businesses want friends too.</Text>
    </View>
  );
}

export default OnboardingScreenTwo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
  },
  heading: {
    width: '70%',
    fontSize: scale(26),
    fontFamily: 'Poppins-ExtraBold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: 5,
    
    color: COLORS.black,
  },
  txt: {
    color: '#A8A8A9',
    fontFamily:'Poppins-SemiBold',
    marginTop:scale(5),
    fontSize:scale(14)
  },
});