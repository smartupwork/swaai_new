import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';

const TextInputPassComp = ({
  leftIcon,
  placeholder,
  value,
  onChange,
  rightIcon,
  isflatTextSecureEntry,
  flatTextSecureEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <FontAwesome
        name={leftIcon}
        size={scale(24)}
        color="#888"
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        placeholderTextColor="#676767"
        secureTextEntry={flatTextSecureEntry}
      />
      <TouchableOpacity
        onPress={isflatTextSecureEntry}
        style={styles.eyeIconContainer}>
        <Ionicons
          name={flatTextSecureEntry ? 'eye-off' : 'eye'}
          size={scale(25)}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TextInputPassComp

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
    // height:'48@vs'
    padding: '12@ms',
    marginTop:scale(14)
    // backgroundColor:'red'
  },
  inputIcon: {
    marginRight: '10@ms',
  },
  input: {
    flex: 1,
    fontSize: '16@ms',
    color: '#000',
  },
  eyeIconContainer: {
    marginLeft: '8@ms',
  },
});