import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {BoxRowView, ContainerMain, Text23Bold} from "../../../../styles/components/tools";
import {FirstBackground} from "../../../../components/backgrounds/FirstBackground";
import {t} from "i18n-js";

export default function TermsUse({}) {
    return (
        <MainLayout animation={0} viewBack={true} itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 40}}>
                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 50}}>
                    <Text23Bold style={{marginBottom: 16, width: 233, textAlign: 'center', lineHeight: 30}}>{t('Terms of use.Terms of use')}</Text23Bold>
                </BoxRowView>
            </ContainerMain>

        </MainLayout>
    );
};