import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../style/Colors/colors';
import { postMethod } from '../../../utils/helper';
import Appbar from '../../../components/Appbar';

// interface ServerRequestPropTypes {
//     date: string[],
//     end_time: string[],
//     name_of_person: string[],
//     no_of_worker: string,
//     project_id: number,
//     start_time: string[],
//     task_id: number[],
//     type_of_worker: string,
//     types_of_worker_name: string

// }
const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}:${formattedMinutes}`;
};
interface Worker {
  workerType: string;
  name: string;
  numWorkers: string;
  showTextBox: boolean;
  startTime: string;
  endTime: string;
  all_worker_details: {
    name_of_person: string;
    start_time: string;
    end_time: string;
  }[];
}
const ManpowerReportScreen: FC = ({ route }: any): JSX.Element => {
  const { date, taskId, projectId } = route.params;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [numWorkersArray, setNumWorkersArray] = useState<number[]>([]);
  const [typeOfWorkers, setTypeOfWorkers] = useState<string[]>([]);
  const [typesOfWorkersName, setTypesOfWorkersName] = useState<string[]>([]);
  const [numberOfWorkers, setNumberOfWorkers] = useState<string[]>([]);
  const [selectedWorkerIndex, setSelectedWorkerIndex] = useState<number>(-1); // Initialize with -1
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false); // To control the visibility of the DateTime picker
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false); // To control the visibility of the end time picker
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [personNameFields, setPersonNameFields] = useState<string[][]>([]);
  const [startTimeFields, setStartTimeFields] = useState<string[][]>([]);
  const [endTimeFields, setEndTimeFields] = useState<string[][]>([]);
  const [manpowerData, setManpowerData] = useState([]);
  const [manpowerid, setManpowerId] = useState<number>();

  useEffect(() => {
    getdata();
  }, []);


  const data = [
    { value: 'mac', label: 'MAC' },
    { value: 'sub_con', label: 'Sub Con' },
    { value: 'other', label: 'Other' },
  ];

  const handleNumWorkersChange = (text: string, index: number) => {
    // Parse the text to an integer
    const numWorkersValue = parseInt(text, 10);

    // Create a copy of the manpowerData state
    const updatedManpowerData = [...manpowerData];

    // Update the number_of_worker property for the selected worker
    updatedManpowerData[index].no_of_worker = text;

    // Check if the input is empty (blank)
    if (text === '') {
      // If the input is empty, remove all worker details
      updatedManpowerData[index].all_worker_details = [];
    } else {
      // Remove extra sections if the number of workers has decreased
      if (numWorkersValue < updatedManpowerData[index].all_worker_details.length) {
        updatedManpowerData[index].all_worker_details.splice(numWorkersValue);
      } else {
        // Add new sections if the number of workers has increased
        for (let i = updatedManpowerData[index].all_worker_details.length; i < numWorkersValue; i++) {
          // Initialize each new section's details with current date and time
          const currentDate = new Date();
          const formattedCurrentTime = formatTime(currentDate);
          updatedManpowerData[index].all_worker_details.push({
            name_of_person: '',
            start_time: formattedCurrentTime, // Set to current time
            end_time: formattedCurrentTime, // Set to current time
          });
        }
      }
    }

    // Update the state with the modified manpowerData
    setManpowerData(updatedManpowerData);

    // Update the state with the modified numWorkersArray
    setNumWorkersArray((prevNumWorkersArray) => {
      const updatedNumWorkersArray = [...prevNumWorkersArray];
      updatedNumWorkersArray[index] = numWorkersValue;
      return updatedNumWorkersArray;
    });
  };





  const [startTimes, setStartTimes] = useState<string[][][]>([]);

  const [endTimes, setEndTimes] = useState<string[][][]>([]);

  const handleAddSection = () => {
    const newWorker: Worker = {
      workerType: '',
      name: '',
      numWorkers: '',
      showTextBox: false,
      startTime: '', // Initialize as empty string
      endTime: '',   // Initialize as empty string
      all_worker_details: [], // Initialize all_worker_details as an empty array
    };

    // Initialize start time and end time if available from API data
    const apiManpower = manpowerData[selectedWorkerIndex];
    if (apiManpower) {
      newWorker.startTime = apiManpower.start_time || ''; // Use API start time if available
      newWorker.endTime = apiManpower.end_time || '';     // Use API end time if available
    }

    // Add the new worker section to the manpowerData state
    setManpowerData([...manpowerData, newWorker]);

    // Initialize related arrays with default values
    setTypeOfWorkers([...typeOfWorkers, '']);
    setTypesOfWorkersName([...typesOfWorkersName, '']);
    setNumberOfWorkers([...numberOfWorkers, '']);
    setPersonNameFields([...personNameFields, []]);
    setStartTimeFields([...startTimeFields, []]);
    setEndTimeFields([...endTimeFields, []]);

    // Initialize startTimes and endTimes arrays
    const currentDate = new Date();
    const formattedCurrentTime = formatTime(currentDate).toString(); // Ensure it's a string
    setStartTimes((prevStartTimes) => [
      ...prevStartTimes,
      [newWorker.startTime || formattedCurrentTime], // Use API start time if available, otherwise current time
    ] as string[][][]);
    setEndTimes((prevEndTimes) => [
      ...prevEndTimes,
      [newWorker.endTime || formattedCurrentTime], // Use API end time if available, otherwise current time
    ] as string[][][]);
  };



  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);

  const handleStartTimeConfirm = (date: Date) => {
    const formattedTime = formatTime(date);
    if (selectedWorkerIndex !== -1) {
      const updatedStartTimes = [...startTimes];

      if (!updatedStartTimes[selectedWorkerIndex]) {
        updatedStartTimes[selectedWorkerIndex] = [];
      }

      updatedStartTimes[selectedWorkerIndex][selectedSectionIndex] = formattedTime;

      setStartTimes(updatedStartTimes);
    }
    setStartTimePickerVisible(false);
  };

  const handleEndTimeConfirm = (date: Date) => {
    const formattedTime = formatTime(date);
    if (selectedWorkerIndex !== -1) {
      const updatedEndTimes = [...endTimes];
      updatedEndTimes[selectedWorkerIndex] = updatedEndTimes[selectedWorkerIndex] || [];
      updatedEndTimes[selectedWorkerIndex][selectedSectionIndex] = formattedTime;
      console.log("updatedEndTimes", updatedEndTimes);

      setEndTimes(updatedEndTimes);

      // Do not update the selectedEndTime state
    }
    setEndTimePickerVisible(false);
  };

  const handleStartTimeChange = (workerIndex: number, sectionIndex: number) => {
    setSelectedWorkerIndex(workerIndex);
    setSelectedSectionIndex(sectionIndex);

    // Reset the selected start time for the current worker
    setSelectedStartTime(String(startTimes[workerIndex] ? startTimes[workerIndex][sectionIndex] || '' : ''));

    setStartTimePickerVisible(true);
  };

  const handleEndTimeChange = (workerIndex: number, sectionIndex: number) => {
    setSelectedWorkerIndex(workerIndex);
    setSelectedSectionIndex(sectionIndex);

    // Reset the selected end time for the current worker
    setSelectedEndTime(String(endTimes[workerIndex] ? endTimes[workerIndex][sectionIndex] || '' : ''));

    setEndTimePickerVisible(true);
  };


  const getdata = async () => {

    const raw = {
      project_id: projectId,
      date: date
    }
    console.log("Purba", raw)
    try {
      setLoader(true);
      const api: any = await postMethod(`edit_man_power_report`, raw);
      if (api.status === 200) {
        const initialNumWorkersArray = api.data.data?.map((manpower) => parseInt(manpower.no_of_worker, 10));
        const initialManpowerData = api.data.data.map((manpower) => ({
          ...manpower,
          all_worker_details: manpower.all_worker_details || [], // Ensure this property exists
        }));
        console.log("........api.data.man_power_report_id", api.data.man_power_report_id)
        setNumWorkersArray(initialNumWorkersArray);
        setManpowerData(initialManpowerData);
        setManpowerId(api.data.man_power_report_id)
        setLoader(false);
      } else {
        setLoader(false);
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

  // Inside your ManpowerReportScreen component

  const prepareDataForAPI = () => {
    const formattedData = {
      project_id: projectId,
      task_id: taskId,
      man_power_report_id: manpowerid,
      types_of_worker: [],
      types_of_worker_name: [],
      no_of_worker: [],
      end_time: [],
      name_of_person: [],
      start_time: [],
      date: date,
    };

    manpowerData.forEach((manpower, manpowerIndex) => {
      formattedData.types_of_worker.push(manpower.types_of_worker || '');
      formattedData.types_of_worker_name.push(manpower.types_of_worker_name || '');
      formattedData.no_of_worker.push(manpower.no_of_worker || '');

      // Use the times from state if they exist, otherwise use times from API data
      const startTimeArray = startTimes[manpowerIndex] || manpower.all_worker_details.map((wd) => wd.start_time);
      const endTimeArray = endTimes[manpowerIndex] || manpower.all_worker_details.map((wd) => wd.end_time);

      // Flatten the start_time and end_time arrays
      if (startTimeArray.length === endTimeArray.length) {
        for (let i = 0; i < startTimeArray.length; i++) {
          formattedData.start_time.push(startTimeArray[i] || '');
          formattedData.end_time.push(endTimeArray[i] || '');
        }
      }

      // Flatten the name_of_person array
      manpower.all_worker_details.forEach((workerDetail) => {
        formattedData.name_of_person.push(workerDetail.name_of_person || '');
      });
    });

    return formattedData;
  };





  const AddReport = async () => {
    try {
      // Validate fields
      for (const manpower of manpowerData) {
        if (!manpower.types_of_worker) {
          Snackbar.show({
            text: 'Please select Worker Type for all workers',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
          return; // Stop submission if Worker Type is missing
        }

        if (manpower.types_of_worker === 'other' && !manpower.types_of_worker_name) {
          Snackbar.show({
            text: 'Please enter Name for workers with "Other" Worker Type',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
          return; // Stop submission if Name is missing for "Other" Worker Type
        }

        if (!manpower.no_of_worker) {
          Snackbar.show({
            text: 'Please enter Number of Workers for all workers',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
          return; // Stop submission if Number of Workers is missing
        }

        for (const workerDetail of manpower.all_worker_details) {
          if (!workerDetail.name_of_person) {
            Snackbar.show({
              text: 'Please enter Name of Person for all workers',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'red',
            });
            return; // Stop submission if Name of Person is missing
          }

        }
      }
      setLoading(true);
      const formattedData = prepareDataForAPI();
      console.log("formattedData", formattedData)
      const api: any = await postMethod(`update_man_power_report`, formattedData);
      if (api.data.status === true) {
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.dispatch(
          CommonActions.navigate({
            name: 'TopTabNavigation',
            params: {
              id: projectId
            },
          })
        )
      } else {
        setLoading(false);
        Snackbar.show({
          text: api.data,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
        });
      }
    } catch (e) {
      Snackbar.show({
        text: "Some Error Occurred" + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };



  return (
    <>
      <Appbar title={'Edit Manpower Report'} />
      {loader ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <Text style={styles.Manpower}>Manpower Reports</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
              <Text style={styles.date}>Worker Type </Text>
              <Pressable onPress={handleAddSection}>
                <Text style={styles.plus}>+</Text>
              </Pressable>
            </View>
            {manpowerData.map((manpower, index) => (
              <>
                <View key={index} style={styles.card}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{ color: Colors.text_primary }}
                    selectedTextStyle={{ color: Colors.text_primary }}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    value={manpower.types_of_worker}
                    onChange={(selectedValue) => {
                      const updatedManpowerData = [...manpowerData];
                      updatedManpowerData[index].types_of_worker = selectedValue.value;
                      setManpowerData(updatedManpowerData);
                    }}
                  />
                </View>
                {manpower.types_of_worker === 'other' && (
                  <>
                    <Text style={styles.date}>Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => {
                        const updatedManpowerData = [...manpowerData];
                        updatedManpowerData[index].types_of_worker_name = text;
                        setManpowerData(updatedManpowerData);
                      }}
                      value={manpower.types_of_worker_name || ''}
                      placeholder=""
                    />
                  </>
                )}
                <Text style={styles.date}>Number of Worker</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => handleNumWorkersChange(text, index)}
                  value={numWorkersArray[index] ? numWorkersArray[index].toString() : ''}
                  placeholder=""
                  keyboardType="numeric"
                />
                {manpower.all_worker_details.map((workerDetail, sectionIndex) => (
                  <View key={sectionIndex} style={styles.align}>
                    <Text style={styles.date}>{`Name of Person ${sectionIndex + 1}`}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => {
                        const updatedManpowerData = [...manpowerData];
                        updatedManpowerData[index].all_worker_details[sectionIndex].name_of_person = text;
                        setManpowerData(updatedManpowerData);
                      }}
                      value={workerDetail.name_of_person || ''}
                      placeholder=""
                    />
                    <Text style={styles.date}>Start Time {sectionIndex + 1}</Text>
                    <View style={styles.input}>
                      <Text style={styles.date}>

                        {startTimes[index] && startTimes[index][sectionIndex]
                          ? startTimes[index][sectionIndex]
                          : workerDetail.start_time}
                      </Text>
                      <Feather
                        name="clock"
                        size={22}
                        color={'#000'}
                        style={{ position: 'absolute', right: 20, top: 12, }}
                        onPress={() => handleStartTimeChange(index, sectionIndex)} />
                    </View>
                    <Text style={styles.date}>End Time {sectionIndex + 1}</Text>
                    <View style={styles.input}>
                      <Text style={styles.date}>
                        {endTimes[index] && endTimes[index][sectionIndex]
                          ? endTimes[index][sectionIndex]
                          : workerDetail.end_time}
                      </Text>
                      <Feather
                        name="clock"
                        size={22}
                        color={'#000'}
                        style={{ position: 'absolute', right: 20, top: 12 }}
                        onPress={() => handleEndTimeChange(index, sectionIndex)}
                      />
                    </View>
                  </View>


                ))
                }

              </>

            ))}

            <View style={{ marginBottom: 40 }}></View>
            <Pressable style={styles.btn} onPress={AddReport}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (

                <Text style={styles.btnText}>
                  Submit
                </Text>
              )}
            </Pressable>
            <DateTimePickerModal
              isVisible={startTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={() => setStartTimePickerVisible(false)}
            />
            <DateTimePickerModal
              isVisible={endTimePickerVisible} // Use separate state for end time picker
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={() => setEndTimePickerVisible(false)} // Use separate state for end time picker
            />
          </ScrollView >
        </>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.brand_primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: 200,
    alignSelf: 'center',
    marginVertical: 40
  },
  plus: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 26,
  },
  inputTime: {
    height: 45,
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: Colors.screen_bg,
    padding: 24,
  },
  align: {
    backgroundColor: Colors.white,
    padding: 10,
    marginVertical: 20,

  },
  iconStyle: {
    width: 30,
    height: 30,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  card: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.lightGray,
    marginBottom: 10
  },
  dropdown: {
    paddingHorizontal: 8,
  },
  input: {
    height: 45,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
  },
  date: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 16,

  },
  Manpower: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 18,

  }
});

export default ManpowerReportScreen;