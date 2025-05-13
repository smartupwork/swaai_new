// DynamicButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const ButtonComp = ({title, backgroundColor, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    paddingVertical: scale(5),
    borderRadius: scale(8),
    alignItems: 'center',
    marginVertical: scale(8),
    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(18),
    fontFamily:"Poppins-Medium"
  },
});

export default ButtonComp;
