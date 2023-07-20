import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colors from '../../style/Colors/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { getMethod } from '../../utils/helper';
const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`profile_data`);
    if (api.status === 200) {
      setLoading(false);
      setProfile(api.data)
    }
  }
  const goToNextScreen = () => {
    navigation.navigate('EditProfileScreen', {
      firstname: profile.first_name,
      lastname: profile.last_name,
      Email: profile.email,
      number: profile.mobile_number,
      profile: profile.image
    })
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.align}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <IonIcon style={styles.icon} name="ios-menu-outline" size={28} color={'white'} />
          </Pressable>
          <View style={styles.Img}>
            <Avatar.Image size={84} source={{ uri: profile.image }} />
            <Text style={styles.pageName}>{profile.first_name}{" "}{profile.last_name}</Text>
          </View>
          <Image
            style={styles.tinyLogo}
            source={require('../../style/Img/bell2.png')}
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 14, }}>
        <Text style={styles.inputText}>First Name</Text>
        <View style={styles.input}>
          <Text style={{color:'black'}}>{profile.first_name}</Text>
        </View>

        <Text style={styles.inputText}>Last Name</Text>
        <View style={styles.input}>
          <Text style={{color:'black'}}>{profile.last_name}</Text>
        </View>
        
        <Text style={styles.inputText}>Email Adress</Text>
        <View style={styles.input}>
          <Text style={{color:'black'}}>{profile.email}</Text>
        </View>

        <Text style={styles.inputText}>Phone</Text>
        <View style={styles.input}>
          <Text style={{color:'black'}}>{profile.mobile_number}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.ChngPsw}>Change Password</Text>
        </Pressable>
        <Pressable style={styles.add} onPress={() => goToNextScreen()}>
          <Text style={styles.addText}>Edit Profile</Text>
        </Pressable>

      </ScrollView>
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand_primary,
    height: 200,
    width: "100%",
    padding: 14,
  },
  ChngPsw: {
    color: Colors.brand_primary,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    paddingLeft: 14,
    marginVertical: 10
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  add: {
    borderWidth: 1,
    borderColor: '#041B8E',
    backgroundColor: '#041B8E',
    height: 45,
    width: 150,
    padding: 10,
    marginLeft: 18,
    borderRadius: 8,
    marginBottom: 50,
    marginTop: 20
  },
  tinyLogo: {
    width: 22,
    marginTop: 5
  },
  Img: {
    alignItems: 'center',
    marginTop: 30
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageName: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    marginTop: 8

  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    borderColor: 'white',
    backgroundColor: Colors.white,
    borderRadius: 2,
    elevation: 8,
  },
  inputText: {
    marginHorizontal: 12,
    color: Colors.text_primary,
    fontFamily: 'Roboto-Medium',
  },
})