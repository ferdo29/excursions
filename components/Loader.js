import * as React from 'react';
import {ActivityIndicator} from "react-native";

export const Loader = ({size="large", color="#00ff00"}) => {
    return (
        <ActivityIndicator size={size} color={color} />
    );
};