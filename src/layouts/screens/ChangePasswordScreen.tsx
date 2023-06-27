import React,{useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Appbar from '../../components/Appbar';


const ChangePasswordScreen = () => {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
     <Appbar title={'Change Password'}/>
     <ScrollView style={styles.container}>
     <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Change Password"
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="New Password"
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Re-enter New Password"
        keyboardType="numeric"
      />
       <Pressable style={styles.add}>
    <Text style={styles.addText}>Save Changes</Text>
    </Pressable>
     </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;
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
          borderColor:'#041B8E',
          backgroundColor:'#041B8E',
          height:45,
          
          padding:10,
          marginHorizontal:14,
          borderRadius:8,
          marginBottom:50,
          marginTop:20
              },
});