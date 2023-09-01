import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from "@react-navigation/native";

const Appbar = ({ title }: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.align}>
        <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <IonIcon style={styles.icon} name="arrow-back" size={28} color={'white'} />
        </Pressable>
        <Image
          style={styles.tinyLogo}
          source={require('../style/Img/bell2.png')}
        />
      </View>
      <Text style={styles.pageName}>{title}</Text>
    </View>
  );
};

export default Appbar;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand_primary,
    height: 150,
    width: "100%",
    padding: 14
  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  icon: {

  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageName: {
    alignSelf: 'center',
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 20

  }
})