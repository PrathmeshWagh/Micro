import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import Colors from '../../style/Colors/colors';
import Appbar from '../../components/Appbar';
import { Dropdown } from 'react-native-element-dropdown';
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';


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

interface Worker {
    workerType: string;
    name: string;
    numWorkers: string;
    showTextBox: boolean;
}
const ManpowerReportScreen: FC = ({ route }: any): JSX.Element => {
    const [value, setValue] = useState('');
    const [showTextBox, setShowTextBox] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string[]>([]);
    const [endTime, setEndTime] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [personName, setPersonName] = useState<string[]>([]);
    const [numWorkersArray, setNumWorkersArray] = useState<number[]>([]);

    const [typeOfWorkers, setTypeOfWorkers] = useState<string[]>([]);
    const [typesOfWorkersName, setTypesOfWorkersName] = useState<string[]>([]);
    const [numberOfWorkers, setNumberOfWorkers] = useState<string[]>([]);

    const [formData, setFormData] = useState(new FormData());

    const { activity, project_id, date } = route.params;
    const data = [
        { value: 'mac', label: 'MAC' },
        { value: 'sub_con', label: 'Sub Con' },
        { value: 'other', label: 'Other' },
    ];



    const onRefresh = () => {
        setRefreshing(true);
        // getdata();
        setRefreshing(false);
    };


    const handleNumWorkersChange = (text: string, index: number) => {
        console.log('Number of Workers:', text);

        // Create a copy of the numWorkersArray state
        const updatedNumWorkersArray = [...numWorkersArray];

        // Update the value at the specified index
        updatedNumWorkersArray[index] = parseInt(text, 10); // Parse the text to an integer

        // Update the state with the modified array
        setNumWorkersArray(updatedNumWorkersArray);
    };



    const [workers, setWorkers] = useState<Worker[]>([]);
    const handleAddSection = () => {
        const newWorker: Worker = {
            workerType: '',
            name: '',
            numWorkers: '',
            showTextBox: false
        };
        setWorkers([...workers, newWorker]);

        // Initialize the numWorkersArray with zeros for this new worker
        setTypeOfWorkers([...typeOfWorkers, '']);
        setTypesOfWorkersName([...typesOfWorkersName, '']);
        setNumberOfWorkers([...numberOfWorkers, '']);
        setPersonName([...personName, []]);
        setStartTime([...startTime, []]);
        setEndTime([...endTime, []]);
    };




    const AddReport = () => {

        const typeOfWorkersArray: string[] = [];
        const typesOfWorkersNameArray: string[] = [];
        const numberOfWorkersArray: string[] = [];
        const personNameArray: string[] = [];
        const startTimeArray: string[] = [];
        const endTimeArray: string[] = [];
        // Loop through the workers and populate the arrays
        workers.forEach((worker, index) => {
            typeOfWorkersArray.push(worker.workerType);
            numberOfWorkersArray.push(worker.numWorkers);

            // Check if a name is provided for this worker and push it
            if (worker.showTextBox) {
                typesOfWorkersNameArray.push(worker.name);
            } else {
                typesOfWorkersNameArray.push(''); // Push an empty string if no name is provided
            }

            // Loop through the personName, startTime, and endTime arrays for this worker
            for (let sectionIndex = 0; sectionIndex < parseInt(worker.numWorkers); sectionIndex++) {
                personNameArray.push(personName[index * numWorkersArray.length + sectionIndex] || '');
                startTimeArray.push(startTime[index * numWorkersArray.length + sectionIndex] || '');
                endTimeArray.push(endTime[index * numWorkersArray.length + sectionIndex] || '');
            }
        });
        const formData = new FormData();
        formData.append('project_id', project_id);
        formData.append('type_of_worker[]', typeOfWorkersArray);
        formData.append('types_of_worker_name[]', typesOfWorkersNameArray);
        formData.append('no_of_worker[]', numberOfWorkersArray);
        const personNameString = personNameArray.join(',');

        // Append the single string to formData
        formData.append('personName[]', personNameString);

        formData.append('startTime[]', startTimeArray);
        formData.append('endTime[]', endTimeArray);

        console.log("startTimeArray", personNameString);
        console.log("startTimeArray", startTimeArray);
        console.log("endTimeArray", endTimeArray);
        console.log("type_of_worker", typeOfWorkersArray);
        console.log("types_of_worker_name", typesOfWorkersNameArray);
        console.log("types_of_worker_name", numberOfWorkersArray);

    };



    return (
        <>
            <Appbar title={'Manpower Report'} />
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
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
                                            // Update the personName state with the correct index
                                            const updatedPersonName = [...personName];
                                            updatedPersonName[index * numWorkersArray.length + sectionIndex] = text;
                                            setPersonName(updatedPersonName);
                                        }}
                                        value={personName[index * numWorkersArray.length + sectionIndex] || ''}
                                        placeholder=""
                                    />
                                    <Text style={styles.date}>Start Time {sectionIndex + 1}</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            // Update the startTime state with the correct index
                                            const updatedStartTime = [...startTime];
                                            updatedStartTime[index * numWorkersArray.length + sectionIndex] = text;
                                            setStartTime(updatedStartTime);
                                        }}
                                        value={startTime[index * numWorkersArray.length + sectionIndex] || ''}
                                        placeholder=""
                                    />
                                    <Text style={styles.date}>End Time {sectionIndex + 1}</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            // Update the endTime state with the correct index
                                            const updatedEndTime = [...endTime];
                                            updatedEndTime[index * numWorkersArray.length + sectionIndex] = text;
                                            setEndTime(updatedEndTime);
                                        }}
                                        value={endTime[index * numWorkersArray.length + sectionIndex] || ''}
                                        placeholder=""
                                    />
                                </View >


                            ))
                        }

                    </>

                ))}















                {/* <View style={{ marginBottom: 40 }}></View> */}
                {/* <Pressable style={styles.btn} onPress={AddReport}>
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
                <Pressable style={styles.btn} onPress={AddReport}>
                    <Text style={styles.btnText}>

                        Submit
                    </Text>
                </Pressable>
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