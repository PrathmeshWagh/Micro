import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, Alert } from 'react-native';

import { Card, Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getMethod, postMethod } from '../../utils/helper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';

const VarientationOder = ({ route }: any) => {
  const navigation = useNavigation();
  const { project_id } = route.params;
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [veriationList, setVeriationList] = useState([]);


  useFocusEffect(
    useCallback(() => {
      // This code will run when the screen focuses
      getdata();
    }, [])
  );
  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`get_all_variation_order/${project_id}`);
    if (api.status === 200) {
      console.log("api", api.data)
      setLoading(false);
      setVeriationList(api.data)
      setRefreshing(false);
    }
  }
  const createTwoButtonAlert = (variationId: number) => {
    Alert.alert('Alert', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteList(variationId), // Pass remark_id to deleteData
      },
    ]);
  };
  const deleteList = async (variationId: any) => {
    const raw = {
      variation_order_id: variationId,
      project_id: project_id
    }
    try {
      const api: any = await postMethod(`delete_variation_order`, raw);
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



  const onRefresh = () => {
    setRefreshing(true);
    getdata();
    setRefreshing(false);
  };




  return (
    <View style={styles.cover}>
      <Pressable style={styles.add} onPress={() =>
        navigation.dispatch(
          CommonActions.navigate({
            name: 'AddOderScreen',
            params: {
              project_id: project_id,
            },
          })
        )
      }>
        <Text style={styles.addText}>+ Add</Text>
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (
        <>
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            {veriationList.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: 'ViewVariationOderScreen',
                      params: {
                        id: item.variation_order_id,
                      },
                    })
                  )
                }
              >
                <Card style={styles.card}>
                  <View style={{ marginVertical: 10, justifyContent: 'flex-end' }}>

                    {item.check_edit_delete === 1 && (
                      <>
                        <Pressable onPress={() =>
                          navigation.dispatch(
                            CommonActions.navigate({
                              name: 'EditVariationOrder',
                              params: {
                                project_id: project_id,
                                variation_id: item.variation_order_id,
                              },
                            })
                          )
                        }>
                          <Feather name="edit-3" color={Colors.red} size={22} style={styles.edit} />
                        </Pressable>
                        <Pressable onPress={() => createTwoButtonAlert(item.variation_order_id)}>
                          <Ionicons name="trash-bin" color={Colors.red} size={22} style={styles.delete} />
                        </Pressable>
                      </>
                    )}
                  </View>
                  <View style={styles.align}>
                    <Text style={styles.text}>Product Service -</Text>
                    <Text style={styles.text}>{item.product}</Text>
                  </View>
                  <View style={styles.align}>
                    <Text style={styles.text}>Size/Qty -  </Text>
                    <Text style={styles.text}>{item.size}</Text>
                  </View>
                  <View style={styles.align}>


                    <Text style={styles.text}>Customer Contact Details -</Text>
                    {item.contact ? (
                      <>
                        <Text style={styles.text}>
                          {item.contact.length > 6
                            ? `${item.contact.substring(0, 6)}...`
                            : item.contact}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.text}>....</Text>
                    )
                    }
                  </View>
                  <View style={styles.align}>
                    <Text style={styles.text}>Remarks-</Text>
                    {item.remark ? (
                      <>
                        <Text style={styles.text}>
                          {item.remark.length > 6
                            ? `${item.remark.substring(0, 6)}...`
                            : item.remark}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.text}>....</Text>
                    )
                    }

                  </View>
                </Card>
              </Pressable>
            ))}
            <View style={{ paddingBottom: 50 }}></View>
          </ScrollView>

        </>
      )}
    </View>
  );
};

export default VarientationOder;
const styles = StyleSheet.create({
  cover: {
    marginTop: 14,
    marginHorizontal: 14
  },
  edit: {

    position: 'absolute',
    right: 30,
    top: -20

  },
  delete: {
    position: 'absolute',
    right: 0,
    top: -20
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