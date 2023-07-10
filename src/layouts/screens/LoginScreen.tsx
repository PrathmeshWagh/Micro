import React, { useContext, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView, Pressable, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../style/Colors/colors';
import { postMethod, storeData, validateIsEmail } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../utils/appContext';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loader, setLoader] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    Keyboard.dismiss()
   // console.log("hide", data);
    LogIn(data)

  }


  const LogIn = async (props: any) => {
    //console.log('hii',props.email)
    const raw = {
      email: props.email,
      password: props.password,
    }
    try {
      const api: any = await postMethod(`login`, raw);
      if (api.status === 200) {
       // console.log("api", api.data)
        await storeData(api.data)
        setUser(api.data)
        // console.log('data', api.data)
        // setLoader(false);
        navigation.navigate("DrawerNavigtaion")
      } else {
        setLoader(false);
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


  // const LogIn = async () => {
  //   //console.log('hii',props.email)
  //   const raw = {
  //     email:email,
  //     password: password,
  //   }
  //   try {
  //       const api: any = await postMethod(`login`,raw);
  //       if (api.status === 200) {
  //          console.log("api", api)
  //         // await storeData(api.data)
  //         // setUser(api.data)
  //         // console.log('data', api.data)
  //         // setLoader(false);
  //         //navigation.navigate("DrawerNavigtaion")
  //       } else {
  //         setLoader(false);
  //         Snackbar.show({
  //           text: api.data.message,
  //           duration: Snackbar.LENGTH_SHORT,
  //           textColor: '#AE1717',
  //           backgroundColor: '#F2A6A6',
  //         });
  //       }
  //     }
  //    catch (e) {
  //     Snackbar.show({
  //       text: "Some Error Occured" + e,
  //       duration: Snackbar.LENGTH_SHORT,
  //       textColor: '#AE1717',
  //       backgroundColor: '#F2A6A6',
  //     });
  //   }

  // }




  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    defaultValues: {
      email: '',
      password: '',

    }
  });


  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../style/Img/logo.png')}
      />
      <View style={{ flex: 1 }}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode='outlined'
              activeUnderlineColor='#5B5BFF'
              label="Email"
              value={value}
              onChangeText={value => onChange(value)}
              style={styles.textInputEmail}
              activeUnderlineColor='#5B5BFF'
              left={<TextInput.Icon icon="account" />}
            />
          )}
          name="email"
        />
        {errors.email && errors.email.type === "required" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather
              name="alert-circle"
              size={9}
              color='red'
              style={{ marginRight: 4, marginTop: -3 }} />
            <Text style={styles.error}>Email is required.</Text>
          </View>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather
              name="alert-circle"
              size={9}
              color='red'
              style={{ marginRight: 4, marginTop: -3 }} />

            <Text style={styles.error}>Email is not valid.</Text>
          </View>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode='outlined'
              activeUnderlineColor='#5B5BFF'
              label="Password"
              value={value}
              style={styles.textInput}
              onChangeText={value => onChange(value)}
              left={<TextInput.Icon icon="eye" />}
            />
          )}
          name="password"
        />
        {errors.password && errors.password.type === "required" && (
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Feather
              name="alert-circle"
              size={9}
              color='red'
              style={{ marginRight: 4, marginTop: -3 }} />

            <Text style={styles.error}>Password is required.</Text>
          </View>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather
              name="alert-circle"
              size={9}
              color='red'
              style={{ marginRight: 4, marginTop: -3 }} />

            <Text style={styles.error}>
              Password should be at-least 6 characters.
            </Text>
          </View>
        )}


        {/* <TextInput
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
          left={<TextInput.Icon icon="eye" />} />  */}
        <Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPsw}>Forgot Password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
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
  error: {
    color: 'red',
    fontSize: 10,
    marginTop: -5
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