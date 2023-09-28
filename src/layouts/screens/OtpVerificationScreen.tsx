import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const { email } = route.params;


  const ForgotPsw = async () => {
    const raw = {
      email: email,
      otp: code
    }
    console.log("raw", raw)
    try {
      setLoading(true)
      const api: any = await postMethod(`check_otp`, raw);
      if (api.data.status === true) {
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.dispatch(
          CommonActions.navigate({
            name: 'ResetPasswordScreen',
            params: {
              email: email,
            },
          })
        )
      } else {
        setLoading(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
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

  const OtpResend = async () => {
    const raw = {
      email: email,
    }
    console.log("raw", raw)
    try {
      setLoad(true)
      const api: any = await postMethod(`forgot_password`, raw);
      if (api.data.status === true) {
        setLoad(false);
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
        setLoad(false);
        Snackbar.show({
          text: api.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#AE1717',
          backgroundColor: '#F2A6A6',
        });
      }
    }
    catch (e) {
      setLoad(false);
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
        <Text style={styles.email}>Enter Verification code</Text>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Choose appropriate behavior
        >
          <OTPInputView
            style={{ width: '80%', height: 200, alignSelf: 'center', }}
            pinCount={4}
            code={code}
            onCodeChanged={(code) => setCode(code)}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </KeyboardAvoidingView>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.resend}>If you didn’t receive any code !</Text>
          <Pressable onPress={OtpResend}>
            {
              load ? (
                <ActivityIndicator size="small" color={Colors.red} />
              )
                :
                (
                  <Text style={styles.resendText}> Resend </Text>
                )
            }
          </Pressable>
        </View>
        <Pressable
          onPress={ForgotPsw}
          style={styles.add}>
          {
            loading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            )
              :
              (
                <Text style={styles.addText}>Submit</Text>

              )

          }
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default OtpVerificationScreen;
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
  resend: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: 'gray'
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: 'red'
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
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Colors.text_primary,
    borderBottomColor: Colors.text_secondary
  },

  underlineStyleHighLighted: {
    borderColor: Colors.text_primary,
  },
});