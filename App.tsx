import {LogBox} from 'react-native';
import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import { CombinedDefaultTheme } from './src/utils/theme';
import { LogLevel, OneSignal } from 'react-native-onesignal';


export default function App() {
  const [user, setUser] = useState(null);
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize("66208921-9dd0-413c-9952-03b03c5c6cd5");
  OneSignal.Notifications.requestPermission(true);
    // useEffect(() => {
    //     Launchscreen();
    //   }, []);
     
    return (
        <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
              <AppNavigation />
            </NavigationContainer>
        </PaperProvider>
    );
}
// const Launchscreen = async () => {
//     SplashScreen.hide();
//   };
LogBox.ignoreAllLogs()

