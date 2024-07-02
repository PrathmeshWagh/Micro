import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, Modal, Alert, Pressable, Image, FlatList, PermissionsAndroid, Platform, Linking } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Card } from 'react-native-paper';
import { getMethod, postMethod } from '../../utils/helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import DeviceInfo from 'react-native-device-info';

const ViewImageScreen = ({ route, navigation }) => {
    const { taskId } = route.params;
    const [viewImage, setViewImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalImageURI, setModalImageURI] = useState(null);

    // Fetch data when screen is focused
    useFocusEffect(
        useCallback(() => {
            getImages();
        }, [])
    );

    // Function to fetch images from API
    const getImages = async () => {
        setLoading(true);
        try {
            const api = await getMethod(`get_attachment/${taskId}`);
            if (api.status === 200) {
                setViewImage(api.data);
            } else {
                console.log('Error fetching images:', api);
            }
        } catch (error) {
            console.log('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle pull-to-refresh
    const onRefresh = () => {
        setRefreshing(true);
        getImages().finally(() => setRefreshing(false));
    };

    // Function to confirm deletion of an image
    const confirmDelete = (image) => {
        Alert.alert('Alert', 'Are you sure you want to delete?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteImage(image),
            },
        ]);
    };

    // Function to delete an image
    const deleteImage = async (image) => {
        const { image_id } = image;
        const raw = { image_id, task_id: taskId };
        try {
            setLoading(true);
            const api = await postMethod(`delete_attachment`, raw);
            if (api.status === 200) {
                getImages(); // Refresh image list after deletion
            } else {
                console.log('Error deleting image:', api);
            }
        } catch (error) {
            console.log('Error deleting image:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to open modal with image
    const openModal = (imageURI) => {
        setModalImageURI(imageURI);
        setModalVisible(true);
    };

    // Function to close modal
    const closeModal = () => {
        setModalVisible(false);
        setModalImageURI(null);
    };

    const requestStoragePermission = async () => {
        try {
            // Get Android version
            const androidVersion = parseInt(DeviceInfo.getSystemVersion(), 10);
            
            // Request appropriate permission based on Android version
            if (androidVersion >= 13) {
                // Request READ_MEDIA_IMAGES for Android 13 and above
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: 'Storage Permission',
                        message: 'This app needs access to your storage to download photos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                // Request WRITE_EXTERNAL_STORAGE for Android below 13
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'This app needs access to your storage to download photos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        } catch (err) {
            console.error('Storage permission error:', err);
            return false;
        }
    };
    
    const downloadAndSaveImage = async (imageURI) => {
        const granted = await requestStoragePermission();
        if (!granted) {
            Alert.alert('Permission Denied', 'You need to grant storage permission to download the image.');
            return;
        }
    
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        const fileName = imageURI.split('/').pop();
        const path = `${PictureDir}/${fileName}`;
    
        try {
            const res = await config({
                fileCache: true,
                appendExt: 'jpg', // or the appropriate extension for your images
                path: path,
            }).fetch('GET', imageURI);
    
            if (res.info().status === 200) {
                // Image downloaded successfully, save it to the gallery
                await RNFetchBlob.fs.scanFile([{ path: path, mime: 'image/jpeg' }])
                    .then(() => {
                        Alert.alert('Download Complete', 'Image downloaded successfully to your gallery.');
                    })
                    .catch((error) => {
                        console.error('Save error:', error);
                        Alert.alert('Save Error', 'An error occurred while saving the image.');
                    });
            } else {
                // Handle download failure
                Alert.alert('Download Failed', 'Failed to download image.');
            }
        } catch (error) {
            // Handle download error
            console.error('Download error:', error);
            Alert.alert('Download Error', 'An error occurred while downloading the image.');
        }
    };

    
           



    const renderItem = ({ item }) => {
        return (
            <Card style={styles.card}>
                <View style={{ flexDirection: 'row', marginLeft: 220 }}>
                    <Pressable onPress={() => downloadAndSaveImage(item.file)}>
                        <AntDesign
                            name="download"
                            size={22}
                            color={'red'}
                            style={{ marginHorizontal: 10 }}
                        />
                    </Pressable>
                    {item.check_edit_delete === 1 && (
                        <>
                            <Pressable onPress={() => navigation.navigate('EditImageScreen', { data: item })}>
                                <AntDesign
                                    name="edit"
                                    size={22}
                                    color={'red'}
                                    style={{ marginRight: 10, }}
                                />
                            </Pressable>
                            <Pressable onPress={() => confirmDelete(item)} style={{ marginRight: 60 }}>
                                <Ionicons
                                    name="trash-bin"
                                    size={22}
                                    color={'red'}
                                />
                            </Pressable>
                        </>
                    )}

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => openModal(item.file)}>
                        <Image
                            style={styles.tinyImage}
                            source={{ uri: item.file }}
                        />
                    </Pressable>
                    <View style={styles.text}>
                        <Text style={styles.remark}>Name: {item.name || '...'}</Text>
                        <Text style={styles.remark}>Remark: {item.remark_for_photo || '...'}</Text>
                        <Text style={styles.date}>Date: {item.date}</Text>
                        <Text style={styles.name}>Uploaded By: {item.upload_by}</Text>
                    </View>
                </View>
            </Card>
        );
    };

    // Function to save picture with specified tag, type, and album

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
                        keyExtractor={(item) => item.id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                        source={{ uri: modalImageURI }}
                    />
                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeBtn}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.white
    },
    card: {
        marginVertical: 5,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 20,
        margin: 3
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
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5
    },
    text: {
        marginLeft: 10
    },
    remark: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 14,
        color: 'gray'
    },
    name: {
        fontSize: 14,
        color: 'gray'
    }
});
