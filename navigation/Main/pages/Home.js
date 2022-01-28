import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {useContext, useEffect} from "react";
import Locale from "../../../contexts/locale";
import {HomeBackground} from "../../../components/backgrounds/HomeBackground";
import {fetchCounter} from "../../../store/countries/service";
import {fetchPopularPlacesData} from "../../../store/popularPlaces/service";
import {fetchExcursions} from "../../../store/excursions/service";
import {Loader} from "../../../components/Loader";
import {getAuth, getIdToken, onAuthStateChanged} from "firebase/auth";
import {fetchFavourite} from "../../../store/favourite/service";
import {fetchCart} from "../../../store/cart/service";
import {fetchMyExcursions} from "../../../store/myExcursions/service";
import {t} from "i18n-js";
import {useFiles} from "../../../hooks/useFiles";
import {CardExcursionsWrapper} from "../../../styles/components/Cards";
import {useIsFocused} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function Home({}) {
    useContext(Locale)
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const user = getAuth().currentUser
    const {handlerInitFiles} = useFiles()
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
        // onRefresh()
    }, [user])
    useEffect(() => {
        handlerInitFiles().then()
    }, [])
    useEffect(() => {

        getIdToken(getAuth().currentUser).then((data) => {
            console.log(data)
        })
        getAuth().currentUser.getIdToken().then(async res => {
            // const user = await getAuth()
            // SecureStore.setItemAsync('KeyUser', JSON.stringify(user))
            //     .then(() => {
            //         // console.log(user)
            //     })
            //     .catch((e) => {console.log(e)})
        })
    }, [isFocused])
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
                    <CardExcursionsWrapper>
                    {excursions.length > 0 && excursions.map((value, index) => index < 4 &&
                            <CardExcursion key={value.id} data={value} index={index}/>)}
                    </CardExcursionsWrapper>
                </>
                : <Loader/>}

        </MainLayout>
    );
};