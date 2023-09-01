import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Card } from 'react-native-paper';
import { getMethod, postMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface ImageItem {
    image_id: number;
    task_id: number;
    // ... Other properties
    check_edit_delete: number;
}
const ViewImageScreen = ({ route }: any) => {
    const { user, setUser } = useContext(AuthContext);
    const { taskId } = route.params;
    const [viewImage, setViewImage] = useState([]);
    const [loading, setLoading] = useState(true);
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
                getdata()
                setLoading(false);
            }
        }
        catch {
            console.log('catch')
        }

    }


    const renderItem = (props: any) => {
        // console.log("props", props.item.file)
        return (
            <Card style={styles.card}>
                {props.item.check_edit_delete === 1 && (
                    <Pressable onPress={() => deleteData(props.item)} style={{ marginLeft: 280}}>
                        <Ionicons
                            name="trash-bin"
                            size={22}
                            color={'red'}
                        />
                    </Pressable>

                )}
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        style={styles.tinyImage}
                        source={{
                            uri: props.item.file,
                        }}
                    />
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
                <ActivityIndicator size="small" color="#000" />
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={viewImage}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}
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