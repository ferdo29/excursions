import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {View} from "react-native";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {ContainerMain, Text16, Text23Bold} from "../../../styles/components/tools";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {useContext, useEffect, useLayoutEffect} from "react";
import Locale from "../../../contexts/locale";
import {HomeBackground} from "../../../components/backgrounds/HomeBackground";
import {fetchCounter} from "../../../store/countries/service";
import {fetchPopularPlacesData} from "../../../store/popularPlaces/service";
import {fetchExcursions} from "../../../store/excursions/service";
import {Loader} from "../../../components/Loader";
import {getAuth} from "firebase/auth";
import {fetchFavourite} from "../../../store/favourite/service";
import {fetchCart} from "../../../store/cart/service";
import {fetchMyExcursions} from "../../../store/myExcursions/service";
import userFB from "../../../contexts/userFB";
import {t} from "i18n-js";

export default function Home({}) {
    useContext(Locale)
    const dispatch = useDispatch()
    const user = getAuth().currentUser
    const {setAuth} = useContext(userFB)
    const {data: countries, isLoading: isLoadingC} = useSelector(state => state.countries)
    const {data: popularPlaces, isLoading: isLoadingP} = useSelector(state => state.popularPlaces)
    const {data: excursions, isLoading} = useSelector(state => state.excursions)

    const onRefresh = () => {
        dispatch(fetchCounter({token: user.stsTokenManager.accessToken}))
        dispatch(fetchPopularPlacesData({token: user.stsTokenManager.accessToken}))
        dispatch(fetchExcursions({token: user.stsTokenManager.accessToken}))
        dispatch(fetchFavourite({token: user.stsTokenManager.accessToken}))
        dispatch(fetchCart({token: user.stsTokenManager.accessToken}))
        dispatch(fetchMyExcursions({token: user.stsTokenManager.accessToken}))
    }
    useEffect(() => {
        onRefresh()
    }, [user])
    return (
        <MainLayout
            Refreshing={true}
            handlerRefresh={onRefresh}
            itemBack={<HomeBackground/>}>
            <ContainerMain>
                {/*<View style={{marginBottom: 20,}}>*/}
                {/*    <InputSearchWrapper>*/}
                {/*        <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>*/}
                {/*        <InputSearch value={''} placeholder={'Страна, город, экскурсия...'}/>*/}
                {/*    </InputSearchWrapper>*/}
                {/*</View>*/}
            </ContainerMain>

            {!isLoadingC && countries.length > 0 && countries && <ScrollHorizontal buttonView={true}
                                                  toLink={'Country'}
                                                   toLinkTwo={'Countries'}
                                                  title={t('Home.Country Tours')}
                                                  model={ countries}/>}
            {!isLoadingP && popularPlaces.length > 0 && popularPlaces && <ScrollHorizontal buttonView={true}
                                                         toLink={'City'}
                                                         toLinkTwo={'Cities'}
                                                         title={t('Home.Popular places')}
                                                         model={popularPlaces}/>}

            {!isLoading ?
                <>
                    <ContainerMain>
                        <Text23Bold style={{marginBottom: 10}}>{t('Home.Interesting excursions')}</Text23Bold>
                    </ContainerMain>
                    {
                        excursions.length > 0 && excursions.map((value, index) => index < 4 &&
                            <CardExcursion key={value.id} data={value} index={index}/>)
                    }
                </>
                : <Loader/>}

        </MainLayout>
    );
};