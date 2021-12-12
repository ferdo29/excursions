import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import setupStore from "./store/store";
import {NavigationContainer} from "@react-navigation/native";
import i18n from "i18n-js";
import Locale from './contexts/locale'
import UserFB from './contexts/userFB'
import {NavigationController} from "./navigation/navigation.controller";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import { ToastProvider } from 'react-native-toast-notifications'
import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth";
import {View} from "react-native";
import {Loader} from "./components/Loader";
import * as SecureStore from "expo-secure-store";
import PreviewNavigation from "./navigation/Preview/PreviewNavigation";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DARA_BASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGEING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
export default function App() {
    const [auth, setAuth] = useState(false)
    const [lang, setLang] = useState('RU');
    const [loading, setLoading] = useState(true);
    const store = setupStore()
    const [statePreview, setStatePreview] = useState(false)
    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
        Ubuntu_500Medium,
        Ubuntu_500Medium_Italic,
        Ubuntu_700Bold,
        Ubuntu_700Bold_Italic,
    });

    i18n.locale = lang;
    i18n.translations = {
        "en-En": require('./location/en.json'),
        "en": require('./location/en.json'),
        "En": require('./location/en.json'),
        "EN": require('./location/en.json'),

        'ru-RU': require('./location/ru.json'),
        'ru': require('./location/ru.json'),
        'Ru': require('./location/ru.json'),
        'RU': require('./location/ru.json'),
    }
        useEffect(() => {
            !statePreview && SecureStore.getItemAsync('KeyPreview')
                .then((result) => {
                if (!!result){
                    setStatePreview(true)
                }else {
                    setStatePreview(false)
                }

            })
            // setTimeout(() => {
            //     const token = getAuth()?.currentUser?.stsTokenManager?.accessToken
            //     if(token){
            //         setAuth(true)
            //     }
            //     setLoading(false)
            // }, 2000)
        },[])


    if (!fontsLoaded && !app && !loading)
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Loader/></View>;

  return (
      <Provider store={store}>
          <Locale.Provider value={{lang, setLang}}>
              <UserFB.Provider value={{auth: auth, setAuth}}>
              <ToastProvider>
                  <NavigationContainer>
                      <NavigationController/>
                  </NavigationContainer>
              </ToastProvider>
              </UserFB.Provider>
          </Locale.Provider>
      </Provider>
  );
}
