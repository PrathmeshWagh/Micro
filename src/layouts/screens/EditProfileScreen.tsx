import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colors from '../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { postMethod, getStorageData, storeData, FormPostMethod } from '../../utils/helper';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const { firstname, lastname, number, avatar } = route.params;
  useEffect(() => {
    setFirstName(firstname);
    setLastName(lastname);
    setPhone(number);
    setImageUrl(avatar);
  }, []);

  const EditProfile = async () => {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('mobile_number', phone);
    formData.append('avatar', {
      uri: imageUrl,  // Use the image path
      type: 'image/jpg', // Adjust the type as needed based on the image format
      name: 'profile.jpg', // Adjust the name as needed
    });
    console.log("formData", formData)

    try {
      const api: any = await FormPostMethod(`update_profile`, formData);
      if (api.status === 200) {
        console.log("api", api.data)
        setLoading(false);
        const existingUserData = await getStorageData();
        const updatedUserDetails = {
          ...existingUserData.user_details, // Keep existing data
          first_name: firstName,           // Update first_name
          last_name: lastName,             // Update last_name 
          mobile_number: phone,            // Update mobile_number
          avatar: imageUrl || existingUserData.user_details.avatar, // Update avatar or keep the existing avatar
        };
        const updatedUserData = {
          ...existingUserData,
          user_details: updatedUserDetails,
        };
        await storeData(updatedUserData);
        navigation.dispatch(CommonActions.goBack())

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
    console.log("hiiii")
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Check if the image was selected successfully
      if (image && image.path) {
        setImageUrl(image.path);
      } else {
        // Handle the case when the user didn't pick any image
        console.log('No image selected');
      }
    } catch (error) {
      // Handle any errors that might occur during image selection
      console.log('Error selecting image:', error);
    }

  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.align}>
          <Pressable onPress={() => navigation.goBack()}>
            <IonIcon style={styles.icon} name="arrow-back" size={28} color={'white'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.Img}>
        <Avatar.Image size={105} source={{ uri: imageUrl || avatar }} />
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
    borderColor: Colors.brand_primary,
    backgroundColor: Colors.brand_primary,
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
    left: 130

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




