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
  const [incidentList, setIncidentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [showDetails, setShowDetails] = useState(false);

  // useEffect(() => {
  //   getdata();
  // }, []);

  // const getdata = async () => {
  //   setLoading(true);
  //   const api: any = await getMethod(`get_incident_report/${project_id}`);
  //   if (api.status === 200) {
  //     // console.log("apiData", api.data)
  //     setLoading(false);
  //     setIncidentList(api.data)
  //     setRefreshing(false);0
  //     // console.log("", taskList)
  //   }
  // }
  const onRefresh = () => {
    setRefreshing(true);
    // getdata();
    setRefreshing(false);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
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
        <View style={styles.part}>
          <Text style={styles.partText}>PART A</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.align}>
            <Text style={styles.text}>Report Serial Number:</Text>
            <Text style={styles.text2}>#1234569</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.text}>Revision:</Text>
            <Text style={styles.text2}>N/A</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.text}>Company / Department Reporting:</Text>
            <Text style={styles.text2}>N/A</Text>
          </View>
          {showDetails ? (
            <>
              <View style={styles.align}>
                <Text style={styles.text}>Name of Person Reporting:</Text>
                <Text style={styles.text2}>Jhon Doe</Text>
              </View>
              <View style={styles.align}>
                <Text style={styles.text}>Designation of Person Reporting:</Text>
                <Text style={styles.text2}>Manager</Text>
              </View>
              <View style={styles.align}>
                <Text style={styles.text}>NRIC of Person Reporting:</Text>
                <Text>5698564</Text>
              </View>
              <View style={styles.align}>
                <Text style={styles.text}>Date of Report Submission:</Text>
                <Text style={styles.text2}>27/07/2023</Text>
              </View>
              <View style={styles.align}>
                <Text style={styles.text}>Time of Report Submission:</Text>
                <Text style={styles.text2}>17:05:19PM</Text>
              </View>

              <View style={styles.part}>
                <Text style={styles.partText}>PART B</Text>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={styles.text}>Category of Event:</Text>
                  <Text style={styles.text2}>Accident / Incident / Dangerous Occurrence / Others</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Injury to Person(s):</Text>
                  <Text style={styles.text2}>Yes / No</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Damage Property:</Text>
                  <Text style={styles.text2}>Yes / No</Text>
                </View>
                <Text style={styles.provide}>Please Provide Info As Follows</Text>
                <View style={styles.align}>
                  <Text style={styles.text}>Full Name Of Injured Person:</Text>
                  <Text style={styles.text2}>Jhon Doe</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>NRIC Of Injured Person:</Text>
                  <Text style={styles.text2}>5698746</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Designation Of Injured Person:</Text>
                  <Text style={styles.text2}>Manager</Text>
                </View>
                <Text style={styles.text}>Nature Of Injury:</Text>
                <View style={styles.align}>
                  <Text style={styles.text}>Injured Person(s) Sent to:</Text>
                  <Text style={styles.text2}>Hospital / Clinic / Nil / Others</Text>
                </View>
                <Text style={styles.text}>Description Of Property Damage (If Any):</Text>
              </View>
              <View style={styles.part}>
                <Text style={styles.partText}>PART C</Text>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={styles.text}>Project:</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>JOB Number:</Text>
                  <Text style={styles.text2}>#456321</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Name Of Coordinator:</Text>
                  <Text style={styles.text2}>Robin Willam</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Full Workplace Address:</Text>
                  <Text style={styles.text2}>Jhon Doe</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Location (Floor / Zone / Unit):</Text>
                  <Text style={styles.text2}>2nd Floor</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Date Of Acc /INC/DO:</Text>
                  <Text style={styles.text2}>27/07/2023</Text>
                </View>
                <View style={styles.align}>
                  <Text style={styles.text}>Time Of Acc /INC/DO:</Text>
                  <Text style={styles.text2}>27/07/2023</Text>
                </View>
              </View>
            </>
          ) : (
            <TouchableOpacity onPress={toggleDetails}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          )}
          <View style={{ marginBottom: 30 }}></View>
        </View>
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
  provide: {
    color: 'gray',
    marginVertical: 5,
    alignSelf: 'center'
  },
  gap: {
    flex: 1,
    paddingBottom: 50

  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    padding: 5,
  },
  text: {
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
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