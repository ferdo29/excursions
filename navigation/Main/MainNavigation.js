import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./pages/Home";
import {Countries} from "./pages/Countries";
import {Country} from "./pages/Country";
import {City} from "./pages/City";
import {Cities} from "./pages/Cities";
import {Excursion} from "./pages/Excursion";
import Likes from "./pages/Likes";
import Basket from "./pages/Basket";
import MyExcursions from "./pages/MyExcursions";
import Route from "./pages/Route/Route";
import {Map} from "./pages/Route/Map";
import Participants from "./pages/Route/Participants";
import Account from "./pages/Account/Account";
import InviteFriend from "./pages/Account/InviteFriend";
import AboutApp from "./pages/Account/AboutApp";
import TermsUse from "./pages/Account/TermsUse";
import PrivacyPolicy from "./pages/Account/PrivacyPolicy";
import {Faq} from "./pages/Account/FAQ";
import {Support} from "./pages/Account/Support";
import Filters from "./pages/Filters";

const Stack = createStackNavigator();

export default () => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
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

        </Stack.Navigator>
    );

}
