import * as React from 'react';
import {Dimensions, Platform} from "react-native";
import {BoxColumnView, Text12} from "../../../../../styles/components/tools";
import {CardImage, CardImages} from "../../../../../styles/components/Cards";
import MapView, {Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import {ImageBackground} from "react-native";

export const GoogleMap = ({points, data, screen, numbersImg = () => {}}) => {

    const handlerImage = (value) => {
        return value.images.length > 0 ?
            {uri: value.images[0].path} :
            require('../../../../../assets/image/Church.png')
    }

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: points.latitude,
                longitude: points.longitude,
                latitudeDelta: data.latitude_delta - 0.008,
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
                            Platform.OS === 'ios' ? <CardImage style={{flex: 1, width: 100, height: 100, backgroundColor: 'red'}}
                                       resizeMode="cover"
                                       source={value.images.length > 0 ?
                                           {uri: 'https://limg.imgsmail.ru/splash/v/i/share-fp-a2954bf3df.png'} :
                                           require('../../../../../assets/image/Church.png')}/> : <></>}
                            <Text12>{value.name}</Text12>
                        </BoxColumnView>
                    </Callout>

                </Marker>
            )}
        </MapView>
    );
};