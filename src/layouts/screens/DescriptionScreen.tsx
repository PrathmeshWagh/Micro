import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { getMethod, postMethod } from '../../utils/helper';
import { AuthContext } from '../../utils/appContext';
import { CommonActions, useNavigation } from '@react-navigation/native';

const DescriptionScreen = ({route }: any, props: any) => {
  const { id } = route.params;
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState('')
  console.log("id", id)
 const navigation = useNavigation();
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`project_details/${id}`);
    if (api.status === 200) {
      setLoading(false);
      console.log("apiData", api.data)
      setDetails(api.data)

    }
  }

  const StartProject = async () => {
    setLoad(true);
    const api: any = await postMethod(`start_project/${id}`);
    if (api.status === 200) {
      console.log(".....???", api.data)
      setLoad(false);
      navigation.dispatch(
        CommonActions.navigate({
          name: 'TopTabNavigation',
          params: { id: details?.project_id, }
        })
        
      )

      //console.log("apiData",projects)
    }
  }
  const EndProject = async () => {
    setIsLoading(true);
    const api: any = await postMethod(`end_project/${id}`);
    if (api.status === 200) {
      console.log(".....???", api.data)
      setIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          routes: [
            { name: 'JobSheetScreen' },
          ],
        })
      );
    }
  }



  return (
    <>
      <Appbar title={'Job Sheet'} />


      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
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
            <View style={styles.align2}>
              {details?.project_start_user_id === null ? (
                <Pressable style={styles.button} onPress={StartProject}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.white} style={styles.loader} />
                  ) : (
                    <Text style={styles.startProject}>Start Project</Text>
                  )}
                </Pressable>
              ) : details?.project_end_user_id === null ? (
                <View style={styles.align}>
                  <Pressable style={styles.button} onPress={EndProject}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.white} style={styles.loader} />
                    ) : (
                      <Text style={styles.startProject}>End Project</Text>
                    )}
                  </Pressable>
                  <Pressable style={styles.button} onPress={StartProject}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.white} style={styles.loader} />
                    ) : (
                      <Text style={styles.startProject}>View Project</Text>
                    )}
                  </Pressable>
                </View>
              ) : (
                <Pressable style={styles.button} onPress={StartProject}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.white} style={styles.loader} />
                  ) : (
                    <Text style={styles.startProject}>View Project</Text>
                  )}
                </Pressable>
              )}
            </View>
          </>
        )
        }

        {/* <Pressable style={styles.ViewJob} onPress={() => navigation.navigate("TaskScreen")}>
            <Text style={styles.ViewJobText}>View Job</Text>
          </Pressable > */}
      </ScrollView >

    </>
  );
};

export default DescriptionScreen;
const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor:Colors.screen_bg
  },
  loader: {
    marginTop: 8
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
    backgroundColor: Colors.card_bg,
    paddingHorizontal: 10
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
  align2: {
    alignSelf: 'center'
  },
  button: {
    backgroundColor: Colors.brand_primary,
    height: 45,
    width: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    marginBottom: 5,
    marginHorizontal: 10
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
