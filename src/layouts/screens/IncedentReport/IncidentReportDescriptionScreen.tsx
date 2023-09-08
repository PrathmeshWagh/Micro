import React, { useEffect, useContext, useState } from 'react';
import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import Appbar from '../../../components/Appbar';
import { getMethod } from '../../../utils/helper';
import Colors from '../../../style/Colors/colors';

const IncidentReportDescriptionScreen = ({ route }: any) => {
    const [loading, setLoading] = useState(true);
    const [incidentDetails, setIncidentDetails] = useState();
    const { incident_reports_id } = route.params;
    // console.log("aaaa", taskId)

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`incident_report_details/${incident_reports_id}`, user.token);
        if (api.status === 200) {
            console.log("api", api.data)
            setLoading(false);
            setIncidentDetails(api.data)
            // console.log("taskDetails", taskDetails.user_data)
        }
    }

    return (
        <View>
            <Appbar title={'Incident Report'} />
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <ScrollView style={styles.container}>
                    <Card style={styles.card}>
                        <View>
                            <Text style={styles.jobSheet}>Location Of Incident:- </Text>
                            <Text style={styles.address}>{incidentDetails?.location_of_incident}</Text>
                            <Text style={styles.jobSheet}>Injury:- </Text>
                            <Text style={styles.address}>{incidentDetails?.injury}</Text>
                            <Text style={styles.jobSheet}>Property Damage:- </Text>
                            <Text style={styles.address}>{incidentDetails?.property_damage}</Text>
                            <Text style={styles.jobSheet}>Person Involved and Position:- </Text>
                            <Text style={styles.address}>{incidentDetails?.person_involved_and_position}</Text>
                            <Text style={styles.jobSheet}>Details of Incident:- </Text>
                            <Text style={styles.address}>{incidentDetails?.details_of_incident}</Text>
                            <Text style={styles.jobSheet}>Remark:- </Text>
                            <Text style={styles.address}>{incidentDetails?.incident_report_remark}</Text>
                            <View style={styles.align}>
                                {
                                    incidentDetails?.images.map((data, index) => (
                                        <View key={index}>
                                            <Card style={styles.card}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around'
                                                }}>
                                                    <Image
                                                        source={{ uri: data.image }}
                                                        style={{ width: 100, height: 100 }} />
                                                </View>
                                            </Card>
                                        </View>
                                    ))}
                            </View>

                        </View>
                        <View>
                        </View>
                    </Card>
                </ScrollView>
            )}
        </View>
    );
};
export default IncidentReportDescriptionScreen;
const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        marginHorizontal: 14,
        flex: 1,

    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13
    },
    remark: {
        marginTop: 20,
        borderColor: '#E8E8E8',
        backgroundColor: '#E8E8E8',
        borderWidth: 1,
        padding: 20,
        width: "100%",
        borderRadius: 6
    },
    cover: {
        marginTop: 14,
        marginHorizontal: 14
    },
    AddPic: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#A5FFA5',
        backgroundColor: '#A5FFA5',
        padding: 8,
        elevation: 8,
        width: 130,
        height: 40,
        marginTop: 20
    },
    startDate: {
        color: Colors.text_primary,
        marginTop: 8,
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    containerAppbar: {
        backgroundColor: Colors.brand_primary,
        height: 150,
        width: "100%",
        padding: 14
    },
    tinyLogo: {
        width: 22,
        marginTop: 5
    },
    taskIconAlign: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 30
    },
    taskicon: {
        position: 'absolute',
        top: 50
    },
    align2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pageName: {
        alignSelf: 'center',
        fontSize: 28,
        color: Colors.white,
        fontFamily: 'Roboto-Bold',
        marginTop: 25
    },
    card: {
        marginTop: 10,
        padding: 20,
        backgroundColor: Colors.card_bg
    },
    task: {
        color: Colors.text_secondary,
        marginLeft: 5,
        marginTop: 5
    },

    icon: {

    },
    date: {
        marginVertical: 5,
        marginHorizontal: 5,
        fontSize: 14,
        color: Colors.text_secondary,

    },
    align: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 200
    },
    container: {
        padding: 14
    },
    calender: {
        marginVertical: 5,
    },
    jobSheet: {
        color: Colors.text_primary,
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'Roboto-Bold'
    },
    address: {
        color: Colors.text_secondary,
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Roboto-Regular'
    },
    team: {
        fontSize: 18,
        color: Colors.text_primary,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Roboto-Bold'

    }
})
