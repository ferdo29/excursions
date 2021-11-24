import * as React from 'react';
import {Animated, View, Dimensions, Pressable, SafeAreaView, ScrollView} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";
import {Text12, Text16, Text23} from "../styles/components/tools";
import {useEffect, useRef, useState} from "react";
import {BottomNav} from "../navigation/Main/pages/components/BottomNav";
import {useLinkTo, useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Gallery from 'react-native-image-gallery';

const {height, width} = Dimensions.get('window')

export const LayoutImageTop = ({children, img, itemBack, title, count, viewOption = false, gallery, itemAbsolute}) => {
    const navigation = useNavigation();
    const linkTo = useLinkTo();
    const [stateScroll, setStateScroll] = useState(false)
    const [alignItems, setAlignItems] = useState('flex-start')
    const transform = useRef(new Animated.Value(270)).current
    const transformItemAbsolute = useRef(new Animated.Value(250)).current
    const [page, setPage] = useState(0)

    const handlerScroll = (event) => {
        const data = event.nativeEvent.contentOffset.y
        setStateScroll(data > 200)
    }

    useEffect(() => {
        Animated.timing(transform, {
            toValue: stateScroll ? 120 : 270,
            duration: stateScroll ? 500 : 250,
        })
            .start(() => {
                setAlignItems(stateScroll ? viewOption ? 'center' : 'flex-end' :  'flex-start')
            })
        Animated.timing(transformItemAbsolute, {
            toValue: stateScroll ? 100 : 250,
            duration: stateScroll ? 500 : 250,
        })
            .start()
    }, [stateScroll])

    return (
        <View style={{width: '100%', height: '100%', position: 'relative', backgroundColor: '#F5F5F5'}}>
            {itemAbsolute &&
            <Animated.View style={{
                position: 'absolute',
                top: transformItemAbsolute,
                right: 30,
                zIndex: 20
            }}>
                {itemAbsolute}
            </Animated.View>}
            <Pressable
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', left: 20, top: 44, zIndex: 1, transform: [{ rotate: "180deg" }]}}>
                <Svg width="41" height="41" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </Pressable>
            {itemBack}
            {viewOption &&
            <Pressable
                onPress={() => linkTo(`/Filters`)}
                style={{position: 'absolute', right: 20, top: 44, zIndex: 1, transform: [{rotate: "180deg"}]}}>
                <Svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle r="20.5" transform="matrix(-1 0 0 1 20.5 21.4714)" fill="#11AEAE"/>
                    <Path d="M17 15.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M17 21.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M17 27.9714H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M12 15.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M12 21.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M12 27.9714H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>

            </Pressable>}

            <Animated.View
                style={{
                    width: width,
                    height: transform,
                    position: 'relative',
                }} >

                {!gallery && img && <Animated.Image source={img} style={{position: 'absolute', height: transform, zIndex: 2, width}}/>}
                {gallery && <Gallery
                    style={{width, height: 200,}}
                    onPageSelected={setPage}
                    imageComponent={(img2) => {
                        return (
                            <Animated.Image source={img2.image.source}
                                            style={{position: 'absolute', height: transform, zIndex: 2, width}}/>)

                    }} images={gallery.map(value => ({source: value}))}
                />}
                <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.76)']}
                style={{
                    width: '100%',
                    height: gallery ? '40%' : '60%',
                    position: 'absolute',
                    zIndex: 3,
                    bottom: 0,
                    flexDirection: 'column',
                    alignItems: gallery ? 'center' : alignItems,
                    justifyContent: 'flex-end',
                    paddingLeft:21,
                    pointerEvents:"none",
                    paddingBottom: 17,
                    paddingRight:21,}}>
                <Text23 style={{color: '#fff', lineHeight: 38}}>{title}</Text23>
                {count && <Text12 style={{color: '#fff'}}>{count} экскурсий</Text12>}
                {gallery &&
                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderRadius: 50,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                }}>
                    <Text16 style={{color: '#4F4F4F', height: 27}}>{page + 1}/{gallery.length}</Text16>
                </View>}
            </LinearGradient>
            </Animated.View>

            <SafeAreaView>
                <ScrollView
                    style={{position: 'relative'}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                onScroll={handlerScroll}
                >
                    <View style={{paddingBottom: 10}}/>
                    {children}
                    <View style={{paddingBottom: 200}}/>
                </ScrollView>
            </SafeAreaView>
            <BottomNav/>
        </View>
    );
};