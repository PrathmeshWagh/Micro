import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, RefreshControl, Image, FlatList, ActivityIndicator } from 'react-native';

import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getMethod } from '../../utils/helper';

const JobDescriptionScreen = ({ props, route }: any) => {
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { project_id } = route.params;


  useFocusEffect(
    useCallback(() => {
      // This code will run when the screen focuses
      getdata();
    }, [])
  );

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`task_list/${project_id}`);
    if (api.status === 200) {
      // console.log("apiData", api.data)
      setLoading(false);
      setTaskList(api.data)
      setRefreshing(false);
      //  console.log("", taskList.task_id)
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    getdata();
    setRefreshing(false);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (
        <ScrollView style={styles.cover}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {
            taskList.map((data, index) => (
              <View key={index}>
                <Pressable
                  onPress={() =>
                    navigation.dispatch(
                      CommonActions.navigate({
                        name: 'TaskDetailScreen',
                        params: {
                          taskId: data?.task_id,
                        },
                      })
                    )
                  }
                >
                  <Card style={styles.card}>
                    <View style={styles.status}>
                      <Text style={[
                        styles.statusText,
                        {
                          backgroundColor:
                            data?.status === 'Completed' ? 'purple' :
                              data?.status === 'Pending' || data?.status === 'In Progress' ? 'orange' :
                                data?.status === 'Pending Approval' ? '#77C3EC' :
                                  data?.status === 'New' ? Colors.brand_primary : 'transparent'
                        }
                      ]}>
                        {data?.status}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.jobSheet}>{data?.task_title}</Text>
                      <Text style={styles.address}>{data?.task_description}</Text>
                      <Text style={styles.team}>Team members</Text>
                      <View style={styles.align}>
                        {
                          data.user_data.map((data, index) => (
                            <View key={index}>
                              <Avatar.Image size={24} source={{ uri: data.profile }} />
                            </View>
                          ))}

                      </View>
                      <Text style={styles.startDate}>Start Date</Text>
                      <View style={styles.align}>
                        <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                        <Text style={styles.date}>{data?.task_date_start}</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.indecator}>
                        <View style={styles.taskIconAlign}>
                          <Text style={{ bottom: 15, right: -70 }}>End Date</Text>
                          <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                          <Text style={styles.date}>{data?.task_date_due}</Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              </View>
            ))}
          <View style={{ marginBottom: 50 }}></View>
        </ScrollView>
      )}
    </>
  );
};

export default JobDescriptionScreen;
const styles = StyleSheet.create({
  cover: {
    paddingHorizontal: 14,
    // marginBottom: 24,
    flex: 1,
    backgroundColor: Colors.card_bg
  },
  status: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: -18,
    marginRight: -18,
    marginBottom: 15
  },
  statusText: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.white,
    color: Colors.white
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
    backgroundColor: Colors.white
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