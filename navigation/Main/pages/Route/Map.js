import * as React from 'react';
import {
    BoxRow,
    ContainerMain,
    Text23Bold
} from "../../../../styles/components/tools";
import {Pressable, Animated} from "react-native";
import Svg, {Path, Circle} from "react-native-svg";
import {useIsFocused, useNavigation, useNavigationState} from "@react-navigation/native";
import MainLayout from "../../../../layouts/MainLayout";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {t} from "i18n-js";
import {Dimensions, Platform} from "react-native";
import {BoxColumnView, Text12} from "../../../../styles/components/tools";
import {CardImage} from "../../../../styles/components/Cards";
import MapView, {Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {Magnetometer} from "expo-sensors";

export const Map = ({navigation: props}) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes)
    const [screen, setScreen] = useState(null);
    const {idExcursion} = useSelector(state =>  state.myExcursion)
    const [points, setPoints] = useState({latitude: 55.820262,longitude: 38.983882});
    const data = useSelector(state => state.myExcursions.data.find(value => value.id === idExcursion))
    // const date = useRef({x:0, y: 0, z: 0})
    // const location = useRef({latitude: 55.820262,longitude: 38.983882})
    // const [subscription, setSubscription] = useState(null);
    // const compassX = useRef(new Animated.Value(0)).current;


    // const translation = compassX.interpolate({
    //     inputRange: [0, 360],
    //     outputRange: ['0deg', '360deg'],
    //     extrapolate: 'clamp',
    // });

    const numbersImg = (index) => {
        switch (index) {
            case 'stop': return require(`../../../../assets/image/Stop1.png`)
            default: return require(`../../../../assets/image/Star1.png`)
        }
    }
    // const _slow = () => {
    //     Magnetometer.setUpdateInterval(6000);
    // };
    // const _subscribe = () => {
    //     setSubscription(
    //         Magnetometer.addListener(result => {
    //             date.current = result
    //             _location()
    //         })
    //     );
    // };
    // const _unsubscribe = () => {
    //     subscription && subscription.remove();
    //     setSubscription(null);
    // };
    // const _location = () => {
    //     Location.getCurrentPositionAsync({}).then((data) => {
    //         const {latitude, longitude} = data.coords
    //         location.current = {latitude, longitude}
    //     })
    // }
    // const asd = () => {
    //     let theta = "0deg"
    //
    //     let res = date.current.x * 10
    //     console.log(res)
    //
    //     return theta
    // }

    // useEffect(() => {
    //     _subscribe();
    //     _slow()
    //     return () => _unsubscribe();
    // }, []);

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

    return (
        <MainLayout animation={false} >

            <ContainerMain style={{marginBottom: 22, paddingLeft: 0}}>
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
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: points.latitude,
                longitude: points.longitude,
                latitudeDelta: data.latitude_delta - 0.009,
                longitudeDelta: data.longitude_delta - 0.01,
            }}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.8 : 0.9),
            }}>
            {data.coordinates && data.coordinates.length > 0 &&
            <Polyline
                coordinates={data.coordinates.map(value => ({
                        "latitude": parseFloat(value.latitude),
                        "longitude": parseFloat(value.longitude),
                    }))}
                strokeColor={'#11AEAE'}
                strokeWidth={2}
                lineDashPattern={[1]}
            />}
                   {/*<Animated.View style={{ transform: [{ rotate: asd() }]}}>*/}
                   {/*    <Marker*/}
                   {/*        style={{ transform: [{ rotate: asd() }]}}*/}
                   {/*        coordinate={{*/}
                   {/*        ...location.current,*/}
                   {/*        latitudeDelta: 0.422,*/}
                   {/*        longitudeDelta: 0.1421*/}
                   {/*    }} image={require('../../../../assets/image/Arrow2.png')}/>*/}
                   {/*</Animated.View>*/}

            {data?.points && data?.points.length > 0 && data?.points.map((value, index) =>
                <Marker coordinate={{
                    latitude: value.position.coordinates[1],
                    longitude: value.position.coordinates[0],
                    latitudeDelta: 0.422,
                    longitudeDelta: 0.1421
                }} title={value.name} isPreselected={screen === index}
                        key={index}
                        image={numbersImg(value.point_type)}
                        onCalloutPress={() => {
                        }}>
                    <Callout style={{borderRadius: 10, padding: 10, margin: 0}}>
                        <BoxColumnView>
                            {value.images.length > 0 &&
                            Platform.OS === 'ios' ? <CardImage style={{flex: 1, width: 100, height: 100, backgroundColor: '#6b6b6b'}}
                                       resizeMode="cover"
                                       source={value.images.length > 0 ?
                                           {uri: value.images[0].path} :
                                           require('../../../../assets/image/Church.png')}/> : <></>}
                            <Text12>{value.name}</Text12>
                        </BoxColumnView>
                    </Callout>

                </Marker>
            )}
        </MapView>


        </MainLayout>
    );
};
