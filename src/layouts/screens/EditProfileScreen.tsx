import React from 'react';
import { View, Text, Pressable, Image, StyleSheet,ScrollView, TextInput} from 'react-native';
import Colors from '../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
const ProfileScreen = ({navigation}:any) => {
  return (
    <>
     <View style={styles.container}>
        <View style={styles.align}>
          <Pressable>
    <IonIcon style={styles.icon} name="ios-menu-outline" size={28} color={'white'}/> 
    </Pressable>
    <Image
        style={styles.tinyLogo}
        source={require('../../style/Img/bell2.png')}
      />
      </View>
      </View>
      <View style={styles.Img}>
      <Avatar.Image size={84} source={require('../../style/Img/NoImage.png')} />
      <Image source={require('../../style/Img/Camera.png')} style={styles.camera}/>
      <Text style={styles.pageName}>John Doe</Text>
      </View>
      <ScrollView style={{flex:1,padding:14,}}>
      <Text style={styles.inputText}>Username</Text>
        <TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
      />
      <Text style={styles.inputText}>Email Adress</Text>
        <TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
      />
      <Text style={styles.inputText}>Phone</Text>
        <TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
      />
      <Text style={styles.inputText}>Gender</Text>
        <TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
      />
       <Text style={styles.inputText}>Date of Birth</Text>
        <TextInput
        style={styles.input2}
        //onChangeText={onChangeNumber}
        //value={number}
      />
      <Pressable onPress={()=>navigation.navigate('ChangePassword')}>
      <Text style={styles.ChngPsw}>Change Password</Text>
      </Pressable>
       <Pressable style={styles.add} onPress={()=>navigation.navigate('EditProfileScreen')}>
    <Text style={styles.addText}>Save Changes</Text>
    </Pressable>
      
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container:{
  backgroundColor:Colors.brand_primary,
  height:200,
  width:"100%",
  padding:14,
  },
  ChngPsw:{
color:Colors.brand_primary,
fontSize:16,
fontFamily:'Roboto-Medium',
paddingLeft:14,
marginVertical:10
  },
  camera:{
    height:25, 
    width:25,
    position:'absolute',
    top:65,
    right:15
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
  tinyLogo:{
      width:22,
      marginTop:5
  },
  Img:{
    alignItems:'center',
    position:'absolute',
    top:50,
    left:150

  },
  align:{
      flexDirection:'row',
      justifyContent:'space-between'
  },
  pageName:{
  fontSize:24,
  color:Colors.white,
  fontFamily:'Roboto-Bold',
  marginTop:8
  
  },
  input:{
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'white',
    backgroundColor:Colors.white,
    borderRadius:2,
    elevation:8
},
input2:{
  height: 50,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  borderColor:'white',
  backgroundColor:Colors.white,
  borderRadius:2,
  elevation:8,
 
},
inputText:{
  marginHorizontal: 12,
  color:Colors.text_primary,
  fontFamily:'Roboto-Medium',
},
  })