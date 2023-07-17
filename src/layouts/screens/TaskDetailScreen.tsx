import React, { useEffect, useContext, useState } from 'react';
import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import Appbar from '../../components/Appbar';
import { StyleSheet, Pressable } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import Colors from '../../style/Colors/colors';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';
const TaskDetailScreen = ({ navigation, route }: any) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [taskDetails, setTaskDetails] = useState();
  const { taskId } = route.params;
  console.log("aaaa", taskId)

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`task_details/${taskId}`, user.token);
    if (api.status === 200) {
      setLoading(false);
      setTaskDetails(api.data)
      // console.log("taskDetails", taskDetails.user_data)
    }
  }

  return (
    <View>
      <Appbar title={'Task'} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView style={styles.container}>
          <Pressable>
            <Card style={styles.card}>
              <View>
                <Text style={styles.jobSheet}>{taskDetails?.task_title}</Text>
                <Text style={styles.address}>{taskDetails?.task_description}</Text>
                <Text style={styles.team}>T-eam members</Text>
                <View style={styles.align}>
                {
                taskDetails?.user_data.map((data, index) => (
                  <View key={index}>
                  <Avatar.Image size={24} source={{ uri: data.profile }} />
                  </View>
                ))}
                  
                </View>
                <Text style={styles.startDate}>Deadline: <Text style={{ color: Colors.red }}>{taskDetails?.task_date_due}</Text></Text>
              </View>
              <View>
              </View>
            </Card>
          </Pressable>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Pressable style={styles.AddPic} onPress={() => navigation.navigate('ImageUploadScreen', {
                taskId: taskDetails?.task_id
              })}>
                <Text style={styles.text}>Add Photo</Text>
                <Image size={24} source={require('../../style/Img/Add.png')} />
              </Pressable>
              <Pressable style={styles.AddPic} onPress={() => navigation.navigate('ViewImageScreen', {
                taskId: taskDetails?.task_id,
              })}>
                <Text style={styles.text}>View Images</Text>
                <Image size={24} source={require('../../style/Img/2.png')} />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Pressable style={styles.AddPic} onPress={() => navigation.navigate('DailyReportScreen', {
                taskId: taskDetails?.task_id,
                project_id: taskDetails?.project_id
              })} >
                <Text style={styles.text}>Add Daily Report</Text>
                <Image size={24} source={require('../../style/Img/3.png')} />
              </Pressable>
              <Pressable style={styles.AddPic} onPress={() => navigation.navigate('ViewDailyReportScreen', {
                project_id: taskDetails?.project_id
              })}
              >
                <Text style={styles.text}> Daily Report</Text>
                <Image size={24} source={require('../../style/Img/4.png')} />
              </Pressable>
            </View>
            <View style={styles.remark}>
              <Text>Remarks....</Text>
            </View>

          </View>
          {/* <ImageUpload/> */}
        </ScrollView>
      )}
    </View>
  );
};
export default TaskDetailScreen;
const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: Colors.white
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13
  },
  remark: {
    marginTop: 20,
    borderColor: '#E8E8E8',
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    padding: 20,
    width: "100%",
    borderRadius: 6
  },
  cover: {
    marginTop: 14,
    marginHorizontal: 14
  },
  AddPic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#A5FFA5',
    backgroundColor: '#A5FFA5',
    padding: 8,
    elevation: 8,
    width: 130,
    height: 40,
    marginTop: 20
  },
  startDate: {
    color: Colors.text_primary,
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
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
    marginTop: 10,
    padding: 20,
    backgroundColor: Colors.card_bg
  },
  task: {
    color: Colors.text_secondary,
    marginLeft: 5,
    marginTop: 5
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