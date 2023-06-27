import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigation from '../navigation/TabNavigation';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import JobSheetScreen from '../screens/JobSheetScreen';
import TaskScreen from '../screens/TaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import ImageUploadScreen from '../screens/ImageUploadScreen';
import AddOderScreen from '../screens/AddOderScreen';
import AddReportScreen from '../screens/AddReportScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeSceen';
import DrawerLogo from '../../components/DrawerLogo';
import AttendanceScreen from '../screens/AttendanceScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" 
         screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name="DrawerNavigtaion" component={DrawerNavigtaion} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="JobSheetScreen" component={JobSheetScreen} />
            <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
            <Stack.Screen name="TaskScreen" component={TaskScreen} />
            <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
            <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />
            <Stack.Screen name="AddOderScreen" component={AddOderScreen} />
            <Stack.Screen name="AddReportScreen" component={AddReportScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />

        </Stack.Navigator>
    );
};
function DrawerNavigtaion() {
    return (
        <Drawer.Navigator  initialRouteName="TabNavigation"
        screenOptions={{
        headerShown: false,
       }} drawerContent={props => <DrawerLogo {...props}/>}>
        <Drawer.Screen name="Home" component={TabNavigation} />
        <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Drawer.Screen name="AttendanceScreen" component={AttendanceScreen} />

      </Drawer.Navigator>
    );
  }
export default AppNavigation;
