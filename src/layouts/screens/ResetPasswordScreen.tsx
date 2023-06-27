import React,{useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';


const ResetPasswordScreen= ({navigation}:any) => {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
     <Appbar title={'Reset Password'}/>
     <ScrollView style={styles.container}>
     <Text style={styles.email}>New Password</Text>
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="New Password"
      />
      <Text style={styles.email}>Confirm Password</Text>
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Confirm New Password"
      />
       <Pressable style={styles.add} onPress={()=>navigation.navigate('OtpVerificationScreen')}>
    <Text style={styles.addText}>Submit</Text>
    </Pressable>
     </ScrollView>
    </View>
  );
};

export default ResetPasswordScreen;
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
            marginLeft:12,
            marginTop:30,
            marginBottom:10,
            fontFamily:'Roboto-Medium',
            color:Colors.text_primary,
            fontSize:18,
              }
});