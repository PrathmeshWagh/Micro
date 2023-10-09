import {LogBox} from 'react-native';
import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import { CombinedDefaultTheme } from './src/utils/theme';


export default function App() {
  const [user, setUser] = useState(null);

  
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

