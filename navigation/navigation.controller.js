import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {getAuth} from "firebase/auth";
import HomeAuth from "./Auth/pages";
import Language from "./Auth/pages/Language";
import {Countries} from "./Main/pages/Countries";
import {Country} from "./Main/pages/Country";
import {City} from "./Main/pages/City";
import {Cities} from "./Main/pages/Cities";
import Filters from "./Main/pages/Filters";
import {Excursion} from "./Main/pages/Excursion";
import MyExcursions from "./Main/pages/MyExcursions";
import Likes from "./Main/pages/Likes";
import Basket from "./Main/pages/Basket";
import {Map} from "./Main/pages/Route/Map";
import Route from "./Main/pages/Route/Route";
import Participants from "./Main/pages/Route/Participants";
import Account from "./Main/pages/Account/Account";
import InviteFriend from "./Main/pages/Account/InviteFriend";
import AboutApp from "./Main/pages/Account/AboutApp";
import TermsUse from "./Main/pages/Account/TermsUse";
import PrivacyPolicy from "./Main/pages/Account/PrivacyPolicy";
import {Faq} from "./Main/pages/Account/FAQ";
import {Support} from "./Main/pages/Account/Support";
import Home from "./Main/pages/Home";
import {useContext, useEffect, useRef, useState} from "react";
import userFB from "../contexts/userFB";
import {NavigationContainer} from "@react-navigation/native";
import { firebaseApp, auth } from "../firebase"
import Audio from "../contexts/audio";
import moment from "moment";
import {useFiles} from "../hooks/useFiles";
import {useSelector} from "react-redux";
const Stack = createStackNavigator();

let timer = 0

export const NavigationController = ({}) => {
    const {auth:Auth} = useContext(userFB)
    const user = getAuth()
    // const AudioPlayer = useRef(new Audio.Sound());
    // const ref = useRef({})
    // const milliSec = useRef(0)
    // const [AudioPermission, SetAudioPermission] = useState(false);
    // const [position, setPosition] = useState({value: 0})
    // const [timeView, setTimeView] = useState(moment.utc(0).format('HH:mm:ss'))
    // const [IsPLaying, SetIsPLaying] = useState(false);
    // const {playAudio, data} = useSelector(state => state.files)
    //
    // const stopoiweu = () => {
    //     clearInterval(timer)
    //     if (ref.current.durationMillis > milliSec.current) {
    //         timer = setInterval(() => {
    //             milliSec.current += 113
    //             setPosition({value: milliSec.current / ref.current.durationMillis})
    //             setTimeView(moment.utc(milliSec.current).format('HH:mm:ss'))
    //         }, 100)
    //     }else{
    //         setPosition({value: 1})
    //         setTimeView(moment.utc(ref.current.durationMillis).format('HH:mm:ss'))
    //     }
    // }
    // const GetPermission = async () => {
    //     try {
    //         const getAudioPerm = await Audio.requestPermissionsAsync();
    //         SetAudioPermission(getAudioPerm.granted);
    //         AudioPlayer.current.loadAsync({uri:data.find(playAudio).uri}, {}, true)
    //             .then((data) => AudioPlayer.current.getStatusAsync().then())
    //
    //         AudioPlayer.current.getStatusAsync().then((data) => {
    //             ref.current = data
    //         })
    //     } catch (e) {
    //     }
    //
    // };
    // const PlayRecordedAudio = async () => {
    //     try {
    //         const playerStatus = await AudioPlayer.current.getStatusAsync();
    //
    //         ref.current = playerStatus
    //         if (playerStatus.isLoaded) {
    //             if (playerStatus.isPlaying === false) {
    //                 if(ref.current.durationMillis === ref.current.positionMillis){
    //                     stopoiweu()
    //                     await AudioPlayer.current.setPositionAsync(0)
    //                     setPosition({value: 0})
    //                     milliSec.current = ref.current.positionMillis
    //                     await AudioPlayer.current.playAsync();
    //                 }else{
    //                     stopoiweu()
    //                     milliSec.current = ref.current.positionMillis
    //                     await AudioPlayer.current.playAsync();
    //                 }
    //                 SetIsPLaying(true);
    //             }
    //         }
    //     } catch (error) {}
    // };
    // const StopPlaying = async () => {
    //     milliSec.current = ref.current.positionMillis
    //     clearInterval(timer)
    //     try {
    //         const playerStatus = await AudioPlayer.current.getStatusAsync();
    //         ref.current = playerStatus
    //         if (playerStatus.isLoaded) {
    //             await AudioPlayer.current.pauseAsync();
    //             setPosition({value: ref.current.positionMillis / ref.current.durationMillis})
    //             SetIsPLaying(false);
    //         }
    //     } catch (error) {
    //     }
    // };
    // const handlerValueChangeSlider = async (value) => {
    //     setPosition({value})
    //     clearInterval(timer)
    //     try {
    //         const playerStatus = await AudioPlayer.current.getStatusAsync();
    //         ref.current = playerStatus
    //         if (playerStatus.isLoaded) {
    //             await AudioPlayer.current.setPositionAsync(ref.current.durationMillis * value[0])
    //             milliSec.current = ref.current.positionMillis
    //             stopoiweu()
    //             await PlayRecordedAudio()
    //         }
    //     }catch (e) {
    //
    //     }
    // }
    //
    // useEffect(() => {
    //     playAudio && GetPermission();
    // }, [playAudio]);

    return (
        <Audio.Provider >
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {(Auth && !!user.currentUser) ?
                    <>
                        <Stack.Screen name="Home" component={Home}/>

                        <Stack.Screen name="Countries" component={Countries}/>
                        <Stack.Screen name="Country" component={Country}/>

                        <Stack.Screen name="City" component={City}/>
                        <Stack.Screen name="Cities" component={Cities}/>
                        <Stack.Screen name="Filters" component={Filters}/>

                        <Stack.Screen name="Excursion" component={Excursion}/>
                        <Stack.Screen name="MyExcursions" component={MyExcursions}/>

                        <Stack.Screen name="Likes" component={Likes}/>
                        <Stack.Screen name="Basket" component={Basket}/>

                        <Stack.Screen name="Map" component={Map}/>
                        <Stack.Screen name="Route" component={Route}/>
                        <Stack.Screen name="Participants" component={Participants}/>

                        <Stack.Screen name="Account" component={Account}/>
                        <Stack.Screen name="InviteFriend" component={InviteFriend}/>
                        <Stack.Screen name="AboutApp" component={AboutApp}/>
                        <Stack.Screen name="TermsUse" component={TermsUse}/>
                        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
                        <Stack.Screen name="Faq" component={Faq}/>
                        <Stack.Screen name="Support" component={Support}/>
                    </> :
                    <>
                        <Stack.Screen name="AuthHome" component={HomeAuth}/>
                        <Stack.Screen name="Language" component={Language}/>
                    </>
                }
                {/*<Stack.Screen name="AuthHome" component={HomeAuth}/>*/}
                {/*<Stack.Screen name="Language" component={Language}/>*/}
            </Stack.Navigator>
        </NavigationContainer>
        </Audio.Provider>
    );
};