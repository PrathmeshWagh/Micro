import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TextInput, Pressable, SafeAreaView, Image, FlatList } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PhotoEditor from 'react-native-photo-editor';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { FormPostMethod } from '../../utils/helper';
import { CommonActions } from '@react-navigation/native';

const AddOderScreen = ({ navigation, route }: any) => {
  const { project_id } = route.params;
  const [imageUri, setImageUri] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [product, setproduct] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [contact, setContact] = useState('');

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
        const updatedImages: string[] = [...imageUri, 'file://' + result];
        console.log("imageUri", result);
        setImageUri(updatedImages);
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
  };

  const ImgUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < imageUri.length; i++) {
      formData.append('file[]', {
        uri: imageUri[i],
        type: 'image/jpg', // Make sure to determine the correct image type
        name: `image_${i}.jpg`, // Use a unique name for each image
      });
    }
    formData.append('product', product)
    formData.append('size', size)
    formData.append('description', description)
    formData.append('project_id', project_id);
    formData.append('remarks', remarks);
    formData.append('contact', contact);

    console.log("imageUri....", imageUri)
    try {
      setLoading(true);
      const api: any = await FormPostMethod(`add_variation_order`, formData);
      console.log(".....", api.data)
      if (api.status === 200) {
        setLoading(false);
        setImageUri([])
        Snackbar.show({
          text: "Details Upload Successful",
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
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




  return (
    <SafeAreaView style={styles.container}>
      <Appbar title={'Variation Oder'} />
      <ScrollView style={styles.cover}>
        <Text style={styles.inputText}>Products / Services</Text>
        <TextInput
          style={styles.input}
          onChangeText={setproduct}
          value={product}

        />
        <Text style={styles.inputText}>Size / Qty</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSize}
          value={size}
          keyboardType="numeric"
        />
        <Text style={styles.inputText}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
        />
        <Text style={styles.inputText}>Customer Contact Details</Text>
        <TextInput
          style={styles.input}
          onChangeText={setContact}
          value={contact}
        />
        <Text style={styles.inputText}>Remarks</Text>
        <TextInput
          style={styles.inputR}
          onChangeText={setRemarks}
          value={remarks}
          placeholder="Remarks"
        />
        <Pressable onPress={() => open()}>
          <Text style={styles.inputText}>Upload Images  <IonIcon name="camera" color={Colors.text_primary} size={20} /></Text>
        </Pressable>
        <View style={styles.imgCard}>
          {imageUri.length === 0 ? (
            <Text style={styles.chooseFile}>Choose file</Text>
          ) : (
            <FlatList
              data={imageUri}
              keyExtractor={(item, index) => index.toString()} // Use index as the key
              horizontal
              // numColumns={imageUri.length > 2 ? 2 : 1}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: 150, height: 150, paddingLeft: 18, marginRight: 10 }}
                />
              )}
            />
          )}
        </View>
        <Pressable style={styles.uploadButton} onPress={ImgUpload}>
          <Text style={styles.text}>Save Details</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddOderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    height: 200,
    width: 200
  },
  uploadedImage: {
    width: 250,
    height: 150,
  },
  cover: {
    padding: 14,
    backgroundColor: Colors.screen_bg,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgCard: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
    margin: 12,
    elevation: 5
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 5
  },
  inputR: {
    height: 80,
    marginVertical: 22,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 8
  },
  inputText: {
    marginHorizontal: 12,
    color: Colors.text_primary,
    fontFamily: 'Roboto-Medium',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: Colors.button,
    backgroundColor: Colors.button,
    padding: 6,
    width: 350,
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40
  },
  text: {
    padding: 5,
    fontFamily: 'Roboto-Bold',
    color: Colors.white,
    fontSize: 18
  },
})