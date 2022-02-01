import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLinkTo, useNavigationState} from "@react-navigation/native";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {
    BoxColumnView,
    BoxRow,
    ContainerMain,
    Text10, Text12,
    Text14, Text16, Text16Bold500, Text18Bold,
    Text23Bold, Text28
} from "../../../styles/components/tools";
import {IconHeadPhone, IconHeart, IconStar, IconWarning, IconWatchTwo} from "../../../components/Icons";
import Svg, {Circle, Path} from "react-native-svg";
import {ButtonCircle, ButtonGray, ButtonGrayWrapper} from "../../../styles/components/buttons";
import CardReview from "../../../components/tools/CardReview";
import {TouchableOpacity} from "react-native";
import {useContext, useEffect, useState} from "react";
import img from '../../../assets/image/Shiadu.png'
import {Loader} from "../../../components/Loader";
import { useIsFocused } from '@react-navigation/native';
import {fetchExcursion} from "../../../store/excursion/service";
import {excursionDelete, Liked} from "../../../store/excursion/reducer";
import {getAuth} from "firebase/auth";
import axios from "axios";
import {t} from "i18n-js";
import {fetchCart} from "../../../store/cart/service";
import {showToastState} from "../../../store/toasts/reducer";
import {fetchFavourite} from "../../../store/favourite/service";
import UserFB from "../../../contexts/userFB";


export const Excursion = ({}) => {
    const linkTo = useLinkTo();
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const {user} = useContext(UserFB)
    const [maxReviews, setMaxReviews] = useState(3)
    const routes = useNavigationState(state => state.routes)
    const {data: Excursion, reviews: Reviews, isLoading, isView, error} = useSelector(state => state.excursion)


    const handlerLike = () => {
        axios.get(`${process.env.DB_HOST}/excursions/${routes[routes.length - 1]?.params?.screen}/like`,
            {headers: {Authorization:`Bearer ${user.accessToken}`}})
            .then(() => {
                dispatch(fetchFavourite({token: user.accessToken}))
                dispatch(Liked())
            })
            .catch((e) => {
            })
    }
    const handlerMaxReviews = () => setMaxReviews(Reviews?.data.length)
    const handlerGallery = () => {
        if (!isLoading && Excursion?.data?.images && Excursion?.data?.images.length > 0){
            return Excursion.data.images.map(value => ({uri: value.path}))
        }
        return [
            img,
            img,
            img,
        ]
    }
    const onRefreshBasket = (toost = false) => {
        dispatch(fetchCart({token: user.accessToken}))
        toost && dispatch(showToastState({
            type: 'success',
            text1: t('All.Paid up'),
        }))
    }
    const handlerBasket = (isLink = false) => {
        axios.post(`${process.env.DB_HOST}/cart/${routes[routes.length - 1]?.params?.screen}`, {"quantity": 1},
            {headers: {Authorization: `Bearer ${user.accessToken}`}})
            .then((data) => {
                isLink && linkTo('/Basket')
                onRefreshBasket(true)
            })
            .catch((e) => {
                console.error(e.response)
            })
    }

    useEffect(() => {
        if(isFocused){
            dispatch(fetchExcursion({id: routes.length > 1 && routes[routes.length - 1]?.params?.screen, token: user.accessToken}))
        }
        else{
            dispatch(excursionDelete())
        }
    }, [isFocused])

    return (
        <LayoutImageTop
            itemAbsolute={
                <ButtonCircle onPress={handlerLike}>
                    <IconHeart fill={Excursion?.data?.liked ? '#E0E0E0' : '#11AEAE'}/>
                </ButtonCircle>
            }
            img={handlerGallery()[0] }
            gallery={handlerGallery()}>


            {!isLoading && isView && <ContainerMain>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 16}}>
                    <IconStar style={{marginRight: 5}}/>
                    <BoxRow>
                        <Text14>{Excursion.data.stars} </Text14>
                        <Text10 style={{color: '#4F4F4F'}}>({Excursion.data.reviews_count} {t('Excursion.evaluations')})</Text10>
                    </BoxRow>

                </BoxRow>
                <Text23Bold numberOfLines={1} style={{marginBottom: 10}}>{Excursion.data.name}</Text23Bold>
                <BoxRow style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
                    <BoxColumnView style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                        <BoxRow style={{justifyContent: 'flex-start'}}>
                            <IconHeadPhone width={26} height={26} style={{marginRight: 12}}/>
                            <Text28 style={{color: '#11AEAE'}}>{Excursion.data.price} €</Text28>
                        </BoxRow>
                        <Text10 style={{lineHeight: 18, color: '#BDBDBD'}}>{t('Excursion.Audio tour price')}</Text10>
                    </BoxColumnView>
                    <ButtonGrayWrapper style={{width: 'auto'}}>
                        <ButtonGray onPress={handlerBasket} activeOpacity={0.6} style={{width: 'auto'}}>
                            <Text16Bold500 style={{color: '#828282', width: 89}}>{t('Excursion.Buy')}</Text16Bold500>

                            <Svg width="29" height="29" viewBox="0 0 41 41"
                                 style={{position: 'absolute', right: 10}} fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                                <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </Svg>
                        </ButtonGray>
                    </ButtonGrayWrapper>
                </BoxRow>
                <Text16 style={{color: '#4F4F4F', marginBottom: 30}}>{Excursion.data.short_description}</Text16>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 15}}>{t('Excursion.Route')}</Text18Bold>

                    <Text16 style={{color: '#4F4F4F', lineHeight: 27}} >{Excursion.data.points_path}</Text16>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 24}}> Детали экскурсии</Text18Bold>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 24}}>
                    <IconWatchTwo style={{marginRight: 22}}/>
                    <BoxColumnView style={{alignItems: 'flex-start'}}>
                        <Text16 style={{color: '#4F4F4F', lineHeight: 21}}>{t('Excursion.Audio tour times')}</Text16>
                        <Text16 style={{color: '#4F4F4F', lineHeight: 21}}>
                            {Excursion.data.minutes} {t('Excursion.min')}.
                        </Text16>
                    </BoxColumnView>
                </BoxRow>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 30}}>
                    <IconWarning style={{marginRight: 34}}/>
                    <Text16 style={{color: '#4F4F4F', width: 290}}>
                        {t('Excursion.The excursion price does not include the cost of entrance tickets to attractions.')}
                    </Text16>
                </BoxRow>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 20}}>{t('Excursion.Description')}</Text18Bold>
                <BoxColumnView style={{marginBottom: 30}}>
                        <Text14 style={{color: '#828282', marginBottom: 15}}>{Excursion.data.description}</Text14>
                </BoxColumnView>

                <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray onPress={() => handlerBasket(true)} activeOpacity={0.6} style={{marginBottom: 50, width: '100%'}}>
                        <Text16Bold500 style={{color: '#828282', width: '60%'}}>{t('Excursion.Order now')}</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 22}}>{t('Excursion.Reviews')}</Text18Bold>
                {Reviews?.data.length <= 0 && <Text18Bold style={{color: '#11AEAE', marginBottom: 20, textAlign: 'center'}}>{t('Excursion.No reviews')}</Text18Bold>}
                {Reviews?.data.length > 0 && Reviews?.data.map((value, index) =>
                        index < maxReviews && <CardReview
                            key={value.id}
                            star={Math.ceil(parseFloat(value.stars))}
                            name={value.name}
                            body={value.text}
                            date={value.created_at}
                        />
                )}
                {Reviews?.data.length !== maxReviews && Reviews?.data.length >= 3 &&
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={handlerMaxReviews}
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      borderBottomColor: '#E0E0E0',
                                      borderBottomWidth: 1,
                                      paddingTop: 17,
                                      paddingBottom: 17,
                                      width: '100%'
                                  }}>
                    <Text12 style={{color: '#4F4F4F'}}>
                        {t('Excursion.View more')} {Reviews?.data.length - 3} {t('Excursion.reviews')}
                    </Text12>
                    <Svg width="22" height="20" viewBox="0 -4 22 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 13L7 7L1 1" stroke="#828282" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </Svg>
                </TouchableOpacity>
                }

            </ContainerMain>}
            {isLoading && !isView && <Text18Bold style={{color: '#11AEAE', marginBottom: 20, textAlign: 'center'}}>{t('Excursion.There is no data')}</Text18Bold>}
            {error !== '' && <Text18Bold style={{color: '#11AEAE', marginBottom: 20, textAlign: 'center'}}>{t('Excursion.Server data error')}</Text18Bold>}
            {isLoading && <Loader/>}
        </LayoutImageTop>
    );
};