import * as React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useSelector} from "react-redux";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {CardImage} from "../../../styles/components/Cards";
import {ContainerMain, MainBoxWrap, Text12, Text16Bold, Text23, Text23Bold} from "../../../styles/components/tools";
import {useLinkTo} from "@react-navigation/native";
import {t} from "i18n-js";

export const Cities = ({}) => {
    const linkTo = useLinkTo();
    const {data, isLoading: isLoadingP} = useSelector(state => state.popularPlaces)

    return (
        <MainLayout animation={data.length > 6} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20}}>
            <Text23Bold style={{textAlign: 'center'}}>{t('Cities.Country')}</Text23Bold>
                <Text12 style={{textAlign: 'center'}}> {data.length} {t('Cities.excursions')}</Text12>
            </ContainerMain>

            <MainBoxWrap>
            {data.map((value, index) =>
                <Pressable

                    key={value.country}
                    onPress={() => linkTo(`/City/${value.id}`)}>
                    <CardImage
                        imageStyle={{borderRadius: 15}}
                        source={{uri: value.images[0].path}}>
                        <Text16Bold numberOfLines={1} style={{color: '#fff'}}>{value.name}</Text16Bold>
                        <Text12 style={{color: '#fff', lineHeight: 14}}>{value.excursions_count} {t('Cities.excursions')}</Text12>
                    </CardImage>
                </Pressable>
            )}
            </MainBoxWrap>
        </MainLayout>
    );
};