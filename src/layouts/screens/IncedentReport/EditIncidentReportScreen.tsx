import React, { useEffect, useState, useRef } from 'react';
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
import { FormPostMethod, getMethod, postMethod } from '../../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignatureScreen from "react-native-signature-canvas";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
    navigation: any;
    route: any;
}

interface ImageData {
    image_id: number;
    image: string;
}

interface DetailsData {
    incident_report_id: number;
    project_id: number;
    report_serial_number: string;
    revision: string;
    company_department_reporting: string;
    name_or_person_reporting: string;
    designation_of_person_reporting: string;
    nric_fin_wp_no_of_person_reporting: string;
    date_of_report_submission: string;
    time_of_report_submission: string;
    catergory_of_event: string;
    catergory_of_event_please_specify_below: string;
    injury_to_person: string;
    damage_to_property: string;
    full_name_of_injured_person: string;
    nric_wp_no_of_injured_person: string;
    designation_of_injured_person: string;
    nature_of_injury: string;
    injured_person_sent_to: string;
    injured_person_sent_to_please_specify_below: string;
    description_of_property_damage: string;
    project: string;
    job_number: string;
    name_of_coordinator_supervisor_in_charge: string;
    full_workplace_address: string;
    location: string;
    date_of_acc_inc_do: string;
    time_of_acc_inc_do: string;
    details_of_accident_incident_dangerous_occurance: string;
    incident_report_remark: string;
    signature_of_person_reporting: string;
    date: string;
    images: ImageData[];
}
const EditIncidentReportScreen: FC<Props> = ({ route, navigation }): JSX.Element => {
    const [details, setDetails] = useState<DetailsData | null>(null);
    const { project_id, incident_id } = route.params;
    const signatureRef = useRef();

    useEffect(() => {
        if (details) {
            const {
                report_serial_number,
                revision,
                company_department_reporting,
                name_or_person_reporting,
                designation_of_person_reporting,
                nric_fin_wp_no_of_person_reporting,
                date_of_report_submission,
                time_of_report_submission,
                catergory_of_event,
                catergory_of_event_please_specify_below,
                injury_to_person,
                damage_to_property,
                full_name_of_injured_person,
                nric_wp_no_of_injured_person,
                designation_of_injured_person,
                nature_of_injury,
                injured_person_sent_to,
                injured_person_sent_to_please_specify_below,
                description_of_property_damage,
                project,
                job_number,
                name_of_coordinator_supervisor_in_charge,
                full_workplace_address,
                location,
                date_of_acc_inc_do,
                time_of_acc_inc_do,
                details_of_accident_incident_dangerous_occurance,
                incident_report_remark,
                signature_of_person_reporting,
                date,
                images,
            } = details;


            setSerialNo(report_serial_number || '');
            setRevision(revision || '');
            setCompany(company_department_reporting || '');
            setPersonReporting(name_or_person_reporting || '');
            setReportingDesignation(designation_of_person_reporting || '');
            setNRICpersonReporting(nric_fin_wp_no_of_person_reporting || '');
            setSelectedValue(catergory_of_event || '');
            setInjuredvalue(injury_to_person || '');
            setInjuredvalue(injured_person_sent_to_please_specify_below || '');
            setDamageValue(damage_to_property || '');
            setDesPropertyDamage(description_of_property_damage || '');
            setInjuryToPerson(injury_to_person || '');
            setInjuredPersonName(full_name_of_injured_person || '');
            setNricInjuredPerson(nric_wp_no_of_injured_person || '');
            setDesInjuredPerson(designation_of_injured_person || '');
            setNatureInjury(nature_of_injury || '');
            setSelectedValue2(injured_person_sent_to || '');
            setProject(project || '');
            setJobNumber(job_number || '');
            setCordinatorName(name_of_coordinator_supervisor_in_charge || '');
            setWorkAddress(full_workplace_address || '');
            setEventValue(catergory_of_event_please_specify_below || '')
            setLocation(location || '');
            setAccidentDetails(details_of_accident_incident_dangerous_occurance || '');
            setRemark(incident_report_remark || '');
            setSignatureImageUri(signature_of_person_reporting || '');
            setReportTime(time_of_report_submission || '');
            setAccTime(time_of_acc_inc_do || '')
            setDateViewReport(date_of_report_submission || '');
            setDateViewAcc(date_of_acc_inc_do || '');
            setSignatureDate(date || '');
        }
    }, [details]);

    const [imageUri, setImageUri] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const [showSpecifyInput, setShowSpecifyInput] = useState(false);
    const [showSpecifyInput2, setShowSpecifyInput2] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Step 2: State variable for selected date
    const [openStartTime, setOpenStartTime] = useState<boolean>(false);
    const [openAccidentDate, setOpenAccidentDate] = useState<boolean>(false);
    const [openDate1, setOpenDate1] = useState<boolean>(false);
    const [date1, setDate1] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState<boolean>(false);

    const [endOpen, setEndOpen] = useState(false);
    const [endtime, setEndTime] = useState();
    const [startTime, setStartTime] = useState();

    const [dateViewReport, setDateViewReport] = useState<string>()
    const [signatureDate, setSignatureDate] = useState<string>()
    const [dateViewAcc, setDateViewAcc] = useState<string>()
    const [reportTime, setReportTime] = useState('')
    const [AccTime, setAccTime] = useState('')
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [signatureModalVisible, setSignatureModalVisible] = useState<boolean>(false);


    useEffect(() => {
        getdata();
    }, []);



    const UpdateImage = async () => {

        const formData = new FormData();
        for (let i = 0; i < imageUri.length; i++) {
            formData.append('file[]', {
                uri: imageUri[i],
                type: 'image/jpg', // Make sure to determine the correct image type
                name: `image_${i}.jpg`, // Use a unique name for each image
            });
        }
        formData.append('incident_reports_id', incident_id);
        formData.append('project_id', project_id);
        console.log("formData", formData)
        try {
            setLoad(true);
            const api: any = await FormPostMethod(`upload_incident_report_image`, formData);
            if (api.status === 200) {
                setLoad(false);
                console.log("...", api.data)
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                // navigation.dispatch(CommonActions.goBack())
            } else {
                setLoad(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
            }
        }
        catch (e) {
            console.log("catch", e)
            Snackbar.show({
                text: "Some Error Occured" + e,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
        }

    }



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

    const handleDropdownChangeText = (value: string) => {
        console.log("value", value.value)
        setSelectedValue(value.value);
        setShowSpecifyInput(value.value === 'Others');
    };
    const handleDropdownChangeInjury = (injury: string) => {
        console.log("valueInjury", injury.value)
        setInjuryToPerson(injury.value);
    };

    const handleDropdownChangeDamage = (damage: string) => {
        console.log("setDamageValue", damage.value)
        setDamageValue(damage.value);
    };

    const handleDropdownChangeText2 = (value: string) => {
        console.log("value2", value.value)
        setSelectedValue2(value.value);
        setShowSpecifyInput2(value.value === 'Others');
    };
    const openModal = (uri: string) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
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

    const getdata = async () => {
        setIsLoading(true);
        const api: any = await getMethod(`edit_incident_report/${project_id}/${incident_id}`);
        if (api.status === 200) {
            setIsLoading(false);
            setDetails(api.data)
            //  console.log("apiData", viewImage)
        }
    }


    const handleSignatureModal = () => {
        setSignatureModalVisible(!signatureModalVisible);
    };

    const handleOK = (signature: string) => {
        const path = RNFS.CachesDirectoryPath + `img-${new Date().valueOf()}.jpg`;
        RNFS.writeFile(path, signature.replace("data:image/png;base64,", ""), 'base64')
        setSignatureImageUri('file://' + path);

        setSignatureModalVisible(false)
    };
    const [serialNo, setSerialNo] = useState<string>();
    const [revision, setRevision] = useState<string>();
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
    const [signatureImageUri, setSignatureImageUri] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);


    const IncidentReport = async () => {
        const formData = new FormData();

        formData.append("report_serial_number", serialNo);
        formData.append("revision", revision);
        formData.append("company_department_reporting", company);
        formData.append("name_or_person_reporting", personReporting);
        formData.append("designation_of_person_reporting", reportingDesignation);
        formData.append("nric_fin_wp_no_of_person_reporting", NRICpersonReporting);
        formData.append("date_of_report_submission", dateViewReport);
        formData.append("time_of_report_submission", startTime || reportTime);
        formData.append("catergory_of_event", selectedValue);
        formData.append("catergory_of_event_please_specify_below", eventValue);
        formData.append("injury_to_person", injuryToPerson);
        formData.append("damage_to_property", damageValue);
        formData.append("full_name_of_injured_person", injuredPersonName);
        formData.append("nric_wp_no_of_injured_person", nricInjuredPerson);
        formData.append("designation_of_injured_person", desInjuredPerson);
        formData.append("nature_of_injury", natureInjury);
        formData.append("injured_person_sent_to", selectedValue2);
        formData.append("injured_person_sent_to_please_specify_below", injuredvalue);
        formData.append("description_of_property_damage", desPropertyDamage);
        formData.append("project", project);
        formData.append("job_number", jobNumber);
        formData.append("name_of_coordinator_supervisor_in_charge", cordinatorName);
        formData.append("full_workplace_address", workAddress);
        formData.append("location", location);
        formData.append("date_of_acc_inc_do", dateViewAcc);
        formData.append("time_of_acc_inc_do", endtime || AccTime);
        formData.append("details_of_accident_incident_dangerous_occurance", accidentDetails);
        formData.append("incident_report_remark", remark);
        formData.append('signature_of_person_reporting', {
            uri: signatureImageUri,
            type: 'image/jpg',
            name: 'image.jpg',
        });
        formData.append("date", signatureDate);
        formData.append("project_id", project_id);
        formData.append("incident_reports_id", incident_id);
        console.log("...", formData);
        try {
            setLoading(true);
            const api: any = await FormPostMethod(`update_incident_report`, formData);
            console.log(".....", api.data)
            if (api.status === 200) {
                setLoading(false);
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                // navigation.dispatch(CommonActions.goBack())
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

    const ImageDelete: any = async (img_id: number) => {
        const raw = {
            incident_reports_id: incident_id,
            image_id: img_id
        }
        console.log("raw", raw)
        try {
            const api: any = await postMethod(`delete_incident_report_image`, raw);
            if (api.status === 200) {
                console.log("api", api.data)
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                getdata()
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
    return (
        <>
            <Appbar title={'Edit Incident Report'} />
            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (
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
                                <Text style={styles.date}>{dateViewReport}</Text>
                            </View>
                            <Feather
                                name="calendar"
                                size={22}
                                color={'#000'}
                                style={{ position: 'absolute', right: 20, top: 12, }}
                                onPress={() => setOpenDate1(true)}
                            />
                            <DateTimePickerModal
                                isVisible={openDate1}
                                mode="date"
                                date={date1}
                                onConfirm={(date) => {
                                    const formattedDate = moment(date).format('DD-MM-YYYY');
                                    setDateViewReport(formattedDate); // Update dateViewReport with the selected date
                                    setDate1(date);
                                    setOpenDate1(false);
                                }}
                                onCancel={() => {
                                    setOpenDate1(false);
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Time of Report Submission</Text>
                        <View style={styles.dateCard}>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Text style={styles.date}>{starttimeString}</Text> */}
                                <Text style={styles.date}>
                                    {startTime
                                        ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                                        : reportTime}
                                </Text>
                            </View>
                            <Feather
                                name="clock"
                                size={22}
                                color={'#000'}
                                style={{ position: 'absolute', right: 20, top: 12, }}
                                onPress={() => setOpenStartTime(true)}
                            />
                            <DateTimePickerModal
                                isVisible={openStartTime} // Replace with your open state variable
                                mode="time"
                                date={startTime || new Date()} // Replace with your selected time state variable
                                onConfirm={(time) => {
                                    setOpenStartTime(false); // Replace with your open state variable
                                    setStartTime(time); // Replace with your time state variable
                                }}
                                onCancel={() => {
                                    setOpenStartTime(false); // Replace with your open state variable
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
                                <Text style={styles.date}>{dateViewAcc}</Text>
                            </View>
                            <Feather
                                name="calendar"
                                size={22}
                                color={'#000'}
                                style={{ position: 'absolute', right: 20, top: 12, }}
                                onPress={() => setOpen(true)}
                            />

                            <DateTimePickerModal
                                isVisible={open}
                                mode="date"
                                date={date}
                                onConfirm={(date) => {
                                    const formattedDate = moment(date).format('DD-MM-YYYY');
                                    setDateViewAcc(formattedDate); // Update dateViewReport with the selected date
                                    setDate(date);
                                    setOpen(false);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Time Of Acc /INC/DO</Text>
                        <View style={styles.dateCard}>
                            <Text style={styles.date}>
                                {endtime
                                    ? endtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                                    : AccTime}
                            </Text>
                            <Feather
                                name="clock"
                                size={22}
                                color={'#000'}
                                style={{ position: 'absolute', right: 20, top: 12, }}
                                onPress={() => setEndOpen(true)}
                            />
                            <DateTimePickerModal
                                isVisible={endOpen} // Replace with your open state variable
                                mode="time"
                                date={endtime || new Date()} // Replace with your selected time state variable
                                onConfirm={(time) => {
                                    setEndOpen(false); // Replace with your open state variable
                                    setEndTime(time); // Replace with your time state variable
                                }}
                                onCancel={() => {
                                    setEndOpen(false); // Replace with your open state variable
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

                        <Text style={styles.text}>Upload Images</Text>

                        <View style={styles.imgCard}>
                            <ScrollView horizontal>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                    {details?.images.map((uri, index) => (
                                        <View key={index} style={{ padding: 8, marginTop: -10 }}>
                                            <Pressable onPress={() => ImageDelete(uri.image_id)}>
                                                <IonIcon name="close-sharp" color={Colors.text_primary} size={20} style={{ marginLeft: 100 }} />
                                            </Pressable>
                                            <Pressable onPress={() => openModal(uri.image)}>
                                                <Image
                                                    source={{ uri: uri.image }}
                                                    style={{ width: 120, height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                                />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>

                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>Signature</Text>
                                <Pressable onPress={handleSignatureModal}>
                                    <MaterialCommunityIcons name="pencil" size={20} color="black" style={styles.icon} />
                                </Pressable>
                            </View>
                            <View style={styles.signatureCard}>

                                {signatureImageUri ? (
                                    <Image source={{ uri: signatureImageUri }} style={{ width: 150, height: 150, paddingLeft: 18 }} />
                                ) : (
                                    <Text style={styles.chooseFile2} onPress={handleSignatureModal}>Signature</Text>
                                )}

                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>Date</Text>
                            <View style={styles.dateCard}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.date}>{signatureDate}</Text>
                                </View>
                                <Feather
                                    name="calendar"
                                    size={22}
                                    color={'#000'}
                                    style={{ position: 'absolute', right: 20, top: 12 }}
                                    onPress={() => setOpenAccidentDate(true)}
                                />
                                <DateTimePickerModal
                                    isVisible={openAccidentDate} // Replace with your open state variable
                                    mode="date"
                                    date={date || new Date()} // Replace with your selected date state variable
                                    onConfirm={(selectedDate) => {
                                        setOpenAccidentDate(false); // Replace with your open state variable
                                        setDate(selectedDate); // Replace with your date state variable
                                    }}
                                    onCancel={() => {
                                        setOpenAccidentDate(false); // Replace with your open state variable
                                    }}
                                />
                            </View>

                        </View>

                    </View>


                    <Pressable
                        style={styles.button}
                        onPress={loading ? null : IncidentReport} // Disable onPress when isLoading is true
                        disabled={loading} // Optionally disable the button visually
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.Btntext}>Submit</Text>
                        )}
                    </Pressable>
                    <Pressable onPress={() => openAlart()}>
                        <Text style={styles.text}>Images <IonIcon name="camera" color={Colors.text_primary} size={20} /></Text>
                    </Pressable>

                    <View style={styles.imgCard}>
                        <ScrollView horizontal>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                {imageUri?.map((uri, index) => (
                                    <View key={index} style={{ padding: 8, marginTop: -10 }}>
                                        <Image
                                            source={{ uri: uri }}
                                            style={{ width: 120, height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                        />

                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </View>


                    <Pressable
                        style={styles.button2}
                        onPress={load ? null : UpdateImage} // Disable onPress when isLoading is true
                        disabled={load} // Optionally disable the button visually
                    >
                        {load ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.Btntext}>Update Image</Text>
                        )}
                    </Pressable>
                </ScrollView>
            )}
            <Portal>
                <Modal visible={modalVisible} onDismiss={closeModal}>
                    <View style={{ backgroundColor: 'white', padding: 30 }}>
                        {selectedImage && (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ width: '100%', height: 350, borderRadius: 8 }}
                            />
                        )}
                        <Pressable onPress={closeModal} style={styles.close}>
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
    chooseFile2: {
        color: Colors.text_secondary,
    },
    modalContent: {
        backgroundColor: 'white',
        height: '50%'
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
    whiteBoard: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
    },
    imageAlign: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 20
    },
    imgCard: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 10,
        padding: 20,
        margin: 12,
        elevation: 5,
        height: 200,

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
    button2: {
        backgroundColor: Colors.brand_primary,
        marginBottom: 40,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 10
    },
    button: {
        backgroundColor: Colors.brand_primary,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        padding: 10,
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

export default EditIncidentReportScreen;