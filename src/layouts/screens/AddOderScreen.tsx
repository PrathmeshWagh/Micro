import React from 'react';
import { View, Text, StyleSheet,ScrollView,TextInput, Pressable,SafeAreaView} from 'react-native';
import Appbar from '../../components/Appbar';
import Colors from '../../style/Colors/colors';

const AddOderScreen = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.container}>
       <Appbar  title={'Job Sheet'}/>
     <ScrollView style={styles.cover}>
     <Text style={styles.inputText}>Products / Services</Text>
<TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        keyboardType="numeric"
      />
<Text style={styles.inputText}>Size / Qty</Text>
<TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        keyboardType="numeric"
      />
<Text style={styles.inputText}>Description</Text>
<TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        keyboardType="numeric"
      />
<Text style={styles.inputText}>Customer Contact Details</Text>
<TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputR}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Remarks"
      />
       <Pressable style={styles.uploadButton} onPress={()=>navigation.navigate("ImageUploadScreen")}>
      <Text style={styles.text}>Upload Picture</Text>
      </Pressable>
     </ScrollView>
    </SafeAreaView>
  );
};

export default AddOderScreen;
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
        width:350,
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
        fontSize:18
        },
})