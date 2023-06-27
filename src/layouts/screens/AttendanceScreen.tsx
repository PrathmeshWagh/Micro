import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';

 const AttendanceScreen =()=>{
    return(
<View style={styles.container}>
    <CalendarStrip
      scrollable
      style={{height:90, paddingTop: 20, paddingBottom: 10}}
      calendarColor={'#3343CE'}
    //   showDate={false}
    //   showYear={false}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white'}}
      iconContainer={{flex: 0.1}}
    />
  </View>
);
    }
export default AttendanceScreen;
const styles = StyleSheet.create({
  container: { flex: 1 }
});
    
 