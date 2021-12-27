import * as React from 'react';
import {
    BoxColumnView,
    BoxRow,
    ContainerMain, Text12,
    Text23Bold, Text28,
} from "../../../../styles/components/tools";
import {Dimensions, Platform, Pressable} from "react-native";
import Svg, {Path, Circle} from "react-native-svg";
import {useIsFocused, useNavigation, useNavigationState} from "@react-navigation/native";
import MainLayout from "../../../../layouts/MainLayout";
import MapView, {Callout, Marker, Polyline } from 'react-native-maps';
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {CardImage, WrapperCircle} from "../../../../styles/components/Cards";
import {t} from "i18n-js";

export const Map = ({}) => {
    const ref = useRef()
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
            <MapView
                region={{
                latitude: points.latitude,
                longitude: points.longitude,
                latitudeDelta: data.latitude_delta,
                longitudeDelta: data.longitude_delta,
            }}
                ref={ref}
                style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.8 : 0.9),
                }}>
                {data.coordinates && data.coordinates.length > 0 &&
                <Polyline
                    coordinates={data.coordinates}
                    strokeColor={'#11AEAE'}
                    strokeWidth={2}
                    lineDashPattern={[1]}
                />}
                {data?.points && data?.points.length > 0 && data?.points.map((value, index) =>
                    <Marker coordinate={{
                        latitude: value.position.coordinates[1],
                        longitude: value.position.coordinates[0],
                        latitudeDelta: 0.422,
                        longitudeDelta: 0.1421
                    }} title={value.name} isPreselected={screen === index}
                            key={index}
                            image={numbersImg(value.point_type)}
                            onCalloutPress={() => {}}
                    >
                        <Callout style={{borderRadius: 10, padding: 10, margin: 0}}>
                            <BoxColumnView>
                                {value.images.length > 0 &&
                                <CardImage style={{width: 100, height: 100}}
                                            source={value.images.length > 0 ?
                                                {uri: value.images[0].path} :
                                                require('../../../../assets/image/Church.png')}/>}
                                <Text12>{value.name}</Text12>
                            </BoxColumnView>
                        </Callout>

                    </Marker>
                )}
            </MapView>

        </MainLayout>
    );
};
