import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Checkbox, Modal, Portal } from 'react-native-paper';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
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
  const { project_id, dailyId, selectedTaskIds, dateNew } = route.params;
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageRemark, setSelectedImageRemark] = useState<string>();
  const [date, setDate] = useState<string>()
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [dailyActivity, setDailyActivity] = useState([]);
  const [selectedRemark, setSelectedRemark] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [selectedCompletion, setSelectedCompletion] = useState<string[]>([]);


  useFocusEffect(
    useCallback(() => {
      getdata();
    }, [])
  );

  useEffect(() => {
    if (dailyActivity.length > 0) {
      const initialSelectedImagesMap = {};

      dailyActivity.forEach((item, index) => {
        const selectedImages = item.images
          .filter((image) => image.image_already_check === 1)
          .map((image) => image.image_id);

        initialSelectedImagesMap[index] = selectedImages;
      });

      setSelectedImagesMap(initialSelectedImagesMap);

      // ...rest of your code
    }
  }, [dailyActivity]);

  useEffect(() => {
    if (dailyActivity.length > 0) {
      const details = dailyActivity[0];
      setSelectedName(details.task_name || ''); // Use API data or empty string as initial value
      setSelectedRemark(details.task_remark || ''); // Use API data or empty string as initial value
      setSelectedPlan(details.plan || ''); // Use API data or empty string as initial value
      setSelectedArea(details.area || ''); // Use API data or empty string as initial value
      setSelectedCompletion(details.completion || ''); // Use API data or empty string as initial value
      setSelectedStatus(details.status || ''); // Use API data or empty string as initial value
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
      date: dateNew
    }
    console.log("raw45", raw)
    try {
      setIsLoading(true);
      const api: any = await postMethod(`edit_daily_activity_task_details`, raw);
      if (api.status === 200) {
        console.log("...............", api.data.date)
        setDailyActivity(api.data.data);
        setDate(api.data.date)
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

  const [selectedName, setSelectedName] = useState<string>('');



  const addDuplicateTaskSection = (originalTaskIndex: number) => {
    // Get the original task from the dailyActivity array
    const originalTask = dailyActivity[originalTaskIndex];

    // Create a duplicate task with the same properties
    const duplicateTask = {
      task_name: originalTask.task_name,
      task_remark: '',
      images: [...originalTask.images], // Copy the images array
      area: '',
      plan: '',
      completion: '',
      status: '',
      isDuplicate: true, // Add a property to indicate it's a duplicate
      task_id: originalTask.task_id, // Copy the task_id from the original task
    };

    // Clone the dailyActivity array and insert the duplicate task
    const updatedDailyActivity = [...dailyActivity];
    updatedDailyActivity.splice(originalTaskIndex + 1, 0, duplicateTask);
    setDailyActivity(updatedDailyActivity);

    // Copy the selected images from the original task to the duplicate task
    setSelectedImagesMap({
      ...selectedImagesMap,
      [originalTaskIndex + 1]: selectedImagesMap[originalTaskIndex] || [],
    });
  };


  const [selectedImagesMap, setSelectedImagesMap] = useState<Record<number, string[]>>({});

  // Function to handle image selection
  const handleImageSelection = (imageId: string, taskId: number) => {
    // Copy the existing selected images for this task
    const selectedImages = selectedImagesMap[taskId] ? [...selectedImagesMap[taskId]] : [];

    // Check if the image is already selected for this task
    const imageIndex = selectedImages.indexOf(imageId);

    if (imageIndex === -1) {
      // If not selected, add it to the list
      selectedImages.push(imageId);
    } else {
      // If already selected, remove it from the list
      selectedImages.splice(imageIndex, 1);
    }

    // Update the selected images map with the new list
    setSelectedImagesMap({ ...selectedImagesMap, [taskId]: selectedImages });
  };

  const AddDescription = async () => {
    const areaArray: string[] = [];
    const completionArray: string[] = [];
    const planArray: string[] = [];
    const statusArray: string[] = [];
    const taskRemarkArray: string[] = [];
    const imageIdArray: string[] = [];
    const imageNumArray: number[] = [];
    const taskIdsArray: number[] = [];

    dailyActivity.forEach((item, index) => {
      areaArray.push(item.area || ''); // Use empty string if area is undefined
      completionArray.push(item.completion || '');
      planArray.push(item.plan || '');
      statusArray.push(item.status || '');
      taskRemarkArray.push(item.task_remark || '');

      // Push the task_id for each task, and if it's a duplicate, push it twice
      const taskId = item.task_id; // Use the task_id from the duplicated card
      if (item.isDuplicate) {
        taskIdsArray.push(taskId);
      } else {
        taskIdsArray.push(taskId);
      }

      // Populate imageIdArray with selected image IDs from selectedImagesMap
      const selectedImages = selectedImagesMap[index] || [];
      selectedImages.forEach((imageId) => {
        imageIdArray.push(imageId);
      });

      const selectedImageCount = selectedImages.length;
      imageNumArray.push(selectedImageCount);
    });

    const raw = {
      project_id: project_id,
      task_id: taskIdsArray, // Updated task_id with duplicates
      task_remark: taskRemarkArray,
      area: areaArray,
      plan: planArray,
      completion: completionArray,
      status: statusArray,
      image_id: imageIdArray, // Populate image_id with selected image IDs
      image_num: imageNumArray,
      daily_activities_id: dailyId,
      date: dateNew
    };

    console.log("raw222", raw);
    try {
      setLoading(true);
      const api: any = await postMethod('update_daily_activity', raw);
      if (api.data.status === true) {
        console.log('...hello....', api.data);
        setLoading(false);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'EditManPowerReport',
            params: {
              projectId: project_id,
              date: dateNew,
              taskId: taskIdsArray
            },
          })
        )
      } else {
        console.log('.....hiiii..', api.data);
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    } catch (e) {
      console.log('.....catch..');
      Snackbar.show({
        text: 'Some Error Occurred' + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      });
    }
  };




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
              <View>
                <Text style={styles.date}>{dateNew}</Text>
              </View>
            </View>
            {dailyActivity.map((item, index) => (
              <View key={index}>
                <View style={styles.cover}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.Task}>Task {index + 1}</Text>
                    {!item.isDuplicate && ( // Conditionally render the "+" button
                      <Pressable onPress={() => addDuplicateTaskSection(index)}>
                        <Text style={styles.plus}>+</Text>
                      </Pressable>
                    )}
                  </View>
                  <Text style={styles.date}>Name</Text>
                  <Text style={styles.input}>{item.task_name}</Text>

                  <Text style={styles.date}>Task Remarks</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter Remark"
                    onChangeText={(text) => {
                      const updatedDailyActivity = [...dailyActivity];
                      updatedDailyActivity[index].task_remark = text;
                      setDailyActivity(updatedDailyActivity);
                    }}
                    value={item.task_remark}
                  />
                  {item?.images.length > 0 && (
                    <>
                      <Text style={styles.date}>Images</Text>
                      <ScrollView horizontal>
                        {item?.images?.map((image) => (
                          <TouchableOpacity key={image.image_id} onPress={() => openZoomedImage(image.image, image.remark)}>
                            <View style={{ margin: 10 }}>
                              <View style={{ backgroundColor: Colors.lightGray, borderRadius: 8, padding: 10, }}>
                                <View style={{ position: 'absolute', right: 2, }}>
                                  <Checkbox
                                    status={selectedImagesMap[index]?.includes(image.image_id) ? 'checked' : 'unchecked'}
                                    onPress={() => handleImageSelection(image.image_id, index)}
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
                    placeholder="Enter Area"
                    onChangeText={(text) => {
                      const updatedDailyActivity = [...dailyActivity];
                      updatedDailyActivity[index].area = text;
                      setDailyActivity(updatedDailyActivity);
                    }}
                    value={item.area}
                  />
                  <Text style={styles.date}>Plan</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Plan"
                    onChangeText={(text) => {
                      const updatedDailyActivity = [...dailyActivity];
                      updatedDailyActivity[index].plan = text;
                      setDailyActivity(updatedDailyActivity);
                    }}
                    value={item.plan}
                  />
                  <Text style={styles.date}>Completion</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Completion"
                    onChangeText={(text) => {
                      const updatedDailyActivity = [...dailyActivity];
                      updatedDailyActivity[index].completion = text;
                      setDailyActivity(updatedDailyActivity);
                    }}
                    value={item.completion}
                  />
                  <Text style={styles.date}>Status</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Status"
                    onChangeText={(text) => {
                      const updatedDailyActivity = [...dailyActivity];
                      updatedDailyActivity[index].status = text;
                      setDailyActivity(updatedDailyActivity);
                    }}
                    value={item.status}
                  />
                </View>

              </View>
            ))}

            <View style={{ paddingBottom: 50 }}></View>
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
            <View style={{ paddingBottom: 40 }}></View>
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
  plus: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    marginTop: -10,
    color: Colors.text_primary
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