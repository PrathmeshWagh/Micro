
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, Button, Alert, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Colors from '../../style/Colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appbar from '../../components/Appbar';
import { CommonActions } from '@react-navigation/native';

const ReviewImageScreen = ({ route, navigation }: any) => {
    const { data, task_id } = route.params;
    console.log("task_id", task_id)
    const [name, setName] = React.useState(data.name);
    const [remark, setRemark] = React.useState(data.remark);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await Details();
        } catch (error) {
            console.log('Error refreshing:', error);
        }
        setRefreshing(false);
    };
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

            navigation.dispatch(
                CommonActions.navigate({
                    name: 'ImageUploadScreen',
                    params: {
                        taskId: task_id,
                    },
                })
            )
        } catch (error) {
            console.log('Error retrieving images:', error);
        }

    }



    return (
        <>
            <Appbar title='Review Image' />
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {/* <View style={{ padding: 30 }}> */}
                    <Image source={{ uri: 'file://' + selectedImage.uri }} style={{ width: 250, height: 250, alignSelf: 'center' }} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Enter Name"
                        placeholderTextColor={Colors.text_secondary}
                    />
                    <TextInput
                        style={styles.input2}
                        multiline={true}
                        onChangeText={setRemark}
                        value={remark}
                        placeholder="Enter Remarks"
                        placeholderTextColor={Colors.text_secondary}

                    />
                    <Pressable
                        onPress={Details}
                        style={styles.uploadButton}>
                        <Text style={styles.text}>Save Details</Text>
                    </Pressable>
                {/* </View> */}
            </ScrollView>
        </>
    );
}

export default ReviewImageScreen;
const styles = StyleSheet.create({
    tinyImg: {
        height: 100,
        width: 100
    },
    container:{
padding:30
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        backgroundColor:Colors.lightGray,
        padding: 10,
        color: Colors.text_primary
    },
    input2: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        backgroundColor:Colors.lightGray,
        padding: 10,
        textAlignVertical: 'top',
        color: Colors.text_primary
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