import * as React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {
    BoxColumnView,
    ContainerMain,
    Text12,
    Text14,
    Text16Bold500,
    Text18Bold,
    Text23Bold
} from "../../../styles/components/tools";
import {ButtonGray, ButtonGrayWrapper} from "../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {useIsFocused, useLinkTo} from "@react-navigation/native";
import {Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ItemBasket from "./components/ItemBasket";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";
import {fetchCart} from "../../../store/cart/service";
import {getAuth} from "firebase/auth";
import {useEffect} from "react";
import axios from "axios";
import {showToastState} from "../../../store/toasts/reducer";
import {t} from "i18n-js";
import {fetchMyExcursions} from "../../../store/myExcursions/service";

const percent = (count) => {
    if (count < 3) return 1
    if (count < 5) return 0.90
    if (count < 7) return 0.85
    return 0.8
}
const reducer = (array) => {
    let sum = 0
    array.length > 0 && array.forEach(value => {
        sum +=  (value.quantity * parseFloat(value.price)) * percent(value.quantity)
    })
    return sum.toFixed(2)
}

export default function ({}) {
    const linkTo = useLinkTo();
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const user = getAuth().currentUser
    const {data: cart, error} = useSelector(state => state.cart);

    const onRefresh = () => dispatch(fetchCart({token: user.stsTokenManager.accessToken}))
    useEffect(() => {
        isFocused && onRefresh()
    }, [isFocused])

    const PayPal = async () => {
        try {
            const {data} = await axios.get(`${process.env.DB_HOST}/cart/pay-url`,
                {headers: {Authorization: `Bearer ${user.stsTokenManager.accessToken}`}})
            if(data["message"] === 'success'){
                await onRefresh()
                dispatch(fetchMyExcursions({token: user.stsTokenManager.accessToken}))
                dispatch(showToastState({
                    type: 'success',
                    text1: t('All.Paid up'),
                }))
            }

        }catch (e) {
            dispatch(showToastState({
                type: 'success',
                text1: t('error.Payment error'),
            }))
        }

    }

    return (
        <MainLayout Refreshing={true} handlerRefresh={onRefresh} animation={0}  itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>
                <Text23Bold style={{textAlign: 'center'}}>{t('All.Cart')}</Text23Bold>
                <Text12 style={{textAlign: 'center', marginBottom: 54, marginTop: 24}}>
                    {cart.length > 0 ?
                        `${t('Basket.You have')} ${cart.length} ${t('Basket.excursions in your basket')}` :
                        t('Basket.Sorry, but your cart is empty')
                    }
                </Text12>
                {cart.length <= 0 && <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray onPress={() => linkTo(`/Home`)}
                                activeOpacity={0.6} style={{marginBottom: 40, width: '100%'}}>
                        <Text16Bold500
                            style={{color: '#828282', width: '65%'}}>{t('Basket.View excursions')}</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>}

                {cart.length > 0 && cart.map(value => <ItemBasket {...value}
                                                                  percent={Math.ceil((1 - percent(value.quantity)) * 100) }
                                                                  key={value.id}/>)}
                {cart.length > 0 && <BoxColumnView>
                    <Text14 style={{marginBottom: 12}}>{t('Basket.Total purchase amount')} {reducer(cart)} € </Text14>
                    <Text14 style={{marginBottom: 12}}>{t('Basket.Discount')} {10}% ({t('Basket.Promotion Invite a friend')})</Text14>
                    <Text18Bold style={{marginBottom: 40}}>{t('Basket.Total payable')} {reducer(cart)} €</Text18Bold>
                </BoxColumnView>}
                {cart.length > 0 && <ButtonGrayWrapper style={{width: '100%'}}>
                    <ButtonGray onPress={PayPal} activeOpacity={0.6} style={{marginBottom: 40, width: '100%'}}>
                        <Text16Bold500
                            style={{color: '#828282'}}>{t('All.Pay')}</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>}

            </ContainerMain>
            {cart.length <= 0 && <Image source={require('../../../assets/image/Woman.png')}/>}
        </MainLayout>
    );
};