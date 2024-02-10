import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Button,Alert, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../style/Colors/colors';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";

const ImageUpload = () => {
  const [imageUri, setImageUri] = useState(null);
  const refRBSheet = useRef();


  // const ImgUpload =()=>{
  //     ImagePicker.openPicker({
  //         multiple: true
  //       }) .then((image) => {
  //         console.log(image[0].path)
  //         setImageUri(image[0].path);
  //       })
  //       .catc((error) => {
  //         console.log(errr);
  //       });
  // }

  const open = () =>{
  Alert.alert('Please Choose a option', 'from below', [
    
    {
      text: 'Gallery',
      onPress: () => ImgSelectGallery(),
      style: 'cancel',
    },
    {
      text: 'Camera',
      onPress: () => console.log('Cancel')
    },
    {text: 'Cancel', onPress: () => console.log('Cancel')},
  ]);
  }

  const ImgSelectCamera = async () => {
    try {
      const img = await ImagePicker.openCamera({
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
      });
      console.log('img', img.path);
      let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
      const moveImg = await RNFS.moveFile(img.path, photoPath)
      //console.log('move', img.path);
      openPhotoEditor(photoPath)
    } catch (e) {
      console.log(e);
    }
  }
  const openPhotoEditor = (img: string) => {
    PhotoEditor.Edit({
      hiddenControls:['sticker'],
      path: img,
      onDone: (result) => {
        console.log('Photo editor closed:', result);
        setImageUri(result)
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
  };

  return (
      <View style={styles.container}>
      <View>
      {imageUri && <Image source={{ uri: 'file://' + imageUri }} style={{ width:'100%', height: 300 }} />}
    </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Pressable style={styles.AddPic} onPress={() => open()}>
            <Text>Add Photo</Text>
            <Image size={24} source={require('../style/Img/Add.png')} />
          </Pressable>
          {/* 9434472624 finestra */}
          <View style={styles.AddPic}>
            <Text>View Images</Text>
            <Image size={24} source={require('../style/Img/2.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={styles.AddPic}>
            <Text>Daily Reports</Text>
            <Image size={24} source={require('../style/Img/3.png')} />
          </View>
          <View style={styles.AddPic}>
            <Text>Add Daily Report</Text>
            <Image size={24} source={require('../style/Img/4.png')} />
          </View>
        </View>
        <View style={styles.remark}>
          <Text>Remarks....</Text>
        </View>

    </View>
  );
};

export default ImageUpload;
const styles = StyleSheet.create({
  container: {
 height:400,
    padding: 14,
  },
  remark: {
    marginTop: 20,
    borderColor: '#E8E8E8',
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    padding: 20,
    width: "100%",
    borderRadius: 6,
    marginBottom:50
  },
  cover: {
    marginTop: 14,
    marginHorizontal: 14
  },
  AddPic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#A5FFA5',
    backgroundColor: '#A5FFA5',
    padding: 8,
    elevation: 8,
    width: 130,
    height: 40,
    marginTop: 20
  },
  startDate: {
    color: Colors.text_primary,
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  containerAppbar: {
    backgroundColor: Colors.brand_primary,
    height: 150,
    width: "100%",
    padding: 14
  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  taskIconAlign: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 30
  },
  taskicon: {
    position: 'absolute',
    top: 50
  },
  align2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageName: {
    alignSelf: 'center',
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 25
  },
  card: {
    marginTop: 10,
    padding: 20,
    backgroundColor: Colors.card_bg
  },
  task: {
    color: Colors.text_secondary,
    marginLeft: 5,
    marginTop: 5
  },

  icon: {

  },
  date: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 14,
    color: Colors.text_secondary,

  },
  align: {
    flexDirection: 'row',
    marginBottom: 5
  },

  calender: {
    marginVertical: 5,
  },
  jobSheet: {
    color: Colors.text_primary,
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold'
  },
  address: {
    color: Colors.text_secondary,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  team: {
    fontSize: 18,
    color: Colors.text_primary,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto-Bold'

  }
})
