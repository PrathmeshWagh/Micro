import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';


const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const ForgotPsw = async () => {
    const raw = {
      email: email,
    }
    console.log("raw",raw)
    try {
      setLoading(true)
      const api: any = await postMethod(`forgot_password`, raw);
      if (api.data.status === true) {
        setLoading(false);
        console.log("api", api.data)
        Snackbar.show({
          text: "OTP is sent to your Email",
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.dispatch(
          CommonActions.navigate({
              name: 'OtpVerificationScreen',
              params: {
                email: email
              },
          })
      )
      } else {
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    }
    catch (e) {
      setLoading(false);
      Snackbar.show({
        text: "Some Error Occured" + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      });
    }

  }
  return (
    <View>
      <Appbar title={'Forgot Password'} />
      <ScrollView style={styles.container}>
        <Text style={styles.email}>Enter Email Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <Pressable
          onPress={ForgotPsw}
          style={styles.add}>
          {
            loading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            )
              :
              (
                <Text style={styles.addText}>Save Details</Text>

              )

          }
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;
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
    elevation: 8
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  add: {
    borderWidth: 1,
    borderColor: Colors.brand_primary,
    backgroundColor: Colors.brand_primary,
    alignSelf: 'center',
    height: 45,
    width: 200,
    padding: 10,
    marginHorizontal: 14,
    borderRadius: 8,
    marginBottom: 50,
    marginTop: 20
  },
  email: {
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Roboto-Medium',
    color: Colors.text_primary,
    fontSize: 18,
    textAlign: 'center'
  }
});