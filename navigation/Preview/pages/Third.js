import * as React from 'react';
import {BoxWhite, Text16, Text16Bold, Text35} from "../../../styles/components/tools";
import {t} from "i18n-js";
import {BottomSide} from "../component/BottomSide";
import {SecondSide} from "../component/secondSide";
import {Dimensions} from "react-native";
import {useContext} from "react";
import Preview from "../../../contexts/preview";

const {height, width} = Dimensions.get('window')

export const Third = ({}) => {
    const {handlerPreview} = useContext(Preview);

    return (
        <SecondSide styleImg={{width: width}}  image={require('../../../assets/image/PhoeRight.jpg')}>
            <BoxWhite style={{paddingRight: 15, paddingLeft: 22}}>
                <Text35>{t('Preview.Third.Begin')}</Text35>
                <Text35 style={{paddingBottom: 14}}>{t('Preview.Third.always easy')}</Text35>
                <Text16 style={{color: '#828282'}}>
                    {t('Preview.Third.Follow the guided tour route with offline maps and audio guide')}
                </Text16>
                <Text16 style={{color: '#828282', paddingBottom: 24}}>
                    <Text16Bold style={{color: '#11AEAE'}}>{t('Preview.Third.More than 9000 excursions')} </Text16Bold>
                    {t('Preview.Third.waiting for you')}
                </Text16>
                <BottomSide page={2} funMove={handlerPreview}/>
            </BoxWhite>
        </SecondSide>
    );
};