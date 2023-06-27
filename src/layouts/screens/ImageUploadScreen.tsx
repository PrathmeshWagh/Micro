import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from '../../style/Colors/colors';
import FastImage from 'react-native-fast-image';
import Appbar from '../../components/Appbar';

interface Imgs {
  url: string;
}

const ImageUploadScreen = () => {
  const [imageUri, setImageUri] = useState<Imgs[]>([]);
  const [number, onChangeNumber] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);

  // const [imgs, setImgs] = useState([])

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
      console.log('img', img.path);
      let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
      const moveImg = await RNFS.moveFile(img.path, photoPath)
      //console.log('move', img.path);
      openPhotoEditor(photoPath)
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
      let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
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
      onDone: (result) => {
        const merged = imageUri;
        merged.push({
          url: result
        })
        setImageUri(merged)
        console.log('imageUri', imageUri);
        setRefreshFlag(!refreshFlag);
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
        <View style={styles.structure}>

          {
            imageUri.map((data) =>
              <View style={{ flexDirection:'row', flexWrap: 'wrap',justifyContent:'space-around'}} >
                <Image source={{ uri: 'file://' + data.url }}
                  style={{ width: 100, height: 100 }} />
              </View>
            )
          }
          {/* {imageUri ? (
            // <Image source={{ uri: 'file://' + imageUri }}
            //   style={{ width: '100%', height: 300 }} />
            {}
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
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Remarks"
        // keyboardType="numeric"
        />
        <View style={styles.align}>
          <Pressable style={styles.uploadButton} onPress={() => open()}>
            <Text style={styles.text}>Upload Picture</Text>
          </Pressable>
          <Pressable style={styles.uploadButton}>
            <Text style={styles.text}>Save Image</Text>
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