import React from 'react';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, Avatar, Checkbox } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../style/Colors/colors';
import Appbar from '../../../components/Appbar';
import { getMethod } from '../../../utils/helper';

interface Props {
    route: any
}
const EditDailyActivityCardScreen: FC<Props> = ({ route }): JSX.Element => {
    const { dailyId, project_id } = route.params;
    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const [dailyActivity, setDailyActivity] = useState([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [dateNew, setdateNew] = useState<string>();
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`edit_daily_activity_task_list/${project_id}/${dailyId}`);
        if (api.status === 200) {
            console.log("edit_daily_activity_task_list",api.data.date)
            setLoading(false);
            setdateNew(api.data.date);
            setDailyActivity(api.data.data)
            setRefreshing(false);
        }
    }
    const onRefresh = () => {
        setRefreshing(true);
        getdata();
        setRefreshing(false);
    };


    const toggleSelectAll = () => {
        const allSelected = dailyActivity.every(data => data.selected_task_data === 1 || selectedTaskIds.includes(data?.task_id));
        setSelectedTaskIds(allSelected ? [] : dailyActivity.map(data => data?.task_id));
    };

    useEffect(() => {
        const allSelected = dailyActivity.every(data => data.selected_task_data === 1 || selectedTaskIds.includes(data?.task_id));
        setSelectAll(allSelected);
    }, [selectedTaskIds, dailyActivity]);



    return (
        <>
            <Appbar title={'Daily Activity'} />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (
                <>
                    <ScrollView
                        style={styles.cover}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View style={styles.checkBox}>
                            <Text style={styles.team}>Select All</Text>
                            <Checkbox
                                status={selectAll ? 'checked' : 'unchecked'}
                                onPress={toggleSelectAll}
                            />
                        </View>
                        {dailyActivity.map((data, index) => (
                            <View key={index}>
                                <Card style={styles.card}>
                                    <View style={{ position: 'absolute', right: -25, top: -25 }}>
                                        <Checkbox
                                            status={
                                                selectedTaskIds.includes(data?.task_id) ||
                                                    data.selected_task_data === 1
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() => {
                                                const taskId = data?.task_id;
                                                setSelectedTaskIds(prevIds =>
                                                    prevIds.includes(taskId)
                                                        ? prevIds.filter(id => id !== taskId)
                                                        : [...prevIds, taskId]
                                                );
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.jobSheet}>{data?.task_title}</Text>
                                        <Text style={styles.address}>{data?.task_description}</Text>
                                        <Text style={styles.team}>Team members</Text>
                                        <View style={styles.align}>
                                            {data.user_data.map((userData, userIndex) => (
                                                <View key={userIndex}>
                                                    <Avatar.Image size={24} source={{ uri: userData.profile }} />
                                                </View>
                                            ))}
                                        </View>
                                        <Text style={styles.startDate}>Start Date</Text>
                                        <View style={styles.align}>
                                            <IonIcon name="calendar" size={18} color={'gray'} style={styles.calender} />
                                            <Text style={styles.date}>{data?.task_date_start}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.indecator}>
                                            <View style={styles.taskIconAlign}>
                                                <Text style={{ bottom: 15, right: -70 }}>End Date</Text>
                                                <IonIcon name="calendar" size={18} color={'gray'} style={styles.calender} />
                                                <Text style={styles.date}>{data?.task_date_due}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        ))}
                    </ScrollView>
                    <Pressable
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('EditDailyActivityScreen', {
                                selectedTaskIds: [...selectedTaskIds, ...dailyActivity.filter(data => data.selected_task_data === 1).map(data => data.task_id)],
                                project_id: project_id,
                                dailyId: dailyId,
                                dateNew:dateNew
                            })
                        }
                    >
                        <Text style={styles.btnText}>Submit</Text>
                    </Pressable>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    cover: {
        backgroundColor: Colors.screen_bg,
        marginHorizontal: 14,
        flex: 1
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingTop: 5
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
    btn: {
        backgroundColor: Colors.brand_primary,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 24,
        width: 200,
        alignSelf: 'center'
    },
    btnText: {
        color: Colors.white,
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    },
    addText: {
        color: Colors.white,
        fontFamily: 'Roboto-Medium',
    },
    startDate: {
        color: Colors.text_primary,
        marginTop: 5,
        fontFamily: 'Roboto-Regular',
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
        marginTop: 30,
        padding: 20,
        backgroundColor: Colors.card_bg,
        margin: 5
    },
    task: {
        color: Colors.text_secondary,
        marginLeft: 5,
        marginTop: 5
    },
    indecator: {
        position: 'absolute',
        right: 0,
        bottom: 10
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
        marginBottom: 5
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
});

export default EditDailyActivityCardScreen;