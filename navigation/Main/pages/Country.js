import * as React from 'react';
import {Text, View} from "react-native";
import {useIsFocused, useNavigation, useNavigationState} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {CityBackground} from "../../../components/backgrounds/CityBackground";
import img from '../../../assets/image/Portug.jpg'
import {useEffect} from "react";
import {fetchCounter, fetchCounterCity, fetchCounterExcursion} from "../../../store/country/service";
import {excursionDelete, excursionDeleteCity, excursionDeleteExcursion} from "../../../store/country/reducer";
import {Loader} from "../../../components/Loader";

export const Country = ({}) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const routes = useNavigationState(state => state.routes)
    const {data: countries} = useSelector(state => state.countries)
    const {data, error, isLoading, isView, city, excursion} = useSelector(state => state.country)
    const country = useSelector(state => state.countries.data
        .find(value => value.id === (routes.length > 1 && parseInt(routes[routes.length - 1]?.params?.screen)))
    )

    useEffect(() => {
        if(isFocused){
            dispatch(fetchCounter({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen}))
            dispatch(fetchCounterCity({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen}))
            dispatch(fetchCounterExcursion({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen}))
        }
        else{
            dispatch(excursionDelete())
            dispatch(excursionDeleteCity())
            dispatch(excursionDeleteExcursion())
        }
    }, [isFocused])

    return (
        <>
            {isView && <LayoutImageTop img={img}
                             itemBack={<CityBackground/>}
                             count={country?.excursions_count ? country.excursions_count : ' '} title={country?.name ? country.name : ' '}>
                <ContainerMain>
                    <View style={{marginBottom: 20, marginTop: 20}}>
                        <InputSearchWrapper>
                            <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>
                            <InputSearch placeholder={'Страна, город, экскурсия...'}/>
                        </InputSearchWrapper>
                    </View>
                </ContainerMain>

                <ScrollHorizontal title={'Экскурсии по странам'} model={countries}/>
                {city.data && <ScrollHorizontal title={'Популярные места'} model={city.data}/>}
                <ContainerMain>
                    <Text23Bold style={{marginBottom: 10}}>Интересные экскурсии</Text23Bold>
                </ContainerMain>
                {isView && excursion?.data.map((value, index) => <CardExcursion key={index} data={value} index={index}/>)}

            </LayoutImageTop>}
            {!isView &&
            <ContainerMain style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Loader/></ContainerMain>
            }
        </>
    );
};