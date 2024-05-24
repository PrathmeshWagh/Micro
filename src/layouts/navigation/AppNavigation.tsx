import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { getStorageData } from '../../utils/helper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import ViewImageScreen from '../screens/ViewImageScreen';
import DailyReportScreen from '../screens/DailyReportScreen';
import ViewDailyReportScreen from '../screens/ViewDailyReportScreen';
import ReviewImageScreen from '../screens/ReviewImageScreen';
import CompleteScreen from '../screens/CompleteScreen';
import JobDescriptionScreen from '../../ScreenComponent/Tabs/JobDescriptionScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import InprogressScreen from '../screens/InprogressScreen';
import PendingScreen from '../screens/PendingScreen';
import SplashScreen from 'react-native-splash-screen';
import CustomTopTabBar from '../../components/CustomTopTabBar';
import ManpowerReportScreen from '../screens/ManpowerReportScreen';
import EditImageScreen from '../screens/EditImageScreen';
import RemarkScreen from '../screens/RemarkScreen';
import ViewVariationOderScreen from '../screens/ViewVariationOderScreen';
import ViewIncidentReportScreen from '../screens/IncedentReport/ViewIncidentReportScreen';
import IncidentReportScreen from '../screens/IncedentReport/IncidentReportScreen';
import IncidentFormScreen from '../screens/IncedentReport/IncidentFormScreen';
import IncidentReportDescriptionScreen from '../screens/IncedentReport/IncidentReportDescriptionScreen';
import VarientationOderScreen from '../../ScreenComponent/Tabs/VarientationOderScreen';
import DailyActivityDescriptionScreen from '../screens/DailyActivity/DailyActivityDescriptionScreen';
import DailyActivityScreen from '../screens/DailyActivity/DailyActivityScreen';
import DailyActivityCardScreen from '../screens/DailyActivity/DailyActivityCardScreen';
import EditIncidentReportScreen from '../screens/IncedentReport/EditIncidentReportScreen';
import EditVariationOrder from '../screens/VariationOder/EditVariationOder';
import ViewDailyActivityScreen from '../screens/DailyActivity/ViewDailyActivityScreen';
import EditDailyActivityCardScreen from '../screens/DailyActivity/EditDailyActivityCardScreen';
import EditDailyActivityScreen from '../screens/DailyActivity/EditDailyActivityScreen';
import EditManPowerReport from '../screens/DailyActivity/EditManPowerReportScreen';
import HistoryScreen from '../screens/HistoryScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const TabTop = createMaterialTopTabNavigator();

function AppNavigation() {
  const windowWidth = Dimensions.get('window').width;
  const [auth, setAuth] = useState('')
  console.log('auth',auth)
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserData()
    setTimeout(() =>{
      SplashScreen.hide();
    },3000)
    
  }, [])

  const getUserData = async () => {
    try {
      const getData = await getStorageData();
      console.log("getData", getData.token)
      if (getData)
        setAuth(getData.token)
      setLoad(false);
    } catch (error) {
      console.log('Initiate data error');
      setLoad(false);
    }
  }

  return (
    load === false ? (
      <Stack.Navigator initialRouteName={auth !== '' ? "DrawerNavigtaion" : "Login"} screenOptions={{ headerShown: false }} >
        <Stack.Screen name="DrawerNavigtaion" component={DrawerNavigtaion} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="JobSheetScreen" component={JobSheetScreen} />
        <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
        <Stack.Screen name="TopTabNavigation" component={TopTabNavigation} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
        <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />
        <Stack.Screen name="ReviewImageScreen" component={ReviewImageScreen} />
        <Stack.Screen name="AddOderScreen" component={AddOderScreen} />
        <Stack.Screen name="AddReportScreen" component={AddReportScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="ViewImageScreen" component={ViewImageScreen} />
        <Stack.Screen name="EditImageScreen" component={EditImageScreen} />
        <Stack.Screen name="DailyReportScreen" component={DailyReportScreen} />
        <Stack.Screen name="ViewDailyReportScreen" component={ViewDailyReportScreen} />
        <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
        <Stack.Screen name="JobDescription" component={JobDescriptionScreen} />
        <Stack.Screen name="IncidentReport" component={IncidentReportScreen} />
        <Stack.Screen name="IncidentFormScreen" component={IncidentFormScreen} />
        <Stack.Screen name="VarientationOder" component={VarientationOderScreen} />
        <Stack.Screen name="IncidentReportDescriptionScreen" component={IncidentReportDescriptionScreen} />
        <Stack.Screen name="DailyActivityDescriptionScreen" component={DailyActivityDescriptionScreen} />
        <Stack.Screen name="DailyActivityCardScreen" component={DailyActivityCardScreen} />
        <Stack.Screen name="ManpowerReportScreen" component={ManpowerReportScreen} />
        <Stack.Screen name="InprogressScreen" component={InprogressScreen} />
        <Stack.Screen name="PendingScreen" component={PendingScreen} />
        <Stack.Screen name="RemarkScreen" component={RemarkScreen} />
        <Stack.Screen name="ViewVariationOderScreen" component={ViewVariationOderScreen} />
        <Stack.Screen name="ViewIncidentReportScreen" component={ViewIncidentReportScreen} />
        <Stack.Screen name="EditIncidentReportScreen" component={EditIncidentReportScreen} />
        <Stack.Screen name="EditVariationOrder" component={EditVariationOrder} />
        <Stack.Screen name="ViewDailyActivityScreen" component={ViewDailyActivityScreen} />
        <Stack.Screen name="EditDailyActivityCardScreen" component={EditDailyActivityCardScreen} />
        <Stack.Screen name="EditDailyActivityScreen" component={EditDailyActivityScreen} />
        <Stack.Screen name="EditManPowerReport" component={EditManPowerReport} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />

      </Stack.Navigator>
    )
      : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.screen_bg }} >
          <ActivityIndicator size="large" color={Colors.brand_primary} />
        </View>
      )
  )
}

function DrawerNavigtaion() {
  return (
    <Drawer.Navigator initialRouteName="TabNavigation"
      screenOptions={{
        headerShown: false,
      }} drawerContent={props => <DrawerLogo {...props} />}>
      <Drawer.Screen name="DrawerHome" component={TabNavigation} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="AttendanceScreen" component={AttendanceScreen} />
    </Drawer.Navigator>
  );
}



function TopTabNavigation({ route }: any) {
  const { id } = route.params;
  return (
    <>
      <TabTop.Navigator
        tabBar={(props) => <CustomTopTabBar {...props} project_id={id} />}
      >
        <TabTop.Screen name="JobDescription" component={JobDescriptionScreen}
          initialParams={{ project_id: id }}
          options={{ tabBarLabel: '      Job\nDescription' }} />
        <TabTop.Screen name="DailyActivity" component={DailyActivityScreen}
          initialParams={{ project_id: id }}
          options={{ tabBarLabel: '  Daily\nActivity' }} />
        <TabTop.Screen name="VarientationOder" component={VarientationOderScreen}
          initialParams={{ project_id: id }}
          options={{ tabBarLabel: 'Variation\n   Order' }} />
        <TabTop.Screen name="IncidentReport" component={IncidentReportScreen}
          initialParams={{ project_id: id }}
          options={{ tabBarLabel: 'Incident\n Report' }} />
        {/* <Appbar/> */}
      </TabTop.Navigator>
    </>
  )
}



export default AppNavigation;
