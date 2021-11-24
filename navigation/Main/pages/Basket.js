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
import {useLinkTo} from "@react-navigation/native";
import {Image} from "react-native";
import {useSelector} from "react-redux";
import ItemBasket from "./components/ItemBasket";
import {t} from "i18n-js";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";

export default function ({}) {
    const linkTo = useLinkTo();
    const excursions = useSelector(state => state.excursions.data.filter(value => value.inBasket))
    const {allPrice, allPriceSale} = useSelector(state => state.excursions)

    return (
        <MainLayout animation={0}  itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>
                <Text23Bold style={{textAlign: 'center'}}>Корзина</Text23Bold>
                <Text12 style={{textAlign: 'center', marginBottom: 54, marginTop: 24}}>
                    {excursions.length > 0 ?
                        `У вас в корзине ${excursions.length} экскурсии` :
                        'К сожалению, но ваша корзина пуста.'
                    }
                </Text12>
                {excursions.length <= 0 && <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray onPress={() => linkTo(`/Home`)}
                                activeOpacity={0.6} style={{marginBottom: 40, width: '100%'}}>
                        <Text16Bold500
                            style={{color: '#828282', width: '65%'}}>Посмотреть экскурсии</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>}

                {excursions.length > 0 && excursions.map(value => <ItemBasket {...value} key={value.id}/>)}
                {excursions.length > 0 && <BoxColumnView>
                    <Text14 style={{marginBottom: 12}}>Общая сумма покупки {allPrice} € </Text14>
                    <Text14 style={{marginBottom: 12}}>Скидка 10% (Акция «Пригласи друга»)</Text14>
                    <Text18Bold style={{marginBottom: 40}}>Итого к оплате {allPriceSale} €</Text18Bold>
                </BoxColumnView>}
                {excursions.length > 0 && <ButtonGrayWrapper style={{width: '100%'}}>
                    <ButtonGray activeOpacity={0.6} style={{marginBottom: 40, width: '100%'}}>
                        <Text16Bold500
                            style={{color: '#828282'}}>Оплатить</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>}

            </ContainerMain>
            {excursions.length <= 0 && <Image source={require('../../../assets/image/Woman.png')}/>}
        </MainLayout>
    );
};