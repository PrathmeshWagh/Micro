import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Image, FlatList } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Card } from 'react-native-paper';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

const ViewImageScreen = ({ route }: any) => {
    const { user, setUser } = useContext(AuthContext);
    const { taskId } = route.params;
    const [viewImage, setViewImage] = useState([]);
    console.log(user.user_details.full_name,"aaaaaaaa")
    const fullname=user.user_details.full_name
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        const api: any = await getMethod(`get_attachment/${taskId}`);
        if (api.status === 200) {
            //   console.log("data", api)
            setViewImage(api?.data)
            //  console.log("apiData", viewImage)
        }
    }
    const renderItem = (props: any) => {
        //  console.log("props", props.item.upload_by)
        return (
            <Card style={styles.card}>
                <View style={{ flexDirection: 'row',}}>
                    <Image
                        style={styles.tinyImage}
                        source={{
                            uri: props.item.file,
                        }}
                    />
                    <View style={styles.text}>
                        <Text style={styles.remark}>{props.item.remark_for_photo}</Text>
                        <Text style={styles.date}>09-07-2023</Text>
                        <Text style={styles.name}>Uploaded By:{props.item.upload_by}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <>
            <Appbar title={'View Photo'} />
            <View style={styles.container}>
                <FlatList
                    data={viewImage}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
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
        height: 50,
        width: 50
    },
    remark: {
        color: Colors.text_primary
    },
    date: {
        color: Colors.text_primary,
        marginTop: 5
    },

    text:{
        marginLeft:30
    },
    name:{
color:Colors.text_primary
    }
})