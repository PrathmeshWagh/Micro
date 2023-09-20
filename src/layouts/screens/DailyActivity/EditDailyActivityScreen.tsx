import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Checkbox, Modal, Portal } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { postMethod } from '../../../utils/helper';
import Appbar from '../../../components/Appbar';
import Colors from '../../../style/Colors/colors';

interface Props {
  route: any
}
const EditDailyActivityScreen: FC<Props> = ({ route }): JSX.Element => {
  const { project_id, dailyId, selectedTaskIds } = route.params;
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageRemark, setSelectedImageRemark] = useState<string>();
  const [remark, setRemark] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);
  const [plan, setPlan] = useState<string[]>([]);
  const [completion, setCompletion] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [date, setDate] = useState(new Date())
  const timestamp = date;
  const formattedDate = moment(timestamp).format('DD-MM-YYYY');
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [dailyActivity, setDailyActivity] = useState([]);
  const [dateViewReport, setDateViewReport] = useState<string>()

  useEffect(() => {
    getdata();
  }, []);



  useEffect(() => {
    if (dailyActivity.length > 0) {
      // Assuming dailyActivity is an array of objects like the example data
      const details = dailyActivity[0]; // You can choose which item to use
      const {
        task_remark,
        area,
        plan,
        completion,
        status,
        date,
      } = details;

      // Now you can set the state variables based on the details object

      setRemark(task_remark);
      setArea(area);
      setPlan(plan);
      setCompletion(completion);
      setStatus(status);
      // setDate(date);
    }
  }, [dailyActivity]);








  const onRefresh = () => {
    setRefreshing(true);
    getdata();
    setRefreshing(false);
  };
  const openZoomedImage = (imagePath: string, remark: string) => {
    setZoomedImage(imagePath);
    setSelectedImageRemark(remark);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  const getdata = async () => {

    const raw = {
      project_id: project_id,
      task_id: selectedTaskIds,
      daily_activities_id: dailyId,

    }
    try {
      setLoading(true);
      const api: any = await postMethod(`edit_daily_activity_task_details`, raw);
      if (api.status === 200) {
        setDailyActivity(api.data);
        setLoading(false);

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
    <>
      <Appbar title={'Daily Activity'} />
      {isloading ? (
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
            <View style={styles.input}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.date}>{dateViewReport}</Text>
              </View>
              <Feather
                name="chevron-down"
                size={22}
                color={'#000'}
                style={{ position: 'absolute', right: 20, top: 12, }}
                onPress={() => setOpen(true)}
              />
              <DatePicker
                modal
                open={open}
                mode="date"
                date={date}
                onConfirm={(date) => {
                  const formattedDate = moment(date).format('DD-MM-YYYY');
                  setDateViewReport(formattedDate); // Update dateViewReport with the selected date
                  setDate(date);
                  setOpen(false);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              {/* <DatePicker
                modal
                open={open}
                mode="date"
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              /> */}
            </View>
            {dailyActivity.map((item, index) => (
              <View key={index}>
                <View style={styles.cover}>
                  <Text style={styles.Task}>Task {index + 1}</Text>
                  <Text style={styles.date}>Name</Text>
                  <Text style={styles.name}> {item.task_name || ''}</Text>

                  <Text style={styles.date}>Task Remarks</Text>
                  <Text style={styles.name}> {item.task_remark || ''}</Text>
                  {item?.images.length > 0 && (
                    <>
                      <Text style={styles.date}>Images</Text>
                      <ScrollView horizontal>
                        {item?.images?.map((image) => (
                          <TouchableOpacity key={image.image_id} onPress={() => openZoomedImage(image.image, image.remark)}>
                            <View style={{ margin: 10 }}>
                              <View style={{ backgroundColor: Colors.lightGray, borderRadius: 8, padding: 10 }}>
                                <View style={{ position: 'absolute', right: 2 }}>
                                  <Checkbox
                                    status={selectedImages.includes(image.image) ? 'checked' : 'unchecked'}
                                    onPress={() => handleImageSelection(image.image, image.image_id)}
                                  />
                                </View>
                                <Image style={styles.tinyImg} source={{ uri: image.image }} />
                                <Text style={styles.remark}>
                                  {image.remark.length >= 5 ? `${image.remark.slice(0, 5)}...` : image.remark}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </>
                  )}
                  <Text style={styles.date}>Area</Text>
                  <Text style={styles.name}> {item.area || ''}</Text>

                  <Text style={styles.date}>Plan</Text>

                  <Text style={styles.name}> {item.plan || ''}</Text>

                  <Text style={styles.date}>Completion</Text>

                  <Text style={styles.name}> {item.completion || ''}</Text>

                  <Text style={styles.date}>Status</Text>
                  <Text style={styles.name}> {item.status || ''}</Text>

                </View>
               
              </View>
            ))}

            {/* <View style={{ paddingBottom: 50 }}></View> */}
            {/* <Pressable style={styles.btn} onPress={AddDescription}>
              {loading ?
                (
                  <ActivityIndicator size="small" color={Colors.white} />
                )
                :
                (
                  <Text style={styles.btnText}>

                    Submit
                  </Text>
                )}
            </Pressable> */}
             <View style={{paddingBottom:40}}></View>
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
  remark: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
  },
  name: {
    height: 50,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    color: Colors.text_primary,
    paddingVertical: 15,
    marginBottom: 10
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
    textAlignVertical: 'top'
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
    color: Colors.text_primary,
    paddingLeft: 10,
    fontSize: 16
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
    marginTop: 20
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

export default EditDailyActivityScreen;