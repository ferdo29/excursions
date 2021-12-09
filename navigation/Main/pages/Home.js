import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {View} from "react-native";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {useContext, useEffect} from "react";
import Locale from "../../../contexts/locale";
import {HomeBackground} from "../../../components/backgrounds/HomeBackground";
import {countriesAPI} from "../../../store/countries/service";
import {popularPlacesAPI} from "../../../store/popularPlaces/service";
import {excursionsAPI} from "../../../store/excursions/service";
import userFB from "../../../contexts/userFB";
import {ActivityIndicator} from "react-native";
import {Loader} from "../../../components/Loader";
import {setExcursions} from "../../../store/excursions/reducer";
import {setCountries} from "../../../store/countries/reducer";
import {setPopularPlaces} from "../../../store/popularPlaces/reducer";

export default function Home({}) {
    useContext(Locale)
    const dispatch = useDispatch()
    const {auth} = useContext(userFB)
    const {data: countries} = useSelector(state => state.countries)
    const {data: popularPlaces} = useSelector(state => state.popularPlaces)
    const {data: excursions} = useSelector(state => state.excursions)

    const {data: Countries, error: errorCountries, isLoading: isLoadingCountries} = countriesAPI.useFetchCountriesQuery()
    const {data: PopularPlacesAPI, error: errorPlaces, isLoading: isLoadingPlaces} = popularPlacesAPI.useFetchPopularPlacesQuery()
    const {data: Excursions, error: errorE, isLoading: isLoadingE} = excursionsAPI.useFetchExcursionsQuery()

    // auth.currentUser.stsTokenManager.accessToken
    // console.log(Excursions.data[0])

    useEffect(() => {
        Excursions?.data && dispatch(setExcursions({data: Excursions.data, error: errorE, isLoading: isLoadingE}))
        Countries?.data && dispatch(setCountries({data: Countries.data, error: errorCountries, isLoading: isLoadingCountries}))
        PopularPlacesAPI?.data && dispatch(setPopularPlaces({data: PopularPlacesAPI.data, error: errorPlaces, isLoading: isLoadingPlaces}))
    }, [Countries, PopularPlacesAPI, Excursions])

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
            {Countries?.data && <ScrollHorizontal buttonView={true}
                                                  toLink={'Country'}
                                                  toLinkTwo={'Countries'}
                                                  title={'Экскурсии по странам'}
                                                  model={countries}/>}
            {PopularPlacesAPI?.data && <ScrollHorizontal buttonView={true}
                                                         toLink={'City'}
                                                         toLinkTwo={'Cities'}
                                                         title={'Популярные места'}
                                                         model={popularPlaces}/>}
            <ContainerMain>
                <Text23Bold style={{marginBottom: 10}}>Интересные экскурсии</Text23Bold>
            </ContainerMain>
            {!isLoadingE ?
                Excursions.data.map((value, index) => index < 4 && <CardExcursion key={value.id} data={value} index={index}/>)
                : <Loader/>}

        </MainLayout>
    );
};