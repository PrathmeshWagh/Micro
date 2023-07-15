import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../style/Colors/colors";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../utils/appContext";
import { getStorageData, postMethod } from "../utils/helper";
import Snackbar from "react-native-snackbar";


// interface UserData {
//     token: string;
//     user_details: {
//       email: string;
//       first_name: string;
//       id: number;
//       last_name: string;
//     };
//   }

const DrawerLogo = ({ props }: any) => {
    const { user, setUser } = useContext(AuthContext);
    // const [person, setPerson] = useState<UserData>()
    //   console.log('token', user);
    const navigation: any = useNavigation();
    const LogOut = async () => {
        try {
          
            const data = await getStorageData();
            // setPerson(data)
            const api: any = await postMethod(`logout`, data.token);
            if (api.status === 200) {
                navigation.navigate("Login")
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
                text: "Some Error Occured-" + e,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
        }

    }

    return (
        <View style={{ flex: 1, marginTop: -4 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.tinyLogo}
                            source={{uri:user.avatar}}
                        />
                        <Text style={styles.text}>{user.user_details.full_name}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {/* <DrawerItem
                        icon={() => (
                            <Image
                                source={require('../style/Img/attendence.png')}
                                style={styles.icon}
                            />
                        )}
                        label={() => (<Text style={styles.RouteName}>Attendance</Text>)}
                        onPress={() => navigation.navigate('AttendanceScreen')}
                    /> */}
                    <DrawerItem
                        icon={() => (
                            <Image source={require('../style/Img/changePsw.png')}
                                style={styles.icon}
                            />)}
                        label={() => (<Text style={styles.RouteName}>Change Password</Text>)}
                        onPress={() => navigation.navigate('AttendanceScreen')} />
                    <DrawerItem
                        icon={() => (
                            <Image source={require('../style/Img/logout.png')}
                                style={styles.icon}
                            />
                        )}
                        label={({ focused, color }) => (<Text style={styles.RouteName}>Logout</Text>)}
                        onPress={() => LogOut()} />
                </View>



            </DrawerContentScrollView>
        </View>
    )
}
export default DrawerLogo;
const styles = StyleSheet.create({
    drawerContent: {
        height: 170,
        backgroundColor: Colors.brand_primary,
    },

    text: {
        color: Colors.white,
        marginTop: 120,
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
    },
    RouteName: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: Colors.text_primary,
    },
    cover: {
        paddingLeft: 30,
        marginTop: 50
    },
    icon: {
        height: 20,
        width: 20
    },
    tinyLogo: {
        marginLeft: 20,
        marginTop: 80,
        marginRight:10,
        height: 80,
        width: 80,
        borderRadius:60
    }
})