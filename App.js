import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View } from 'react-native';
import Locale from './contexts/locale'
import i18n from "i18n-js";
import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic, __metdata__,
} from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';

export default function App() {
    const [lang, setLang] = useState('en');
    let [fontsLoaded] = useFonts({
        __metdata__,
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

        'ru-RU': require('./location/ru.json'),
        'ru': require('./location/ru.json'),
        'Ru': require('./location/ru.json'),
    }

    if (!fontsLoaded) return <AppLoading />;

    return (
        <Locale.Provider value={{lang, setLang}}>
            <View>
                <Text style={{paddingTop: 150}}>Open up App.js to start working on your app!{lang}</Text>
                <StatusBar style="auto"/>
            </View>
        </Locale.Provider>

    );
}