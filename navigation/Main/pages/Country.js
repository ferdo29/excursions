import * as React from 'react';
import {useNavigationState} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {CityBackground} from "../../../components/backgrounds/CityBackground";
import {t} from "i18n-js";
import {View} from "react-native";

export const Country = ({}) => {
    const routes = useNavigationState(state => state.routes)
    const excursion = useSelector(state => state.excursions.data.filter(value => value.country.id === parseInt(routes[routes.length - 1]?.params?.screen)))
    const {data: popularPlaces, isLoading: isLoadingP} = useSelector(state => state.popularPlaces)
    const country = useSelector(state => state.countries.data
        .find(value => value.id === (routes.length > 1 && parseInt(routes[routes.length - 1]?.params?.screen)))
    )

    const validImg = () => {
        if(country &&  country?.images &&  country?.images.length > 0 && country?.images[0]?.path){
            return {uri: country.images[0].path}
        }
        return require('../../../assets/image/Church.png')
    }

    const filterPopularPlaces = () => {
        const id = routes[routes.length - 1]?.params?.screen
        return popularPlaces.filter(place => place.country.id === parseInt(id))
    }

    return (
        <>
            <LayoutImageTop img={validImg()}
                            itemBack={<CityBackground/>}
                            count={country?.excursions_count ? country.excursions_count : '0'} title={country?.name ? country.name : ' '}>
                {/*<ContainerMain>*/}
                {/*    <View style={{marginBottom: 20, marginTop: 20}}>*/}
                {/*        <InputSearchWrapper>*/}
                {/*            <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>*/}
                {/*            <InputSearch placeholder={t('Country.Country, city, excursion')}/>*/}
                {/*        </InputSearchWrapper>*/}
                {/*    </View>*/}
                {/*</ContainerMain>*/}

                {!isLoadingP && popularPlaces.length > 0 && popularPlaces && <ScrollHorizontal buttonView={true}
                                                                                               toLink={'City'}
                                                                                               limit={1000}
                                                                                               toLinkTwo={'Cities'}
                                                                                               title={t('Country.Choose city')}
                                                                                               model={filterPopularPlaces()}/>}
                {excursion.length > 0 && <ContainerMain>
                    <Text23Bold style={{marginBottom: 10}}>{t('Country.Interesting excursions')}</Text23Bold>
                </ContainerMain>}
                {excursion.length > 0 && excursion.map((value, index) => <CardExcursion key={index} data={value} index={index}/>)}
                {excursion && excursion.length <= 1 && <View style={{height: 200, width: '100%'}}/>}
            </LayoutImageTop>
        </>
    );
};