import React, { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Keyboard, ActivityIndicator, NativeModules } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../style/Colors/colors';
import { FormPostMethod, postMethod, storeData } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import { OneSignal } from 'react-native-onesignal';



const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [playerId, setPlayerId] = useState('');
  useEffect(() => {
    // Get the push subscription status when component mounts
    const getPushSubscriptionStatus = async () => {
      try {
        const optedIn = await OneSignal.User.pushSubscription.getIdAsync();
        console.log('Push subscription status:', optedIn);
        setPlayerId(optedIn);
      } catch (error) {
        console.error('Error checking push subscription status:', error);
      }
    };

    getPushSubscriptionStatus();
  }, []); // Run this effect only once when component mounts
  const onSubmit = async (data) => {
    Keyboard.dismiss();
    LogIn(data);
  };

  const LogIn = async (props) => {

    const raw = {
      email: props.email,
      password: props.password,
      onesignal_player_id: playerId,
    };

    try {
      setLoading(true);
      const api = await postMethod(`login`, raw);
      if (api?.data.status === 'success') {
        console.log('data', api?.data);

        setLoading(false);
        await storeData(api?.data);
        navigation.reset({
          routes: [{ name: 'DrawerNavigtaion' }]
        });
      } else {
        setLoading(false);
        Snackbar.show({
          text: api?.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    } catch (e) {
      setLoading(false);
      Snackbar.show({
        text: "Some Error Occurred: " + e,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#AE1717',
        backgroundColor: '#F2A6A6',
      });
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
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
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode='outlined'
              label="Email"
              value={value}
              onChangeText={onChange}
              style={styles.textInputEmail}
              left={<TextInput.Icon icon="account" />}
            />
          )}
          name="email"
        />
        {errors.email && errors.email.type === "required" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather name="alert-circle" size={9} color='red' style={{ marginRight: 4, marginTop: -3 }} />
            <Text style={styles.error}>Email is required.</Text>
          </View>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather name="alert-circle" size={9} color='red' style={{ marginRight: 4, marginTop: -3 }} />
            <Text style={styles.error}>Email is not valid.</Text>
          </View>
        )}

        <Controller
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode='outlined'
              label="Password"
              value={value}
              onChangeText={onChange}
              style={styles.textInput}
              secureTextEntry
              left={<TextInput.Icon icon="eye" />}
            />
          )}
          name="password"
        />
        {errors.password && errors.password.type === "required" && (
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Feather name="alert-circle" size={9} color='red' style={{ marginRight: 4, marginTop: -3 }} />
            <Text style={styles.error}>Password is required.</Text>
          </View>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Feather name="alert-circle" size={9} color='red' style={{ marginRight: 4, marginTop: -3 }} />
            <Text style={styles.error}>Password should be at least 6 characters.</Text>
          </View>
        )}

        <Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPsw}>Forgot Password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        {loading && <ActivityIndicator size="large" color="#fff" />}
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
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
    marginTop: -5,
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
    width: 150,
  },
  textInput: {
    marginTop: 25,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  textInputEmail: {
    marginTop: 80,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: Colors.brand_primary,
    height: 45,
    width: 180,
    alignSelf: 'center',
    marginTop: 80,
    borderRadius: 8,
  },
  loginText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 23,
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
  },
});


