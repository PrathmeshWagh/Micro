import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Checkbox, Modal, Portal } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { getMethod, postMethod } from '../../../utils/helper';
import Appbar from '../../../components/Appbar';
import Colors from '../../../style/Colors/colors';

interface Props {
    navigation: any,
    route: any
}
const ViewDailyActivityScreen: FC<Props> = ({ route }): JSX.Element => {
    const { project_id, dailyId, date } = route.params;
    // console.log("...", project_id, dailyId)
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [dailyActivity, setDailyActivity] = useState<string[]>([]);
    const [selectedImageRemark, setSelectedImageRemark] = useState<string>();
    const [status, setStatus] = useState<string[]>([]);
    const [open, setOpen] = useState(false);



    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`view_daily_activity/${project_id}/${dailyId}`);
        if (api.status === 200) {
            console.log("apiData2", api.data)
            setLoading(false);
            setDailyActivity(api.data)
            setRefreshing(false);
        }
    }


    const openZoomedImage = (imagePath: string, remark: string) => {
        console.log('imagePath', remark);
        setZoomedImage(imagePath);
        setSelectedImageRemark(remark);
    };

    const closeZoomedImage = () => {
        setZoomedImage(null);
    };
    const onRefresh = () => {
        setRefreshing(true);
        getdata();
        setRefreshing(false);
    };




    return (

        <>
            <Appbar title={'Daily Activity'} />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (
                <>
                    <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
                        <Text style={styles.date}>Date</Text>
                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.date}>
                                    {dailyActivity?.date}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cover}>
                            {dailyActivity?.data?.map((activity, index) => (
                                <View key={index} style={styles.cover}>
                                    <Text style={styles.Task}>Task</Text>
                                    <Text style={styles.date}>Name</Text>
                                    <Text style={styles.name}>{activity.task_title || ''}</Text>

                                    <Text style={styles.date}>Task Remarks</Text>
                                    <View style={styles.inputRemark}>
                                        <Text>{activity.task_remark || ''}</Text>
                                    </View>

                                    <Text style={styles.date}>Images</Text>
                                    <ScrollView horizontal>
                                        {activity.images?.map((image) => (
                                            <TouchableOpacity key={image.image_id} onPress={() => openZoomedImage(image.image, image.remark)}>
                                                <View style={{ margin: 10 }}>
                                                    <View style={{ backgroundColor: Colors.lightGray, borderRadius: 8, padding: 10 }}>
                                                        <Image style={styles.tinyImg} source={{ uri: image.image }} />
                                                        <Text style={styles.remark}>
                                                            {image.remark.length >= 5 ? `${image.remark.slice(0, 5)}...` : image.remark}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>

                                    <Text style={styles.date}>Area</Text>
                                    <View style={styles.input}>
                                        <Text>{activity.area || ''}</Text>
                                    </View>

                                    <Text style={styles.date}>Plan</Text>
                                    <View style={styles.input}>
                                        <Text>{activity.plan || ''}</Text>
                                    </View>

                                    <Text style={styles.date}>Completion</Text>
                                    <View style={styles.input}>
                                        <Text>{activity.completion || ''}</Text>
                                    </View>

                                    <Text style={styles.date}>Status</Text>
                                    <View style={styles.input}>
                                        <Text>{activity.status || ''}</Text>
                                    </View>
                                </View>
                            ))}


                        </View>

                        <View style={{ paddingBottom: 40 }}></View>

                        {/* <View style={{ paddingBottom: 50 }}></View> */}
                        {/* <Pressable style={styles.btn} onPress={AddDescription}>
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
                    </ScrollView >
                    <Portal>
                        <Modal visible={zoomedImage !== null} onDismiss={closeZoomedImage}>
                            <View style={{ backgroundColor: 'white', padding: 30 }}>
                                <Image
                                    style={styles.zoomedImg}
                                    source={{ uri: zoomedImage || '' }}
                                />
                                <Text style={styles.remark}> {/* Display the selectedImageRemark here */}
                                    Remark:-{'\n'}{'\n'}{selectedImageRemark}
                                </Text>
                                <Pressable onPress={closeZoomedImage} style={styles.close}>
                                    <Text style={{ fontSize: 18, color: Colors.text_primary }}>Close</Text>
                                </Pressable>
                            </View>
                        </Modal>
                    </Portal>
                </>
            )}


        </>


    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.screen_bg,
        padding: 24,
    },
    remark: {
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
    },
    name: {
        height: 50,
        marginVertical: 5,
        padding: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
        color: Colors.text_primary,
        paddingVertical: 15,
        marginBottom: 10
    },
    btn: {
        backgroundColor: Colors.brand_primary,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        width: 200,
        alignSelf: 'center',
        marginVertical: 40
    },
    btnText: {
        color: Colors.white,
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    },
    input: {
        height: 50,
        marginVertical: 5,
        padding: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
    },
    inputRemark: {
        height: 80,
        marginVertical: 5,
        padding: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
        textAlignVertical: 'top'
    },
    cover: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 10,
        padding: 14
    },
    date: {
        fontFamily: 'Roboto-Medium',
        color: Colors.text_primary,
        paddingLeft: 10,
        fontSize: 16
    },
    Task: {
        fontFamily: 'Roboto-Medium',
        color: Colors.text_primary,
        fontSize: 18,
        paddingBottom: 10
    },
    tinyImg: {
        width: 100,
        height: 100,
        marginTop: 20
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white', // Set the background color to white
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100
    },
    modalContent: {
        width: '100%', // Adjust the width as needed
        height: '100%', // Adjust the height as needed
    },
    modalCloseButton: {

    },
    modalCloseText: {
        color: 'black',
        fontSize: 18,
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
    }
});

export default ViewDailyActivityScreen;