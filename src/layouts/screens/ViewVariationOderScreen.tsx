import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, RefreshControl, ActivityIndicator, Button, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { getMethod } from '../../utils/helper';
import { Portal, Modal } from 'react-native-paper';

interface Props {
  params: { id: number; };
  route: any
}
const ViewVariationOderScreen: FC<Props> = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  console.log("id", id);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getdata();

  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`view_variation_order/${id}`);
    if (api.status === 200) {
      console.log("apiData", api.data)
      setLoading(false);
      setList(api.data)
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

  const openModal = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
  return (
    <>
      <Appbar title={'Variation Oder'} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.brand_primary} />
      ) : (
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.align}>
            <Text style={styles.product}>Product  -</Text>
            <Text style={styles.dataText}>{list?.product}</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.product}>Size -</Text>
            <Text style={styles.dataText}>{list?.size}</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.product}>Description -</Text>
            <Text style={styles.dataText}>{list?.description}</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.product}>Contact -</Text>
            <Text style={styles.dataText}>{list?.contact}</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.product}>Remarks -</Text>
            <Text style={styles.dataText}>{list?.remarks}</Text>
          </View>
          <View style={styles.align}>
            <Text style={styles.product}>Remarks -</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
              {list?.images?.map((uri: any, index: React.Key | null | undefined) => (
                <Pressable key={index} style={{ padding: 5, flexBasis: '50%' }} onPress={() => openModal(uri)}>
                  <Image
                    source={{ uri }}
                    style={{ width: '100%', height: 150, borderRadius: 8 }} // Adjust the width and height as needed
                  />
                </Pressable>

              ))}
            </View>
          </View>
          <View style={{ paddingBottom: 40 }}></View>
          <Portal>
            <Modal visible={modalVisible} onDismiss={closeModal}>
              <View style={{ backgroundColor: 'white', padding: 30 }}>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: '100%', height: 300, borderRadius: 8 }}
                  />
                )}
                <Pressable onPress={closeModal} style={styles.close}>
                  <Text style={{fontSize:18,color:Colors.text_primary}}>Close</Text>
                </Pressable>
              </View>
            </Modal>
          </Portal>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  close:{
marginVertical:20,
alignSelf:'center',
color:Colors.text_primary
  },
  dataText: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 8,
    color: Colors.text_primary
  },
  product: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    paddingVertical: 5
  },
  align: {
    paddingVertical: 10
  }
});

export default ViewVariationOderScreen;