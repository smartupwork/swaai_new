import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale, scale} from 'react-native-size-matters';
import COLORS from '../../../constants/color';
import ButtonComp from '../../../components/ButtonComp';


const PaymentMethodScreen = ({navigation, route}) => {
  const {price_id, product} = route.params;

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    zipCode: '',
    billingAddress1: '',
    billingAddress2: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({...prevData, [field]: value}));
    setErrors(prevErrors => ({...prevErrors, [field]: ''})); // Clear error when the user types
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim() && key !== 'billingAddress2') {
        // Make "billingAddress2" optional
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const paymentData = {
        ...formData,
        price_id,
        product,
      };
      navigation.navigate('ConfirmSubscription', {paymentData});
    } else {
      Alert.alert('Validation Error', 'Please fill all required fields');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Add a payment method</Text>
        <Text style={styles.subHeader}>
          You won't be charged until you confirm the subscription
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="NAME"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={[styles.input, errors.cardNumber && styles.inputError]}
            placeholder="XXXX XXXX XXXX XXXX"
            keyboardType="numeric"
            value={formData.cardNumber}
            onChangeText={value => {
              const formattedValue =
                value
                  .replace(/\s/g, '')
                  .match(/.{1,4}/g)
                  ?.join(' ') || '';
              handleInputChange('cardNumber', formattedValue);
              if (!/^\d{0,16}$/.test(value.replace(/\s/g, ''))) {
                setErrors(prev => ({
                  ...prev,
                  cardNumber: 'Card number must be numeric and up to 16 digits',
                }));
              } else {
                setErrors(prev => ({...prev, cardNumber: ''}));
              }
            }}
          />
          {errors.cardNumber && (
            <Text style={styles.errorText}>{errors.cardNumber}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer,{width:'45%'}]}>
            <Text style={styles.label}>Expiration Date</Text>
            <TextInput
              style={[styles.input, errors.expirationDate && styles.inputError]}
              placeholder="MM/YY"
              value={formData.expirationDate}
              keyboardType="numeric"
              maxLength={5} // Limit input to 5 characters (MM/YY)
              onChangeText={value => {
                let formattedValue = value;

                // Add `/` after the month if not already present
                if (value.length === 2 && !value.includes('/')) {
                  formattedValue = `${value}/`;
                }

                handleInputChange('expirationDate', formattedValue);

                // Validation: Ensure correct MM/YY format
                if (!/^(0[1-9]|1[0-2])\/\d{0,2}$/.test(formattedValue)) {
                  setErrors(prev => ({
                    ...prev,
                    expirationDate: 'Invalid format, use MM/YY',
                  }));
                } else {
                  setErrors(prev => ({...prev, expirationDate: ''}));
                }
              }}
            />
            {errors.expirationDate && (
              <Text style={styles.errorText}>{errors.expirationDate}</Text>
            )}
          </View>

        
          <View style={[styles.inputContainer,{width:'45%'}]}>
            <Text style={styles.label}>Security Code</Text>
            <TextInput
              style={[styles.input, errors.securityCode && styles.inputError]}
              placeholder="CVV"
              keyboardType="numeric"
              value={formData.securityCode}
              maxLength={4} // Limit input to 4 digits
              onChangeText={value => {
                // Allow only numeric input and restrict to 4 digits
                const sanitizedValue = value.replace(/[^0-9]/g, '');

                handleInputChange('securityCode', sanitizedValue);

                // Validate CVV length (3 or 4 digits)
                if (sanitizedValue.length < 3 || sanitizedValue.length > 4) {
                  setErrors(prev => ({
                    ...prev,
                    securityCode: 'CVV must be 3 or 4 digits',
                  }));
                } else {
                  setErrors(prev => ({...prev, securityCode: ''}));
                }
              }}
            />
            {errors.securityCode && (
              <Text style={styles.errorText}>{errors.securityCode}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ZIP/Postal Code</Text>
          <TextInput
            style={[styles.input, errors.zipCode && styles.inputError]}
            placeholder="XXXXX"
            keyboardType="numeric"
            value={formData.zipCode}
            onChangeText={value => handleInputChange('zipCode', value)}
          />
          {errors.zipCode && (
            <Text style={styles.errorText}>{errors.zipCode}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Billing Address</Text>
          <TextInput
            style={[styles.input, errors.billingAddress1 && styles.inputError]}
            placeholder="Address 1"
            value={formData.billingAddress1}
            onChangeText={value => handleInputChange('billingAddress1', value)}
          />
          {errors.billingAddress1 && (
            <Text style={styles.errorText}>{errors.billingAddress1}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Address 2"
            value={formData.billingAddress2}
            onChangeText={value => handleInputChange('billingAddress2', value)}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="City"
              value={formData.city}
              onChangeText={value => handleInputChange('city', value)}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={[styles.input, errors.state && styles.inputError]}
              placeholder="State"
              value={formData.state}
              onChangeText={value => handleInputChange('state', value)}
            />
            {errors.state && (
              <Text style={styles.errorText}>{errors.state}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={[styles.input, errors.postalCode && styles.inputError]}
            placeholder="Postal Code"
            keyboardType="numeric"
            value={formData.postalCode}
            onChangeText={value => handleInputChange('postalCode', value)}
          />
          {errors.postalCode && (
            <Text style={styles.errorText}>{errors.postalCode}</Text>
          )}
        </View>

        <ButtonComp
          title="Continue"
          backgroundColor={COLORS.blue}
          onPress={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 0.48,
  },
});

export default PaymentMethodScreen;