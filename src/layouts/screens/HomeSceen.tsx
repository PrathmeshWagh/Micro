import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'react-native';
import Colors from '../../style/Colors/colors';
import { Card, Surface } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getStorageData } from '../../utils/helper';
import { UserData } from '../../components/DrawerLogo';
const HomeScreen = ({ navigation }: any) => {
  const [userDetails, setUserDetails] = useState<UserData>()

  useFocusEffect(
    useCallback(() => {
      getStoredData();
    }, [])
  );


  const getStoredData = async () => {
    try {
      const storedData = await getStorageData();
      console.log("storedData",storedData)
      setUserDetails(storedData)
    }
    catch (error) {
      console.log('Error retrieving images:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabBar}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            style={styles.icon}
            source={require('../../style/Img/BulletedList.png')}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
          <Image
            style={styles.icon}
            source={require('../../style/Img/bell.png')}
          />
        </Pressable>
      </View>
      <Image
        style={styles.tinyLogo}
        source={require('../../style/Img/logo.png')}
      />

      <Text style={styles.name}>Hi, {userDetails?.user_details?.first_name}{" "}{userDetails?.user_details?.last_name}</Text>
      <View style={styles.align}>
        <Pressable onPress={() => navigation.navigate('CompleteScreen')}>
          <Surface style={styles.surface} elevation={4}>
            <Image
              style={styles.boxIcon}
              source={require('../../style/Img/Completed.png')}
            />
            <Text style={styles.boxText}>Completed</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('InprogressScreen')}>
          <Surface style={styles.surface2} elevation={4}>
            <Image
              style={styles.boxIcon}
              source={require('../../style/Img/Inprogress.png')}
            />
            <Text style={styles.boxText}>Inprogress</Text>
          </Surface>
        </Pressable>
      </View>
      <View style={styles.align2}>
        <Pressable onPress={() => navigation.navigate('PendingScreen')}>

          <Surface style={styles.surface2} elevation={4}>
            <Image
              style={styles.boxIcon}
              source={require('../../style/Img/Pending.png')}
            />
            <Text style={styles.boxText}>Pending</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('HistoryScreen')}>
        <Surface style={styles.surface} elevation={4}>
          <Image
            style={styles.boxIcon}
            source={require('../../style/Img/History.png')}
          />
          <Text style={styles.boxText}>History</Text>
        </Surface>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: Colors.screen_bg
  },
  bg: {
    flex: 1,
    paddingHorizontal: 20
  },
  name: {
    fontSize: 26,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
    marginTop: 30,
    marginLeft: 20

  },
  AddTask: {
    color: Colors.red,
    position: 'absolute',
    bottom: -15,
    right: 10,

    fontFamily: 'Roboto-Regular'
  },
  card: {
    marginTop: 45,
    backgroundColor: Colors.white,
    marginBottom: 60,
    padding: 25,
    width: 330,
    alignSelf: 'center'
  },
  cardTitle: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,

  },
  cardText: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginTop: 5
  },

  boxText: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 32
  },
  align2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tinyLogo: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    height: 25,
    width: 25
  },
  button: {
    backgroundColor: Colors.red,
    height: 40,
    width: 150,
    alignSelf: 'center',
    marginTop: 45,
    borderRadius: 8
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingVertical: 5
  },
  surface: {
    padding: 8,
    height: 90,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brand_primary,
    borderRadius: 8
  },
  surface2: {
    padding: 8,
    height: 90,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7575FF',
    borderRadius: 8
  },
  boxIcon: {
    height: 30,
    width: 30
  }
})
