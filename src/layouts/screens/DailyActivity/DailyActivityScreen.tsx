import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { getMethod } from '../../../utils/helper';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface Props { }
const DailyActivityScreen: FC<Props> = ({ route }: any): JSX.Element => {
    const { project_id } = route.params;
    const [loading, setLoading] = useState<boolean>(false);
    const [dailyActivity, setDailyActivity] = useState([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`get_all_daily_activity/${project_id}`);
        if (api.status === 200) {
            console.log("apiData", api.data)
            setLoading(false);
            setDailyActivity(api.data)
            setRefreshing(false);
        }
    }
    const onRefresh = () => {
        setRefreshing(true);
        getdata();
        setRefreshing(false);
    };
    return (
        <>
            <Pressable style={styles.add} onPress={() =>
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'DailyActivityCardScreen',
                        params: {
                            project_id: project_id,
                        },
                    })
                )
            }>
                <Text style={styles.addText}>+ Add</Text>
            </Pressable>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (

                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>

                    {dailyActivity.map((item, index) => (
                        <View style={styles.cover}>
                            <View style={styles.align2}>
                                <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                                <Text style={styles.time}>{item.date}</Text>
                            </View>
                            <View style={styles.align}>
                                <Text style={styles.upload}>Uploaded By:</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.name}>{item.uploaded_by}</Text>
                                    <Pressable>
                                        <Feather name="edit-3" size={18} color={Colors.brand_primary} style={styles.edit} />
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                    ))}

                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14
    },
    add: {
        borderWidth: 1,
        borderColor: '#041B8E',
        backgroundColor: '#041B8E',
        height: 35,
        width: 65,
        padding: 5,
        paddingLeft: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    addText: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
    },
    cover: {
        borderWidth: 1,
        backgroundColor: Colors.screen_bgDark,
        borderColor: Colors.screen_bgDark,
        marginBottom: 10,
        borderRadius: 8
    },
    edit: {
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 10
    },
    time: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    calender: {
        paddingTop: 5
    },
    align2: {
        flexDirection: 'row',
        alignSelf: 'flex-end'

    },
    icon: {
        marginRight: 20,
        paddingTop: 5
    },
    align: {
        flexDirection: 'row',
        padding: 20
    },
    task: {
        paddingLeft: 20,
        paddingTop: 10,
        color: Colors.text_primary,
        fontFamily: 'Roboto-Medium',
        fontSize: 16

    },

    upload: {
        color: Colors.text_primary,
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    },
    name: {
        color: Colors.text_primary,
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        paddingLeft: 10
    }
});

export default DailyActivityScreen;