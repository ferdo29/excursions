import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
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
import Preview from "./Preview/pages/index";
import {useContext, useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import userFB from "../contexts/userFB";
import PreviewContext from '../contexts/preview'
import {First} from "./Preview/pages/First";
import {Second} from "./Preview/pages/Second";
import {Third} from "./Preview/pages/Third";
import {getAuth, setPersistence, browserSessionPersistence, getIdToken} from "firebase/auth";

const Stack = createStackNavigator();


export const NavigationController = ({}) => {
    const {auth: Auth} = useContext(userFB)
    const {preview} = useContext(PreviewContext);

    const session = async () => {
        try {
           const user = {
               "apiKey": "AIzaSyCt28SfJNYeFmdg3aCnmUtWdgwbqEx4sWM",
               "appName": "[DEFAULT]",
               "authDomain": "excursions-4193e.firebaseapp.com",
               "currentUser":  {
                "_redirectEventId": undefined,
                    "apiKey": "AIzaSyCt28SfJNYeFmdg3aCnmUtWdgwbqEx4sWM",
                    "appName": "[DEFAULT]",
                    "createdAt": "1639926635463",
                    "displayName": "Виктор Переварюха",
                    "email": "ferd2299@gmail.com",
                    "emailVerified": true,
                    "isAnonymous": false,
                    "lastLoginAt": "1643211695445",
                    "phoneNumber": undefined,
                    "photoURL": "https://lh3.googleusercontent.com/a-/AOh14Gjpppe1xpjKEJY-7RtxjAX6r9BeePOC4PZ-uNCypg=s96-c",
                    "providerData":  [
                     {
                    "displayName": "Виктор Переварюха",
                        "email": "ferd2299@gmail.com",
                        "phoneNumber": null,
                        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14Gjpppe1xpjKEJY-7RtxjAX6r9BeePOC4PZ-uNCypg=s96-c",
                        "providerId": "google.com",
                        "uid": "111694694399701819930",
                },
            ],
                "stsTokenManager":  {
                    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhYTE0OGNkMDcyOGUzMDNkMzI2ZGU1NjBhMzVmYjFiYTMyYTUxNDkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi0JLQuNC60YLQvtGAINCf0LXRgNC10LLQsNGA0Y7RhdCwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqcHBwZTF4cGpLRUpZLTdSdHhqQVg2cjlCZWVQT0M0UFotdU5DeXBnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4Y3Vyc2lvbnMtNDE5M2UiLCJhdWQiOiJleGN1cnNpb25zLTQxOTNlIiwiYXV0aF90aW1lIjoxNjQzMjExNjk1LCJ1c2VyX2lkIjoiQmtnNUVTdDJVSmJXak9tQThjOEZuVXVCWGdKMyIsInN1YiI6IkJrZzVFU3QyVUpiV2pPbUE4YzhGblV1QlhnSjMiLCJpYXQiOjE2NDMyMTE2OTUsImV4cCI6MTY0MzIxNTI5NSwiZW1haWwiOiJmZXJkMjI5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTY5NDY5NDM5OTcwMTgxOTkzMCJdLCJlbWFpbCI6WyJmZXJkMjI5OUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.6CPscnyhoCc7PrcR82OB87_BR4Jprkw52F2-NWYQasPZnWz275u81G4alfdW_u1iaElTDZwGVDll9CN4P-391_fPtx9LsCj4DAkAqjpgHwnptKo-6grg2Vq65_2tMcTEmgG7n9-4X1PHum3FrY2WGacaVIii4CqHOMUbRvpgOYeCLfAcPqkdXGkxiCXzZDfNV5KxSLlmdjWy5M0eSgR6kZKjrAxVRBEL_0O7KNzQ1mG7fOWB96o3hnVrJu1fh1wuIdwboMPRqZSYLkYwOUdRyS2NTJ2nauKrUT9kpkseztQS0LJtRoqvYK0IBn2-ed3GurFqvWprrYjfymHA_rGGSw",
                        "expirationTime": 1643215295730,
                        "refreshToken": "AFxQ4_rrYR07PqjwUZTiN3x9Eb7H4n8cPHaKbAgOgYK6FxplDDTWoiXVi0JB7AW73F2_Qjy--MnNA2ObYl-AtaAFefQLK3ppoSHRLOCPCbo-5_zmhanPUb1tcxoL7V_dBuycAAJnQv7-TILqpVuOg1bMnqQg9JA3Y9D59qET87SNxKuqHb0690qkkYHQfSbkYgFjUfMfbGf80AHMZVuOrXRf-vZAx33ENGcVfG5gwBef9O5NcjdpqaIG4moX1Z6tI9PuhV84VGeWqFS_kwFeCvOSpgPtBWqnIoxwmk-iBlYdtTTG5BWFhqmAm8nEnOuZCObChTCZ6WcPdcI1oubGDXfzok_Giei5eOPPjPC7_-qBcL5CaTIbuykyVqrESHdr09e4DxPeKHwk16YVS2ZXatpE51tdEktxwwrm_X4KABTBIYLss_rfjB82a9eug-suZvSjmgs-s0fu",
                },
                "tenantId": undefined,
                    "uid": "Bkg5ESt2UJbWjOmA8c8FnUuBXgJ3",
            },
        }
            getAuth().currentUser.getIdToken(true).then(res => {
                alert(JSON.stringify(res))
            })

            // console.log(getId)
            // setPersistence(getAuth(), browserSessionPersistence).then(
            //     res => {
            //         console.log(res)}
            // )
            // onAuthStateChanged(user, (data) => {
            //     console.log(321)
            // })
        }catch (e) {
        }

    }
    useEffect(() => {

       session().then()
    }, [])

    return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>

                    {!preview ?
                    <>
                        <Stack.Screen name="First" component={First}/>
                        <Stack.Screen name="Second" component={Second}/>
                        <Stack.Screen name="Third" component={Third}/>
                        <Stack.Screen name="Language" component={Language}/>
                    </> :
                    <>
                        {
                            !Auth ?
                                <>
                                    <Stack.Screen name="AuthHome" component={HomeAuth}/>
                                    <Stack.Screen name="Language" component={Language}/>
                                </>
                                :
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
                                    <Stack.Screen name="Language" component={Language}/>
                                </>
                        }
                    </>
                    }



                </Stack.Navigator>
            </NavigationContainer>
    );
};