import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../style/Colors/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';

const CustomTopTabBar = ({ state, descriptors, project_id, navigation }: any) => {
    console.log("project_idproject_id", project_id)
    // const navigation = useNavigation();
    return (
        <View>
            <View style={styles.cover}>
                <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
                    <IonIcon style={styles.icon} name="arrow-back" size={28} color={'white'} />
                </Pressable>
                <Text style={styles.pageName}>Task</Text>
                <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
                  <Image
                    style={styles.tinyLogo}
                    source={require('../style/Img/bell2.png')}
                  />
                </Pressable>
            </View>
            <View style={styles.container}>
                {state.routes.map((route: { key: string | number; name: any; }, index: React.Key | null | undefined) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel || options.title || route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        console.log("route.key", route.key)
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.6}
                            onPress={onPress}
                            style={[styles.tabButton, isFocused && styles.tabButtonActive]}
                        >
                            <Text style={[styles.tabText, isFocused && styles.tabTextActive]}>{label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    pageName: {
        fontSize: 28,
        color: Colors.white,
        fontFamily: 'Roboto-Bold',
        marginTop: 20

    },
    cover: {
        backgroundColor: Colors.brand_primary,
        paddingBottom: 60,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tinyLogo: {
        width: 22,
        marginTop: 5
    },
    icon: {

    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabButtonActive: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.red,
        backgroundColor: Colors.red,
        borderRadius: 8,
        alignSelf:'center',
        alignItems:'center'
    },
    tabText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Roboto-Medium',
        alignSelf: 'center'
    },
    tabTextActive: {
        color: 'white',
        alignSelf: 'center'
    },
});

export default CustomTopTabBar;