import * as React from 'react';
import {View} from "react-native";
import {useIsFocused, useNavigationState} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {InputSearch, InputSearchWrapper} from "../../../styles/components/inputs";
import {IconSearch} from "../../../components/Icons";
import {ContainerMain, Text23Bold} from "../../../styles/components/tools";
import {ScrollHorizontal} from "../../../components/tools/ScrollHorizontal";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {CityBackground} from "../../../components/backgrounds/CityBackground";
import {useEffect} from "react";
import {popularPlacesDelete, popularPlacesDeleteExcursion} from "../../../store/popularPlaces/reducer";
import {fetchPopularPlaces, fetchPopularPlacesExcursions} from "../../../store/popularPlaces/service";
import {Loader} from "../../../components/Loader";
import img from "../../../assets/image/Shiadu.png";
import {getAuth} from "firebase/auth";

export const City = ({}) => {
    const user = getAuth().currentUser
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const routes = useNavigationState(state => state.routes)
    const {data: countries} = useSelector(state => state.countries)
    const {one: {data}, excursion: {isLoading: isLoadingE, isView: isViewE, data: excursion}, error, isLoading, isView} = useSelector(state => state.popularPlaces)

    const handlerGallery = () => {
        if (isView && !isLoading && data?.images && data?.images.length > 0){
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
            dispatch(fetchPopularPlaces({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen, token: user.stsTokenManager.accessToken}))
            dispatch(fetchPopularPlacesExcursions({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen, token: user.stsTokenManager.accessToken}))

        }else{
            dispatch(popularPlacesDelete())
            dispatch(popularPlacesDeleteExcursion())
        }
    }, [isFocused])

    return (
        <>
            {isView && !isLoading && <LayoutImageTop
                viewOption={false}
                img={handlerGallery()[0]}
                itemBack={<CityBackground/>}
                count={data.excursions}
                title={data.name}>
                <ContainerMain>
                    <View style={{marginBottom: 20, marginTop: 20}}>
                        <InputSearchWrapper>
                            <IconSearch style={{position: 'absolute', left: 20, top: 10}}/>
                            <InputSearch placeholder={'Страна, город, экскурсия...'}/>
                        </InputSearchWrapper>
                    </View>
                </ContainerMain>

                <ScrollHorizontal title={'Экскурсии по странам'} model={countries}/>
                {/*<ScrollHorizontal title={'Популярные места'} model={popularPlaces}/>*/}
                <ContainerMain>
                    <Text23Bold style={{marginBottom: 10}}>Интересные экскурсии</Text23Bold>
                </ContainerMain>
                {excursion && excursion.length > 0 && excursion.map((value, index) => <CardExcursion key={index} data={value} index={index}/>)}


            </LayoutImageTop>}
            {!isView && isLoading &&
            <ContainerMain style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Loader/></ContainerMain>
            }
        </>
    );
};