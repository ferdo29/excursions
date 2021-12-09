import * as React from 'react';
import {Text} from "react-native";
import {useLinkTo} from "@react-navigation/native";
import {useSelector} from "react-redux";
import MainLayout from "../../../layouts/MainLayout";
import {ContainerMain, MainBoxWrap, Text12, Text16Bold, Text23Bold} from "../../../styles/components/tools";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {CardImage} from "../../../styles/components/Cards";

export const Countries = ({}) => {
    const linkTo = useLinkTo();
    const {data: countries} = useSelector(state => state.countries)

    return (
        <MainLayout animation={countries.length > 6} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20}}>
                <Text23Bold style={{textAlign: 'center'}}>Страны</Text23Bold>
                <Text12 style={{textAlign: 'center'}}>15 стран, 156 городов, 615 экскурсий</Text12>
            </ContainerMain>

            <MainBoxWrap>
                {countries.map((value, index) =>
                    <Pressable

                        key={value.country}
                        onPress={() => linkTo(`/Country/${value.id}`)}>
                        <CardImage
                            imageStyle={{borderRadius: 15}}
                            source={{uri: value.images[0].path}}>
                            <Text16Bold numberOfLines={1} style={{color: '#fff'}}>{value.name}</Text16Bold>
                            <Text12 style={{color: '#fff', lineHeight: 14}}>{value.excursions_count } экскурсий</Text12>
                        </CardImage>
                    </Pressable>
                )}
            </MainBoxWrap>
        </MainLayout>
    );
};