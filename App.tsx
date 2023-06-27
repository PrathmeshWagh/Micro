import {LogBox} from 'react-native';
import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import { CombinedDefaultTheme } from './src/utils/theme';
import SplashScreen from 'react-native-splash-screen'


export default function App() {
    useEffect(() => {
        Launchscreen();
      }, []);
    
    return (
        <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
                <AppNavigation/>
            </NavigationContainer>
        </PaperProvider>
    );
}
const Launchscreen = async () => {
    SplashScreen.hide();
  };
LogBox.ignoreAllLogs()