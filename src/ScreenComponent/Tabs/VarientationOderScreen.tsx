import React from 'react';
import { View, Text,StyleSheet, Pressable,Image,TouchableOpacity} from 'react-native';

import { Card,Avatar } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors/colors';
import { useNavigation } from '@react-navigation/native';

const VarientationOder = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.cover}>
    <Pressable style={styles.add} onPress={()=>navigation.navigate('AddOderScreen')}>
    <Text style={styles.addText}>+ Add</Text>
    </Pressable>
    <View>
    <Pressable>
     <Card style={styles.card}>
  <View style ={styles.align}>
   <Text style={styles.text}>Product Service -</Text>
   <Text style={styles.text}>Aircon</Text>
   </View>
   <View style ={styles.align}>
   <Text style={styles.text}>Size/Qty -  </Text>
   <Text style={styles.text}>123</Text>
   </View>
   <View style ={styles.align}>
   <Text style={styles.text}>Customer Contact Details - </Text>
   <Text style={styles.text}> Shine 9877 5441</Text>
   </View>
   <View style ={styles.align}>
   <Text style={styles.text}>Remarks-</Text>
   <Text style={styles.text}>Installed</Text>
   </View>
   <View>                 
   </View>
  </Card>
    </Pressable>
    </View>
    </View>
  );
};

export default VarientationOder;
const styles = StyleSheet.create({
    cover:{
marginTop:14,
marginHorizontal:14
    },
    add:{
borderWidth:1,
borderColor:'#041B8E',
backgroundColor:'#041B8E',
height:35,
width:65,
padding:5,
paddingLeft:10,
alignSelf:'center'
    },
    addText:{
color:'white',
fontFamily:'Roboto-Medium',
    },
    text:{
      color:Colors.text_primary,
      fontSize:16,
      marginBottom:5,
      fontFamily:'Roboto-Bold',
      lineHeight:30
    },
    startDate:{
        color:Colors.text_primary,
        marginTop:5,
        fontFamily:'Roboto-Regular',
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
    align:{
        flexDirection:'row',
        justifyContent:'space-between',
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
    backgroundColor:Colors.white, 
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
})