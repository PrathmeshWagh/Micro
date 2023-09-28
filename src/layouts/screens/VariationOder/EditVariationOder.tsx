import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TextInput, Pressable, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import Appbar from '../../../components/Appbar';
import Colors from '../../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PhotoEditor from 'react-native-photo-editor';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { FormPostMethod, getMethod, postMethod } from '../../../utils/helper';
import { CommonActions } from '@react-navigation/native';
import { Modal, Portal } from 'react-native-paper';

interface EditVariationOrderProps {
    navigation: any;
    route: any;
}

interface ImageData {
    image_id: number;
    image: string;
}

interface DetailsData {
    variation_order_id: number;
    product: string;
    size: string;
    description: string;
    contact: string;
    remarks: string;
    images: ImageData[];
}
const EditVariationOrder: React.FC<EditVariationOrderProps> = ({ navigation, route }) => {
    const { project_id, variation_id } = route.params;
    console.log("....", project_id)
    const [imageUri, setImageUri] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [product, setProduct] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [remarks, setRemarks] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [details, setDetails] = useState<DetailsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        getdata();
    }, []);


    useEffect(() => {
        if (details) {
            const { product, size, description, remarks, contact } = details;
            setProduct(product || '');
            setSize(size || '');
            setDescription(description || '');
            setRemarks(remarks || '');
            setContact(contact || '');
        }
    }, [details]);

    const getdata = async () => {
        setIsLoading(true);
        const api: any = await getMethod(`edit_variation_order/${project_id}/${variation_id}`);
        if (api.status === 200) {
            setIsLoading(false);
            setDetails(api.data)
            //  console.log("apiData", viewImage)
        }
    }


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
            onDone: async (result) => {
                const updatedImages: string[] = [...imageUri, 'file://' + result];
                console.log("imageUri", updatedImages);
                setImageUri(updatedImages);
            },
            onCancel: () => {
                console.log('Photo editor cancelled');
            },
        });
    };

    const UpdateForm: any = async () => {
        const raw = {
            product: product,
            size: size,
            description: description,
            contact: contact,
            remarks: remarks,
            variation_order_id: variation_id,
            project_id: project_id
        }
        try {
            setLoader(true);
            const api: any = await postMethod(`update_variation_order`, raw);
            if (api.status === 200) {
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
                setLoader(false);
            } else {
                setLoader(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
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
    const ImageDelete: any = async (img_id: number) => {
        const raw = {
            variation_order_id: variation_id,
            image_id: img_id
        }
        try {
            const api: any = await postMethod(`delete_variation_order_image`, raw);
            if (api.status === 200) {
                console.log("api", api.data)
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                getdata()
            } else {
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
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
    const UpdateImage = async () => {

        const formData = new FormData();
        for (let i = 0; i < imageUri.length; i++) {
            formData.append('file[]', {
                uri: imageUri[i],
                type: 'image/jpg', // Make sure to determine the correct image type
                name: `image_${i}.jpg`, // Use a unique name for each image
            });
        }
        formData.append('variation_order_id', variation_id);
        formData.append('project_id', project_id);
        console.log("formData", formData)
        try {
            setLoading(true);
            const api: any = await FormPostMethod(`upload_variation_order_image`, formData);
            if (api.status === 200) {
                setLoading(false);
                console.log("...", api.data)
                Snackbar.show({
                    text: api.data,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.dispatch(CommonActions.goBack())
            } else {
                setLoading(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
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
    const openModal = (uri: string) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };
    return (

        <SafeAreaView style={styles.container}>
            <Appbar title={'Variation Oder'} />
            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.brand_primary} />
            ) : (
                <ScrollView style={styles.cover}>
                    <Text style={styles.inputText}>Products / Services</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setProduct}
                        value={product}

                    />
                    <Text style={styles.inputText}>Size / Qty</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSize}
                        value={size}

                    />
                    <Text style={styles.inputText}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}
                    />
                    <Text style={styles.inputText}>Customer Contact Details</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setContact}
                        value={contact}
                    />
                    <Text style={styles.inputText}>Remarks</Text>
                    <TextInput
                        style={styles.inputR}
                        onChangeText={setRemarks}
                        value={remarks}
                        multiline={true}
                    />
                    <Text style={styles.inputText}>Images</Text>
                    <View style={styles.imgCard}>
                        <ScrollView horizontal>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                {details?.images.map((uri, index) => (
                                    <View key={index} style={{ padding: 8, marginTop: -10 }}>
                                        <Pressable onPress={() => ImageDelete(uri.image_id)}>
                                            <IonIcon name="close-sharp" color={Colors.text_primary} size={20} style={{ marginLeft: 100 }} />
                                        </Pressable>
                                        <Pressable onPress={() => openModal(uri.image)}>
                                            <Image
                                                source={{ uri: uri.image }}
                                                style={{ width: 120, height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                            />
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </View>
                    <Pressable
                        style={styles.uploadButton}
                        onPress={loader ? null : UpdateForm}
                        disabled={loader} // Optionally disable the button visually
                    >
                        {loader ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.text}>Save Details</Text>
                        )}
                    </Pressable>
                    <Pressable onPress={() => open()}>
                        <Text style={styles.inputText}>Upload Images  <IonIcon name="camera" color={Colors.text_primary} size={20} /></Text>
                    </Pressable>
                    <View style={styles.imgCard}>
                        <ScrollView horizontal>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                {imageUri?.map((uri, index) => (
                                    <View key={index} style={{ padding: 8, marginTop: -10 }}>
                                        <Image
                                            source={{ uri: uri }}
                                            style={{ width: 120, height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                                        />

                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </View>
                    <Pressable
                        style={styles.uploadButton}
                        onPress={loading ? null : UpdateImage}
                        disabled={loading} // Optionally disable the button visually
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.text}>Save Images</Text>
                        )}
                    </Pressable>
                </ScrollView>
            )}
            <Portal>
                <Modal visible={modalVisible} onDismiss={closeModal}>
                    <View style={{ backgroundColor: 'white', padding: 30 }}>
                        {selectedImage && (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ width: '100%', height: 350, borderRadius: 8 }}
                            />
                        )}
                        <Pressable onPress={closeModal} style={styles.close}>
                            <Text style={{ fontSize: 18, color: Colors.text_primary }}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

export default EditVariationOrder;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        height: 200,
        width: 200
    },
    close: {
        marginVertical: 20,
        alignSelf: 'center',
        color: Colors.text_primary
    },
    chooseFile: {
        fontFamily: 'Roboto-Regular'
    },
    uploadedImage: {
        width: 250,
        height: 150,
    },
    cover: {
        padding: 14,
        backgroundColor: Colors.screen_bg,
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgCard: {
        backgroundColor: Colors.white,
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 10,
        padding: 20,
        margin: 12,
        elevation: 5,
        height: 200
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 5,
        color:Colors.text_primary
    },
    inputR: {
        height: 120,
        marginVertical: 22,
        marginHorizontal: 12,
        borderWidth: 1,
        padding: 10,
        // paddingBottom:50,
        borderColor: 'white',
        backgroundColor: Colors.white,
        borderRadius: 2,
        elevation: 8,
        textAlignVertical: 'top',
        color:Colors.text_primary
    },
    inputText: {
        marginHorizontal: 12,
        color: Colors.text_primary,
        fontFamily: 'Roboto-Medium',
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: Colors.button,
        backgroundColor: Colors.button,
        padding: 6,
        width: 350,
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 40
    },
    text: {
        padding: 5,
        fontFamily: 'Roboto-Bold',
        color: Colors.white,
        fontSize: 18
    },
})