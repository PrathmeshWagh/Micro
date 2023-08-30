import React from 'react';
import { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, RefreshControl, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, Avatar, Checkbox } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { useNavigation } from '@react-navigation/native';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

interface Props {
  navigate: any;
}
const DailyActivityScreen: FC<Props> = (): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    // getdata();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView style={styles.cover}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {/* {
            taskList.map((data, index) => (
              <View key={index}>
                <Pressable onPress={() => navigation.navigate('TaskDetailScreen', {
                  taskId: data?.task_id
                })}> */}
        <Card style={styles.card}>
          <View style={{ position: 'absolute', right: -25, top: -25 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          <View>
            <Text style={styles.jobSheet}>Task 1</Text>
            <Text style={styles.address}>1 Yishun Industrial Street 1,
              #07-36 A'Posh Bizhub, Singapore 768160</Text>
            <Text style={styles.team}>Team members</Text>
            <View style={styles.align}>
              {/* {
                          data.user_data.map((data, index) => (
                            <View key={index}>
                              <Avatar.Image size={24} source={{ uri: data.profile }} />
                            </View>
                          ))} */}

            </View>
            <Text style={styles.startDate}>Start Date</Text>
            <View style={styles.align}>
              <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
              <Text style={styles.date}>task_date_start</Text>
            </View>
          </View>
          <View>
            <View style={styles.indecator}>
              <View style={styles.taskIconAlign}>
                <Text style={{ bottom: 15, right: -70 }}>End Date</Text>
                <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                <Text style={styles.date}>task_date_due</Text>
              </View>
            </View>
          </View>
        </Card>
        {/* </Pressable>
              </View>
             ))} */}

      </ScrollView>
      <Pressable style={styles.btn} onPress={()=> navigation.navigate('DailyActivityDescriptionScreen')}>
        <Text style={styles.btnText}>
          Submit
        </Text>
      </Pressable>
    </>
  )
};
const styles = StyleSheet.create({
  cover: {
    backgroundColor: Colors.screen_bg,
    marginHorizontal: 14,
    flex: 1
  },
  btn: {
    backgroundColor: Colors.brand_primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    width: 200,
    alignSelf: 'center'
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  addText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
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
});

export default DailyActivityScreen;