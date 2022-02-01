import * as React from 'react';
import {
    BoxRow,
    ContainerMain,
    Text23Bold
} from "../../../../styles/components/tools";
import {Pressable} from "react-native";
import Svg, {Path, Circle} from "react-native-svg";
import {useIsFocused, useNavigation, useNavigationState} from "@react-navigation/native";
import MainLayout from "../../../../layouts/MainLayout";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {t} from "i18n-js";
import * as Device from 'expo-device';
import {GoogleMap} from "./components/GoogleMap";
import {MapBox} from "./components/MapBox";

export const Map = ({}) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes)
    const [screen, setScreen] = useState(null);
    const {idExcursion} = useSelector(state =>  state.myExcursion)
    const [points, setPoints] = useState({latitude: 55.820262,longitude: 38.983882});
    const data = useSelector(state => state.myExcursions.data.find(value => value.id === idExcursion))


    useEffect(() => {
        if (isFocused) {
            const Screen = routes.find(value => value.name === 'Map')?.params.screen || 0
            setScreen(Screen)
            if(Screen >= 0 && data?.points[Screen]?.position?.coordinates) {
                setPoints({
                    latitude: data.points[Screen].position.coordinates[1],
                    longitude: data.points[Screen].position.coordinates[0]
                })
            }
        }

    }, [isFocused])
    const numbersImg = (index) => {
        switch (index) {
            case 'stop': return require(`../../../../assets/image/Stop1.png`)
            default: return require(`../../../../assets/image/Star1.png`)
        }
    }

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
                    <Text23Bold style={{flexGrow: 14, textAlign:'center', marginRight: 40}}>{t('Route.Route')}</Text23Bold>
                </BoxRow>
            </ContainerMain>
            {
                <GoogleMap data={data} points={points} screen={screen} numbersImg={numbersImg}/>
            }


        </MainLayout>
    );
};
