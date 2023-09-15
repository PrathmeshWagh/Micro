import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import Colors from '../../style/Colors/colors';
import Appbar from '../../components/Appbar';
import { Dropdown } from 'react-native-element-dropdown';
import { postMethod } from '../../utils/helper';
import { stat } from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';

interface ServerRequestPropTypes {
    date: string[],
    end_time: string[],
    name_of_person: string[],
    no_of_worker: string,
    project_id: number,
    start_time: string[],
    task_id: number[],
    type_of_worker: string,
    types_of_worker_name: string

}
const ManpowerReportScreen: FC = ({ route }: any): JSX.Element => {
    const [value, setValue] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [numWorkers, setNumWorkers] = useState<string>("0");
    const [workerSections, setWorkerSections] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string[]>([]);
    const [endTime, setEndTime] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [personName, setPersonName] = useState<string[]>([]);
    const [Starttime, setStartingTime] = useState<string[]>([]);
    const [endOpen, setEndOpen] = useState(false);
    // const starttime = new Date(Starttime);
    // const hourss = starttime.getHours();
    // const minutess = starttime.getMinutes();
    // const starttimeString = `${hourss}:${minutess}`;
    // const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    // const [startTimes, setStartTimes] = useState<string[]>([]);


    const { activity, project_id, date } = route.params;
    const data = [
        { value: 'mac', label: 'MAC' },
        { value: 'sub_con', label: 'Sub Con' },
        { value: 'other', label: 'Other' },
    ];

    const handleDropdownChange = (selectedValue: { value: React.SetStateAction<string>; }) => {
        setValue(selectedValue.value);
        if (selectedValue.value === 'other') {
            setShowTextBox(true);
        } else {
            setShowTextBox(false);
        }
    };
    const handleNumWorkersChange = (text: string) => {
        console.log("test", text)
        const num = parseInt(text, 10);
        if (!isNaN(num)) {
            const newSections = Array.from({ length: num }, (_, id) => ({ id: id + 1 }));
            setWorkerSections(newSections);
            setNumWorkers(text)
        } else {
            // If the input is not a valid number, reset the sections.
            setWorkerSections([]);
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        // getdata();
        setRefreshing(false);
    };




    const AddReport = async (props: any) => {
        const taskStatusValues = Object.values(personName);

        const raw: ServerRequestPropTypes = {
            project_id: project_id,
            task_id: activity.daily_activity,
            name_of_person: taskStatusValues,
            start_time: startTime,
            end_time: endTime,
            type_of_worker: value,
            types_of_worker_name: name,
            no_of_worker: numWorkers,
            date: date

        }
        console.log("raw", raw)
        try {
            setLoading(true);
            const api: any = await postMethod(`add_manpower_report`, raw);
            if (api.data.status === true) {
                console.log('data', api.data)
                setLoading(false);
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
            <Appbar title={'Daily Activity'} />
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text style={styles.Manpower}>Manpower Reports</Text>

                <Text style={styles.date}>Worker Type +</Text>
                <View style={styles.card}>
                    {/* {renderLabel()} */}
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        value={value}
                        onChange={handleDropdownChange}
                    />
                </View>
                {showTextBox && (
                    <>
                        <Text style={styles.date}>Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder=""
                        />
                    </>
                )}
                <Text style={styles.date}>Number of Worker</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleNumWorkersChange}
                    value={workerSections}
                    placeholder=""
                    keyboardType="numeric"
                />
                {workerSections.map((section, index) => (
                    <View key={section.id} style={styles.align}>
                        <Text style={styles.date}>Name of Person {index + 1}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setPersonName({
                                    ...personName,
                                    [index]: text,
                                });
                            }}
                            value={personName[index] || ''}
                            placeholder=""
                        />
                        <Text style={styles.date}>Start Time {index + 1}</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setStartTime({
                                    ...startTime,
                                    [index]: text,
                                });
                            }}
                            value={startTime[index] || ''}
                            placeholder=""
                        />
                        <Text style={styles.date}>End Time {index + 1}</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                setEndTime({
                                    ...endTime,
                                    [index]: text,
                                });
                            }}
                            value={endTime[index] || ''}
                            placeholder=""
                        />
                    </View>
                ))}

                <View style={{ marginBottom: 40 }}></View>
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
            </ScrollView>
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