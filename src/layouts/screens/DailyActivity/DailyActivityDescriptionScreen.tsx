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
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  navigation: any
}
const DailyActivityDescriptionScreen: FC<Props> = ({ route }: any): JSX.Element => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedTaskId, project_id } = route.params;
  console.log(selectedTaskId,project_id);
  const [dailyActivity, setDailyActivity] = useState([]);
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
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [taskIds, setTaskIds] = useState<number[]>(selectedTaskId);
  const [selectedImagesMap, setSelectedImagesMap] = useState<Record<number, string[]>>({});

  const handleImageSelection = (imagePath: string, imageId: string, index: number) => {
    const sectionSelectedImages = selectedImagesMap[index] || [];
    let updatedSelectedImageIds = [...selectedImageIds];

    if (sectionSelectedImages.includes(imagePath)) {
      // If the image is already selected, remove it from the selectedImageIds
      updatedSelectedImageIds = updatedSelectedImageIds.filter(id => id !== imageId);
    } else {
      // If the image is not selected, add it to the selectedImageIds
      updatedSelectedImageIds.push(imageId);
    }

    setSelectedImagesMap({
      ...selectedImagesMap,
      [index]: sectionSelectedImages.includes(imagePath)
        ? sectionSelectedImages.filter(item => item !== imagePath)
        : [...sectionSelectedImages, imagePath],
    });

    setSelectedImageIds(updatedSelectedImageIds);
  };



  useEffect(() => {
    Upload();
  }, []);


  const Upload = async () => {
    const raw = {
      project_id: project_id,
      task_id: selectedTaskId,
    }
    try {
      setIsLoading(true);
      const api: any = await postMethod(`get_daily_activity`, raw);
      if (api.status === 200) {
        setDailyActivity(api.data)
        setIsLoading(false);
      } else {
        setIsLoading(false);
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

  const openZoomedImage = (imagePath: string, remark: string) => {
    setZoomedImage(imagePath);
    setSelectedImageRemark(remark);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  const onRefresh = () => {
    setRefreshing(true);
    Upload();
    setRefreshing(false);
  };
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    hideDatePicker();
    setDate(date);
  };

  const AddDescription = async () => {
    const taskRemarkValues = Object.values(remark);
    const taskAreaValues = Object.values(area);
    const taskPlanValues = Object.values(plan);
    const taskCompletionValues = Object.values(completion);
    const taskStatusValues = Object.values(status);

    const selectedImageCounts = dailyActivity.map((item, index) => {
      return {
        task_id: taskIds[index],
        image_num: selectedImagesMap[index] ? selectedImagesMap[index].length : 0,
      };
    });

    const raw = {
      project_id: project_id,
      task_id: taskIds,
      image_id: selectedImageIds,
      task_remark: taskRemarkValues,
      area: taskAreaValues,
      plan: taskPlanValues,
      completion: taskCompletionValues,
      status: taskStatusValues,
      date: formattedDate,
      image_num: selectedImageCounts.map((item) => item.image_num),
    }
    console.log("raw", raw)
    try {
      setLoading(true);
      const api: any = await postMethod(`add_daily_activity`, raw);
      console.log(".......", api.data)
      if (api.data.status === true) {
        setLoading(false);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'ManpowerReportScreen',
            params: {
              activity: api.data,
              project_id: project_id,
              date: formattedDate
            },
          })
        )

      } else {
        setLoading(false);
        console.log(".......", api.data)
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

  const addNewTask = (index: number) => {
    const updatedDailyActivity = [...dailyActivity];
    const clonedTask = { ...updatedDailyActivity[index] };
    clonedTask.task_name = updatedDailyActivity[index].task_name;
    updatedDailyActivity.splice(index + 1, 0, clonedTask);
    const currentTaskId = taskIds[index];
    const updatedTaskIds = [...taskIds];
    updatedTaskIds.splice(index + 1, 0, currentTaskId);
    setDailyActivity(updatedDailyActivity);
    setTaskIds(updatedTaskIds);
  };


  return (
    <>
      <Appbar title={'Daily Activity'} />
      {isloading ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <Text style={styles.date}>Date</Text>
            <View style={styles.input}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.date}>{formattedDate}</Text>
              </View>
              <Feather
                name="calendar"
                size={22}
                color={'#000'}
                style={{ position: 'absolute', right: 20, top: 12 }}
                onPress={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={date}
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            {dailyActivity.map((item, index) => (
              <View key={index}>
                <View style={styles.cover}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.Task}>Task {index + 1}</Text>
                    <Pressable onPress={() => addNewTask(index)}>
                      <Text style={styles.plus}>+</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.date}>Name</Text>
                  <Text style={styles.name}>{item.task_name || ''}</Text>

                  <Text style={styles.date}>Task Remarks</Text>
                  <TextInput
                    style={styles.inputRemark}
                    onChangeText={(text) => {
                      setRemark({
                        ...remark,
                        [index]: text,
                      });
                    }}
                    value={remark[index] || ''}
                    placeholder=""
                  />
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
                                    status={
                                      (selectedImagesMap[index] || []).includes(image.image)
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    onPress={() => handleImageSelection(image.image, image.image_id, index)}
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
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setArea({
                        ...area,
                        [index]: text, // Store the value with the corresponding index
                      });
                    }}
                    value={area[index] || ''}
                    placeholder=""
                  />
                  <Text style={styles.date}>Plan</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setPlan({
                        ...plan,
                        [index]: text, // Store the value with the corresponding index
                      });
                    }}
                    value={plan[index] || ''}
                    placeholder=""
                  />
                  <Text style={styles.date}>Completion</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setCompletion({
                        ...completion,
                        [index]: text, // Store the value with the corresponding index
                      });
                    }}
                    value={completion[index] || ''}
                    placeholder=""
                  />
                  <Text style={styles.date}>Status</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setStatus({
                        ...status,
                        [index]: text, // Store the value with the corresponding index
                      });
                    }}
                    value={status[index] || ''}
                    placeholder=""
                  />
                </View>
              </View>
            ))}

            {/* <View style={{ paddingBottom: 50 }}></View> */}
            <Pressable style={styles.btn} onPress={AddDescription}>
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
  remark: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
  },
  plus: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    marginTop: -10,
    color: Colors.text_primary
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
    color:Colors.black
  },
  inputRemark: {
    height: 80,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    textAlignVertical: 'top',
    color:Colors.black
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

export default DailyActivityDescriptionScreen;