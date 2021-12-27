import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {BoxRowView, ContainerMain, Text18Bold, Text23Bold} from "../../../../styles/components/tools";
import {useSelector} from "react-redux";
import {Accordion} from "../../../../components/tools/Accordion";
import {FirstBackground} from "../../../../components/backgrounds/FirstBackground";
import {t} from "i18n-js";

export const Faq = ({}) => {
    const faq = useSelector(state => state.faq.data)

    return (
        <MainLayout animation={0} viewBack={true} itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 40}}>
                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 50}}>
                    <Text23Bold style={{marginBottom: 16, width: 233, textAlign: 'center', lineHeight: 30}}>
                        {t('FAQ.Questions that may help you')}
                    </Text23Bold>
                </BoxRowView>
                {faq.map(value =>
                    <BoxRowView key={value.id}>
                        <Text18Bold style={{marginBottom: 20}}>{value.title}</Text18Bold>
                        {value.data.map(item =>
                            <Accordion key={item.id} title={item.title} body={item.body} state={item.open}/>
                        )}

                    </BoxRowView>
                )}
            </ContainerMain>
        </MainLayout>
    );
};