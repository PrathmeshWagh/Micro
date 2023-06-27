import React from 'react';
import { View, Text,ScrollView,Image, Alert } from 'react-native';
import Appbar from '../../components/Appbar';
import {StyleSheet, Pressable } from 'react-native';
import { Card,Avatar } from 'react-native-paper';
import Colors from '../../style/Colors/colors';
const TaskDetailScreen = ({navigation}:any) => {
  
  return (
    <View>
      <Appbar  title={'Task'}/>
      <ScrollView style={styles.container}>
        <Pressable>
         <Card style={styles.card}>
            <View>
       <Text style={styles.jobSheet}>Job Description</Text>
       <Text style={styles.address}>1 Yishun Industrial Street 1, {'\n'}07-36 A'Posh Bizhub,{'\n'} Singapore 768160</Text>
       <Text style={styles.team}>Team members</Text>
       <View style={styles.align}>
       <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
       <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />
       <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
       <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />
       </View>
       <Text style={styles.startDate}>Deadline: <Text style={{color:Colors.red}}>29-04-2023</Text></Text>
       </View>
       <View> 
       </View>
      </Card>
      </Pressable>
<View>
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Pressable style={styles.AddPic} onPress={() => navigation.navigate('ImageUploadScreen')}>
            <Text style={styles.text}>Add Photo</Text>
            <Image size={24} source={require('../../style/Img/Add.png')} />
          </Pressable>
          {/* 9434472624 finestra */}
          <View style={styles.AddPic}>
          <Text style={styles.text}>View Images</Text>
            <Image size={24} source={require('../../style/Img/2.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={styles.AddPic}>
          <Text style={styles.text}>Daily Reports</Text>
            <Image size={24} source={require('../../style/Img/3.png')} />
          </View>
          <View style={styles.AddPic}>
          <Text style={styles.text}>Add Daily Report</Text>
            <Image size={24} source={require('../../style/Img/4.png')} />
          </View>
        </View>
        <View style={styles.remark}>
          <Text>Remarks....</Text>
        </View>

</View>




      {/* <ImageUpload/> */}
    </ScrollView>
     </View>
  );
};
export default TaskDetailScreen;
const styles = StyleSheet.create({
  container:{
padding:14
  },
  text:{
    fontFamily:'Roboto-Medium',
    fontSize:14
  },
  remark:{
    marginTop:20,
borderColor:'#E8E8E8',
backgroundColor:'#E8E8E8',
borderWidth:1,
padding:20,
width:"100%",
borderRadius:6
  },
    cover:{
marginTop:14,
marginHorizontal:14
    },
    AddPic:{
flexDirection:'row',
justifyContent:'space-between',
borderWidth:1,
borderColor:'#A5FFA5',
backgroundColor:'#A5FFA5',
padding:8,
elevation:8,
width:130,
height:40,
marginTop:20
    },
    startDate:{
        color:Colors.text_primary,
        marginTop:8,
        fontFamily:'Roboto-Regular',
        fontSize:16
    },
containerAppbar:{
    backgroundColor:Colors.brand_primary,
    height:150,
    width:"100%",
    padding:14
    },
    tinyLogo:{
        width:22,
        marginTop:5
    },
    taskIconAlign:{
flexDirection:'row',
marginTop:5,
marginLeft:30
    },
  taskicon:{
    position:'absolute',
    top:50
  },
    align2:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pageName:{
    alignSelf:'center',
    fontSize:28,
    color:Colors.white,
    fontFamily:'Roboto-Bold',
    marginTop:25
    },
  card:{
    marginTop:10,
    padding:20,
    backgroundColor:Colors.card_bg
  },
  task:{
    color: Colors.text_secondary,
    marginLeft:5,
    marginTop:5
  },
 
  icon:{

  },
  date:{
marginVertical:5,
marginHorizontal:5,
fontSize:14,
color: Colors.text_secondary,

  },
  align:{
    flexDirection:'row',
    marginBottom:5
  },
  container:{
    padding:14
  },
  calender:{
    marginVertical:5,
  },
  jobSheet:{
color:Colors.text_primary,
fontSize:20,
marginBottom:5,
fontFamily:'Roboto-Bold'
  },
  address:{
color:Colors.text_secondary,
fontSize:14,
marginBottom:5,
fontFamily:'Roboto-Regular'
  },
  team:{
    fontSize:18,
    color:Colors.text_primary,
    marginTop:10,
    marginBottom:10,
    fontFamily:'Roboto-Bold'

  }
})