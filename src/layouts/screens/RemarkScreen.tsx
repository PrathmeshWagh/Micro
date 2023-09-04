import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, ScrollView, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { getMethod, postMethod } from '../../utils/helper';

interface Props {
    params: { taskId: number; }
}
const RemarkScreen: FC<Props> = ({ route }: any): JSX.Element => {
    const [remark, setRemark] = useState('');
    const [load, setLoad] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState([]);
    const navigation = useNavigation();
    const { taskId } = route.params;


    useEffect(() => {
        getRemark();
    }, []);


    const addRemark = async () => {
        const raw = {
            remark: remark,
            task_id: taskId
        }
        console.log("raw", raw)
        try {
            setLoad(true);
            const api: any = await postMethod(`add_remark`, raw);
            if (api.status === 200) {
                setLoad(false);
                setRemark('');
                getRemark();
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: Colors.white,
                    backgroundColor: 'green',
                });
                // navigation.dispatch(CommonActions.goBack())
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


    const getRemark = async () => {
        setLoading(true);
        const api: any = await getMethod(`get_all_remark/${taskId}`);
        if (api.status === 200) {
            setLoading(false);
            setDetails(api.data)

        }
    }
    const createTwoButtonAlert = (remark_id: number) => {
        Alert.alert('Alert', 'Are you sure you want to delete?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteData(remark_id), // Pass remark_id to deleteData
            },
        ]);
    };

    const deleteData = async (remark_id: number) => {
        const raw = {
            remark_id: remark_id,
            task_id: taskId,
        };
        console.log("raw", raw);
        try {
            setLoading(true);
            const api: any = await postMethod(`delete_remark`, raw);
            if (api.status === 200) {
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: Colors.white,
                    backgroundColor: 'green',
                });
                getRemark();
                setLoading(false);
            }
        } catch {
            console.log('catch');
        }
    };


    return (
        <>
            <Appbar title={'Remark'} />
            <View style={styles.container}>
                <Text style={styles.addRemark}>Add Remark</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setRemark}
                    value={remark}
                    multiline={true}
                    placeholder=""
                />
                <Pressable
                    onPress={load ? null : addRemark} // Disable onPress when load is true
                    style={[styles.endButton, load && styles.disabledButton]}>
                    {load ? (
                        <ActivityIndicator size="small" color={Colors.white} />
                    ) : (
                        <Text style={styles.textEnd}>Add</Text>
                    )}
                </Pressable>
                <ScrollView>
                    {details.map((item) => (
                        <View style={styles.align}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: item.image,
                                }}
                            />
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.name}>{item.name} <Text style={{ fontFamily: 'Roboto-Regular' }}>({item.time})</Text></Text>
                                <Text style={styles.remark}>{item.remark}</Text>
                            </View>
                            <View style={{ marginTop: 5, position: 'absolute', right: 10, top: 10, flexDirection: 'row' }}>
                                <Pressable>
                                    <Text style={styles.edit}>Edit | </Text>
                                </Pressable>
                                <Pressable onPress={() => createTwoButtonAlert(item.remark_id)}>
                                    <Text style={styles.edit}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.screen_bg
    },
    disabledButton: {
        opacity: 0.5,
    },
    edit: {
        color: Colors.red,

    },
    textEnd: {
        fontFamily: 'Roboto-Medium',
        color: Colors.white,
        fontSize: 16,
    },
    remark: {
        marginLeft: 10,

    },
    name: {
        marginLeft: 10,
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    },
    align: {
        flexDirection: 'row',
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.card_bg,
        borderColor: Colors.card_bg,
        elevation: 2
    },
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 20,
        marginTop: 10
    },
    addRemark: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: Colors.text_primary
    },
    endButton: {
        borderWidth: 1,
        borderColor: Colors.button,
        backgroundColor: Colors.button,
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10
    },
    input: {
        height: 120,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        padding: 10,
        textAlignVertical: 'top'
    },
});

export default RemarkScreen;