import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {BoxRowView, ContainerMain, Text14, Text23Bold} from "../../../../styles/components/tools";
import {IconBC, IconFacebookColor, IconInstagramColor, IconVKColor} from "../../../../components/Icons";
import {Image} from "react-native";
import {FirstBackground} from "../../../../components/backgrounds/FirstBackground";
import {t} from "i18n-js";

export default function AboutApp({}) {
    return (
        <MainLayout animation={0} viewBack={true} itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 40}}>

                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 50}}>
                    <Text23Bold style={{marginBottom: 16, textAlign: 'center', lineHeight: 30}}>{t('AboutApp.About the app')}</Text23Bold>
                    <Image style={{width: 244, height: 244}} source={require('../../../../assets/image/Globe.png')}/>
                    <Text14 style={{textAlign: 'center', color: '#4F4F4F', width:288, lineHeight:  24}}>
                        {t('AboutApp.Text')}
                    </Text14>
                </BoxRowView>
                <BoxRowView style={{justifyContent:'space-evenly', marginBottom: 27}}>
                    <IconFacebookColor />
                    <IconVKColor/>
                    <IconInstagramColor/>
                </BoxRowView>
                <Text14 style={{textAlign: 'center', color: '#11AEAE'}}>www.website.com</Text14>

            </ContainerMain>
        </MainLayout>
    );
};