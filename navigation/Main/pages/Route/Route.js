import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {useSelector} from "react-redux";
import {useLinkTo, useNavigationState} from "@react-navigation/native";
import {
    BoxRow,
    ContainerMain,
    Text20,
    Text16, Text28, Text16Bold500
} from "../../../../styles/components/tools";
import Svg, {Circle, Path} from "react-native-svg";
import {Pressable, Image, View, Dimensions} from "react-native";
import {WrapperCircle} from "../../../../styles/components/Cards";
import {useRef, useState} from "react";
import Carousel from 'react-native-snap-carousel';
import {ButtonGray} from "../../../../styles/components/buttons";
import AudioSlider from "../../../../components/AudioSlider";

const {height, width} = Dimensions.get('window')

export default function Route({}) {
    const linkTo = useLinkTo();
    const routes = useNavigationState(state => state.routes)

    const excursion = useSelector(state =>
        !!routes.find(value => value.name === 'Route') ?
            state.account.data.excursions.find(value => value.id === parseInt(routes.find(value => value.name === 'Route').params.screen)) :
            state.account.data.excursions[0]
    )
    const [state, setState] = useState(1)
    const ref = useRef();

    const renderItem = ({item : { title, image, id}}) => {
        return(
            <View>
                <Image source={image} style={{width: (width  * 11/12) - 10, height: 350}}/>
                <BoxRow style={{justifyContent:'flex-start', paddingTop: 10}}>
                    <WrapperCircle style={{marginRight: 20, borderColor:  state === id ? '#11AEAE': '#828282'}}>
                        <Text28 style={{color: state === id ? '#11AEAE': '#828282'}}>{id + 1}</Text28>
                    </WrapperCircle>
                    <Text16
                        numberOfLines={2}
                        style={{color: '#828282', width: 200, lineHeight: 20}}>{title}</Text16>
                </BoxRow>

            </View>
        )
    }


    return (
        <>
        <MainLayout animation={false}>

            <ContainerMain style={{marginBottom: 24}}>
                <BoxRow style={{justifyContent: 'space-between'}}>
                    <Text20>{excursion.title}</Text20>
                    <Pressable onPress={() => linkTo('/Participants')}>
                        <Svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle r="20.5" transform="matrix(-1 0 0 1 20.5 21.4714)" fill="#11AEAE"/>
                            <Path d="M17 15.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M17 21.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M17 27.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M12 15.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M12 21.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M12 27.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>

                    </Pressable>
                </BoxRow>
            </ContainerMain>

            <Carousel
                ref={ref}
                data={excursion.place.map((value, index) => ({...value, id: index }))}
                renderItem={renderItem}
                activeAnimationType={'spring'}
                sliderWidth={width}
                inactiveSlideShift={0}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                onSnapToItem={(index) => setState(index)}
                useScrollView={true}
                itemWidth={width  * 11/12}
            />
            <ContainerMain style={{marginTop: 43}}>

                <AudioSlider audioFile={excursion.place[state].audio}/>

                <ButtonGray activeOpacity={0.6}
                            onPress={() => linkTo(`/Map`)}
                            style={{marginBottom: 40, paddingLeft: 35, justifyContent: 'space-between'}}>
                    <Text16Bold500
                        style={{color: '#828282'}}>Показать маршрут на карте</Text16Bold500>
                    <Svg width="41" height="41" style={{}} fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                        <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </Svg>
                </ButtonGray>
            </ContainerMain>

        </MainLayout>

        </>
    );
};