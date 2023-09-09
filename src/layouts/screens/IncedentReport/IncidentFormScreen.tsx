import React, { useState } from 'react';
import { FC } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import Appbar from '../../../components/Appbar';
import Colors from '../../../style/Colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PhotoEditor from 'react-native-photo-editor';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { Modal, Portal } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormPostMethod } from '../../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';

interface Props { }
const IncidentFormScreen: FC<Props> = ({ navigation, route }: any): JSX.Element => {
    const [imageUri, setImageUri] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [value, setValue] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    const [Starttime, setStartTime] = useState(new Date());
    const [startOpen, setStartOpen] = useState(false);
    const starttime = new Date(Starttime);
    const hourss = starttime.getHours();
    const minutess = starttime.getMinutes();
    const starttimeString = `${hourss}:${minutess}`;

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const [showSpecifyInput, setShowSpecifyInput] = useState(false);
    const [showSpecifyInput2, setShowSpecifyInput2] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date()); // Step 2: State variable for selected date
    const [openStartTime, setOpenStartTime] = useState<boolean>(false);
    const [openAccidentDate, setOpenAccidentDate] = useState<boolean>(false);
    const [openDate1, setOpenDate1] = useState<boolean>(false);
    const [date1, setDate1] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState<boolean>(false);

    const [endOpen, setEndOpen] = useState(false);
    const [Endtime, setEndTime] = useState(new Date());


    const endtime = new Date(Endtime);
    const hours = endtime.getHours();
    const minutes = endtime.getMinutes();
    const endtimeString = `${hours}:${minutes}`;

    const [isLoading, setLoading] = useState<boolean>(false);
    const timestamp = date1;
    const formattedDate = moment(timestamp).format('DD-MM-YYYY');


    const formattedTime = Starttime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const handleDropdownChange = (value: any) => {
        // console.log("value",value)
        setValue(value.value);
        if (value.value === 'mac') {
            setShowTextBox(false);
        } else {
            setShowTextBox(true);
        }
    };
    const openAlart = () => {
        Alert.alert('Please Choose a option', 'from below', [
            {
                text: 'Gallery',
                onPress: () => ImgSelectGallery(),
            },
            {
                text: 'Camera',
                onPress: () => ImgSelectCamera(),
            },
            { text: 'Cancel', onPress: () => console.log('Cancel') },
        ]);
    }

    const ImgSelectCamera = async () => {
        try {
            const img = await ImagePicker.openCamera({
                cropping: true,
            });
            // console.log('img', img);
            let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
            const moveImg = await RNFS.moveFile(img.path, photoPath)
            openPhotoEditor(photoPath);
            // console.log('photoPath', photoPath);

        } catch (e) {
            console.log(e);
        }
    };

    const ImgSelectGallery = async () => {
        try {
            const img = await ImagePicker.openPicker({
                cropping: true,
            });
            // console.log('img', img.path);
            let filename = img.path.substring(img.path.lastIndexOf('/') + 1);
            let photoPath = await RNFS.DocumentDirectoryPath + `${filename}`;
            const moveImg = await RNFS.moveFile(img.path, photoPath)
            openPhotoEditor(photoPath)
        } catch (e) {
            console.log(e);
        }
    }
    const openPhotoEditor = (img: string) => {
        PhotoEditor.Edit({
            hiddenControls: ['sticker', 'crop'],
            path: img,
            onDone: async (result) => {
                const updatedImages: string[] = [...imageUri, 'file://' + result];
                console.log("imageUri", updatedImages);
                setImageUri(updatedImages);
            },
            onCancel: () => {
                console.log('Photo editor cancelled');
            },
        });
    };
    const openZoomedImage = (imagePath: string) => {
        setSelectedImage(imagePath);
    };

    const closeZoomedImage = () => {
        setSelectedImage(null);
    };
    const handleDropdownChangeText = (value) => {
        console.log("value", value.value)
        setSelectedValue(value.value);
        setShowSpecifyInput(value.value === 'Others');
    };
    const handleDropdownChangeInjury = (injury) => {
        console.log("valueInjury", injury.value)
        setInjuryToPerson(injury.value);
    };

    const handleDropdownChangeDamage = (damage) => {
        console.log("setDamageValue", damage.value)
        setDamageValue(damage.value);
    };

    const handleDropdownChangeText2 = (value) => {
        console.log("value2", value.value)
        setSelectedValue2(value.value);
        setShowSpecifyInput2(value.value === 'Others');
    };


    const event = [
        { value: 'Accident', label: 'Accident' },
        { value: 'Incident', label: 'Incident' },
        { value: 'Dengerous Occurance', label: 'Dengerous Occurance' },
        { value: 'Others', label: 'Others' },
    ];

    const injury = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
    ];
    const damage = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
    ];
    const Injured = [
        { value: 'Hospital', label: 'Hospital' },
        { value: 'Clinic', label: 'Clinic' },
        { value: 'Nil', label: 'Nil' },
        { value: 'Others', label: 'Others' },

    ];



    const [serialNo, setSerialNo] = useState('');
    const [revision, setRevision] = useState('');
    const [company, setCompany] = useState('');
    const [personReporting, setPersonReporting] = useState('');
    const [reportingDesignation, setReportingDesignation] = useState('');
    const [NRICpersonReporting, setNRICpersonReporting] = useState('');

    const [eventValue, setEventValue] = useState('');
    const [injuredvalue, setInjuredvalue] = useState('');
    const [damageValue, setDamageValue] = useState('');
    const [injuryToPerson, setInjuryToPerson] = useState('');
    const [injuredPersonName, setInjuredPersonName] = useState('');

    // const [DesInjuredPerson, setDesInjuredPerson] = useState('');
    // const [natureInjury, setNatureInjury] = useState('');
    // const [desPropertyDamage, setDesPropertyDamage] = useState('');
    // const [project, setProject] = useState('');
    // const [jobNumber, setJobNumber] = useState('');
    // const [cordinatorNo, setCordinatorNo] = useState('');
    // const [workAddress, setWorkAddress] = useState('');
    // const [locaion, setLocation] = useState('');

    // const [accidentDetails, setAccidentDetails] = useState('');
    // const [remark, setRemark] = useState('');
    // const [signature, setSignature] = useState('');



    const IncidentReport = async () => {
        const formData = new FormData();
        // for (let i = 0; i < imageUri.length; i++) {
        //   formData.append('file[]', {
        //     uri: imageUri[i],
        //     type: 'image/jpg', // Make sure to determine the correct image type
        //     name: `image_${i}.jpg`, // Use a unique name for each image
        //   });
        // }
        formData.append('report_serial_number', serialNo)
        formData.append('revision', revision)
        formData.append('company_department_reporting', company)
        formData.append('name_or_person_reporting', personReporting);
        formData.append('designation_of_person_reporting', reportingDesignation);
        formData.append('nric_fin_wp_no_of_person_reporting', NRICpersonReporting);
        formData.append('date_of_report_submission', formattedDate);
        formData.append('time_of_report_submission', formattedTime);

        formData.append('catergory_of_event', selectedValue);
        formData.append('catergory_of_event_please_specify_below', eventValue);
        formData.append('injury_to_person', injuryToPerson);
        formData.append('damage_to_property', damageValue);


        console.log("imageUri....", formData)
        // try {
        //   setLoading(true);
        //   const api: any = await FormPostMethod(`add_variation_order`, formData);
        //   console.log(".....", api.data)
        //   if (api.status === 200) {
        //     setLoading(false);
        //     setImageUri([])
        //     Snackbar.show({
        //       text: "Details Upload Successful",
        //       duration: Snackbar.LENGTH_SHORT,
        //       textColor: 'white',
        //       backgroundColor: 'green',
        //     });
        //     navigation.dispatch(CommonActions.goBack())
        //   } else {
        //     setLoading(false);
        //     Snackbar.show({
        //       text: api.data.message,
        //       duration: Snackbar.LENGTH_SHORT,
        //       textColor: '#AE1717',
        //       backgroundColor: '#F2A6A6',
        //     });
        //   }
        // }
        // catch (e) {
        //   Snackbar.show({
        //     text: "Some Error Occured" + e,
        //     duration: Snackbar.LENGTH_SHORT,
        //     textColor: '#AE1717',
        //     backgroundColor: '#F2A6A6',
        //   });
        // }

    }


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
                        onChangeText={setSerialNo}
                        value={serialNo}
                        placeholder=""

                    />
                    <Text style={styles.text}>Revision</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRevision}
                        value={revision}
                        placeholder=""

                    />
                    <Text style={styles.text}>Company / Department Reporting</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCompany}
                        value={company}
                        placeholder=""

                    />
                    <Text style={styles.text}>Name Of Person Reporting</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPersonReporting}
                        value={personReporting}
                        placeholder=""

                    />
                    <Text style={styles.text}>Designation of Person Reporting:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setReportingDesignation}
                        value={reportingDesignation}
                        placeholder=""

                    />

                    <Text style={styles.text}>NRIC of Person Reporting:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNRICpersonReporting}
                        value={NRICpersonReporting}
                        placeholder=""

                    />

                    <Text style={styles.text}>Date of Report Submission</Text>
                    <View style={styles.dateCard}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Image
                            style={styles.tinyLogo}
                            source={require('../../style/Img.calender.png')}
                        /> */}
                            <Text style={styles.date}>{moment(date1).format('DD-MM-YYYY')}</Text>
                        </View>
                        <Feather
                            name="calendar"
                            size={22}
                            color={'#000'}
                            style={{ position: 'absolute', right: 20, top: 12, }}
                            onPress={() => setOpenDate1(true)}
                        />
                        <DatePicker
                            modal
                            open={openDate1}
                            mode="date"
                            date={date1}
                            onConfirm={(date) => {
                                setDate1(date)
                                setOpen(false)

                            }}
                            onCancel={() => {
                                setOpenDate1(false)
                            }}
                        />
                    </View>
                    <Text style={styles.text}>Time of Report Submission</Text>
                    <View style={styles.dateCard}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.date}>{starttimeString}</Text>
                        </View>
                        <Ionicons
                            name="timer-outline"
                            size={24}
                            color={'#000'}
                            style={{ position: 'absolute', right: 20, top: 12, }}
                            onPress={() => setOpenStartTime(true)}
                        />
                        <DatePicker
                            modal
                            mode="time"
                            is24hourSource="device"
                            open={openStartTime}
                            date={Starttime}
                            onConfirm={(time) => {
                                setOpenStartTime(false);
                                setStartTime(time);
                            }}
                            onCancel={() => {
                                setOpenStartTime(false);
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
                            data={event}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            value={selectedValue}
                            onChange={handleDropdownChangeText}
                        />
                    </View>
                    {showSpecifyInput && (
                        <View>
                            <Text style={styles.text}>Please Specify Below</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEventValue}
                                value={eventValue}
                                placeholder=""
                            />
                        </View>
                    )}

                    <Text style={styles.text}>Injury To Person(s)</Text>
                    <View style={styles.card}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            iconStyle={styles.iconStyle}
                            data={injury}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            value={injuryToPerson}
                            onChange={handleDropdownChangeInjury}
                        />
                    </View>
                    <Text style={styles.text}>Damage Property</Text>
                    <View style={styles.card}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            iconStyle={styles.iconStyle}
                            data={damage}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            value={damageValue}
                            onChange={handleDropdownChangeDamage}
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
                            data={Injured}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            value={selectedValue2}
                            onChange={handleDropdownChangeText2}
                        />
                    </View>
                    {showSpecifyInput2 && (
                        <View>
                            <Text style={styles.text}>Please Specify Below</Text>
                            <TextInput
                                style={styles.input}
                                value={injuredvalue}
                                onChangeText={setInjuredvalue}
                                placeholder=""
                            />
                        </View>
                    )}
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
                            <Text style={styles.date}>{moment(date).format('DD-MM-YYYY')}</Text>
                        </View>
                        <Feather
                            name="calendar"
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
                            <Text style={styles.date}>{endtimeString}</Text>
                        </View>
                        <Ionicons
                            name="timer-outline"
                            size={24}
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
                    <Text style={styles.text}>Photo Upload <IonIcon name="camera" color={Colors.text_primary} size={20} onPress={openAlart} /></Text>
                    <ScrollView horizontal>
                        {imageUri.length === 0 ? (
                            <Text style={styles.chooseFile}>Choose file</Text>
                        ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 5 }}>
                                {imageUri.map((uri, index) => (
                                    <Pressable key={imageUri} onPress={() => openZoomedImage(uri)}>

                                        <View key={index} style={{ padding: 5 }}>
                                            <Image
                                                source={{ uri: uri }}
                                                style={{ width: 150, height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                            />
                                        </View>
                                    </Pressable>
                                ))}
                            </View>

                        )}
                    </ScrollView>

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
                        <View style={styles.dateCard}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.date}>{moment(selectedDate).format('DD-MM-YYYY')}</Text>
                            </View>
                            <Feather
                                name="calendar"
                                size={22}
                                color={'#000'}
                                style={{ position: 'absolute', right: 20, top: 12 }}
                                onPress={() => setOpenAccidentDate(true)}
                            />
                            <DatePicker
                                modal
                                mode="date"
                                date={selectedDate}
                                open={openAccidentDate}
                                onConfirm={(date) => {
                                    setOpenAccidentDate(false);
                                    setSelectedDate(date);
                                }}
                                onCancel={() => {
                                    setOpenAccidentDate(false);
                                }}
                            />
                        </View>

                    </View>

                </View>


                <Pressable
                    style={styles.button}
                    onPress={isLoading ? null : IncidentReport} // Disable onPress when isLoading is true
                    disabled={isLoading} // Optionally disable the button visually
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.text}>Submit</Text>
                    )}
                </Pressable>
            </ScrollView>
            <Portal>
                <Modal visible={selectedImage !== null} onDismiss={closeZoomedImage}>
                    <View style={{ backgroundColor: 'white', padding: 30 }}>
                        <Image
                            style={styles.zoomedImg}
                            source={{ uri: selectedImage || '' }}
                        />
                        <Pressable onPress={closeZoomedImage} style={styles.close}>
                            <Text style={{ fontSize: 18, color: Colors.text_primary }}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
            </Portal>

        </>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        backgroundColor: Colors.screen_bg,
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
    },
    chooseFile: {
        borderWidth: 1,
        borderColor: Colors.lightGray,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: Colors.lightGray,
        color: Colors.text_secondary,
        width: '100%'
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