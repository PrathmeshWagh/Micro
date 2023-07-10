import React, { useContext, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from '../../style/Colors/colors';
import FastImage from 'react-native-fast-image';
import Appbar from '../../components/Appbar';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../utils/appContext';
import { FormPostMethod, postMethod } from '../../utils/helper';
import moment from 'moment';
import axios from 'axios';

const ImageUploadScreen = ({ route,navigation }: any) => {
  const [imageUri, setImageUri] = useState<string>();
  const [remark, onRemark] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [image34, setImage34] = useState('')
  const { taskId } = route.params;
  console.log("taskId",taskId);
  const token = (user.token)
  const getCurrentDate = () => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const date = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
  };
  const currentDate = getCurrentDate();

  const open = () => {
    Alert.alert('Please Choose a option', 'from below', [
      {
        text: 'Gallery',
        onPress: () => ImgSelectGallery(),
      },
      {
        text: 'Camera',
        onPress: () => ImgSelectCamera(),
      },
      { text: 'Cancel', onPress: () => console.log('Cancel') },
    ]);
  }



  const ImgSelectCamera = async () => {
    try {
      const img = await ImagePicker.openCamera({
        cropping: true,
      });
      console.log('img', img);
      let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
      const moveImg = await RNFS.moveFile(img.path, photoPath)
      openPhotoEditor(photoPath);
      console.log('photoPath', photoPath);

    } catch (e) {
      console.log(e);
    }
  };

  const ImgSelectGallery = async () => {
    try {
      const img = await ImagePicker.openPicker({
        cropping: true,
      });
      console.log('img', img.path);
      let filename = img.path.substring(img.path.lastIndexOf('/') + 1);
      let photoPath = await RNFS.DocumentDirectoryPath + `${filename}`;
      const moveImg = await RNFS.moveFile(img.path, photoPath)
      openPhotoEditor(photoPath)
    } catch (e) {
      console.log(e);
    }
  }
  // const modifiedPath = result.replace(/\/files/, '/');
  // console.log("updatedPath",modifiedPath);

  const openPhotoEditor = (img: string) => {
    PhotoEditor.Edit({
      hiddenControls: ['sticker', 'crop'],
      path: img,
      onDone: (result) => {
        // const merged = imageUri;
        // merged.push({
        //   url: result
        // })
        setImageUri(result);
        setRefreshFlag(!refreshFlag);
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
  };


  // const raw = {
  //   file:imageUri,
  //   user_id:user.user_details.id,
  //   remark_for_photo:remark,
  //   task_id:taskId,
  //   date:formattedDate
  // }

 

  const ImgUpload = async () => {
    console.log("image5555",taskId)
    if (imageUri == null) {
      return null;
    }
    const formData = new FormData();
    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('date', currentDate);
    formData.append('user_id', user.user_details.id);
    formData.append('task_id', taskId);
    formData.append('file', {
      uri: 'file://' + imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('remark_for_photo', remark);
    try {
      const api: any = await FormPostMethod(`add_attachment`, formData);
      if (api.status === 200) {
        console.log("photo", api.data);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.navigate('TaskDetailScreen',{
          taskId:taskId
        });
      } else {
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








  return (
    <>
      <Appbar title={'Photo'} />
      <ScrollView style={styles.container}>
        <View style={styles.structure}>

          {/*

          {/* {
            imageUri.map((data) =>
              <View style={{ flexDirection:'row', flexWrap: 'wrap',justifyContent:'space-around'}} >
                <Image source={{ uri: 'file://' + data.url }}
                  style={{ width: 100, height: 100 }} />
              </View>
            )
          } */}
          {imageUri ? (
            <Image source={{ uri: 'file://' + imageUri }}
              style={{ width: '100%', height: 300 }} />

          )
            :
            <Image
              style={styles.tinyLogo}
              source={require('../../style/Img/image.png')}
            />
          }

          {/* {imageUri.map((imageUrl: any, index:any) => (
        <FastImage
          key={index}
          style={{ width: 100, height: 100 }} 
            uri: imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover} 
      ))} */}

        </View>
        <TextInput
          style={styles.input}
          onChangeText={onRemark}
          value={remark}
          placeholder="Remarks"
        // keyboardType="numeric"
        />
        <View style={styles.align}>
          <Pressable style={styles.uploadButton} onPress={() => open()}>
            <Text style={styles.text}>Upload Picture</Text>
          </Pressable>
          <Pressable
            // disabled={!imageUri}
            style={styles.uploadButton}
            onPress={() => ImgUpload()}>
            <Text style={styles.text}>Save Details</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default ImageUploadScreen;
const styles = StyleSheet.create({
  uploadButton: {
    borderWidth: 1,
    borderColor: Colors.button,
    backgroundColor: Colors.button,
    padding: 6,
    width: 120,
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30
  },
  text: {
    padding: 5,
    fontFamily: 'Roboto-Medium',
    color: Colors.white
  },
  container: {
    flex: 1,
    padding: 18
  },
  tinyLogo: {
    height: 300,
    width: 250,
    alignSelf: "center",
    paddingTop: 50
  },
  structure: {
    borderWidth: 1,
    borderColor: Colors.card_bg,
    backgroundColor: Colors.card_bg,
    padding: 6,
    // alignItems: 'center',
    borderRadius: 8
  },
  input: {
    backgroundColor: '#C6C6C6',
    marginTop: 40,
    height: 60
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})