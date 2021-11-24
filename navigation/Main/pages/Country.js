import * as React from 'react';
import {Text, View} from "react-native";
import {useNavigation, useNavigationState} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";
import {CityBackground} from "../../../components/backgrounds/CityBackground";

export const Country = ({}) => {
    const routes = useNavigationState(state => state.routes)
    const country = useSelector(state =>
        routes.length > 1 && routes[routes.length - 1]?.params?.screen ?
            state.countries.data.find(value => value.id === parseInt(routes[routes.length - 1].params.screen)) :
            state.countries.data[0]
    )

    const {data: countries} = useSelector(state => state.countries)
    const {data: popularPlaces} = useSelector(state => state.popularPlaces)
    const {data: excursions} = useSelector(state => state.excursions)

    return (
        <LayoutImageTop img={country.image}  itemBack={<CityBackground/>} count={country.count} title={country.country}>
            <ContainerMain>
                <View style={{marginBottom: 20,marginTop: 20}}>
                    <InputSearchWrapper>
                        <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>
                        <InputSearch placeholder={'Страна, город, экскурсия...'}/>
                    </InputSearchWrapper>
                </View>
            </ContainerMain>

            <ScrollHorizontal title={'Экскурсии по странам'} model={countries}/>
            <ScrollHorizontal title={'Популярные места'} model={popularPlaces}/>
            <ContainerMain>
                <Text23Bold style={{marginBottom: 10}}>Интересные экскурсии</Text23Bold>
            </ContainerMain>
            {excursions.map((value, index) => <CardExcursion key={value.id} data={value} index={index}/>)}


        </LayoutImageTop>
    );
};