import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Image } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormPostMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../utils/appContext';

const DailyReportScreen = ({ route, navigation }: any) => {
    const { user, setUser } = useContext(AuthContext);
    //   console.log(user.user_details.full_name,"aaaaaaaa")
    const fullname = user.user_details.full_name
    const { taskId, project_id } = route.params;
    const [open, setOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [startOpen, setStartOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    // const [drop, setDrop] = useState(moment().toDate());
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [vehicle, setvehicle] = useState('');
    const [noWorker, setNoWorker] = useState('');
    const [workReport, setWorkReport] = useState('');
    const [date, setDate] = useState(new Date())
    const [Endtime, setEndTime] = useState(new Date());
    const [Starttime, setStartTime] = useState(new Date());
    const starttime = new Date(Starttime);
    const endtime = new Date(Endtime);
    const hours = endtime.getHours();
    const minutes = endtime.getMinutes();
    const hourss = starttime.getHours();
    const minutess = starttime.getMinutes();



    const endtimeString = `${hours}:${minutes}`;
    const starttimeString = `${hourss}:${minutess}`;
    // console.log("endtimeString", endtimeString)
    const timestamp = date;
    const formattedDate = moment(timestamp).format('YYYY-MM-DD');

    const data = [
        { label: 'mac' },
        { label: 'sub_con' },
        { label: 'other' },
    ];



    const DailyUpload = async () => {
        const formData = new FormData();
        formData.append('user_id', user.user_details.id);
        formData.append('project_id', project_id);
        formData.append('date', formattedDate);
        formData.append('description', workReport);
        formData.append('vehicle', vehicle);
        formData.append('types_of_worker', value);
        formData.append('types_of_worker_name', fullname);
        formData.append('start', starttimeString);
        formData.append('end', endtimeString);
        formData.append('no_of_worker', noWorker);

        try {
            const api: any = await FormPostMethod(`add_man_power`, formData);
            if (api.status === 200) {
                // console.log("photo", api.data);
                navigation.navigate('ViewDailyReportScreen', {
                    project_id: project_id
                })

            } else {
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


    // const renderItem = (item:any) => {
    //     return (
    //         <View >
    //             <Text style={styles.textItem}>{item.label}</Text>
    //         </View>
    //     );
    // };
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'black' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };



    return (
        <SafeAreaView style={styles.container}>
            <Appbar title={'Daily Report'} />
            <ScrollView style={styles.cover}>
                <Text style={styles.inputText}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={fullname}
                //onChangeText={onChangeNumber}
                //value={number}
                />
                <Text style={styles.inputText}>Date</Text>
                <View style={styles.dateCard}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image
                            style={styles.tinyLogo}
                            source={require('../../style/Img.calender.png')}
                        /> */}
                        <Text style={styles.date}>{formattedDate}</Text>
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
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <Text style={styles.inputText}>Manpower Description</Text>
                <TextInput
                    style={styles.inputDes}
                    onChangeText={setWorkReport}
                    value={workReport}
                //onChangeText={onChangeNumber}
                //value={number}
                />
                <Text style={styles.inputText}>Vehicle</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setvehicle}
                    value={vehicle}
                //onChangeText={onChangeNumber}
                //value={number}

                />
                <Text style={styles.inputText}>Types of worker</Text>
                <View style={styles.card}>
                    {renderLabel()}
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
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                </View>
                <Text style={styles.inputText}>No of worker</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNoWorker}
                    value={noWorker}
                    //onChangeText={onChangeNumber}
                    //value={number}
                    keyboardType="numeric"
                />
                <Text style={styles.inputText}>Start Time</Text>
                <View style={styles.dateCard}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image
                            style={styles.tinyLogo}
                            source={require('../../style/Img.calender.png')}
                        /> */}
                        <Text style={styles.date}>{starttimeString}</Text>
                    </View>
                    <Feather
                        name="chevron-down"
                        size={18}
                        color={'#000'}
                        style={{ position: 'absolute', right: 20, top: 12, }}
                        onPress={() => setStartOpen(true)}
                    />
                    <DatePicker
                        modal
                        mode="time"
                        is24hourSource="device"
                        open={startOpen}
                        date={Starttime}
                        onConfirm={(time2) => {
                            setStartOpen(false);
                            setStartTime(time2);
                        }}
                        onCancel={() => {
                            setEndOpen(false);
                        }}
                    />
                </View>
                <Text style={styles.inputText}>End Time</Text>
                <View style={styles.dateCard}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image
                            style={styles.tinyLogo}
                            source={require('../../style/Img.calender.png')}
                        /> */}
                        <Text style={styles.date}>{endtimeString}</Text>
                    </View>
                    <Feather
                        name="chevron-down"
                        size={18}
                        color={'#000'}
                        style={{ position: 'absolute', right: 20, top: 12, }}
                        onPress={() => setEndOpen(true)}
                    />
                    <DatePicker
                        modal
                        mode="time"
                        is24hourSource="device"
                        open={endOpen}
                        date={Endtime}
                        onConfirm={(time) => {
                            setEndOpen(false);
                            setEndTime(time);
                        }}
                        onCancel={() => {
                            setEndOpen(false);
                        }}
                    />
                </View>
                <View style={styles.align}>
                    <Pressable style={styles.uploadButton} onPress={() => DailyUpload()}>
                        <Text style={styles.text}>Save</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default DailyReportScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskGroup: {
        color: Colors.text_primary,
        fontFamily: 'Roboto-Medium',
    },
    cover: {
        padding: 10,
        backgroundColor: Colors.screen_bg,
    },
    align: {
        alignItems: 'center'
    },
    inputDes: {
        // height: 30,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8
    },
    input: {
        height: 30,
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
        width: 120,
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
        fontSize: 14
    },
    date: {
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'LexendDeca-Medium',
        color: '#24252C'
    },
    tinyLogo: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    dateCard: {
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 20,
        backgroundColor: '#ffffff',
        padding: 12,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    card: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 10
    },
    textItem: {
        fontSize: 16,
        fontFamily: 'LexendDeca-SemiBold',
        padding: 10,
        paddingLeft: 60,
        color: '#24252C'

    },
    taskIcon: {
        borderWidth: 1,
        borderColor: '#f5d6f1',
        backgroundColor: '#f5d6f1',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginRight: 20,
        marginHorizontal: 10,
        marginBottom: 5,
    },
    dropdown: {
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color:'black'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black'
      },
      iconStyle: {
        width: 20,
        height: 20,
        color:'#000',
      },
    });
