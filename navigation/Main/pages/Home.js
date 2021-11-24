import * as React from 'react';
import {useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {View} from "react-native";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {useContext} from "react";
import Locale from "../../../contexts/locale";
import {HomeBackground} from "../../../components/backgrounds/HomeBackground";

export default function Home({}) {
    useContext(Locale)
    const {data: countries} = useSelector(state => state.countries)
    const {data: popularPlaces} = useSelector(state => state.popularPlaces)
    const {data: excursions} = useSelector(state => state.excursions)


    return (
        <MainLayout
            itemBack={<HomeBackground/>}>
            <ContainerMain>
                <View style={{marginBottom: 20,}}>
                    <InputSearchWrapper>
                        <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>
                        <InputSearch value={''} placeholder={'Страна, город, экскурсия...'}/>
                    </InputSearchWrapper>
                </View>
            </ContainerMain>
            <ScrollHorizontal buttonView={true} toLink={'Country'} toLinkTwo={'Countries'} title={'Экскурсии по странам'} model={countries}/>
            <ScrollHorizontal buttonView={true} toLink={'City'} toLinkTwo={'Cities'} title={'Популярные места'} model={popularPlaces}/>
            <ContainerMain>
                <Text23Bold style={{marginBottom: 10}}>Интересные экскурсии</Text23Bold>
            </ContainerMain>
            {excursions.map((value, index) => <CardExcursion key={value.id} data={value} index={index}/>)}

        </MainLayout>
    );
};