import * as React from 'react';
import {Text} from "react-native";
import MainLayout from "../../../layouts/MainLayout";
import {useSelector} from "react-redux";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {CardImage} from "../../../styles/components/Cards";
import {ContainerMain, MainBoxWrap, Text12, Text16Bold, Text23, Text23Bold} from "../../../styles/components/tools";
import {useLinkTo} from "@react-navigation/native";

export const Cities = ({}) => {
    const linkTo = useLinkTo();
    const {data: popularPlaces} = useSelector(state => state.popularPlaces)

    return (
        <MainLayout animation={popularPlaces.length > 6} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20}}>
            <Text23Bold style={{textAlign: 'center'}}>Страны</Text23Bold>
                <Text12 style={{textAlign: 'center'}}> 615 экскурсий</Text12>
            </ContainerMain>

            <MainBoxWrap>
            {popularPlaces.map((value, index) =>
                <Pressable

                    key={value.country}
                    onPress={() => linkTo(`/City/${value.id}`)}>
                    <CardImage
                        imageStyle={{borderRadius: 15}}
                        source={value.image}>
                        <Text16Bold style={{color: '#fff'}}>{value.country}</Text16Bold>
                        <Text12 style={{color: '#fff', lineHeight: 14}}>{value.count} экскурсий</Text12>
                    </CardImage>
                </Pressable>
            )}
            </MainBoxWrap>
        </MainLayout>
    );
};