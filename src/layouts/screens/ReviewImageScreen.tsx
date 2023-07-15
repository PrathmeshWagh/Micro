
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../style/Colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewImageScreen = ({ route, navigation }: any) => {
    const { data,task_id} = route.params;
    console.log("task_id",task_id)
    const [name, setName] = React.useState(data.name);
    const [remark, setRemark] = React.useState(data.remark);
    //  console.log("Review", data.name);
     
    const selectedImage = data;
    const Details = async () => {
        try {
            const storedImages = await AsyncStorage.getItem('images');
            let array_image = JSON.parse(storedImages);
            array_image.forEach(object => {
                if (data.id == object.id) {

                    object.remark = remark;
                    object.name = name;
                }

            })
            const remove_data = await AsyncStorage.removeItem('images');
            const add_data = await AsyncStorage.setItem('images', JSON.stringify(array_image));
            const get_data = await AsyncStorage.getItem('images');

            // console.log("getStoredImages", remove_data)
            // console.log("getStoredImages222", get_data)
            navigation.reset({
                routes: [{ name: 'ImageUploadScreen',  params: { taskId:task_id}
                 }] // Replace 'Home' with your desired screen name
              });
        } catch (error) {
            console.log('Error retrieving images:', error);
        }

    }



    return (
        <View style={{ padding: 30 }}>
            <Image source={{ uri: 'file://' + selectedImage.uri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setRemark}
                value={remark}
                placeholder="Remarks"
            />
            <Pressable
                onPress={Details}
                style={styles.uploadButton}>
                <Text style={styles.text}>Save Details</Text>
            </Pressable>
        </View>
    );
}

export default ReviewImageScreen;
const styles = StyleSheet.create({
    tinyImg: {
        height: 100,
        width: 100
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
        marginTop: 30
    },
    text: {
        padding: 5,
        fontFamily: 'Roboto-Medium',
        color: Colors.white
    },
})