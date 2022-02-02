import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import setupStore from "./store/store";
import i18n from "i18n-js";
import Locale from './contexts/locale'
import FilesStore from './contexts/filesStore'
import {NavigationController} from "./navigation/navigation.controller";
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
import {Platform, StatusBar, View} from "react-native";
import {Loader} from "./components/Loader";
import * as SecureStore from "expo-secure-store";
import UserFB from './contexts/userFB'
import Preview from './contexts/preview'
import {LayoutAudio} from "./layouts/LayoutAudio";

export default function App() {
    const [lang, setLang] = useState('EN');
    const [Auth, setAuth] = useState(false)
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false);
    const [excursionStore, setExcursionStore] = useState([{}])
    const store = setupStore()
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

    const handlerSetExcursionsStore = (object) => {
        const data = [...excursionStore, ...[object]]
        SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify(data))
            .then(value => {
                setExcursionStore(data)
            })
            .catch((e) => {
            })
    }
    const reExcursionStoreFile = (id) => {

    }
    const clearExcursionsStore = () => {
        SecureStore.deleteItemAsync('KeyExcursionStore')
            .then(() => {

                setExcursionStore([])
            })
            .catch((e) => {
            })
    }
    const handlerLanguage = async (language) => {
        try {
            await SecureStore.setItemAsync('KeyLanguage', language)
            setLang(language)
        }catch (e) {

        }
    }

    const userAuth = (value) => {
        SecureStore.setItemAsync('KeyUser', JSON.stringify(value)).then(() => {
            setUser(value)
            setAuth(true)
        })

    }
    const userAuthRemove = () => {
        setUser({})
        setAuth(false)
        SecureStore.deleteItemAsync('KeyUser').then()
    }

    const asyncFunc = async () => {
        try {
            setLoading(true)
            const KeyUserAuth = await SecureStore.getItemAsync('KeyUserAuth')
            const KeyLanguage = await SecureStore.getItemAsync('KeyLanguage')
            const KeyExcursionStore = await SecureStore.getItemAsync('KeyExcursionStore')
            const KeyPreview = await SecureStore.getItemAsync('KeyPreview')
            if (KeyUserAuth){
                // setAuth(JSON.parse(KeyUserAuth))
            }
            if (!!KeyLanguage && KeyLanguage !== 'undefined' && KeyLanguage !== 'false'){
                setLang(KeyLanguage)
            }
            if (!!KeyExcursionStore && KeyExcursionStore !== 'undefined' && KeyExcursionStore !== 'false') {
                const jsonData = JSON.parse(KeyExcursionStore)
                setExcursionStore(jsonData)
            }
            if(!!KeyPreview && KeyPreview !== 'undefined' && KeyPreview !== 'false') {
                setPreview(true)
            }
            else {
                SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify([])).then()
                setExcursionStore([])
            }
            setLoading(false)
        }catch (e) {
            setLoading(true)
        }
    }
    const handlerPreview = () => {
        SecureStore.setItemAsync('KeyPreview', 'true')
            .then(() => setPreview(true))
    }

    useEffect(() => {
        asyncFunc().then().catch()
    }, [])


    if (!loading && !fontsLoaded)
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Loader/></View>;

  return (
      <Provider store={store}>
          <Locale.Provider value={{lang, setLang: handlerLanguage}}>
              <Preview.Provider value={{preview, handlerPreview}}>
                  <UserFB.Provider value={{auth: Auth, user, setAuth: userAuth, logout: userAuthRemove}}>
                      <ToastProvider>
                          <FilesStore.Provider value={{
                              excursionStore,
                              handlerSetExcursionsStore,
                              clearExcursionsStore,
                              reExcursionStoreFile
                          }}>
                              {Platform.OS === 'ios' && <StatusBar
                                  animated={true}
                                  backgroundColor={"#F5F5F5"}
                                  barStyle={'dark-content'}
                                  showHideTransition={'fade'}
                                  // hidden={hidden}
                              />}
                              <LayoutAudio>
                                  <NavigationController/>
                              </LayoutAudio>
                          </FilesStore.Provider>
                      </ToastProvider>
                  </UserFB.Provider>
              </Preview.Provider>
          </Locale.Provider>
      </Provider>

  );
}