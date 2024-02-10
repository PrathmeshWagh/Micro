import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, ScrollView, Alert, Image, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { getMethod, postMethod } from '../../utils/helper';
import { Modal, Portal } from 'react-native-paper';

interface Props {
    params: { taskId: number; }
}
const RemarkScreen: FC<Props> = ({ route }: any): JSX.Element => {
    const [remark, setRemark] = useState<string>();
    const [load, setLoad] = useState<boolean>(false);
    const [isload, setIsLoad] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [editRemarks, setEditRemark] = useState<string>();
    const [remarkvalue, setRemarkvalue] = useState<string>()
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

    const editRemark = async (remark_id: number) => {
        console.log("remark_id", remark_id)
        setIsLoad(true);
        const api: any = await getMethod(`edit_remark/${taskId}/${remark_id}`);
        if (api.status === 200) {
            console.log("apiData", api.data)
            setIsLoad(false);
            setEditRemark(api.data)
            setRemarkvalue(api.data.remark);
            //  console.log("apiData", viewImage)
        }
    }

    const toggleModal = (remarkId: number) => {
        setModalVisible(!isModalVisible);
        if (remarkId) {
            editRemark(remarkId);
        }
    };


    const updateRemark = async () => {
        console.log("remark_id34",)
        const raw = {
            remark_id: editRemarks?.remark_id,
            task_id: taskId,
            remark: remarkvalue
        }
        console.log("raw", raw)
        try {
            setIsLoading(true);
            const api: any = await postMethod(`update_remark`, raw);
            if (api.status === 200) {
                console.log(api.data)
                setIsLoading(false);
                setRemarkvalue('');
                getRemark()
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: Colors.white,
                    backgroundColor: 'green',
                });
                toggleModal(editRemarks?.remark_id)
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
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.brand_primary} style={{ marginTop: 20 }} />
                ) : (
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
                                    {item.check_delete_edit === 1 && (
                                        <>
                                            <Pressable onPress={() => toggleModal(item.remark_id)}>
                                                <Text style={styles.edit}>Edit | </Text>
                                            </Pressable>
                                            <Pressable onPress={() => createTwoButtonAlert(item.remark_id)}>
                                                <Text style={styles.edit}>Delete</Text>
                                            </Pressable>
                                        </>
                                    )}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
            <Portal>
                <Modal
                    visible={isModalVisible}
                    onDismiss={toggleModal}
                    contentContainerStyle={styles.modalContainer}
                >
                    <Text style={styles.EditText}>Edit Remark</Text>
                    {isload ?
                        (
                            <ActivityIndicator size="large" color={Colors.brand_primary} />
                        )
                        :
                        (
                            <>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setRemarkvalue}
                                    value={remarkvalue}
                                    multiline={true}
                                    placeholder=""
                                />
                                <Pressable
                                    onPress={isLoading ? null : updateRemark} // Disable onPress when load is true
                                    style={[styles.endButton, isLoading && styles.disabledButton]}>
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color={Colors.white} />
                                    ) : (
                                        <Text style={styles.textEnd}>Update</Text>
                                    )}
                                </Pressable>
                            </>
                        )
                    }

                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.screen_bg
    },
    EditText: {
        fontFamily: 'Roboto-Medium',
        color: Colors.text_primary,
        fontSize: 18
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        paddingVertical: 40,
        borderRadius: 8,
    },
    modal: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 350
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
        marginVertical: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        padding: 10,
        height:200,
        textAlignVertical:'top',
        color: Colors.text_primary
      
    },
});

export default RemarkScreen;