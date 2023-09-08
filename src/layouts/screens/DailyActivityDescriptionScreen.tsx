import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Checkbox, Modal, Portal } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { FormPostMethod, getMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';

interface Props {
  navigation: any
}
const DailyActivityDescriptionScreen: FC<Props> = ({ route }:any): JSX.Element => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedTaskIds, project_id } = route.params;
  const [dailyActivity, setDailyActivity] = useState([]);
  const [selectedImageRemark, setSelectedImageRemark] = useState<string>();

  const imagePaths = [
    { id: 1, imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 1' },
    { id: 2, imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 2' },
    { id: 3, imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 3' },
    { id: 4, imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 4' },
  ];

  const handleImageSelection = (imagePath: string) => {
    if (selectedImages.includes(imagePath)) {
      setSelectedImages(selectedImages.filter(item => item !== imagePath));
    } else {
      setSelectedImages([...selectedImages, imagePath]);
    }
  };

  useEffect(() => {
    Upload();
  }, []);

  const Upload = async () => {
    const raw = {
      project_id: project_id,
      task_id: selectedTaskIds
    }
    console.log("imageUri....", raw)
    try {
      setLoading(true);
      const api: any = await FormPostMethod(`get_daily_activity`, raw);
      console.log(".....", api.data)
      if (api.status === 200) {
        setDailyActivity(api.data)
        setLoading(false);
        // navigation.dispatch(CommonActions.goBack())
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


  const openZoomedImage = (imagePath: string, remark:string) => {
    console.log('imagePath',remark);
    setZoomedImage(imagePath);
    setSelectedImageRemark(remark);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  const onRefresh = () => {
    setRefreshing(true);
    // getdata();
    setRefreshing(false);
  };
  return (
    <>
      <Appbar title={'Daily Activity'} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <ScrollView style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            <Text style={styles.date}>Date</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder=""

            />
            {dailyActivity.map((item, index) => (
              <View key={index}>
                <View style={styles.cover}>
                  <Text style={styles.Task}>Task {index + 1}</Text>
                  <Text style={styles.date}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={item.task_name || ''}
                    placeholder=""
                  />

                  <Text style={styles.date}>Task Remarks</Text>
                  <TextInput
                    style={styles.inputRemark}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                  />
                  <Text style={styles.date}>Images</Text>
                  <View >
                    {dailyActivity?.map((activity) => (
                      <View key={activity.task_id} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                        {activity?.images?.map((item) => (
                          <TouchableOpacity key={item.image_id} onPress={() => openZoomedImage(item.image, item.remark)}>
                            <View style={{ margin: 10 }}>
                              <View style={{ backgroundColor: Colors.lightGray, borderRadius: 8, padding: 10 }}>
                                <Checkbox
                                  status={selectedImages.includes(item.image) ? 'checked' : 'unchecked'}
                                  onPress={() => handleImageSelection(item.image)}
                                />
                                <Image style={styles.tinyImg} source={{ uri: item.image }} />
                                <Text style={styles.remark}>
                               {item.remark.length >= 5 ? `${item.remark.slice(0, 5)}...` : item.remark}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                  <Text style={styles.date}>Area</Text>
                  <TextInput
                    style={styles.input}
                    // value={number}
                    placeholder=""
                  />
                  <Text style={styles.date}>Plan</Text>
                  <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                  />
                  <Text style={styles.date}>Completation</Text>
                  <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                  />
                  <Text style={styles.date}>Status</Text>
                  <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder=""
                  />
                </View>
              </View>
            ))}

            {/* <View style={{ paddingBottom: 50 }}></View> */}
            <Pressable style={styles.btn} onPress={() => navigation.navigate('ManpowerReportScreen')}>
              <Text style={styles.btnText}>
                Submit
              </Text>
            </Pressable>
          </ScrollView >


        </>
      )}
      <Portal>
        <Modal visible={zoomedImage !== null} onDismiss={closeZoomedImage}>
          <View style={{ backgroundColor: 'white', padding: 30 }}>
            <Image
              style={styles.zoomedImg}
              source={{ uri: zoomedImage || '' }}
            />
         <Text style={styles.remark}> {/* Display the selectedImageRemark here */}
         Remark:-{'\n'}{'\n'}{selectedImageRemark}
        </Text>
            <Pressable onPress={closeZoomedImage} style={styles.close}>
              <Text style={{ fontSize: 18, color: Colors.text_primary }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </Portal>

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screen_bg,
    padding: 24,
  },
  remark:{
    alignSelf:'center',
    marginTop:10,
    fontFamily: 'Roboto-Regular',
  },
  btn: {
    backgroundColor: Colors.brand_primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: 200,
    alignSelf: 'center',
    marginVertical: 40
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  input: {
    height: 50,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  inputRemark: {
    height: 80,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cover: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    marginTop: 10,
    padding: 14
  },
  date: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary
  },
  Task: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 18,
    paddingBottom: 10
  },
  tinyImg: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100
  },
  modalContent: {
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
  },
  modalCloseButton: {

  },
  modalCloseText: {
    color: 'black',
    fontSize: 18,
  },
  zoomedImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8
  },
  close: {
    alignSelf: 'center',
    marginTop: 10
  }
});

export default DailyActivityDescriptionScreen;