import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colors from '../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { postMethod, getStorageData, storeData } from '../../utils/helper';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

const ProfileScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState(null)
  const { firstname, lastname, Email, number, profile } = route.params;
  useEffect(() => {
    // getUser();
    setFirstName(firstname);
    setLastName(lastname);
    setEmail(Email);
    setPhone(number);
    setImageUrl(profile);
  }, []);

  const EditProfile = async () => {
    const raw = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile_number: phone,
      image: imageUrl
    }
    try {
      const api: any = await postMethod(`update_profile`, raw);
      console.log("raw", raw)
      if (api.status === 200) {
        setLoading(false);
        const existingData = await getStorageData();
        if (existingData) {
          existingData.user_details.first_name = firstName;
          existingData.user_details.last_name = lastName;
          await storeData(existingData)
          // console.log("existingDataObj", existingData)
        }
        navigation.reset({
          routes: [{ name: 'DrawerNavigtaion' }]
        })
      } else {
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    }
    catch (e) {
      Snackbar.show({
        text: "Some Error Occured" + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      });
    }

  }


  const imageUpload = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // const imageUri = image.path;
      // console.log('imageUri', imageUri);
      setImageUrl(image.path);
      // console.log('imageUri', imageUri);

    });
  };




  return (
    <>
      <View style={styles.container}>
        <View style={styles.align}>
          <Pressable onPress={() => navigation.goBack()}>
            <IonIcon style={styles.icon} name="arrow-back" size={28} color={'white'} />
          </Pressable>
          <Image
            style={styles.tinyLogo}
            source={require('../../style/Img/bell2.png')}
          />
        </View>
      </View>
      <View style={styles.Img}>
        <Avatar.Image size={84} source={{ uri: imageUrl }} />
        <Pressable onPress={() => imageUpload()}>
          <Image source={require('../../style/Img/Camera.png')} style={styles.camera} />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, padding: 14, }}>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
        />
        <Text style={styles.inputText}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
        />
        <Text style={styles.inputText}>Email Adress</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.inputText}>Phone</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
        />

        <Pressable style={styles.add} onPress={() => EditProfile()}>
          <Text style={styles.addText}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand_primary,
    height: 180,
    width: "100%",
    padding: 14,
  },

  camera: {
    height: 25,
    width: 25,
    position: 'absolute',
    top: -15,
    right: -40
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  add: {
    borderWidth: 1,
    borderColor: '#041B8E',
    backgroundColor: '#041B8E',
    height: 45,

    padding: 10,
    marginHorizontal: 14,
    borderRadius: 8,
    marginBottom: 50,
    marginTop: 20
  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  Img: {
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 150

  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageName: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 8

  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 8,
    color: 'black'
  },
  input2: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 8,

  },
  inputText: {
    marginHorizontal: 12,
    color: Colors.text_primary,
    fontFamily: 'Roboto-Medium',
  },
})




