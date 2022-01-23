import * as React from 'react';
import {BottomSide} from "../component/BottomSide";
import {FirstSlid} from "../component/firstSlid";
import {useLinkTo} from "@react-navigation/native";

export const First = ({}) => {
    const linkTo = useLinkTo();
    return (
        <FirstSlid>
            <BottomSide page={0} funMove={() => linkTo(`/Second`)}/>
        </FirstSlid>
    );
};