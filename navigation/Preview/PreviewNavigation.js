import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import PreviewHome from "./pages/index";

const Stack = createStackNavigator();

export default () => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="PreviewHome" component={PreviewHome}/>
        </Stack.Navigator>
    );

}
