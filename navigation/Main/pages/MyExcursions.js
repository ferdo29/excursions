import * as React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {BoxRow, ContainerMain, Text18Bold} from "../../../styles/components/tools";
import {ButtonTab} from "../../../styles/components/buttons";
import {useState} from "react";
import {useSelector} from "react-redux";
import {ItemExcursion} from "./components/ItemExcursion";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";

export default function ({}) {
    const [state, setState] = useState(0)
    const excursions = useSelector(state => state.account.data.excursions)

    const ItemTitle = () => (
        <BoxRow style={{justifyContent: 'flex-start', paddingBottom: 10}}>
            <ButtonTab onPress={() => setState(0)}
                       style={{paddingRight: 6, borderBottomColor: state === 0 ? '#11AEAE' : 'rgba(255,255,255,0)'}}>
                <Text18Bold style={{lineHeight: 20,  color: state === 0 ? '#4F4F4F' : '#BDBDBD'}}>Новые</Text18Bold>
            </ButtonTab>
            <ButtonTab onPress={() => setState(1)}
                       style={{paddingLeft: 6, borderBottomColor: state === 1 ? '#11AEAE' : 'rgba(255,255,255,0)'}}>
                <Text18Bold style={{lineHeight: 20,  color: state === 1 ? '#4F4F4F' : '#BDBDBD'}}>Завершенные</Text18Bold>
            </ButtonTab>
        </BoxRow>
    )
    return (
        <MainLayout animation={excursions.length > 6} itemBack={<FirstBackground/>} title={'Мои экскурсии'} itemTitle={<ItemTitle/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>

                {excursions.map(value => <ItemExcursion {...value} key={value.id}/>)}

            </ContainerMain>
        </MainLayout>
    );
};