import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from '../../style/Colors/colors';
import FastImage from 'react-native-fast-image';
import Appbar from '../../components/Appbar';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../utils/appContext';
import { FormPostMethod, postMethod, storeData } from '../../utils/helper';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImageUploadScreen = ({ route, navigation }: any) => {
  const [imageUri, setImageUri] = useState<string[]>([]);
  const { taskId } = route.params
  // console.log("taskId",taskId);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const token = (user.token)
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(false);


  const getCurrentDate = () => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const date = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
  };
  const currentDate = getCurrentDate();

  useEffect(() => {
    getStoredImages();
    // setRefreshFlag(!refreshFlag)
  }, []);

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
      // console.log('img', img);
      let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
      const moveImg = await RNFS.moveFile(img.path, photoPath)
      openPhotoEditor(photoPath);
      // console.log('photoPath', photoPath);

    } catch (e) {
      console.log(e);
    }
  };

  const ImgSelectGallery = async () => {
    try {
      const img = await ImagePicker.openPicker({
        cropping: true,
      });
      // console.log('img', img.path);
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
      onDone: async (result) => {
        let merged = imageUri;
        let id = 0;
        if (merged.length == 0) {
          id = 1;
        }
        else {
          id = merged.at(-1).id + 1;
        }
        merged.push({
          uri: result,
          id: id
        })
        setImageUri(merged);
        // console.log("imageUri", imageUri);
        storeImages();
        getStoredImages();
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
  };


  // const ImgUpload = async () => {
  //   // console.log("taskId", taskId)
  //   const AsynStorageImage = await AsyncStorage.getItem('images');
  //   // console.log("stringify")
  //   if (JSON.parse(AsynStorageImage).length == 0) {
  //     Snackbar.show({
  //       text: 'Please Select Images',
  //       duration: Snackbar.LENGTH_SHORT,
  //       textColor: '#AE1717',
  //       backgroundColor: '#F2A6A6',
  //     })
  //   }
  //   const formData = new FormData();
  //   // formData.append('file',(JSON.stringify(AsynStorageImage)))
  //   const uriParts = '/data/user/0/com.microaire/filesd11c71e9-4691-4cae-9bc8-f3a9f7ffd95a.jpg'.split('.');
  //   const fileType = uriParts[uriParts.length - 1];
  //   formData.append('file', {
  //         uri: 'file:///data/user/0/com.microaire/filesd11c71e9-4691-4cae-9bc8-f3a9f7ffd95a.jpg',
  //         name: `photo.${fileType}`,
  //         type: `image/${fileType}`,
  //       });
  //   // const raw = {
  //   //   // file:JSON.parse(AsynStorageImage),
  //   //   file:'file:///data/user/0/com.microaire/filesd11c71e9-4691-4cae-9bc8-f3a9f7ffd95a.jpg',
  //   //   task_id:taskId
  //   // }
  //   try {
  //     const api: any = await FormPostMethod(`add_attachment`, formData);
  //     console.log("api", api.data)
  //     // if (api.status === 200) {
  //     //   // console.log("photo", api.data);
  //     //   Snackbar.show({
  //     //     text: api.data.message,
  //     //     duration: Snackbar.LENGTH_SHORT,
  //     //     textColor: 'white',
  //     //     backgroundColor: 'green',
  //     //   });
  //     //   navigation.navigate('TaskDetailScreen',{
  //     //     taskId:taskId
  //     //   });
  //     // } else {
  //     //   Snackbar.show({
  //     //     text: api.data.message,
  //     //     duration: Snackbar.LENGTH_SHORT,
  //     //     textColor: '#AE1717',
  //     //     backgroundColor: '#F2A6A6',
  //     //   });
  //     // }
  //   }
  //   catch (e) {
  //     Snackbar.show({
  //       text: "Some Error Occured" + e,
  //       duration: Snackbar.LENGTH_SHORT,
  //       textColor: '#AE1717',
  //       backgroundColor: '#F2A6A6',
  //     });
  //   }

  //   // }
  // }

  const ImgUpload = async () => {
    const formData = new FormData();

    // formData.append('date', currentDate);
    // formData.append('user_id', user.user_details.id);
    // formData.append('task_id', taskId);
    const AsynStorageImage = await AsyncStorage.getItem('images');
    let array_lenth = JSON.parse(AsynStorageImage);
    // console.log("array_lenth",array_lenth.length)
    if (array_lenth == null) {
      Snackbar.show({
        text: 'Please Select Images',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      })
      return false;
    }
    for (let i = 0; i < array_lenth.length; i++) {
      const uriParts = array_lenth[i].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('file[]', {
        uri: 'file://' + array_lenth[i].uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
     
      formData.append('name[]', array_lenth[i].name)
      formData.append('remark[]', array_lenth[i].remark)
    }
    formData.append('task_id', taskId);

    console.log("1", JSON.parse(AsynStorageImage).length)
    // formData.append('remark_for_photo', remark);
    try {
      setLoading(true);
      const api: any = await FormPostMethod(`add_attachment`, formData);
      console.log(".....", api.data)
      if (api.status === 200) {
        setLoading(false);
        Snackbar.show({
          text: "Details Upload Successful",
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        Clear()
        navigation.navigate('TaskDetailScreen', {
          taskId: taskId
        });
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

  const storeImages = async () => {
    if (imageUri == null) {
      return null;
    }
    // console.log(".....", imageUri)
    try {
      await AsyncStorage.setItem('images', JSON.stringify(imageUri));
      // console.log("imageUri...", JSON.stringify(imageUri))
      // console.log('Images stored successfully.');
    } catch (error) {
      console.log('Error storing images:', error);
    }
  };
  const getStoredImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem('images');
      if (storedImages !== null) {
        setLoadedImages(JSON.parse(storedImages));
        // console.log("getStoredImages", loadedImages)
        // console.log('Images retrieved successfully.');
      }
      else {
        setLoadedImages([])
      }
    } catch (error) {
      console.log('Error retrieving images:', error);
    }
  };


  const Clear = async () => {
    // console.log("...Clear")
    const remove_data = await AsyncStorage.removeItem('images');
    getStoredImages()
    setLoadedImages([])
    setImageUri([])

  }


  const DeleteObject = async (objectId) => {
    // console.log("objectId",objectId)
    try {
      const get_images = await AsyncStorage.getItem('images');
      let getArray_images = JSON.parse(get_images);
      const updatedArray = getArray_images.filter((obj) => obj.id !== objectId);
      const remove_data = await AsyncStorage.removeItem('images');
      await AsyncStorage.setItem('images', JSON.stringify(updatedArray));
      setImageUri(updatedArray)
      const storedImages = await AsyncStorage.getItem('images');
      getStoredImages();
      console.log("storedImages", storedImages)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Appbar title={'Photo'} />
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Pressable style={styles.uploadPicture} onPress={() => open()}>
            <Feather name="upload" size={22} color={'white'} />
            <Text style={styles.text}>Upload Picture</Text>
          </Pressable>
        </View>
        <View style={styles.align}>

          <View style={styles.structure}>

            {loadedImages.map((data, index) => (
              <View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>

                </View>
                <Card style={styles.card}>
                  <TouchableOpacity onPress={() => DeleteObject(data.id)} style={styles.delete}>
                    <Ionicons name="close" size={22} color={'black'} style={styles.icon} />
                  </TouchableOpacity>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                    <Pressable key={index} onPress={() => navigation.navigate('ReviewImageScreen', { data: loadedImages[index], task_id: taskId })}>
                      <Image
                        source={{ uri: 'file://' + data.uri }}
                        style={{ width: 100, height: 100 }} />
                    </Pressable>
                    <View style={{ marginTop: 30 }}>
                      <Text style={styles.name}>Name:{data.name}</Text>
                      <Text style={styles.remark}>Remark:{data.remark}</Text>
                    </View>
                  </View>
                </Card>

              </View>
            ))}

            {/* 
          {
            imageUri.map((data) =>
              <View style={{ flexDirection:'row', flexWrap: 'wrap',justifyContent:'space-around'}} >
                <Image source={{ uri: 'file://' + data.url }}
                  style={{ width: 100, height: 100 }} />
              </View>
            )
          }  */}

            {/* {imageUri ? (
            <Image source={{ uri: 'file://' + imageUri }}
              style={{ width: '100%', height: 300 }} />

          )
            :
            <Image
              style={styles.tinyLogo}
              source={require('../../style/Img/image.png')}
            />
          } */}

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
          {/* <TextInput
          style={styles.input}
          onChangeText={onRemark}
          value={remark}
          placeholder="Remarks"
        // keyboardType="numeric"
        /> */}
        </View>
      </ScrollView >
      <Pressable style={styles.uploadButton} onPress={() => ImgUpload()}>
        {loading && <ActivityIndicator size="large" color="#fff" />}
        <Text style={styles.text}>Upload</Text>
      </Pressable>
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
    marginTop: 30,
    marginBottom: 10
  },
  delete: {
    position: 'absolute',
    right: -15,
    top: -20

  },
  text: {
    padding: 5,
    fontFamily: 'Roboto-Medium',
    color: Colors.white
  },
  container: {
    flex: 1,
    padding: 18,

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
  },
  card: {
    padding: 10,
    marginVertical: 10,
    width: 280
  },
  remark: {
    color: Colors.text_primary
  },
  name: {
    color: Colors.text_primary
  },
  uploadPicture: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    width: 140,
    alignItems: 'center'
  }
})