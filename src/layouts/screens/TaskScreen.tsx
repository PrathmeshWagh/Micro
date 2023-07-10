import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../../style/Colors/colors';
import JobDescription from '../../ScreenComponent/Tabs/JobDescription';
import VarientationOder from '../../ScreenComponent/Tabs/VarientationOder';
import IncidentReport from '../../ScreenComponent/Tabs/IncidentReport';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HEADER_HEIGHT = 250
const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

// const Header = () => {
//     return 
//   }
const TaskScreen = ({ navigation, route }: any) => {
  const { user, setUser } = useContext(AuthContext);
  const { id } = route.params;
  const [task, setTask] = useState([]);
  //console.log("ID", id)

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const api: any = await getMethod(`task_list/${id}`, user.token);
    if (api.status === 200) {
      //console.log(JSON.stringify(api))
      setTask(api.data[0])
      //console.log("apiData", task.task_title)
    }
  }



  const tabBar = (props: any) => {
    return (
      <MaterialTabBar
        {...props}
        contentContainerStyle={{ alignItems: 'center', }}
        labelStyle={{ color: Colors.text_primary }}
        indicatorStyle={{ backgroundColor: Colors.red, height: 40, top: '12%', bottom: '12%', left: '0%', right: '0%', zIndex: -2, borderRadius: 8, width: 120 }}
        style={{ alignSelf: 'center', elevation: 0, marginTop: 8, borderBottomWidth: 1, borderColor: Colors.screen_bgDark, backgroundColor: ' #F5F5F5', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5 }}
      />
    )
  }
  return (
    <>
      <Appbar title={'Job Sheet'} />
      <View style={styles.container}>
        <Tabs.Container
          pagerProps={{ scrollEnabled: false }}
          renderTabBar={tabBar}>
          <Tabs.Tab name="      Job 
Description  ">
            <Pressable onPress={() => navigation.navigate('TaskDetailScreen', {
              taskId: task?.task_id
            })}>
              <JobDescription props={task} />
            </Pressable>
          </Tabs.Tab>
          <Tabs.Tab name="Variation 
    Order">
            <VarientationOder />
          </Tabs.Tab>
          <Tabs.Tab name="Incident 
Report">
            <IncidentReport />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </>
  );
};

export default TaskScreen;
const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
  cover: {
    padding: 14
  }
})