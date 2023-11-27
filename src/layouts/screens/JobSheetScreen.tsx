import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Appbar from '../../components/Appbar';
import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../style/Colors/colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getMethod, getStorageData } from '../../utils/helper';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const JobSheetScreen = ({ navigation }: any) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`projects`);
    if (api.status === 200) {
      // console.log("renderItem",api.data)
      setLoading(false);
      setProjects(api.data)
    }
  }
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getdata();
    } catch (error) {
      console.log('Error refreshing:', error);
    }
    setRefreshing(false);
  };

  const renderItem = (props: any) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'DescriptionScreen',
                params: {
                  id: props.item.project_id,
                },
              })
            )
          }
        >
          <Card style={styles.card}>
            <View>
              <Text style={styles.jobSheet}>{props.item.project_title}</Text>
              <Text style={styles.address}>{props.item.project_address}</Text>
              <Text style={styles.team}>Team members</Text>
              <View style={styles.align}>
                {
                  props.item.user_data.slice(0, 4).map((img, index) => (
                    <View key={index}>
                      <Avatar.Image size={24} source={{ uri: img.profile }} />
                    </View>
                  ))
                }
              </View>

              <View style={styles.align}>
                <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} />
                <Text style={styles.date}>{props.item.project_date_start}</Text>
              </View>
            </View>
            <View>
              <View style={styles.indecator}>
                <CircularProgress
                  value={props.item.project_progress}
                  radius={60}
                  duration={1000}
                  activeStrokeColor={'#FE0000'}
                  inActiveStrokeColor={'#fac3c3'}
                  progressValueColor={'#000'}
                  progressValueFontSize={20}
                  activeStrokeWidth={8}
                  maxValue={200}
                  valueSuffix={'%'}
                  titleStyle={{ fontWeight: 'bold' }}
                  dashedStrokeConfig={{ width: 20 }}
                />
                <View style={styles.taskIconAlign}>
                  <Feather style={styles.taskicon} name="check-square" size={18} color={'gray'} style={styles.calender} />
                  <Text style={styles.task}>{props.item.total_task}</Text>
                </View>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    )
  }


  return (
    <View>
      <View style={styles.containerAppbar}>
        <View style={styles.align2}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <IonIcon style={styles.icon} name="menu-outline" size={28} color={'white'} />
          </Pressable>
          <Image
            style={styles.tinyLogo}
            source={require('../../style/Img/bell2.png')}
          />
        </View>
        <Text style={styles.pageName}>Job Sheet</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (

        <View style={{ paddingBottom: 250, height: '100%', backgroundColor: Colors.screen_bg }}>
          <FlatList
            data={projects}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default JobSheetScreen;
const styles = StyleSheet.create({
  containerAppbar: {
    backgroundColor: Colors.brand_primary,
    // height: 150,
    // width: "100%",
    padding: 14,

  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  taskIconAlign: {
    flexDirection: 'row',
    marginTop: 15,
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
    // marginTop: 20,
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
    marginBottom: 5,
    flexWrap: 'wrap'
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