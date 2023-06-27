import React from 'react';
import { View, Text,SafeAreaView,ScrollView,TextInput,Pressable,StyleSheet} from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';

const AddReportScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Appbar  title={'Job Sheet'}/>
    <ScrollView style={styles.cover}>
    <Text style={styles.inputText}>Location of Incident</Text>
<TextInput
       style={styles.input}
       //onChangeText={onChangeNumber}
       //value={number}
       keyboardType="numeric"
     />
<Text style={styles.inputText}>Injury</Text>
<TextInput
       style={styles.input}
       //onChangeText={onChangeNumber}
       //value={number}
       keyboardType="numeric"
     />
<Text style={styles.inputText}>Property Damage</Text>
<TextInput
       style={styles.input}
       //onChangeText={onChangeNumber}
       //value={number}
       keyboardType="numeric"
     />
<Text style={styles.inputText}>Person Involved & Position</Text>
<TextInput
       style={styles.input}
       //onChangeText={onChangeNumber}
       //value={number}
       keyboardType="numeric"
     />
     <Text style={styles.inputText}>Details of  incident</Text>
<TextInput
       style={styles.input}
       //onChangeText={onChangeNumber}
       //value={number}
       keyboardType="numeric"
     />
      <View style={styles.align}>
       <Pressable style={styles.uploadButton} onPress={() => open()}>
      <Text style={styles.text}>Upload Picture</Text>
      </Pressable>
       <Pressable style={styles.uploadButton}>
      <Text style={styles.text}>Save</Text>
      </Pressable>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
};
export default AddReportScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cover:{
        padding:14,
        backgroundColor:Colors.screen_bg,
    },
    align:{
        flexDirection:'row',
        justifyContent:'space-between',
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
    inputR:{
        height: 80,
       marginVertical:22,
        marginHorizontal:12,
        borderWidth: 1,
        padding: 10,
        borderColor:'white',
        backgroundColor:Colors.white,
        borderRadius:2,
        elevation:8
    },
    inputText:{
        marginHorizontal: 12,
        color:Colors.text_primary,
        fontFamily:'Roboto-Medium',
    },
    uploadButton:{
        borderWidth:1,
        borderColor:Colors.button,
        backgroundColor:Colors.button,
        padding:6,
        width:120,
        alignItems:'center',
        borderRadius:8,
        alignSelf:'center',
        marginTop:30,
        marginBottom:40
    },
    text:{
        padding:5,
        fontFamily:'Roboto-Bold',
        color:Colors.white,
        fontSize:14
        },
})