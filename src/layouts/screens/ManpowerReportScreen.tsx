import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import Colors from '../../style/Colors/colors';
import Appbar from '../../components/Appbar';
import { Dropdown } from 'react-native-element-dropdown';
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';

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
}
const ManpowerReportScreen: FC = ({ route }: any): JSX.Element => {
    const [value, setValue] = useState('');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
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

    const { activity, project_id, date } = route.params;
    const data = [
        { value: 'mac', label: 'MAC' },
        { value: 'sub_con', label: 'Sub Con' },
        { value: 'other', label: 'Other' },
    ];


    const handleNumWorkersChange = (text: string, index: number) => {
        console.log('Number of Workers:', text);

        // Create a copy of the numWorkersArray state
        const updatedNumWorkersArray = [...numWorkersArray];

        // Update the value at the specified index
        updatedNumWorkersArray[index] = parseInt(text, 10); // Parse the text to an integer

        // Update the state with the modified array
        setNumWorkersArray(updatedNumWorkersArray);
    };
    const [startTimes, setStartTimes] = useState<string[][][]>([]);

    const [endTimes, setEndTimes] = useState<string[][][]>([]);

    const [workers, setWorkers] = useState<Worker[]>([]);
    const handleAddSection = () => {
        const newWorker: Worker = {
            workerType: '',
            name: '',
            numWorkers: '',
            showTextBox: false,
            startTime: '',
            endTime: '',
        };
        setWorkers([...workers, newWorker]);

        // Initialize the numWorkersArray with zeros for this new worker
        setTypeOfWorkers([...typeOfWorkers, '']);
        setTypesOfWorkersName([...typesOfWorkersName, '']);
        setNumberOfWorkers([...numberOfWorkers, '']);
        setPersonNameFields([...personNameFields, []]);
        setStartTimeFields([...startTimeFields, []]);
        setEndTimeFields([...endTimeFields, []]);
    };

    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);

    const handleStartTimeConfirm = (date: Date) => {
        const formattedTime = formatTime(date);
        if (selectedWorkerIndex !== -1) {
            const updatedStartTimes = [...startTimes];
            updatedStartTimes[selectedWorkerIndex] = updatedStartTimes[selectedWorkerIndex] || [];
            updatedStartTimes[selectedWorkerIndex][selectedSectionIndex] = formattedTime;
            console.log("updatedStartTimes", updatedStartTimes)

            setStartTimes(updatedStartTimes);

            // Do not update the selectedStartTime state
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
        setSelectedStartTime(startTimes[workerIndex] ? startTimes[workerIndex][sectionIndex] || '' : '');

        setStartTimePickerVisible(true);
    };
    const handleEndTimeChange = (workerIndex: number, sectionIndex: number) => {
        setSelectedWorkerIndex(workerIndex);
        setSelectedSectionIndex(sectionIndex);

        // Reset the selected end time for the current worker
        setSelectedEndTime(endTimes[workerIndex] ? endTimes[workerIndex][sectionIndex] || '' : '');

        setEndTimePickerVisible(true);
    };

    const AddReport = async () => {
        const raw = {
            project_id: project_id,
            task_id: activity.daily_activity,
            types_of_worker: workers.map(worker => worker.workerType),
            types_of_worker_name: workers.map(worker => (worker.showTextBox ? worker.name : '')),
            no_of_worker: workers.map(worker => worker.numWorkers),
            end_time: endTimes.flat(),
            name_of_person: personNameFields.flat(),
            start_time: startTimes.flat(),
            date: date
        };
        console.log("raw", raw)
        try {
            setLoading(true);
            const api: any = await postMethod(`add_manpower_report`, raw);
            if (api.data.status === true) {
                console.log('data', api.data)
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
                            id: project_id
                        },
                    })
                )
            } else {
                setLoading(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
            }
        }
        catch (e) {
            Snackbar.show({
                text: "Some Error Occured" + e,
                duration: Snackbar.LENGTH_SHORT,
                textColor: 'white',
                backgroundColor: 'red',
            });
        }
    }

    return (
        <>
            <Appbar title={'Manpower Report'} />
            <ScrollView style={styles.container}>
                <Text style={styles.Manpower}>Manpower Reports</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                    <Text style={styles.date}>Worker Type </Text>
                    <Pressable onPress={handleAddSection}>
                        <Text style={styles.plus}>+</Text>
                    </Pressable>
                </View>
                {workers.map((worker, index) => (
                    <>
                        <View key={index} style={styles.card}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                value={worker.workerType}
                                onChange={(selectedValue) => {
                                    console.log('Selected Value:', selectedValue);
                                    const updatedWorkers = [...workers];
                                    updatedWorkers[index].workerType = selectedValue.value;
                                    updatedWorkers[index].showTextBox = selectedValue.value === 'other';
                                    setWorkers(updatedWorkers);
                                    setValue(selectedValue.value);
                                }}
                            />
                        </View>
                        {worker.showTextBox && (
                            <>
                                <Text style={styles.date}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        const updatedWorkers = [...workers];
                                        updatedWorkers[index].name = text;
                                        setWorkers(updatedWorkers);
                                    }}
                                    value={worker.name}
                                    placeholder=""
                                />
                            </>
                        )}
                        <Text style={styles.date}>Number of Worker</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                // Update the number of workers for this worker
                                const updatedWorkers = [...workers];
                                updatedWorkers[index].numWorkers = text;
                                setWorkers(updatedWorkers);
                                handleNumWorkersChange(text, index);

                                // Handle any other logic you need to perform when the input changes
                            }}
                            value={worker.numWorkers}
                            placeholder=""
                            keyboardType="numeric"
                        />

                        {
                            Array.from({ length: parseInt(worker.numWorkers) }, (_, sectionIndex) => (
                                < View key={index * 1000 + sectionIndex} style={styles.align}>
                                    <Text style={styles.date}>Name of Person {sectionIndex + 1}</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            const updatedPersonNameFields = [...personNameFields];
                                            updatedPersonNameFields[index] = updatedPersonNameFields[index] || [];
                                            updatedPersonNameFields[index][sectionIndex] = text;
                                            setPersonNameFields(updatedPersonNameFields);
                                        }}
                                        value={personNameFields[index] ? personNameFields[index][sectionIndex] || '' : ''}
                                        placeholder=""
                                    />
                                    <Text style={styles.date}>Start Time {sectionIndex + 1}</Text>
                                    <View style={styles.input}>
                                        <Text style={styles.date}>
                                            {startTimes[index] && startTimes[index][sectionIndex] ? startTimes[index][sectionIndex] : ''}
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
                                        {endTimes[index] && endTimes[index][sectionIndex] ? endTimes[index][sectionIndex] : ''}
                                            </Text>
                                        <Feather
                                            name="clock"
                                            size={22}
                                            color={'#000'}
                                            style={{ position: 'absolute', right: 20, top: 12 }}
                                            onPress={() => handleEndTimeChange(index,sectionIndex)}
                                        />
                                    </View>
                                </View >


                            ))
                        }

                    </>

                ))}

                {/* <View style={{ marginBottom: 40 }}></View> */}
                <Pressable style={styles.btn} onPress={AddReport}>
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