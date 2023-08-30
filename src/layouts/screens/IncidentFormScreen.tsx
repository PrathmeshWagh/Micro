import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';

interface Props { }
const IncidentFormScreen: FC<Props> = (): JSX.Element => {
    const [endOpen, setEndOpen] = useState(false);
    const [Endtime, setEndTime] = useState(new Date());
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [showTextBox, setShowTextBox] = useState(false);
    const [date, setDate] = useState(new Date())
    const [Starttime, setStartTime] = useState(new Date());
    const [startOpen, setStartOpen] = useState(false);
    const timestamp = date;
    const starttime = new Date(Starttime);
    const hourss = starttime.getHours();
    const minutess = starttime.getMinutes();
    const formattedDate = moment(timestamp).format('DD-MM-YYYY');
    const starttimeString = `${hourss}:${minutess}`;
    const data = [
        { value: 'mac', label: 'MAC' },
        { value: 'sub_con', label: 'Sub Con' },
        { value: 'other', label: 'Other' },
    ];
    const handleDropdownChange = (value: any) => {
        // console.log("value",value)
        setValue(value.value);
        if (value.value === 'mac') {
            setShowTextBox(false);
        } else {
            setShowTextBox(true);
        }
    };
    return (
        <>
            <Appbar title={'Incident Report'} />
            <ScrollView style={styles.container}>
                <View style={styles.part}>
                    <Text style={styles.partText}>PART A</Text>
                </View>
                <View style={{ paddingBottom: 30, backgroundColor: '#F2EEEE', marginBottom: 10 }}>

                    <Text style={styles.text}>Report Serial Number:</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Revision</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Company / Department Reporting</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Name Of Person Reporting</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Designation of Person Reporting:</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>NRIC of Person Reporting:</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>NRIC of Person Reporting:</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />

                    <Text style={styles.text}>Date</Text>
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
                    <Text style={styles.text}>Start Time</Text>
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
                </View>
                <View style={styles.part}>
                    <Text style={styles.partText}>PART B</Text>
                </View>
                <View style={{ paddingBottom: 30, backgroundColor: '#F2EEEE' }}>
                    <Text style={styles.text}>Category Of Event</Text>
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
                    <Text style={styles.text}>Injury To Person(s)</Text>
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
                    <Text style={styles.text}>Injury To Person(s)</Text>
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
                    <Text style={styles.info}>Please Provide Info As Follows</Text>
                    <Text style={styles.text}>Full Name Of Injured Person</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Designation Of Injured Person</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Nature Of Injury</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Injured Person Sent To</Text>
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
                    <Text style={styles.text}>Description Of Property Damage (if any)</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                </View>
                <View style={styles.part}>
                    <Text style={styles.partText}>PART C</Text>
                </View>
                <View style={{ paddingBottom: 30, backgroundColor: '#F2EEEE' }}>

                    <Text style={styles.text}>Project</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Job Number</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Name Of Coordinator</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Full Workplace Address</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />
                    <Text style={styles.text}>Location (Floor / Zone / Unit)</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""

                    />

                    <Text style={styles.text}>Date Of Acc /INC/DO</Text>
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
                    <Text style={styles.text}>Time Of Acc /INC/DO</Text>
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
                </View>

                <View style={styles.part}>
                    <Text style={styles.partText}>PART C</Text>
                </View>

                <View style={{ paddingBottom: 30, backgroundColor: '#F2EEEE' }}>
                    <Text style={styles.text}>Details Of Accident /Incident /Dangerous Occurrence</Text>
                    <Text style={styles.info}>(To Include What Happened, Circumstances, Surrounding Incident, Immediate Action Taken, Status Of Injury / Property Damage Control Measure Undertaken After) (Include Sketch/Drawing If Any)
                    </Text>
                    <TextInput
                        style={styles.inputField}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder=""
                        multiline={true}
                    />
                    <Text style={styles.text}>Photo Upload</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={styles.text}>Signature</Text>
                            <TextInput
                                style={styles.SignatureInput}
                                // onChangeText={onChangeNumber}
                                // value={number}
                                placeholder=""

                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Date</Text>
                            <TextInput
                                style={styles.DateInput}
                                // onChangeText={onChangeNumber}
                                // value={number}
                                placeholder=""

                            />
                        </View>

                    </View>
                </View>
                <Pressable style={styles.button}>
                    <Text style={styles.submit}>Submit</Text>
                </Pressable>

            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        backgroundColor: Colors.screen_bg,
    },
    SignatureInput: {
        height: 50,
        width: 180,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8
    },
    DateInput: {
        height: 50,
        width: 150,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8
    },
    button: {
        backgroundColor: Colors.brand_primary,
        marginBottom: 60,
        width: 120,
        alignItems: 'center',
        padding: 15,
        alignSelf: 'center',
        borderRadius: 8
    },
    submit: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
    },
    info: {
        color: Colors.text_secondary,
        marginLeft: 10,
        marginTop: 5

    },
    iconStyle: {
        width: 20,
        height: 20,
        color: '#000',
    },
    card: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 10
    },
    dropdown: {
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    date: {
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'LexendDeca-Medium',
        color: '#24252C'
    },
    dateCard: {
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 10,
        backgroundColor: '#ffffff',
        padding: 12,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    part: {
        borderColor: Colors.lightGray,
        borderWidth: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: Colors.lightGray,
    },
    partText: {
        color: Colors.black,
        fontFamily: 'Roboto-Regular',
    },
    input: {
        height: 50,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8
    },
    inputField: {
        height: 150,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8
    },

    text: {
        marginTop: 10,
        fontFamily: 'Roboto-Medium',
        marginLeft: 10
    }
});

export default IncidentFormScreen;