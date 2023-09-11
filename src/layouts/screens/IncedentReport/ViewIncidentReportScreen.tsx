import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../style/Colors/colors';
import Appbar from '../../../components/Appbar';
import { getMethod } from '../../../utils/helper';
import { Modal, Portal } from 'react-native-paper';

interface Props {
    route: any;
}
interface IncidentReport {
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
    images: string[];
}
const ViewIncidentReportScreen: FC<Props> = ({ route }): JSX.Element => {
    const { incidentReportsId, projectId } = route.params;
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [incidentList, setIncidentList] = useState<IncidentReport>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>();
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`view_incident_report/${projectId}/${incidentReportsId}`);
        if (api.status === 200) {
            console.log("apiData", api.data);
            setLoading(false);
            setIncidentList(api.data);
            setRefreshing(false);
        }
    };

    const openModal = (uri: string) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };


    const onRefresh = () => {
        setRefreshing(true);
        getdata();
        setRefreshing(false);
    };
    return (
        <>
            <Appbar title={'Incident Report'} />
            {loading ?
                (<ActivityIndicator size="large" color={Colors.brand_primary} />)
                :
                (
                    <>
                        <View style={styles.cover}>
                            <ScrollView style={styles.gap}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh} />
                                }>
                                <View style={styles.part}>
                                    <Text style={styles.partText}>PART A</Text>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Report Serial Number:</Text>
                                        <Text style={styles.text2}>{incidentList?.report_serial_number}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Revision:</Text>
                                        <Text style={styles.text2}>{incidentList?.revision}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Company / Department Reporting:</Text>
                                        <Text style={styles.text2}>{incidentList?.company_department_reporting}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Name of Person Reporting:</Text>
                                        <Text style={styles.text2}>{incidentList?.name_or_person_reporting}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Designation of Person Reporting:</Text>
                                        <Text style={styles.text2}>{incidentList?.designation_of_person_reporting}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>NRIC of Person Reporting:</Text>
                                        <Text style={styles.text2}>{incidentList?.nric_fin_wp_no_of_person_reporting}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Date of Report Submission:</Text>
                                        <Text style={styles.text2}>{incidentList?.date_of_report_submission}</Text>
                                    </View>
                                    <View style={styles.align}>
                                        <Text style={styles.text}>Time of Report Submission:</Text>
                                        <Text style={styles.text2}>{incidentList?.time_of_report_submission}</Text>
                                    </View>

                                    <View style={styles.part}>
                                        <Text style={styles.partText}>PART B</Text>
                                    </View>
                                    <View style={styles.card}>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Category of Event:</Text>
                                            <Text style={styles.text2}>{incidentList?.catergory_of_event}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Injury to Person(s):</Text>
                                            <Text style={styles.text2}>{incidentList?.injury_to_person}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Damage Property:</Text>
                                            <Text style={styles.text2}>{incidentList?.damage_to_property}</Text>
                                        </View>
                                        <Text style={styles.provide}>Please Provide Info As Follows</Text>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Full Name Of Injured Person:</Text>
                                            <Text style={styles.text2}>{incidentList?.full_name_of_injured_person}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>NRIC Of Injured Person:</Text>
                                            <Text style={styles.text2}>{incidentList?.nric_wp_no_of_injured_person}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Designation Of Injured Person:</Text>
                                            <Text style={styles.text2}>{incidentList?.damage_to_property}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Nature Of Injury:</Text>
                                            <Text style={styles.text2}>{incidentList?.nature_of_injury}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Injured Person(s) Sent to:</Text>
                                            <Text style={styles.text2}>{incidentList?.injured_person_sent_to}</Text>
                                        </View>
                                        <Text style={styles.text}>Description Of Property Damage (If Any):</Text>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Text style={styles.text2}>{incidentList?.description_of_property_damage}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.part}>
                                        <Text style={styles.partText}>PART C</Text>
                                    </View>
                                    <View style={styles.card}>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Project:</Text>
                                            <Text style={styles.text2}>{incidentList?.project}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>JOB Number:</Text>
                                            <Text style={styles.text2}>{incidentList?.job_number}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Name Of Coordinator:</Text>
                                            <Text style={styles.text2}>{incidentList?.name_of_coordinator_supervisor_in_charge}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Full Workplace Address:</Text>
                                            <Text style={styles.text2}>{incidentList?.full_workplace_address}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Location (Floor / Zone / Unit):</Text>
                                            <Text style={styles.text2}>{incidentList?.location}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Date Of Acc /INC/DO:</Text>
                                            <Text style={styles.text2}>{incidentList?.date_of_acc_inc_do}</Text>
                                        </View>
                                        <View style={styles.align}>
                                            <Text style={styles.text}>Time Of Acc /INC/DO:</Text>
                                            <Text style={styles.text2}>{incidentList?.time_of_acc_inc_do}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.part}>
                                        <Text style={styles.partText}>PART D</Text>
                                    </View>
                                    <View style={{ paddingVertical: 10 }}>
                                        <Text style={styles.text}>Details Of Accident/Incident/Dangerous Occurrence:</Text>
                                        <Text style={[styles.text2, { paddingVertical: 10 }]}>{incidentList?.details_of_accident_incident_dangerous_occurance}</Text>
                                    </View>
                                    <View style={{ paddingVertical: 10 }}>
                                        <Text style={styles.text}>Signature:</Text>
                                        <Text style={styles.text2}>{incidentList?.time_of_acc_inc_do}</Text>
                                    </View>
                                    <Text style={styles.text}>Images:</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                        {incidentList?.images?.map((uri: any, index: React.Key | null | undefined) => (
                                            <Pressable key={index} style={{ padding: 5, flexBasis: '50%' }} onPress={() => openModal(uri)}>
                                                <Image
                                                    source={{ uri: uri }}
                                                    style={{ width: '100%', height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                                />
                                            </Pressable>

                                        ))}
                                    </View>
                                    <View style={{ marginBottom: 30 }}></View>
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
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )
            }

        </>
    );
};

const styles = StyleSheet.create({
    cover: {
        marginTop: 14,
        marginHorizontal: 14,
        flex: 1,
        backgroundColor: Colors.screen_bg
    },
    close: {
        marginVertical: 20,
        alignSelf: 'center',
        color: Colors.text_primary
    },
    provide: {
        color: 'gray',
        marginVertical: 5,
        alignSelf: 'center'
    },
    gap: {
        flex: 1,
        paddingBottom: 50
    },
    card: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        padding: 5,
    },
    text: {
        color: Colors.text_primary,
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Roboto-Bold',
        lineHeight: 30
    },
    text2: {
        color: Colors.black,
        fontFamily: 'Roboto-Regular',
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    add: {
        borderWidth: 1,
        borderColor: '#041B8E',
        backgroundColor: '#041B8E',
        height: 35,
        width: 65,
        padding: 5,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    addText: {
        color: 'white',
        fontFamily: 'Roboto-Medium',

    },
    part: {
        borderColor: Colors.lightGray,
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: Colors.lightGray,
    },
    partText: {
        color: Colors.black,
        fontFamily: 'Roboto-Regular',
    },
    viewDetails: {
        color: 'blue',
        alignSelf: 'flex-end'
    }
})
export default ViewIncidentReportScreen;