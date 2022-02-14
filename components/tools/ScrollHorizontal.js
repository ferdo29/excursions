import * as React from 'react';
import {Platform, SafeAreaView} from "react-native";
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
import {LinearGradient} from "expo-linear-gradient";

export const ScrollHorizontal = ({model, title, toLink = 'City', toLinkTwo = 'Cities', buttonView = false, limit = 4}) => {
    useContext(Locale)
    const linkTo = useLinkTo();

    const validImg = (value) => {
            if(value &&  value?.images &&  value?.images.length > 0 && value?.images[0]?.path){
                return {uri: value.images[0].path}
            }
            return require('../../assets/image/Church.png')
    }


    return (
        <>
            <ContainerMain>
                <Text23Bold style={{marginBottom: 10}}>{title}</Text23Bold>
            </ContainerMain>
            <SafeAreaView>
                <CardScrollView horizontal={true} vertical={false}
                                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {model && model.length > 0 && model.map((value, index) => index < limit &&
                        <WrapperImagePressable
                            style={{position: 'relative'}}
                            key={value.id}
                            onPress={() => (value.excursions_count || value.excursions) ? linkTo(`/${toLink}/${value.id}`) : () => {}}>
                            <CardImage
                                style={{marginRight: index + 1 === (limit > model.length ? model.length : limit) ? 22 : 0}}
                                imageStyle={{borderRadius: 15,}}
                                source={validImg(value)}>
                                <LinearGradient
                                    colors={(value.excursions_count || value.excursions) ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0.76)'] : ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
                                    style={{
                                        width: '100%',
                                        height: (value.excursions_count || value.excursions) ? 100: '100%',
                                        paddingBottom: 20,
                                        paddingHorizontal: 12,
                                        borderRadius: 15,
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                    }}>
                                    <Text16Bold numberOfLines={1} style={{color: '#fff'}}>{value.name}</Text16Bold>
                                    <Text12 style={{color: '#fff', lineHeight: 14}}>{(value.excursions_count || value.excursions) || '0' } {t('Countries.excursions')}</Text12>
                                </LinearGradient>

                            </CardImage>
                        </WrapperImagePressable>
                    )}
                </CardScrollView>
            </SafeAreaView>
            {buttonView && <ContainerMain style={{alignItems: 'center'}}>
                <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray activeOpacity={0.6} style={{marginBottom: 40}}
                                onPress={() => linkTo(`/${toLinkTwo}`)}>
                        <Text16Bold500
                            style={{color: '#828282',}}>{t('ScrollHorizontal.Show all')}</Text16Bold500>
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