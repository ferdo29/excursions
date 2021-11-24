import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {BoxRowView, ContainerMain, Text23Bold} from "../../../../styles/components/tools";
import {FirstBackground} from "../../../../components/backgrounds/FirstBackground";

export default function PrivacyPolicy({}) {
    return (
        <MainLayout animation={0} viewBack={true} itemBack={<FirstBackground/>}>

            <ContainerMain style={{paddingBottom: 20, marginTop: 40}}>
                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 50}}>
                    <Text23Bold style={{marginBottom: 16, width: 260, textAlign: 'center', lineHeight: 30}}>Политика конфиденциальности</Text23Bold>
                </BoxRowView>
            </ContainerMain>

        </MainLayout>
    );
};