import React,{useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OtpVerificationScreen= ({navigation}:any) => {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
     <Appbar title={'Forgot Password'}/>
     <ScrollView style={styles.container}>
      <Text style={styles.email}>Enter Verification code</Text>
      <OTPInputView
    style={{width: '80%', height: 200,alignSelf:'center'}}
    pinCount={4}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
       <Text style={styles.resend}>If you didn’t receive any code ! <Text style={{color:'red'}}>Resend</Text>  </Text>
       <Pressable style={styles.add} onPress={()=>navigation.navigate('ResetPasswordScreen')}>
    <Text style={styles.addText}>Submit</Text>
    </Pressable>
     </ScrollView>
    </View>
  );
};
export default OtpVerificationScreen;
const styles = StyleSheet.create({
  container:{
padding:14,
marginTop:30
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'white',
    backgroundColor:'white',
    elevation:8
  },
  resend:{
fontSize:16,
fontFamily:'Roboto-Medium',
textAlign:'center',
color:'gray'
},

  addText:{
    color:'white',
    textAlign:'center',
    fontFamily:'Roboto-Medium',
        },
        add:{
          borderWidth:1,
          borderColor:Colors.brand_primary,
          backgroundColor:Colors.brand_primary,
          alignSelf:'center',
          height:45,
          width:100,
          padding:10,
          marginHorizontal:14,
          borderRadius:8,
          marginBottom:50,
          marginTop:20
              },
          email:{
            marginLeft:20,
            marginTop:30,
            marginBottom:10,
            fontFamily:'Roboto-Medium',
            color:Colors.text_primary,
            fontSize:18,
            textAlign:'center'
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
                color:'black'
              },
            
              underlineStyleHighLighted: {
                borderColor: "#03DAC6",
              },
});