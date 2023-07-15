import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../style/Colors/colors';
import { Card } from 'react-native-paper';
import { getMethod } from '../../utils/helper';
import Appbar from '../../components/Appbar';

const ViewDailyReportScreen = ({ route }: any) => {
  const { project_id } = route.params;
  const [loading, setLoading] = useState(false);

  // console.log("..........", route.params)
  const [viewReport, setViewReport] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`get_man_power/${project_id}`);
    if (api.status === 200) {
      setLoading(false);
      // console.log("get_man_power",api.data)
      setViewReport(api.data)
      //  console.log("taskDetails",viewReport)
    }
  }
  const renderItem = (props: any) => {
    // console.log("get_man_power", props.item);
    return (
      <View >
        <Pressable>
          <Card style={styles.card}>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Name -</Text>
              <Text style={styles.text}>{props.item.name}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Date -  </Text>
              <Text style={styles.text}>{props.item.date}</Text>
            </View>
            <View style={styles.align2}>
              <Text style={styles.textHeading}>Manpower Description - </Text>
              <Text style={styles.text}>{props.item.description}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Vehicle-</Text>
              <Text style={styles.text}>{props.item.vehicle}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Type of worker-</Text>
              <Text style={styles.text}>{props.item.types_of_worker}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Type of worker name-</Text>
              <Text style={styles.text}>{props.item.types_of_worker_name}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>No worker-</Text>
              <Text style={styles.text}>{props.item.no_of_worker}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>Start Time-</Text>
              <Text style={styles.text}>{props.item.start}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.textHeading}>End Time-</Text>
              <Text style={styles.text}>{props.item.end}</Text>
            </View>
            <View>
            </View>
          </Card>
        </Pressable>
      </View>
    )
  }

  return (
    <View>
      <Appbar title={'View Report'} />
      <View style={styles.cover}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (

          <FlatList
            data={viewReport}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
export default ViewDailyReportScreen;
const styles = StyleSheet.create({
  cover: {
    marginTop: 10,
    marginHorizontal: 14,
    marginBottom: 320
  },
  align2: {
    flexDirection: 'column'
  },
  add: {
    borderWidth: 1,
    borderColor: '#041B8E',
    backgroundColor: '#041B8E',
    height: 35,
    width: 65,
    padding: 5,
    paddingLeft: 10,
    alignSelf: 'center'
  },
  addText: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
  },
  text: {
    color: Colors.text_primary,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
    lineHeight: 30,
    paddingRight: 5
  },
  textHeading: {
    color: Colors.text_primary,
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
    lineHeight: 30
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
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageName: {
    alignSelf: 'center',
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 25
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.white,
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
})