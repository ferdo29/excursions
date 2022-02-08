import * as React from 'react';
import {Text} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import {useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {ContainerMain, MainBoxWrap, Text12, Text16Bold, Text23Bold} from "../../../styles/components/tools";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {CardImage} from "../../../styles/components/Cards";
import {t} from "i18n-js";
import {LinearGradient} from "expo-linear-gradient";

export const Countries = ({}) => {
    const linkTo = useLinkTo();
    const {data: countries} = useSelector(state => state.countries)

    const validImg = (value) => {
        if(value &&  value?.images &&  value?.images.length > 0 && value?.images[0]?.path){
            return {uri: value.images[0].path}
        }
        return require('../../../assets/image/Church.png')
    }

    return (
        <MainLayout animation={countries.length > 6} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20}}>
                <Text23Bold style={{textAlign: 'center'}}>{t('Countries.Countries')}</Text23Bold>
                {/*<Text12 style={{textAlign: 'center'}}>15 стран, 156 городов, 615 экскурсий</Text12>*/}
            </ContainerMain>

            <MainBoxWrap>
                {countries.map((value, index) =>
                    <Pressable
                        key={value.country}
                        onPress={(value.excursions_count || value.excursions) ? () => linkTo(`/Country/${value.id}`) : () => {}}>
                        <CardImage
                            imageStyle={{borderRadius: 15}}
                            source={validImg(value)}>
                            <LinearGradient
                                colors={(value.excursions_count || value.excursions) ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0.76)'] : ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
                                style={{
                                    width: '100%',
                                    height: (value.excursions_count || value.excursions) ? 100: '100%',
                                    zIndex: 3,
                                    bottom: 0,
                                    paddingBottom: 20,
                                    paddingHorizontal: 12,
                                    borderRadius: 15,
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                }}>
                            <Text16Bold numberOfLines={1} style={{color: '#fff'}}>{value.name}</Text16Bold>
                            <Text12 style={{color: '#fff', lineHeight: 14}}>{(value.excursions_count || value.excursions) } {t('Countries.excursions')}</Text12>
                            </LinearGradient>
                        </CardImage>
                    </Pressable>
                )}
            </MainBoxWrap>
        </MainLayout>
    );
};