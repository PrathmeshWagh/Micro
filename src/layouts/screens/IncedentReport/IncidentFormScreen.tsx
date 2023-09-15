import React, { useRef, useState } from 'react';
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
import SignatureScreen from "react-native-signature-canvas";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props { }
const IncidentFormScreen: FC<Props> = ({ navigation, route }: any): JSX.Element => {
    const { project_id } = route.params;
    const signatureRef = useRef();

    const [imageUri, setImageUri] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [signatureImageUri, setSignatureImageUri] = useState<string>();

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
    const [isLoading, setLoading] = useState<boolean>(false);
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

    const timestamp = date1;
    const formattedDate = moment(timestamp).format('DD-MM-YYYY');

    const timestamp2 = date;
    const formattedDate2 = moment(timestamp2).format('DD-MM-YYYY');

    const formattedTime = Starttime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const timestamp3 = selectedDate;
    const formattedDate3 = moment(timestamp3).format('DD-MM-YYYY');

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
    const [nricInjuredPerson, setNricInjuredPerson] = useState('');

    const [desInjuredPerson, setDesInjuredPerson] = useState('');
    const [natureInjury, setNatureInjury] = useState('');
    const [desPropertyDamage, setDesPropertyDamage] = useState('');
    const [project, setProject] = useState('');
    const [jobNumber, setJobNumber] = useState('');
    const [cordinatorName, setCordinatorName] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [location, setLocation] = useState('');

    const [accidentDetails, setAccidentDetails] = useState('');
    const [remark, setRemark] = useState('');
    const [signature, setSignature] = useState('');



    const IncidentReport = async () => {
        const formData = new FormData();
        for (let i = 0; i < imageUri.length; i++) {
            formData.append('file[]', {
                uri: imageUri[i],
                type: 'image/jpg', // Make sure to determine the correct image type
                name: `image_${i}.jpg`, // Use a unique name for each image
            });
        }
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
        formData.append('full_name_of_injured_person', injuredPersonName);
        formData.append('nric_wp_no_of_injured_person', nricInjuredPerson);
        formData.append('designation_of_injured_person', desInjuredPerson);
        formData.append('nature_of_injury', natureInjury);
        formData.append('injured_person_sent_to', selectedValue2);
        formData.append('injured_person_sent_to_please_specify_below', injuredvalue);
        formData.append('description_of_property_damage', desPropertyDamage);
        formData.append('project', project);
        formData.append('job_number', jobNumber);
        formData.append('name_of_coordinator_supervisor_in_charge', cordinatorName);
        formData.append('full_workplace_address', workAddress);
        formData.append('location', location);
        formData.append('date_of_acc_inc_do', formattedDate2);
        formData.append('time_of_acc_inc_do', endtimeString);
        formData.append('details_of_accident_incident_dangerous_occurance', accidentDetails);
        formData.append('incident_report_remark', remark);
        formData.append('signature_of_person_reporting', {
            uri: 'file://' + signatureImageUri,
            type: 'image/jpg',
            name: 'image.jpg',
        });
        formData.append('date', formattedDate3);
        formData.append('project_id', project_id);



        console.log("imageUri....", 'file://'+ signatureImageUri)
        try {
            setLoading(true);
            const api: any = await FormPostMethod(`add_incident_report`, formData);
            console.log(".....", api.data)
            if (api.status === 200) {
                setLoading(false);
                setImageUri([])
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.dispatch(CommonActions.goBack())
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
    const [signatureModalVisible, setSignatureModalVisible] = useState<boolean>(false);

    const handleSignatureModal = () => {
        setSignatureModalVisible(!signatureModalVisible);
    };



    const handleOK = (signature: string) => {
        const path = RNFS.CachesDirectoryPath + `img-${new Date().valueOf()}.jpg`;
        RNFS.writeFile(path, signature.replace("data:image/png;base64,", ""), 'base64')
        setSignatureImageUri(path);
        setSignatureModalVisible(false)
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
                        onChangeText={setInjuredPersonName}
                        value={injuredPersonName}
                        placeholder=""

                    />
                    <Text style={styles.text}>NRIC of Injured Person</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNricInjuredPerson}
                        value={nricInjuredPerson}
                        placeholder=""

                    />
                    <Text style={styles.text}>Designation Of Injured Person</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDesInjuredPerson}
                        value={desInjuredPerson}
                        placeholder=""

                    />
                    <Text style={styles.text}>Nature Of Injury</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNatureInjury}
                        value={natureInjury}
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
                        onChangeText={setDesPropertyDamage}
                        value={desPropertyDamage}
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
                        onChangeText={setProject}
                        value={project}
                        placeholder=""

                    />
                    <Text style={styles.text}>Job Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setJobNumber}
                        value={jobNumber}
                        placeholder=""

                    />
                    <Text style={styles.text}>Name Of Coordinator</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCordinatorName}
                        value={cordinatorName}
                        placeholder=""

                    />
                    <Text style={styles.text}>Full Workplace Address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setWorkAddress}
                        value={workAddress}
                        placeholder=""

                    />
                    <Text style={styles.text}>Location (Floor / Zone / Unit)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLocation}
                        value={location}
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
                    <Text style={styles.partText}>PART D</Text>
                </View>

                <View style={{ paddingBottom: 30, backgroundColor: '#F2EEEE' }}>
                    <Text style={styles.text}>Details Of Accident /Incident /Dangerous Occurrence</Text>
                    <Text style={styles.info}>(To Include What Happened, Circumstances, Surrounding Incident, Immediate Action Taken, Status Of Injury / Property Damage Control Measure Undertaken After) (Include Sketch/Drawing If Any)
                    </Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={setAccidentDetails}
                        value={accidentDetails}
                        placeholder=""
                        multiline={true}
                    />
                    <Text style={styles.text}>Remark</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRemark}
                        value={remark}
                        placeholder=""

                    />
                    <Text style={styles.text}>Photo Upload <IonIcon name="camera" color={Colors.text_primary} size={20} onPress={openAlart} /></Text>
                    <ScrollView horizontal>
                        {imageUri.length === 0 ? (
                            <Text style={styles.chooseFile}>Choose file</Text>
                        ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 5 }}>
                                {imageUri.map((uri, index) => (
                                    <Pressable key={index} onPress={() => openZoomedImage(uri)}>

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

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>Signature</Text>
                        <Pressable onPress={handleSignatureModal}>
                            <MaterialCommunityIcons name="pencil" size={20} color="black" style={styles.icon} />
                        </Pressable>
                    </View>
                    <View style={styles.signatureCard}>
                        {signatureImageUri ? (
                            <Image source={{ uri: 'file://' + signatureImageUri }} style={{ width: 150, height: 150, paddingLeft: 18 }} />
                        ) : (
                            <Text style={styles.chooseFile2} onPress={handleSignatureModal}>Signature</Text>
                        )}

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


                    <Pressable
                        style={styles.button}
                        onPress={isLoading ? null : IncidentReport} // Disable onPress when isLoading is true
                        disabled={isLoading} // Optionally disable the button visually
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.Btntext}>Submit</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView >

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
            <Modal
                visible={signatureModalVisible}
                onDismiss={handleSignatureModal}
                contentContainerStyle={styles.modalContent}
            >
                <View style={styles.whiteBoard}>
                    <SignatureScreen
                        ref={signatureRef}
                        onOK={handleOK}
                    />
                </View>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        backgroundColor: Colors.screen_bg,
    },
    signatureFileBackground: {
        backgroundColor: '#E3E3E3',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    icon: {
        paddingLeft: 10,
        paddingTop: 10
    },
    modalContent: {
        backgroundColor: 'white',
        height: '50%'
    },
    whiteBoard: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
    },
    zoomedImg: {
        width: '100%',
        height: 350,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8
    },
    close: {
        alignSelf: 'center',
        marginTop: 10
    },
    chooseFile2: {
        // borderWidth: 1,
        // borderColor: Colors.lightGray,
        // padding: 10,
        // marginVertical: 10,
        // marginHorizontal: 10,
        // backgroundColor: Colors.lightGray,
        color: Colors.text_secondary,
        //  width: '100%'
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
        borderRadius: 8,
        marginTop: 10
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
    signatureCard: {
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 10,
        backgroundColor: '#ffffff',
        padding: 12,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row'
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
        elevation: 8,
        textAlignVertical: 'top'
    },

    text: {
        marginTop: 10,
        fontFamily: 'Roboto-Medium',
        marginLeft: 10,

    },
    Btntext: {
        fontFamily: 'Roboto-Medium',
        color: Colors.white,
        fontSize: 16
    }
});

export default IncidentFormScreen;