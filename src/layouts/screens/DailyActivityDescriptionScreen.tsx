import React, { useState } from 'react';
import { FC } from 'react';
import { FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { Checkbox, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
  navigation: any
}
const DailyActivityDescriptionScreen: FC<Props> = (): JSX.Element => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const imagePaths = [
    { imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 1' },
    { imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 2' },
    { imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 3' },
    { imagePath: require('../../style/Img/RectangleImages.png'), text: 'Image 4' },

  ];

  const handleImageSelection = (imagePath: string) => {
    if (selectedImages.includes(imagePath)) {
      setSelectedImages(selectedImages.filter(item => item !== imagePath));
    } else {
      setSelectedImages([...selectedImages, imagePath]);
    }
  };
  const renderItem = ({ item }: { item: { imagePath: string; text: string } }) => (
    <TouchableOpacity onPress={() => openZoomedImage(item.imagePath)}>
      <View style={{ flexDirection: 'column', margin: 10, backgroundColor: Colors.lightGray, padding: 20, alignItems: 'center' }}>
        <View style={{ position: 'absolute', right: -8, top: -8 }}>
          <Checkbox
            status={selectedImages.includes(item.imagePath) ? 'checked' : 'unchecked'}
            onPress={() => handleImageSelection(item.imagePath)}
          />
        </View>
        <Image style={styles.tinyImg} source={item.imagePath} />
        <Text>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const openZoomedImage = (imagePath: string) => {
    console.log('imagePath', imagePath);
    setZoomedImage(imagePath);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  const onRefresh = () => {
    setRefreshing(true);
    // getdata();
    setRefreshing(false);
  };
  return (
    <>
      <Appbar title={'Daily Activity'} />
      <ScrollView style={styles.container}
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Text style={styles.date}>Date</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder=""

        />
        <View style={styles.cover}>
          <Text style={styles.Task}>Task 1</Text>

          <Text style={styles.date}>Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
          <Text style={styles.date}>Task Remarks</Text>
          <TextInput
            style={styles.inputRemark}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
          <Text style={styles.date}>Images</Text>

          <FlatList
            data={imagePaths}
            renderItem={renderItem}
            keyExtractor={(item) => item.imagePath}
            numColumns={2} // Display two images in a row
          />
          <Text style={styles.date}>Area</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
          <Text style={styles.date}>Plan</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
          <Text style={styles.date}>Completation</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
          <Text style={styles.date}>Status</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder=""
          />
        </View>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('ManpowerReportScreen')}>
          <Text style={styles.btnText}>
            Submit
          </Text>
        </Pressable>
      </ScrollView>

      <Modal visible={zoomedImage !== null} onDismiss={closeZoomedImage}>
        <View style={styles.modalContainer}>
          <Image style={styles.zoomedImg} source={{ uri: zoomedImage || '' }} resizeMode="contain" />
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeZoomedImage}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screen_bg,
    padding: 24,
  },
  btn: {
    backgroundColor: Colors.brand_primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 40,
    width: 200,
    alignSelf: 'center'
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  input: {
    height: 50,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,

  },
  inputRemark: {
    height: 80,
    marginVertical: 5,
    padding: 10,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
  },
  cover: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    marginTop: 10,
    padding: 14
  },
  date: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary
  },
  Task: {
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 18,
    paddingBottom: 10
  },
  tinyImg: {
    width: 80,
    height: 80,

  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 120,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 18,
  },
  zoomedImg: {
    width: 180,
    height: 180,
  },
});

export default DailyActivityDescriptionScreen;