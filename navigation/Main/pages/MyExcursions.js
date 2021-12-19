import * as React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {BoxRow, ContainerMain, Text18Bold} from "../../../styles/components/tools";
import {ButtonTab} from "../../../styles/components/buttons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";
import {ItemExcursion} from "./components/ItemExcursion";
import {t} from "i18n-js";
import {fetchMyExcursions} from "../../../store/myExcursions/service";

export default function ({}) {
    const dispatch = useDispatch()
    const [state, setState] = useState(0)
    const {data, isLoading, error} = useSelector(state => state.myExcursions)

    const onRefresh = () => {
        dispatch(fetchMyExcursions({token: user.stsTokenManager.accessToken}))
    }

    const ItemTitle = () => (
        <BoxRow style={{justifyContent: 'flex-start', paddingBottom: 10}}>
            <ButtonTab onPress={() => setState(0)}
                       style={{paddingRight: 6, borderBottomColor: state === 0 ? '#11AEAE' : 'rgba(255,255,255,0)'}}>
                <Text18Bold style={{lineHeight: 20,  color: state === 0 ? '#4F4F4F' : '#BDBDBD'}}>{t('myExcursions.New')}</Text18Bold>
            </ButtonTab>
            <ButtonTab onPress={() => setState(1)}
                       style={{paddingLeft: 6, borderBottomColor: state === 1 ? '#11AEAE' : 'rgba(255,255,255,0)'}}>
                <Text18Bold style={{lineHeight: 20,  color: state === 1 ? '#4F4F4F' : '#BDBDBD'}}>{t('myExcursions.Completed')}</Text18Bold>
            </ButtonTab>
        </BoxRow>
    )
    return (
        <MainLayout Refreshing={true} handlerRefresh={onRefresh}
            animation={data.length > 6} itemBack={<FirstBackground/>} title={t('myExcursions.My excursions')} itemTitle={<ItemTitle/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>

                {data
                    .filter(value => state === 0 ? !value.expired : value.expired)
                    .map(value => <ItemExcursion {...value} key={value.id}/>)}

            </ContainerMain>
        </MainLayout>
    );
};