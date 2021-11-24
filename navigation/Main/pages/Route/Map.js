import * as React from 'react';
import {BoxRow, ContainerMain, Text20, Text23Bold} from "../../../../styles/components/tools";
import {Dimensions, Platform, Pressable} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import MainLayout from "../../../../layouts/MainLayout";
import MapView from 'react-native-maps';

export const Map = ({}) => {
    const navigation = useNavigation();

    return (
        <MainLayout animation={false} >

            <ContainerMain style={{marginBottom: 22}}>
                <BoxRow style={{justifyContent: 'flex-start'}}>
                    <Pressable onPress={() => navigation.goBack()} style={{transform: [{ rotate: "180deg" }], flexGrow: 1}}>
                        <Svg width="41" height="41" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </Pressable>
                    <Text23Bold style={{flexGrow: 14, textAlign:'center', marginRight: 40}}>Маршрут</Text23Bold>
                </BoxRow>
            </ContainerMain>
            <MapView style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.8 : 0.9-10),
        }} />

        </MainLayout>
    );
};