import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';

const TextInputComp = ({leftIcon,placeholder,placeholderTextColor,value,onChangeText}) => {
  return (
    <View style={styles.inputContainer}>
      <FontAwesome
        name={leftIcon}
        size={scale(25)}
        color="#888"
        style={styles.inputIcon}
      />
      <TextInput
      value={value}
      onChangeText={onChangeText}
        style={styles.input}
        inputMode='email'
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

export default TextInputComp

const styles = ScaledSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    width: '90%',
    marginVertical: '8@ms',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: '8@ms',
    // height:'48@vs',
    padding: '12@ms',
     //backgroundColor:'red'
  },
  inputIcon: {
    marginRight: '10@ms',
  },
  input: {
    flex: 1,
    fontSize: '16@ms',
    color: '#000',
  },
});