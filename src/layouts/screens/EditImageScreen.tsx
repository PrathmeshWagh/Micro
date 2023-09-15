import React, { useContext, useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from '../../style/Colors/colors';
import FastImage from 'react-native-fast-image';
import Appbar from '../../components/Appbar';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../utils/appContext';
import { FormPostMethod, getMethod, postMethod, storeData } from '../../utils/helper';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
interface Props {
    route: {
        params: {
            data: {
                task_id: number;
                image_id: number;
            };
        };
    };
}
interface ImageData {
    date: string;
    file: string;
    image_id: number;
    name: string;
    remark_for_photo: string | null;
    task_id: number;
}
const EditImageScreen: FC<Props> = ({ route }: any): JSX.Element => {
    const { data } = route.params;
    // console.log("imgdata", data)
    const navigation = useNavigation();

    const [remark, setRemark] = useState<string>('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<ImageData | null>(null);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        if (details) {
            const { name, remark_for_photo } = details;
            setName(name || '');
            setRemark(remark_for_photo || '');

        }
    }, [details]);
    const open = () => {
        Alert.alert('Please Choose a option', 'from below', [
            {
                text: 'Gallery',
                onPress: () => ImgSelectGallery(),
            },
            {
                text: 'Camera',
                onPress: () => ImgSelectCamera(),
            },
            { text: 'Cancel', onPress: () => console.log('Cancel') },
        ]);
    }

    const ImgSelectCamera = async () => {
        try {
            const img = await ImagePicker.openCamera({
                cropping: true,
            });
            // console.log('img', img);
            let photoPath = await RNFS.DocumentDirectoryPath + `img-${new Date().valueOf()}.jpg`;
            const moveImg = await RNFS.moveFile(img.path, photoPath)
            openPhotoEditor(photoPath);
            // console.log('photoPath', photoPath);

        } catch (e) {
            console.log(e);
        }
    };

    const ImgSelectGallery = async () => {
        try {
            const img = await ImagePicker.openPicker({
                cropping: true,
            });
            // console.log('img', img.path);
            let filename = img.path.substring(img.path.lastIndexOf('/') + 1);
            let photoPath = await RNFS.DocumentDirectoryPath + `${filename}`;
            const moveImg = await RNFS.moveFile(img.path, photoPath)
            openPhotoEditor(photoPath)
        } catch (e) {
            console.log(e);
        }
    }

    const openPhotoEditor = (img: string) => {
        PhotoEditor.Edit({
            hiddenControls: ['sticker', 'crop'],
            path: img,
            onDone: async (result: any) => {
                console.log('result', result)
                setImageUri('file://' + result);
            },
            onCancel: () => {
                console.log('Photo editor cancelled');
            },
        });
    };

    const getdata = async () => {
        setIsLoading(true);
        const api: any = await getMethod(`edit_attachment/${data.task_id}/${data.image_id}`);
        if (api.status === 200) {
            console.log("apiData", api.data)
            setIsLoading(false);
            setDetails(api.data)
            //  console.log("apiData", viewImage)
        }
    }



    const EditDetails = async () => {
        // console.log("imageUri", imageUri + details?.file)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('remark', remark);
        // formData.append('file', imageUri)
        formData.append('file', {
            uri: imageUri || details?.file,
            type: 'image/jpg',
            name: `image.jpg`,
        });
        formData.append('task_id', data.task_id);
        formData.append('image_id', data.image_id);
        console.log("formData", formData)
        try {
            const api: any = await FormPostMethod(`update_attachment`, formData);
            if (api.status === 200) {
                setLoading(true);
                console.log("...", api.data)
                // Snackbar.show({
                //     text: api.data,
                //     duration: Snackbar.LENGTH_SHORT,
                //     textColor: 'white',
                //     backgroundColor: 'green',
                // });
                navigation.dispatch(CommonActions.goBack())
            } else {
                setLoading(false);
                // Snackbar.show({
                //     text: api.data,
                //     duration: Snackbar.LENGTH_SHORT,
                //     textColor: '#AE1717',
                //     backgroundColor: '#F2A6A6',
                // });
            }
        }
        catch (e) {
            console.log("catch", e)
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
            <Appbar title={'Edit Image'} />
            <View style={{ padding: 30 }}>
                {isLoading ? ( // Show loader when isLoading is true
                    <ActivityIndicator size="large" color={Colors.brand_primary} />
                ) : (
                    <>
                        <Pressable>
                            <Image
                                source={{
                                    uri: imageUri || details?.file
                                }}
                                style={{ width: 300, height: 250, alignSelf: 'center' }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={open}
                            style={styles.uploadButton}>
                            <Text style={styles.text}>Change Image</Text>
                        </Pressable>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input2}
                            multiline={true}
                            onChangeText={setRemark}
                            value={remark}
                            placeholder="Remarks"
                        />
                        <Pressable
                            onPress={EditDetails}
                            style={styles.uploadButton}>
                            {
                                loading ? (
                                    <ActivityIndicator size="small" color={Colors.white} />
                                )
                                    :
                                    (
                                        <Text style={styles.text}>Save Details</Text>

                                    )

                            }
                        </Pressable>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tinyImg: {
        height: 100,
        width: 100
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
        padding: 10,

    },
    input2: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray,
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: Colors.button,
        backgroundColor: Colors.button,
        padding: 6,
        width: 120,
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 10
    },
    text: {
        padding: 5,
        fontFamily: 'Roboto-Medium',
        color: Colors.white
    },
})

export default EditImageScreen;