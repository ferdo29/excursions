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
import {useContext, useEffect} from "react";
import userFB from "../contexts/userFB";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export const NavigationController = ({}) => {
    const {auth} = useContext(userFB)
    const user = getAuth().currentUser

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {(auth && !!user) ?
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};