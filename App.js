import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import setupStore from "./store/store";
import i18n from "i18n-js";
import Locale from './contexts/locale'
import UserFB from './contexts/userFB'
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
import {View} from "react-native";
import {Loader} from "./components/Loader";
import * as SecureStore from "expo-secure-store";

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     // databaseURL: process.env.DARA_BASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGEING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID,
// };
//
//
// initializeApp(firebaseConfig);
import { firebaseApp, auth } from "./firebase"

export default function App() {
    const [Auth, setAuth] = useState(false)
    const [lang, setLang] = useState('RU');
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
                console.log(e)
            })
    }
    const reExcursionStoreFile = (id) => {

    }
    const clearExcursionsStore = () => {
        SecureStore.deleteItemAsync('KeyExcursionStore')
            .then(() => {

                setExcursionStore([])
            })
            .catch((e) => console.log(e))
    }
    const userAuth = (value) => {
        SecureStore.setItemAsync('KeyUserAuth', JSON.stringify(value))
            .then(() => {
                setAuth(true)
            })
    }
    const userAuthRemove = (value) => {
        SecureStore.deleteItemAsync('KeyUserAuth')
            .then(async () => {
                // await auth.signOut()
                setAuth(null)
            })
            .catch(e => console.log(e))
    }

    const asyncFunc = async () => {
        try {
            setLoading(true)
            const KeyUserAuth = await SecureStore.getItemAsync('KeyUserAuth')
            const KeyExcursionStore = await SecureStore.getItemAsync('KeyExcursionStore')
            if (KeyUserAuth){
                // setAuth(JSON.parse(KeyUserAuth))
            }
            if (!!KeyExcursionStore && KeyExcursionStore !== 'undefined' && KeyExcursionStore !== 'false') {
                const jsonData = JSON.parse(KeyExcursionStore)
                setExcursionStore(jsonData)
            }
            else {
                SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify([])).then()
                setExcursionStore([])
            }
            setLoading(false)
        }catch (e) {
            setLoading(true)
            console.log(e, 123)
        }
    }

    useEffect(() => {
        asyncFunc().then().catch()
        // console.log(getApps())
    }, [])


    if (!loading && !fontsLoaded)
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Loader/></View>;

  return (

          <Locale.Provider value={{lang, setLang}}>
          <FilesStore.Provider value={{excursionStore, handlerSetExcursionsStore, clearExcursionsStore, reExcursionStoreFile}}>
              <UserFB.Provider value={{auth: Auth, setAuth: userAuth, logout: userAuthRemove}}>
                  <Provider store={store}>
                      <ToastProvider>
                          <NavigationController/>
                      </ToastProvider>
                  </Provider>
              </UserFB.Provider>
          </FilesStore.Provider>
          </Locale.Provider>

  );
}


// import React, {useEffect, useState} from 'react';
// import {View, Text} from "react-native";
// import { firebaseApp, auth } from "./firebase"
// export default function App() {
//     console.log(auth)
//     return(
//         <View style={{margin: 100,}}>
//             <Text>sdhdfg</Text>
//         </View>
//     )
// }