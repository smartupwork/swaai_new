import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';

const PasswordTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  leftIcon,
  secureTextEntry,
  rightIcon,
  isflatTextSecureEntry,
  flatTextSecureEntry,
}) => {
  return (
    <TextInput
      style={[styles.inputContainerStyle, styles.passwordTxt, {borderWidth: 1}]}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      left={
        <TextInput.Icon
          icon={leftIcon}
          color={'#676767'}
          // onPress={() => {
          //   setFlatTextSecureEntry(!flatTextSecureEntry)
          // }}
        />
      }
      secureTextEntry={flatTextSecureEntry}
      right={
        <TextInput.Icon
          icon={flatTextSecureEntry ? 'eye-off' : 'eye'}
          onPress={isflatTextSecureEntry}
          forceTextInputFocus={false}
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
};

export default PasswordTextInput

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
  },
  passwordTxt: {
    fontSize: scale(14),
  },
});