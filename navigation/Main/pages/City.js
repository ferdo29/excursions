import * as React from 'react';
import {View} from "react-native";
import {useIsFocused, useNavigationState} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {CityBackground} from "../../../components/backgrounds/CityBackground";
import {useEffect} from "react";
import img from "../../../assets/image/Shiadu.png";
import {t} from "i18n-js";

export const City = ({}) => {
    const isFocused = useIsFocused();
    const routes = useNavigationState(state => state.routes)
    const excursion = useSelector(state => state.excursions.data.filter(value => value.city.id === parseInt(routes[routes.length - 1]?.params?.screen)))
    const data = useSelector(state => state.popularPlaces.data
        .find(value => value.id === (routes.length > 1 && parseInt(routes[routes.length - 1]?.params?.screen)))
    )

    const handlerGallery = () => {
        if (data?.images && data?.images.length > 0){
            return data.images.map(value => ({uri: value.path}))
        }
        return [
            img,
            img,
            img,
        ]
    }
    useEffect(() => {
        if(isFocused){
            // dispatch(fetchPopularPlaces({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen, token: user.accessToken}))
            // dispatch(fetchPopularPlacesExcursions({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen, token: user.accessToken}))

        }else{
            // dispatch(popularPlacesDelete())
            // dispatch(popularPlacesDeleteExcursion())
        }
    }, [isFocused, routes])
    return (
        <>
            {
                <LayoutImageTop
                viewOption={false}
                img={handlerGallery()[0]}
                itemBack={<CityBackground/>}
                count={data.excursions ? data.excursions : '0'}
                title={data.name}>

                {/*<ContainerMain>*/}
                {/*    <View style={{marginBottom: 20, marginTop: 20}}>*/}
                {/*        <InputSearchWrapper>*/}
                {/*            <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>*/}
                {/*            <InputSearch placeholder={t('City.Country, city, excursion')}/>*/}
                {/*        </InputSearchWrapper>*/}
                {/*    </View>*/}
                {/*</ContainerMain>*/}

                <ContainerMain>
                    <Text23Bold style={{marginBottom: 10}}>{t('City.Choose tour')}</Text23Bold>
                </ContainerMain>
                {excursion && excursion.length > 0 && excursion.map((value, index) => <CardExcursion key={index} data={value} index={index}/>)}

                {excursion && excursion.length <= 1 && <View style={{height: 200, width: '100%'}}/>}
            </LayoutImageTop>}
        </>
    );
};