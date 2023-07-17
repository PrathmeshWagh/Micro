import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { AuthContext } from '../../utils/appContext';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { FormPostMethod, postMethod, storeData } from '../../utils/helper';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AddReportScreen = ({ route }: any) => {
  const { project_id } = route.params;

  const [imageUri, setImageUri] = useState<string[]>([]);

  //  console.log("prijectid",id);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const token = (user.token)
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [injury, setInjury] = useState('');
  const [damage, setDamage] = useState('');
  const [position, setPosition] = useState('');
  const [incident, setIncident] = useState('');
  const [remark, setRemark] = useState('');
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
      onDone: (result) => {
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
        setRefreshFlag(!refreshFlag);
        // console.log("imageUri", imageUri);
      },
      onCancel: () => {
        console.log('Photo editor cancelled');
      },
    });
  };
  const AddIncidentReport = async () => {
    const formData = new FormData();
    for (let i = 0; i < imageUri.length; i++) {
      const uriParts = imageUri[i].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('file[]', {
        uri: 'file://' + imageUri[i].uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    formData.append('project_id', project_id);
    formData.append('location_of_incident', location);
    formData.append('injury', injury);
    formData.append('property_damage', damage);
    formData.append('person_involved_and_position', position);
    formData.append('details_of_incident', incident);
    formData.append('incident_report_remark', remark);

    try {
      if (location.trim() === '' || injury.trim() === '' || damage.trim() === '' || position.trim() === '' || incident.trim() === '' || remark.trim() === '') {
        Snackbar.show({
          text: "Please Enter all field",
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
        return false;
      }
      setLoading(true);
      const api: any = await FormPostMethod(`add_incident_report`, formData);
      console.log(".....", api.data)
      if (api.status === 200) {
        setLoading(false);
        Snackbar.show({
          text: "Details Upload Successful",
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        // navigation.navigate('TaskDetailScreen', {
        //   taskId: taskId
        // });
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

  const Delete = (id: any) => {
    console.log("deleteId", id)
    const updatedArray = imageUri.filter((obj) => obj.id !== id);
    setImageUri(updatedArray)
    
  }


  return (
    <SafeAreaView style={styles.container}>
      <Appbar title={'Job Sheet'} />
      <ScrollView style={styles.cover}>
        <Text style={styles.inputText}>Location of Incident</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
        />
        <Text style={styles.inputText}>Injury</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInjury}
          value={injury}
        />
        <Text style={styles.inputText}>Property Damage</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDamage}
          value={damage}
        />
        <Text style={styles.inputText}>Person Involved & Position</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPosition}
          value={position}
        />
        <Text style={styles.inputText}>Details of  incident</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIncident}
          value={incident}
        />

        <Text style={styles.inputText}>Remark</Text>
        <TextInput
          style={styles.input}
          onChangeText={setRemark}
          value={remark}
        />

        <View style={styles.align}>

          <View style={styles.structure}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',

            }}>
              {imageUri.map((data, index) => (
                <Card style={styles.card}>
                  <TouchableOpacity onPress={() => Delete(data.id)} style={styles.delete}>
                    <Ionicons name="close" size={20} color={'black'} style={styles.icon} />
                  </TouchableOpacity>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                    <Image
                      source={{ uri: 'file://' + data.uri }}
                      style={{ width: 100, height: 100 }} />
                  </View>
                </Card>


              ))}
            </View>
          </View>

        </View>
        <View style={styles.align}>
          <Pressable style={styles.uploadButton} onPress={() => open()}>
            <Text style={styles.text}>Upload Picture</Text>
          </Pressable>
          <Pressable style={styles.uploadButton} onPress={() => AddIncidentReport()}>
            {loading && <ActivityIndicator size="small" color="#fff" />}
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddReportScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  structure: {
    borderWidth: 1,
    borderColor: Colors.card_bg,
    backgroundColor: Colors.card_bg,
    padding: 6,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cover: {
    padding: 14,
    backgroundColor: Colors.screen_bg,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 8
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
    paddingHorizontal: 10,
    // width: 120,
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
    flexDirection: 'row',
  },
  text: {
    padding: 5,
    fontFamily: 'Roboto-Bold',
    color: Colors.white,
    fontSize: 14
  },
  card: {
    paddingBottom: 5,
    marginVertical: 10,
  },
  icon: {
    marginTop: -10,
    marginLeft: 100,

  }
})