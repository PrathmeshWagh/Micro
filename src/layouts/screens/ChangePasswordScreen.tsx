import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Appbar from '../../components/Appbar';
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import Colors from '../../style/Colors/colors';
import { CommonActions } from '@react-navigation/native';


const ChangePasswordScreen = ({ navigation }: any) => {
  const [loader, setLoader] = useState(false);
  const ChangePassword = async () => {

    const raw = {
      old_password: oldPass,
      new_password: newPass,
      new_confirmed_password: ReNewPass,

    }
    try {
      setLoader(true)
      const api: any = await postMethod(`change_password`, raw);
      if (api.data.status === true) {
        console.log("api", api.data)
        setLoader(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.dispatch(CommonActions.goBack())
      } else {
        setLoader(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
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



  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [ReNewPass, setReNewPass] = useState('');

  return (
    <View>
      <Appbar title={'Change Password'} />
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setOldPass}
          value={oldPass}
          placeholder="Change Password"
          placeholderTextColor={Colors.text_secondary}

        />
        <TextInput
          style={styles.input}
          onChangeText={setNewPass}
          value={newPass}
          placeholder="New Password"
          placeholderTextColor={Colors.text_secondary}

        />
        <TextInput
          style={styles.input}
          onChangeText={setReNewPass}
          value={ReNewPass}
          placeholder="Re-enter New Password"
          placeholderTextColor={Colors.text_secondary}

        />
        <Pressable style={styles.add} onPress={ChangePassword}>
          {loader ?
            (<ActivityIndicator size="large" color="#fff" />)
            :

            (<Text style={styles.addText}>Save Changes</Text>)
          }
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;
const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 30
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    elevation: 8,
    color:Colors.text_primary
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  add: {
    borderWidth: 1,
    borderColor: '#041B8E',
    backgroundColor: Colors.brand_primary,
    height: 45,
    padding: 10,
    marginHorizontal: 14,
    borderRadius: 8,
    marginBottom: 50,
    marginTop: 20
  },
});