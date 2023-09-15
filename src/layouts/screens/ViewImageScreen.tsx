import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Image, FlatList, ActivityIndicator, RefreshControl, Modal, Alert } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Card } from 'react-native-paper';
import { getMethod, postMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';


interface ImageItem {
    image_id: number;
    task_id: number;
    check_edit_delete: number;
}
const ViewImageScreen = ({ route, navigation }: any) => {
    const { taskId } = route.params;
    console.log("id", taskId)
    const [viewImage, setViewImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [modalImageURI, setModalImageURI] = useState(null);
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setLoading(true);
        const api: any = await getMethod(`get_attachment/${taskId}`);
        if (api.status === 200) {
            // console.log("apiData", api.data)
            setLoading(false);
            setViewImage(api?.data)
            //  console.log("apiData", viewImage)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await getdata();
        } catch (error) {
            console.log('Error refreshing:', error);
        }
        setRefreshing(false);
    };



    const createTwoButtonAlert = (image: string) => {
        Alert.alert('Alert', 'Are you sure you want to delete?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteData(image),
            },
        ]);
    };

    const deleteData = async (image: ImageItem) => {
        const { image_id } = image;
        const raw = {
            image_id: image_id,
            task_id: taskId
        }
        console.log("raw", raw)
        try {
            setLoading(true);
            const api: any = await postMethod(`delete_attachment`, raw);
            if (api.status === 200) {
                console.log("deleteData", api.data)
                setLoading(false);
                getdata()
            }
        }
        catch {
            console.log('catch')
        }

    }
    const openModal = (imageURI: string) => {
        setModalImageURI(imageURI);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalImageURI(null);
        setModalVisible(false);
    };

    const renderItem = (props: any) => {
        // console.log("props", props.item.file)
        return (
            <Card style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {props.item.check_edit_delete === 1 && (
                        <>
                            <Pressable
                                style={{ marginLeft: 280 }}
                                onPress={() =>
                                    navigation.dispatch(
                                        CommonActions.navigate({
                                            name: 'EditImageScreen',
                                            params: {
                                                data: props.item
                                            },
                                        })
                                    )
                                }
                            >
                                <AntDesign
                                    name="edit"
                                    size={22}
                                    color={'red'}
                                    style={{ marginRight: 20 }}
                                />
                            </Pressable>
                            <Pressable onPress={() => createTwoButtonAlert(props.item)} style={{ marginRight: 60 }}>
                                <Ionicons
                                    name="trash-bin"
                                    size={22}
                                    color={'red'}
                                />
                            </Pressable>
                        </>
                    )}

                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Pressable onPress={() => openModal(props.item.file)}>
                        <Image
                            style={styles.tinyImage}
                            source={{
                                uri: props.item.file,
                            }}
                        />
                    </Pressable>
                    <View style={styles.text}>
                        <Text style={styles.remark}>Name:{props.item.name == 'undefined' ? '....' : props.item.name}</Text>
                        <Text style={styles.remark}>Remark:{props.item.remark_for_photo == 'undefined' ? '....' : props.item.remark_for_photo}</Text>
                        <Text style={styles.date}>Date:{props.item.date}</Text>
                        <Text style={styles.name}>Uploaded By:{props.item.upload_by}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <>
            <Appbar title={'View Photo'} />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={viewImage}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />

                </View>
            )}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <Image
                        style={styles.modalImage}
                        source={{
                            uri: modalImageURI,
                        }}
                    />
                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeBtn}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
}
export default ViewImageScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.white
    },
    cover: {
        backgroundColor: Colors.white

    },
    card: {
        marginVertical: 5,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 20,

    },
    tinyImage: {
        height: 100,
        width: 80
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeBtn: {
        color: Colors.white,
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
    modalImage: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
        // Add other styles as needed
    },
    closeButton: {
        marginTop: 20
    },
    remark: {
        color: Colors.text_primary,
        marginVertical: 5,
        fontFamily: 'Roboto-Medium',
    },
    date: {
        color: Colors.text_primary,
        marginTop: 5,
        marginVertical: 5,
        fontFamily: 'Roboto-Medium',

    },

    text: {
        marginLeft: 30
    },
    name: {
        color: Colors.text_primary,
        fontFamily: 'Roboto-Medium',
    }
})