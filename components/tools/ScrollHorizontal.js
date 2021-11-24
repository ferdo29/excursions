import * as React from 'react';
import {SafeAreaView} from "react-native";
import {
    CardScrollView,
    ContainerMain,
    Text12,
    Text16,
    Text16Bold, Text16Bold500,
    Text23Bold
} from "../../styles/components/tools";
import {CardImage, WrapperImagePressable} from "../../styles/components/Cards";
import Svg, {Circle, Path} from "react-native-svg";
import {ButtonGray, ButtonGrayWrapper} from "../../styles/components/buttons";
import {useContext} from "react";
import Locale from "../../contexts/locale";
import {t} from "i18n-js";
import {useLinkTo} from "@react-navigation/native";

export const ScrollHorizontal = ({model, title, toLink = 'City', toLinkTwo = 'Cities', buttonView = false}) => {
    useContext(Locale)
    const linkTo = useLinkTo();
    return (
        <>
            <ContainerMain>
                <Text23Bold style={{marginBottom: 10}}>{title}</Text23Bold>
            </ContainerMain>
            <SafeAreaView>
                <CardScrollView horizontal={true} vertical={false}
                                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {model.map((value, index) =>
                        <WrapperImagePressable
                            key={value.country}
                            onPress={() => linkTo(`/${toLink}/${value.id}`)}>
                            <CardImage
                                style={{marginRight: index + 1 === model.length ? 22 : 0}}
                                imageStyle={{borderRadius: 15}}
                                source={value.image}>
                                <Text16Bold style={{color: '#fff'}}>{value.country}</Text16Bold>
                                <Text12 style={{color: '#fff', lineHeight: 14}}>{value.count} экскурсий</Text12>
                            </CardImage>
                        </WrapperImagePressable>
                    )}
                </CardScrollView>
            </SafeAreaView>
            {buttonView && <ContainerMain style={{alignItems: 'center'}}>
                <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray activeOpacity={0.6} style={{marginBottom: 40, width: '100%'}}
                                onPress={() => linkTo(`/${toLinkTwo}`)}>
                        <Text16Bold500
                            style={{color: '#828282', width: '65%'}}>{t('ScrollHorizontal.Show all')}</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>
            </ContainerMain>}
        </>
    );
};