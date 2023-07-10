import React from 'react';
import HomeScreen from '../screens/HomeSceen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import JobSheetScreen from '../screens/JobSheetScreen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../style/Colors/colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
      <Tab.Navigator
      screenOptions={{ headerShown: false,}}
      tabBarOptions={{
         activeTintColor: '#fff',
         inactiveTintColor: 'lightgray',
         activeBackgroundColor: Colors.brand_primary,
         inactiveBackgroundColor:Colors.brand_primary,
             style: {
                   backgroundColor:Colors.brand_primary,
                   paddingBottom: 3
             }
      }}>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline"color={color} size={26}  />
            ),
          }}/>
        <Tab.Screen name="JobSheet" component={JobSheetScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="check-square" color={color} size={26}  />
            ),
          }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcon name="person" color={color} size={26}  />
            ),
            }}/>
      </Tab.Navigator>
    );
};

export default TabNavigation;