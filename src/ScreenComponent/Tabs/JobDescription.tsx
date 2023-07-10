import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { useNavigation } from '@react-navigation/native';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

const JobDescription = ({props}:any) => {
  const navigation = useNavigation();
  const [task, seTask] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  console.log("props",props)
  
  return (
    <View style={styles.cover}>
      <Card style={styles.card}>
        <View>
          <Text style={styles.jobSheet}>{props.task_title}</Text>
          <Text style={styles.address}>1 Yishun Industrial Street 1, {'\n'}07-36 A'Posh Bizhub,{'\n'} Singapore 768160</Text>
          <Text style={styles.team}>Team members</Text>
          <View style={styles.align}>
            <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
            <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />
            <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
            <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />

          </View>
          <Text style={styles.startDate}>Start Date</Text>
          <View style={styles.align}>
            <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
            <Text style={styles.date}>23 May 2023</Text>
          </View>
        </View>
        <View>
          <View style={styles.indecator}>

            <View style={styles.taskIconAlign}>
              <Text style={{ bottom: 15, right: -70 }}>End Date</Text>
              <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
              <Text style={styles.date}>23 May 2023</Text>
            </View>
          </View>

        </View>
      </Card>
    </View>
  );
};

export default JobDescription;
const styles = StyleSheet.create({
  cover: {
    marginTop: 54,
    marginHorizontal: 14
  },
  startDate: {
    color: Colors.text_primary,
    marginTop: 5,
    fontFamily: 'Roboto-Regular',
  },
  containerAppbar: {
    backgroundColor: Colors.brand_primary,
    height: 150,
    width: "100%",
    padding: 14
  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  taskIconAlign: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 30
  },
  taskicon: {
    position: 'absolute',
    top: 50
  },
  align2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageName: {
    alignSelf: 'center',
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 25
  },
  card: {
    marginTop: 30,
    padding: 20,
    backgroundColor: Colors.card_bg
  },
  task: {
    color: Colors.text_secondary,
    marginLeft: 5,
    marginTop: 5
  },
  indecator: {
    position: 'absolute',
    right: 0,
    bottom: 10
  },
  icon: {

  },
  date: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 14,
    color: Colors.text_secondary,

  },
  align: {
    flexDirection: 'row',
    marginBottom: 5
  },
  container: {
    padding: 14
  },
  calender: {
    marginVertical: 5,
  },
  jobSheet: {
    color: Colors.text_primary,
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold'
  },
  address: {
    color: Colors.text_secondary,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  team: {
    fontSize: 18,
    color: Colors.text_primary,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto-Bold'

  }
})