import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../utils/appContext';
import { getMethod } from '../../utils/helper';

const IncidentReport = ({ route }: any) => {
  const { project_id } = route.params;
  const { user, setUser } = useContext(AuthContext);
  const [incidentList, setIncidentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`get_incident_report/${project_id}`, user.token);
    if (api.status === 200) {
      console.log("apiData", api.data)
      setLoading(false);
      setIncidentList(api.data)
      setRefreshing(false);
      // console.log("", taskList)
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    getdata();
    setRefreshing(false);
  };





  return (
    <View style={styles.cover}>
      <Pressable style={styles.add} onPress={() => navigation.navigate('AddReportScreen', {
        project_id: project_id
      })}>
        <Text style={styles.addText}>+ Add</Text>
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView style={styles.cover}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {
            incidentList.map((data, index) => (
              <View key={index}>
                <Pressable  onPress={()=>navigation.navigate('IncidentReportDescriptionScreen',{
                  incident_reports_id: data?.incident_reports_id
                })}>
                  <Card style={styles.card}>
                    <View style={styles.align}>
                      <Text style={styles.text}>Location of Incident -</Text>
                      <Text style={styles.text2}>{data?.location_of_incident}</Text>
                    </View>
                    <View style={styles.align}>
                      <Text style={styles.text}>Injury -  </Text>
                      <Text style={styles.text2}>{data?.injury}</Text>
                    </View>
                    <View style={styles.align}>
                      <Text style={styles.text}>Property Damage - </Text>
                      <Text style={styles.text2}>{data?.property_damage}</Text>
                    </View>
                    <View style={styles.align}>
                      <Text style={styles.text}>Person Involved and Position - </Text>
                      <Text style={styles.text2}>{data?.person_involved_and_position}</Text>
                    </View>
                    <View style={styles.align}>
                      <Text style={styles.text}>Details of Incident - </Text>
                      <Text style={styles.text2}>{data?.details_of_incident}</Text>
                    </View>
                    <View style={styles.align}>
                      <Text style={styles.text}>Remarks-</Text>
                      <Text style={styles.text2}>{data?.incident_report_remark}</Text>
                    </View>
                    <View>
                    </View>
                  </Card>

                </Pressable>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default IncidentReport;
const styles = StyleSheet.create({
  cover: {
    marginTop: 14,
    marginHorizontal: 14,
    flex: 1
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
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
    lineHeight: 30
  },
  text2: {
    color: Colors.text_primary,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular',
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  pageName: {
    alignSelf: 'center',
    fontSize: 28,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 25
  },
  card: {
    marginTop: 15,
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