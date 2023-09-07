import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native';

import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../utils/appContext';
import { getMethod, postMethod } from '../../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';

const IncidentReport = ({ route }: any) => {
  const { project_id } = route.params;
  const [incidentList, setIncidentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`get_all_incident_report/${project_id}`);
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
    // getdata();
    setRefreshing(false);
  };

  const createTwoButtonAlert = (incidentId: number) => {
    Alert.alert('Alert', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteList(incidentId), // Pass remark_id to deleteData
      },
    ]);
  };

  const deleteList = async (incidentId: number) => {
    const raw = {
      incident_reports_id: incidentId,
      project_id:project_id
    }
    try {
      const api: any = await postMethod(`delete_incident_report`, raw);
      if (api.status === 200) {
        console.log('data', api.data)
        Snackbar.show({
          text: api.data,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        })
        getdata()
      }
      else {
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    }
    catch (e) {
      Snackbar.show({
        text: "Some Error Occured" + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      });
    }

  }


  return (
    <View style={styles.cover}>
      <Pressable style={styles.add} onPress={() => navigation.navigate('IncidentFormScreen', {
        project_id: project_id
      })}>
        <Text style={styles.addText}>+ Add</Text>
      </Pressable>
      <ScrollView style={styles.gap}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }>

        {incidentList?.map((item, index) => (
          <View style={styles.card}>
            {item.check_edit_delete === 1 && ( 
             <Pressable onPress={() => createTwoButtonAlert(item.incident_reports_id)}>
              <Ionicons name="trash-bin" color={Colors.red} size={22} style={styles.delete} />
            </Pressable>
             )} 
            <View style={styles.align}>
              <Text style={styles.text}>Report Serial Number:</Text>
              <Text style={styles.text2}>{item?.report_serial_number}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.text}>Revision:</Text>
              <Text style={styles.text2}>{item?.revision}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.text}>Company / Department Reporting:</Text>
              <Text style={styles.text2}>{item?.company_department_reporting}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: 'ViewIncidentReportScreen',
                params: {
                  projectId:project_id,
                  incidentReportsId:item.incident_reports_id
                },
              }))}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 30 }}></View>
          </View>
        ))}
      </ScrollView>
    </View>
  )

}

export default IncidentReport;
const styles = StyleSheet.create({
  cover: {
    marginTop: 14,
    marginHorizontal: 14,
    flex: 1
  },
  delete: {
    position: 'absolute',
    right: 0,
    top: -20
  },
  provide: {
    color: 'gray',
    marginVertical: 5,
    alignSelf: 'center'
  },
  gap: {
    flex: 1,
    // paddingBottom: 50

  },
  card: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingTop: 25,
    padding: 20,
    margin: 10,
    elevation: 8,
    marginTop: 20,
   paddingBottom:-20
  },
  text: {
    color: Colors.text_primary,
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
    lineHeight: 30
  },
  text2: {
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
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
  part: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.lightGray,
  },
  partText: {
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
  },
  viewDetails: {
    color: 'blue',
    alignSelf: 'flex-end'
  }
})