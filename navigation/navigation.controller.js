import * as React from 'react';
import {useState} from "react";
import PreviewNavigation from "./Preview/PreviewNavigation";
import MainNavigation from "./Main/MainNavigation";
import AuthNavigation from "./Auth/AuthNavigation";

export const NavigationController = ({}) => {
    const [state] = useState(false)
    return (
        <>
            {/*{state ? <MainNavigation/> : <PreviewNavigation/>}*/}
            <AuthNavigation/>
        </>
    );
};