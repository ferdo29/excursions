import * as React from 'react';
import {BoxWhite, Text16, Text35} from "../../../styles/components/tools";
import {t} from "i18n-js";
import {BottomSide} from "../component/BottomSide";
import {SecondSide} from "../component/secondSide";
import {Dimensions} from "react-native";
import {useLinkTo} from "@react-navigation/native";

const {height, width} = Dimensions.get('window')

export const Second = ({}) => {
    const linkTo = useLinkTo();
    return (
        <SecondSide styleImg={{width: width, height: height * 0.6}} image={require('../../../assets/image/Phone.jpg')}>
            <BoxWhite style={{paddingRight: 15, paddingLeft: 22}}>
                <Text35>{t('Preview.Second.Audio guide')}</Text35>
                <Text35>{t('Preview.Second.always with you')}</Text35>
                <Text16 style={{color: '#828282', paddingBottom: 38}}>
                    {t('Preview.Second.Start the tour at any time convenient for you The audio guide will be available to you offline')}
                </Text16>
                <BottomSide page={1} funMove={() => linkTo(`/Third`)}/>
            </BoxWhite>
        </SecondSide>
    );
};