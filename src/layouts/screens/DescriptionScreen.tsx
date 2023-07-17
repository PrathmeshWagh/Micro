import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { getMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';

const DescriptionScreen = ({ navigation, route }: any, props: any) => {
  const { id } = route.params;
  const { user, setUser } = useContext(AuthContext);
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(true);
  console.log("id",id)


  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`project_details/${id}`, user.token);
    if (api.status === 200) {
      setLoading(false);
      setDetails(api.data)
      //console.log("apiData",projects)
    }
  }

  return (
    <>
      <Appbar title={'Job Sheet'} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (

        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <View style={styles.align}>
              <Text style={styles.title}>Job Sheet Tiitle  -</Text>
              <Text style={styles.details}>{details?.project_title}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.title}>Client Name  -</Text>
              <Text style={styles.details}>{details?.project_client_name}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.title}>Address     -</Text>
              <Text style={styles.details}>{details?.project_address}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.title}>Mobile Number    -</Text>
              <Text style={styles.details}>  {details?.project_tel}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.title}>Sales Person        -</Text>
              <Text style={styles.details}>{details?.project_sales_person}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.title}>Sale Contact    -</Text>
              <Text style={styles.details}>{details?.project_sales_contact}</Text>
            </View>
            <View style={styles.align}>
              <View>
                <Text style={styles.title2}>Start Date</Text>
                <View style={styles.date}><Text style={styles.dateText}>{details?.project_date_start}</Text></View>
              </View>
              <View>
                <Text style={styles.title2}>End Date</Text>
                <View style={styles.date}><Text style={styles.dateText}>{details?.project_date_due}</Text></View>
              </View>
            </View>
          </Card>
          <View style={styles.align}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("TopTabNavigation", {
              id: details?.project_id,
            })}>
              <Text style={styles.startProject}>Start Project</Text>
            </Pressable >
            <Pressable style={styles.button} onPress={() => navigation.navigate("TaskScreen")}>
              <Text style={styles.startProject}>End Project</Text>
            </Pressable >
          </View>
          <Pressable style={styles.ViewJob} onPress={() => navigation.navigate("TaskScreen")}>
            <Text style={styles.ViewJobText}>View Job</Text>
          </Pressable >
        </ScrollView>
      )}
    </>
  );
};

export default DescriptionScreen;
const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  startProject: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    paddingVertical: 10
  },
  ViewJobText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    paddingVertical: 8
  },

  dateText: {
    color: Colors.text_secondary,
  },
  title: {
    color: Colors.text_primary,
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    lineHeight: 45,
  },
  title2: {
    color: Colors.text_primary,
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    lineHeight: 45,
    marginTop: 15,
    paddingHorizontal: 30
  },
  date: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 8,
    width: 100,
    padding: 5,
    fontFamily: 'Roboto-Regular',
    marginHorizontal: 25
  },
  card: {
    paddingBottom: 30,
    backgroundColor: Colors.card_bg
  },
  details: {
    color: Colors.text_secondary,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 40,
  },
  gap: {
    color: Colors.text_secondary,
    fontSize: 16,
    fontFamily: 'Roboto-bold',
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: Colors.brand_primary,
    height: 45,
    width: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    marginBottom: 5,
  },
  ViewJob: {
    backgroundColor: '#E2E2E2',
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    marginBottom: 50

  },
})
