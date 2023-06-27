import React from 'react';
import { View, Text,StyleSheet, Pressable, ScrollView } from 'react-native';
import {Card } from 'react-native-paper';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';

const DescriptionScreen = ({navigation}:any) => {
  return (
    <>
     <Appbar title={'Job Sheet'}/>
        <ScrollView style={styles.container}>
        <Card style={styles.card}>
        <View style={styles.align}>
        <Text style={styles.title}>Job Sheet Tiitle  -</Text>
        <Text style={styles.details}>Job Sheet 5126-09-22</Text>
        </View>
        <View style={styles.align}>
        <Text style={styles.title}>Client Name  -</Text>
        <Text style={styles.details}>Mr Jason Goh</Text>
        </View>
        <View style={styles.align}>
        <Text style={styles.title}>Address     -</Text>
        <Text style={styles.details}>1 Yishun Industrial Street 1,{'\n'}
Singapore 768160</Text>
        </View>
        <View style={styles.align}>
        <Text style={styles.title}>Mobile Number    -</Text>
        <Text style={styles.details}>     +65 8818 5113</Text>
        </View>
        <View style={styles.align}>
        <Text style={styles.title}>Sales Person        -</Text>
        <Text style={styles.details}> Mr Bryan</Text>
        </View>
        <View style={styles.align}>
        <Text style={styles.title}>Sale Contact    -</Text>
        <Text style={styles.details}>    9866 6611</Text>
        </View>
        <View style={styles.align}>
        <View>
        <Text style={styles.title2}>Start Date</Text>
       <View style={styles.date}><Text style={styles.dateText}>01/06/2022</Text></View>
       </View>
       <View>
        <Text style={styles.title2}>End Date</Text>
       <View style={styles.date}><Text style={styles.dateText}>01/06/2022</Text></View>
       </View>
       </View>
     </Card> 
     <View style={styles.align}>
      <Pressable style={styles.button} onPress={()=>navigation.navigate("TaskScreen")}>
        <Text style={styles.startProject}>Start Project</Text>
    </Pressable >
    <Pressable style={styles.button} onPress={()=>navigation.navigate("TaskScreen")}>
        <Text style={styles.startProject}>End Project</Text>
    </Pressable >
    </View>
    <Pressable style={styles.ViewJob} onPress={()=>navigation.navigate("TaskScreen")}>
        <Text style={styles.ViewJobText}>View Job</Text>
    </Pressable >
    
     </ScrollView>
    </>
  );
};

export default DescriptionScreen;
const styles = StyleSheet.create({
  container: {
padding:14,
  },
  startProject:{
    textAlign:'center',
    color:'white',
    fontFamily:'Roboto-Regular',
    fontSize:14,
    paddingVertical:10
    },
    ViewJobText:{
      textAlign:'center',
      color:'white',
      fontFamily:'Roboto-Regular',
      fontSize:20,
      paddingVertical:8
    },
    
  dateText:{
    color:Colors.text_secondary,
  },
    title:{
color:Colors.text_primary,
fontSize:20,
fontFamily:'Roboto-Medium',
lineHeight: 45,
    },
    title2:{
      color:Colors.text_primary,
      fontSize:20,
      fontFamily:'Roboto-Medium',
      lineHeight: 45,
      marginTop:15,
      paddingHorizontal:30
          },
    date:{
borderColor:'white',
borderWidth:1,
backgroundColor:'white',
elevation:8,
width:100,
padding:5,
fontFamily:'Roboto-Regular',
marginHorizontal:25
    },
    card:{
        paddingBottom:30,
        backgroundColor:Colors.card_bg
      },
      details:{
color:Colors.text_secondary,
fontSize:16,
fontFamily:'Roboto-Regular',
lineHeight: 40,
      },
      gap:{
        color:Colors.text_secondary,
        fontSize:16,
        fontFamily:'Roboto-bold',
      },
      align:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      button:{
        backgroundColor:Colors.brand_primary,
        height:45,
        width:100,
        alignSelf:'center',
        marginTop:50,
        borderRadius:8,
        marginBottom:5,
    },
    ViewJob:{
      backgroundColor:'#E2E2E2',
      height:50,
      width:200,
      alignSelf:'center',
      marginTop:50,
      borderRadius:8,
      marginBottom:50

  },
})
