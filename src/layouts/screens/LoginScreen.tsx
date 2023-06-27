import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../style/Colors/colors';
import { postMethod } from '../../utils/helper';
import axios from 'axios';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const LogIn = async () => {
  //   const raw = {
  //     email: email,
  //     password: password,
  //   }
  //   try{
  //   const api = await postMethod (`login`,raw);
  //   // console.log('status')
  //   if (api.status === 200) {
  //     console.log("success",api);
  //   }
  //   else {
  //     console.log('error status',api)
  //   }
  // }catch (e){
  //   console.log(e)
  // }
 

let data = {

    email:'test@gmail.com',

    password:'admin123',

  }

  axios.post('https://microairecare.braincave.work/api/login',data).then(data => {

    console.log(data);

  }).catch(error => {

    console.log(error);

  })

  }



  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../style/Img/logo.png')}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          label="Email"
          value={email}
          style={styles.textInputEmail}
          onChangeText={text => setEmail(text)}
          mode='outlined'
          activeUnderlineColor='#5B5BFF'
          left={<TextInput.Icon icon="account" />} />

        <TextInput
          label="Password"
          value={password}
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
          mode='outlined'
          activeUnderlineColor='#5B5BFF'
          left={<TextInput.Icon icon="eye" />} />
        <Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPsw}>Forgot Password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={()=>navigation.navigate('DrawerNavigtaion')}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable >
    </ScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.screen_bg,
  },
  forgotPsw: {
    color: Colors.text_primary,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    bottom: -25,
    fontFamily: 'Roboto-Medium',
  },
  tinyLogo: {
    alignSelf: 'center',
    marginTop: 50,
    height: 150,
    width: 150
  },
  textInput: {
    marginTop: 25,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  textInputEmail: {
    marginTop: 80,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: Colors.brand_primary,
    height: 45,
    width: 180,
    alignSelf: 'center',
    marginTop: 80,
    borderRadius: 8

  },
  loginText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 23
  },
  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
  },
  icon: {
    position: 'absolute',
    right: 10,
  }
})