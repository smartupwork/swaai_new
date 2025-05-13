import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {scale, moderateScale, verticalScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../assets/images';
import COLORS from '../../../constants/color';
import DatePicker from 'react-native-date-picker';
const EditProfileScreen = ({navigation}) => {
  const [name, setName] = useState('John Fantasia');
  const [dob, setDob] = useState('01/01/1988');
  const [email, setEmail] = useState('jf@mail.com');
  const [phone, setPhone] = useState('(308) 555-0121');
    const [phoneCode, setPhoneCode] = useState('+1 US');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.header}>
        <FontAwesome name="angle-left" size={25} color="#000" />
        <Text style={styles.title}>Edit Profile</Text>
        <Text></Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Image source={images.avatar} style={styles.avatar} />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>
            <FontAwesome name="pencil" size={16} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Personal Summary/Description</Text>
        <Text style={styles.summaryText}>
          Supporting family owned, small businesses. Avid thrifter.
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={images.ImageReplace} />
          <Text style={styles.imageText}>Image #1</Text>
        </View>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={images.ImageReplace} />
          <Text style={styles.imageText}>Image #2</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.input}>
          <Text>DOB</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode='date'
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={[styles.input, {width: '31%'}]}
            placeholder="+1 US"
            value={phoneCode}
            onChangeText={setPhoneCode}
          />
          <TextInput
            style={[styles.input, {width: '63%'}]}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    padding: moderateScale(16),
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: verticalScale(10),
    //  justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(16),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingLeft: scale(12),
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  avatar: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: scale(130),
    backgroundColor: COLORS.blue,
    borderRadius: 50,
    padding: moderateScale(8),
  },
  editIcon: {
    color: '#FFF',
    fontFamily: 'Poppins_700Bold',
  },
  summary: {
    backgroundColor: COLORS.cyan,
    borderRadius: 8,
    padding: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  summaryTitle: {
    fontSize: scale(14),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  summaryText: {
    fontSize: scale(12),
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    marginTop: verticalScale(4),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@ms',
    //  backgroundColor:'red'
  },
  imageBox: {
    flex: 1,
    //  alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: '10@ms',
    marginHorizontal: '5@ms',
    // padding: '16@ms',
    //  backgroundColor:'pink'
  },
  image: {
    width: '100%',
    height: '120@ms',
    borderTopLeftRadius: '12@s',
    borderTopRightRadius: '12@s',
    //  marginBottom: '8@ms',
  },
  imageText: {
    fontSize: '14@ms',
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    paddingVertical: '16@s',
    paddingHorizontal: '8@s',
  },
  inputContainer: {
    marginTop: verticalScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: moderateScale(10),
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    marginBottom: verticalScale(10),
    backgroundColor: '#FFF',
  },
});

export default EditProfileScreen;
