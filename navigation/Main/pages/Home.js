import * as React from 'react';
import {Text} from "react-native";
import {useSelector} from "react-redux";

export default function Home({}) {
    const {users, isLoading, error} = useSelector(state => state.Sample)

    return (
        <>
            <Text>{process.env.DB_USER} sdfsdf</Text>
        </>
    );
};