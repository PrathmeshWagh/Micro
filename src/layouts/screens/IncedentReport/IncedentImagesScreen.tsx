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

const IncedentImagesScreen=() =>{
    const [imageUri, setImageUri] = useState<string[]>([]);
//   const { taskId } = route.params
  // console.log("taskId",taskId);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const token = (user.token)
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const openPhotoEditor = (img: string) => {
    PhotoEditor.Edit({
      hiddenControls: ['sticker', 'crop'],
      path: img,
      onDone: async (result) => {
        let merged = imageUri;
        // let id = 0;
        // if (merged.length == 0) {
        //   id = 1;
        // }
        // else {
        //   id = merged.at(-1).id + 1;
        // }
        merged.push({
          uri: result,
        //   id: id
        })
        setImageUri(merged);
        // console.log("imageUri", imageUri);
        // storeImages();
        // getStoredImages();
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
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
                    {/* <TouchableOpacity onPress={() => DeleteObject(data.id)} style={styles.delete}> */}
                      <Ionicons name="close" size={22} color={'black'} style={styles.icon} />
                    {/* </TouchableOpacity> */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around'
                    }}>
                    
                        <Image
                          source={{ uri: 'file://' + data.uri }}
                          style={{ width: 100, height: 100 }} />
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
        {/* <Pressable style={styles.uploadButton} onPress={() => ImgUpload()}> */}
          {loading && <ActivityIndicator size="large" color="#fff" />}
          <Text style={styles.text}>Upload</Text>
        {/* </Pressable> */}
      </>
    );
}

export default IncedentImagesScreen;
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