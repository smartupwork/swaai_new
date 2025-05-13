import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale } from 'react-native-size-matters';

const SimpleTextInput = ({label,placeholder,leftIcon,value,onChangeText}) => {
  return (
    <TextInput
      style={[styles.inputContainerStyle, { borderWidth: 1 }]}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      maxLength={100}
      // right={<TextInput.Affix text={`${customIconText.length}/100`} />}
      left={
        <TextInput.Icon
          icon={() => (
            <Icon
              name={leftIcon}
              size={24}
              color={'#626262'}
              // onPress={() => {
              //   changeIconColor('customIcon');
              // }}
            />
          )}
        />
      }
      theme={{
        colors: {
          primary: '#676767', // Change label and icon color from purple to another color
          text: 'black', // Text color for input text
          underlineColor: 'transparent', // Removes the purple underline
          background: '#676767', // Background color of the input field
          outlineColor: '#676767',
          
        },
        roundness: moderateScale(8),
      }}
    />
  );
}

export default SimpleTextInput

const styles = StyleSheet.create({
  inputContainerStyle: {
    //backgroundColor:'red',
    width: '90%',
    alignSelf: 'center',
    borderRadius: scale(12),
    marginTop: scale(18),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    backgroundColor: '#A8A8A9',
    // borderWidth:2,
    //  borderColor: '#A8A8A9',
  },
  passwordTxt: {
    fontSize: scale(14),
  },
});