import React from 'react';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, Avatar, Checkbox } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { useNavigation } from '@react-navigation/native';
import { getMethod } from '../../utils/helper';

interface Props {
  navigate: any;
}
const DailyActivityScreen: FC<Props> = ({ route }: any): JSX.Element => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [dailyActivity, setDailyActivity] = useState([]);
  const { project_id } = route.params;
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`task_list/${project_id}`);
    if (api.status === 200) {
      console.log("apiData", api.data)
      setLoading(false);
      setDailyActivity(api.data)
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
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <ScrollView style={styles.cover}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {
              dailyActivity.map((data, index) => (
                <View key={index}>
                  <Card style={styles.card}>
                    <View style={{ position: 'absolute', right: -25, top: -25 }}>
                      <Checkbox
                        status={selectedTaskIds.includes(data?.task_id) ? 'checked' : 'unchecked'}
                        onPress={() => {
                          const taskId = data?.task_id;
                          if (selectedTaskIds.includes(taskId)) {
                            // If the task_id is already selected, remove it
                            setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
                          } else {
                            // If the task_id is not selected, add it
                            setSelectedTaskIds([...selectedTaskIds, taskId]);
                          }
                        }}
                      />
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
                </View>
              ))}

          </ScrollView>
          <Pressable
            style={styles.btn}
            onPress={() =>
              navigation.navigate('DailyActivityDescriptionScreen', {
                selectedTaskIds: selectedTaskIds,
                project_id:project_id
              })
            }
          >
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </>
      )}
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
    marginVertical: 24,
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
    backgroundColor: Colors.card_bg,
    margin: 5
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