import * as React from 'react';
import {ActivityIndicator} from "react-native";

export const Loader = ({size="large", color="#11AEAE"}) => {
    return (
        <ActivityIndicator size={size} color={color} />
    );
};