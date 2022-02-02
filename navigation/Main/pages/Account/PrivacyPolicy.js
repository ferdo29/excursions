import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {BoxRowView, ContainerMain, Text12, Text23Bold} from "../../../../styles/components/tools";
import {FirstBackground} from "../../../../components/backgrounds/FirstBackground";
import {t} from "i18n-js";

export default function PrivacyPolicy({}) {
    return (
        <MainLayout animation={0} viewBack={true} itemBack={<FirstBackground/>}>

            <ContainerMain style={{paddingBottom: 20, marginTop: 40}}>
                <BoxRowView style={{width: 'auto',  alignItems: 'flex-end', marginBottom: 50, marginTop: 10}}>
                    <Text12 style={{marginBottom: 16,  textAlign: 'justify', lineHeight: 15}}>{t('Privacy Policy.Privacy Policy')}</Text12>
                </BoxRowView>
            </ContainerMain>

        </MainLayout>
    );
};