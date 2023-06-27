import React,{useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';


const ForgotPasswordScreen= ({navigation}:any) => {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
     <Appbar title={'Forgot Password'}/>
     <ScrollView style={styles.container}>
      <Text style={styles.email}>Enter Email Address</Text>
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Re-enter New Password"
        keyboardType="numeric"
      />
       <Pressable style={styles.add} onPress={()=>navigation.navigate('OtpVerificationScreen')}>
    <Text style={styles.addText}>Submit</Text>
    </Pressable>
     </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;
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
              }
});