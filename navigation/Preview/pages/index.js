import * as React from 'react';
import {FirstSlid} from "../component/firstSlid";
import {BottomSide} from "../component/BottomSide";
import {useSelector} from "react-redux";
import {SecondSide} from "../component/secondSide";
import {BoxWhite, Text16, Text16Bold, Text35} from "../../../styles/components/tools";
import {Dimensions} from "react-native";
import {t} from "i18n-js";

const {height, width} = Dimensions.get('window')

export default function ({}) {
    const {page} = useSelector(state => state.previewPagination)
    return (
        <>
            {page === 1 &&
            <FirstSlid>
                <BottomSide/>
            </FirstSlid>}
            {page === 2 &&
            <SecondSide styleImg={{width: width, height: height * 0.6}} image={require('../../../assets/image/Phone.jpg')}>
                <BoxWhite style={{paddingRight: 15, paddingLeft: 22}}>
                    <Text35>{t('Preview.Second.Audio guide')}</Text35>
                    <Text35>{t('Preview.Second.always with you')}</Text35>
                    <Text16 style={{color: '#828282', paddingBottom: 38}}>
                        {t('Preview.Second.Start the tour at any time convenient for you The audio guide will be available to you offline')}
                    </Text16>
                    <BottomSide/>
                </BoxWhite>
            </SecondSide>}
            {page === 3 &&
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
                    <BottomSide/>
                </BoxWhite>
            </SecondSide>}

        </>
    );
};