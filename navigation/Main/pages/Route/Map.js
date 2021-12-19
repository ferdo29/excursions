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
import MapView, {Callout, Marker, CalloutSubview } from 'react-native-maps';
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {CardImage, WrapperCircle} from "../../../../styles/components/Cards";

export const Map = ({}) => {
    const ref = useRef()
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes)
    const [screen, setScreen] = useState(null);
    const [points, setPoints] = useState({latitude: 55.820262,longitude: 38.983882});
    const {data, isLoading, isView, error} = useSelector(state => state.myExcursion)

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
            case 0: return require(`../../../../assets/image/numbers/1.png`)
            case 1: return require(`../../../../assets/image/numbers/2.png`)
            case 2: return require(`../../../../assets/image/numbers/3.png`)
            case 3: return require(`../../../../assets/image/numbers/4.png`)
            default: return require(`../../../../assets/image/numbers/1.png`)
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
                    <Text23Bold style={{flexGrow: 14, textAlign:'center', marginRight: 40}}>Маршрут</Text23Bold>
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
                {data?.points && data?.points.length > 0 && data?.points.map((value, index) =>
                    <Marker coordinate={{
                        latitude: value.position.coordinates[1],
                        longitude: value.position.coordinates[0],
                        latitudeDelta: 0.422,
                        longitudeDelta: 0.1421
                    }} title={value.name}
                            image={numbersImg(index)}
                            onCalloutPress={() => console.log(101)}
                    >
                        <Callout style={{borderRadius: 10, padding: 10, margin: 0}}>
                            <BoxColumnView>
                                <CardImage style={{width: 100, height: 100}} source={{uri: value.images[0].path}}/>
                                <Text12>{value.name}</Text12>
                            </BoxColumnView>
                        </Callout>
                        {/*    <WrapperCircle style={{marginRight: 20, borderColor:  '#11AEAE', backgroundColor: '#fff'}}>*/}
                        {/*        <Text28 style={{color: '#11AEAE'}}>{index + 1}</Text28>*/}
                        {/*    </WrapperCircle>*/}

                    </Marker>
                )}
                {/*<Marker coordinate={mapRegion} title='Marker' />*/}
            </MapView>

        </MainLayout>
    );
};
