import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, ActivityIndicator } from 'react-native';
import Appbar from '../../components/Appbar';
import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../style/Colors/colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getMethod, getStorageData } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

const PendingScreen = ({ navigation }: any) => {
    const [projects, setProjects] = useState([]);
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`show_pending_project`, user.token);
        if (api.status === 200) {
            setLoading(false);
            setProjects(api.data)
        }
    }
    const renderItem = (props: any) => {
        //console.log('props',props.item.project_id)
        return (
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate('DescriptionScreen', {
                    id: props.item.project_id,
                })}>
                    <Card style={styles.card}>
                        <View>
                            <Text style={styles.jobSheet}>{props.item.project_title}</Text>
                            <Text style={styles.address}>{props.item.project_address}</Text>
                            <Text style={styles.team}>Team members</Text>
                            <View style={styles.align}>
                                <Avatar.Image size={24} source={{ uri: props.item.user_data[0].profile }} />
                                <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />
                                {/* <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
            <Avatar.Image size={24} source={require('../../style/Img/woman.png')} /> */}
                            </View>
                            <View style={styles.align}>
                                <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                                <Text style={styles.date}>{props.item.project_date_start}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.indecator}>
                                <View style={styles.taskIconAlign}>
                                    <Feather style={styles.taskicon} name="check-square" size={18} color={'gray'} style={styles.calender} />
                                    <Text style={styles.task}>{props.item.total_task}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Pressable>
            </View>
        )
    }
    return (
        <View>
            <Appbar title={'Pending'} />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (

                <FlatList
                    data={projects}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
}

export default PendingScreen;
const styles = StyleSheet.create({
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
        marginTop: 15,
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
        // marginTop: 20,
        padding: 20,
        backgroundColor: Colors.card_bg
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
        marginBottom: 5,
        flexWrap: 'wrap'
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