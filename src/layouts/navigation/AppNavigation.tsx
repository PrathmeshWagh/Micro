import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../../utils/appContext';
import { getStorageData } from '../../utils/helper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import ViewImageScreen from '../screens/ViewImageScreen';
import DailyReportScreen from '../screens/DailyReportScreen';
import ViewDailyReportScreen from '../screens/ViewDailyReportScreen';
import ReviewImageScreen from '../screens/ReviewImageScreen';
import CompleteScreen from '../screens/CompleteScreen';
import JobDescriptionScreen from '../../ScreenComponent/Tabs/JobDescriptionScreen';
import IncidentReportScreen from '../../ScreenComponent/Tabs/IncidentReportscreen';
import VarientationOderScreen from '../../ScreenComponent/Tabs/VarientationOderScreen';
import { Appbar } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import IncidentReportDescriptionScreen from '../screens/IncidentReportDescriptionScreen';
import InprogressScreen from '../screens/InprogressScreen';
import PendingScreen from '../screens/PendingScreen';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const TabTop = createMaterialTopTabNavigator();

function AppNavigation() {
  const windowWidth = Dimensions.get('window').width;
  const { user, setUser } = useContext(AuthContext);
  // console.log('user', user)
  // const [auth, setAuth] = useState<string | null>(null);
  const [auth, setAuth] = useState('')
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserData()
    SplashScreen.hide();
  }, [])

  const getUserData = async () => {
    try {
      const getData = await getStorageData();
      console.log("getData", getData.token)
      if (getData) setAuth(getData.token)
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
      <Stack.Screen name="TopTabNavigation" component={TopTabNavigation} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JobSheetScreen" component={JobSheetScreen} />
      <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
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
      <Stack.Screen name="DailyReportScreen" component={DailyReportScreen} />
      <Stack.Screen name="ViewDailyReportScreen" component={ViewDailyReportScreen} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
      <Stack.Screen name="JobDescription" component={JobDescriptionScreen} />
      <Stack.Screen name="IncidentReport" component={IncidentReportScreen} />
      <Stack.Screen name="VarientationOder" component={VarientationOderScreen} />
      <Stack.Screen name="IncidentReportDescriptionScreen" component={IncidentReportDescriptionScreen} />
      <Stack.Screen name="InprogressScreen" component={InprogressScreen} />
      <Stack.Screen name="PendingScreen" component={PendingScreen} />
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
  console.log("iiid", id)
  return (
    <TabTop.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: Colors.brand_primary },
      }}>
      <TabTop.Screen name="JobDescription" component={JobDescriptionScreen}
        initialParams={{ project_id: id }} />
      <TabTop.Screen name="IncidentReport" component={IncidentReportScreen}
        initialParams={{ project_id: id }} />
      <TabTop.Screen name="VarientationOder" component={VarientationOderScreen} />
    </TabTop.Navigator>
  )
}



export default AppNavigation;
