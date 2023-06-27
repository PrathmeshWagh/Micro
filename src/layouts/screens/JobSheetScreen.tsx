import React from 'react';
import { View, Text,StyleSheet, Pressable,Image } from 'react-native';
import Appbar from '../../components/Appbar';
import { Card,Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../style/Colors/colors';
import CircularProgress from 'react-native-circular-progress-indicator';

const JobSheetScreen = ({navigation}:any) => {
  return (
    <View>
      <View style={styles.containerAppbar}>
        <View style={styles.align2}>
    <IonIcon style={styles.icon} name="ios-menu-outline" size={28} color={'white'} /> 
    <Image
        style={styles.tinyLogo}
        source={require('../../style/Img/bell2.png')}
      />
      </View>
      <Text style={styles.pageName}>Job Sheet</Text>
    </View>
      <View style={styles.container}>
        <Pressable onPress={()=>navigation.navigate('DescriptionScreen')}>
      <Card style={styles.card}>
        <View>
   <Text style={styles.jobSheet}>Job Sheet 5126-09-22</Text>
   <Text style={styles.address}>1 Yishun Industrial Street 1, {'\n'}07-36 A'Posh Bizhub,{'\n'} Singapore 768160</Text>
   <Text style={styles.team}>Team members</Text>
   <View style={styles.align}>
   <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
   <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />
   <Avatar.Image size={24} source={require('../../style/Img/profile.png')} />
   <Avatar.Image size={24} source={require('../../style/Img/woman.png')} />

   </View>
   <View style={styles.align}>
   <IonIcon style={styles.icon} name="calendar" size={18} color={'gray'} style={styles.calender} /> 
   <Text style={styles.date}>23 May 2023</Text>
   </View>
   </View>
   <View>
   <View style={styles.indecator}>
                                <CircularProgress
                                    value={80}
                                    radius={60}
                                    duration={1000}
                                    activeStrokeColor={'#FE0000'}
                                    inActiveStrokeColor={'#fac3c3'}
                                    progressValueColor={'#000'}
                                    progressValueFontSize={20}
                                    activeStrokeWidth={8}
                                    maxValue={200}
                                    valueSuffix={'%'}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    dashedStrokeConfig={{ width: 20 }}
                                />
                                <View style={styles.taskIconAlign}>
                                   <Feather style={styles.taskicon} name="check-square" size={18} color={'gray'} style={styles.calender} /> 
                                 <Text style={styles.task}>5 task</Text>
                                 </View>
                            </View>
                           
   </View>
  </Card>
  </Pressable>
  </View>
    </View>
  );
};

export default JobSheetScreen;
const styles = StyleSheet.create({
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
marginTop:15,
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
    marginTop:20,
    padding:20,
    backgroundColor:Colors.card_bg
  },
  task:{
    color: Colors.text_secondary,
    marginLeft:5,
    marginTop:5
  },
  indecator:{
position:'absolute',
right:0,
bottom:10
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