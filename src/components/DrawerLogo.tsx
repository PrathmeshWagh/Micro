import React from "react";
import {Text, View,StyleSheet, Image } from "react-native";
import Colors from "../style/Colors/colors";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";


const DrawerLogo =({props}:any)=>{
    const navigation=useNavigation();

    return(
    <View style={{flex:1,marginTop:-4}}>
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
        <View style={{flexDirection:'row'}}>
            <Image
        style={styles.tinyLogo}
         source={require('../style/Img/profileImg.png')}
       />
       <Text style={styles.text}>John</Text>
       </View>
            </View>
            <View style={{marginTop:20}}>
                <DrawerItem
                    icon={() => (
                        <Image
                        source={require('../style/Img/attendence.png')}
                        style={styles.icon}
                        />
                    )}
                    label={() => (<Text style={styles.RouteName}>Attendance</Text>)}
                    onPress={() =>navigation.navigate('AttendanceScreen')}
                />
                <DrawerItem
                    icon={() => (
                 <Image source={require('../style/Img/changePsw.png')}
                        style={styles.icon}
                        />                    )}
                    label={() => (<Text style={styles.RouteName}>Change Password</Text>)}
                    onPress={() => {props.navigation.navigate('ChangePassword')}}
                />
                <DrawerItem
                    icon={() => (
                        <Image source={require('../style/Img/logout.png')}
                        style={styles.icon}
                        />   
                    )}
                    label={({ focused, color }) => (<Text style={styles.RouteName}>Logout</Text>)}
                    onPress={() => {props.navigation.navigate('ChangePassword')}}
                />
            </View>



            </DrawerContentScrollView>
</View>
    )
}
export default DrawerLogo;
const styles = StyleSheet.create({
    drawerContent:{
        height:170,
        backgroundColor:Colors.brand_primary,
    },
   
    text:{
       color:Colors.white,
       marginTop:120,
       fontSize:18,
       fontFamily:'Roboto-Bold',
    },
    RouteName:{
        fontFamily:'Roboto-Medium',
        fontSize:18,
        color:Colors.text_primary,
    },
    cover:{
        paddingLeft:30,
        marginTop:50
    },
    icon:{
        height:20,
        width:20
    },
    tinyLogo:{
        marginLeft:20,
        marginTop:55,
        height:100,
        width:100
    }
})