import React, {useState} from 'react';
import {Provider} from "react-redux";
import setupStore from "./store/store";
import {NavigationContainer} from "@react-navigation/native";
import i18n from "i18n-js";
import Locale from './contexts/locale'
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

export default function App() {
    const [lang, setLang] = useState('RU');
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

    if (!fontsLoaded) return <AppLoading />;

  return (
      <Provider store={store}>
          <Locale.Provider value={{lang, setLang}}>
              <ToastProvider>
                  <NavigationContainer>
                      <NavigationController preview={statePreview} setCtxPreview={setStatePreview}/>
                  </NavigationContainer>
              </ToastProvider>
          </Locale.Provider>
      </Provider>
  );
}
