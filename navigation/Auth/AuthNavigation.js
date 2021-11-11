import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./pages/index";

const Stack = createStackNavigator();

export default () => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthHome" component={Home}/>
        </Stack.Navigator>
    );

}