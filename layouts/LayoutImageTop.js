import * as React from 'react';
import {Animated, View, Dimensions, Pressable, SafeAreaView, ScrollView} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";
import {Text12, Text16, Text23} from "../styles/components/tools";
import {useEffect, useMemo, useRef, useState} from "react";
import {BottomNav} from "../navigation/Main/pages/components/BottomNav";
import {useLinkTo, useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Gallery from 'react-native-image-gallery';
import {t} from "i18n-js";
import {ToastError, ToastSuccess, ToastText, ToastWarning} from "../styles/components/Toast";
import Toast from "react-native-toast-message";
import {closeToastState} from "../store/toasts/reducer";
import {useDispatch, useSelector} from "react-redux";

const {height, width} = Dimensions.get('window')

const toastConfig = {
    success: ({text1}) => (
        <ToastSuccess>
            <ToastText>{text1}</ToastText>
        </ToastSuccess>
    ),
    error: ({text1}) => (
        <ToastError >
            <ToastText>{text1}</ToastText>
        </ToastError>
    ),
    warning: ({text1}) => (
        <ToastWarning >
            <ToastText>{text1}</ToastText>
        </ToastWarning>
    ),

}

export const LayoutImageTop = ({children, img, itemBack, title, count, viewOption = false, gallery, itemAbsolute}) => {
    const navigation = useNavigation();
    const linkTo = useLinkTo();
    const dispatch = useDispatch()
    const [stateScroll, setStateScroll] = useState(false)
    const [alignItems, setAlignItems] = useState('flex-start')
    const [galleryItems, setGalleryItems] = useState('30%')
    const transform = useRef(new Animated.Value(width <= 428 ? 270 : 400)).current
    const transformItemAbsolute = useRef(new Animated.Value(width <= 428 ? 250 : 500)).current
    const [page, setPage] = useState(0)
    const {type, text1, text2, view, top} = useSelector(state => state.toasts)

    const handlerScroll = (event) => {
        const data = event.nativeEvent.contentOffset.y
        setStateScroll(data > 200)
    }

    useEffect(() => {
        if(width <= 428){
            Animated.timing(transform, {
                toValue: stateScroll ? 120 : 270,
                duration: stateScroll ? 500 : 250,
                useNativeDriver: false
            })
                .start(() => {
                    setAlignItems(stateScroll ? viewOption ? 'center' : 'flex-end' :  'flex-start')
                    gallery ? setGalleryItems(stateScroll ? '60%' : '20%') : setGalleryItems(stateScroll ? '60%' : '40%')
                })
            Animated.timing(transformItemAbsolute, {
                toValue: stateScroll ? 100 : 250,
                duration: stateScroll ? 500 : 250,
                useNativeDriver: false
            })
                .start()
        }else{
            Animated.timing(transform, {
                toValue: stateScroll ? 270 : 400,
                duration: stateScroll ? 500 : 250,
                useNativeDriver: false
            })
                .start(() => {
                    setAlignItems(stateScroll ? viewOption ? 'center' : 'flex-end' :  'flex-start')
                    gallery ? setGalleryItems(stateScroll ? '60%' : '20%') : setGalleryItems(stateScroll ? '60%' : '40%')
                })
            Animated.timing(transformItemAbsolute, {
                toValue: stateScroll ? 250 : 500,
                duration: stateScroll ? 500 : 250,
                useNativeDriver: false
            })
                .start()
        }

    }, [stateScroll])
    useMemo(() => {
        if (view){
            Toast.show({ type, text1, text2})
            dispatch(closeToastState())
        }
    },[view])

    return (
        <View style={{width: '100%', height: '100%', position: 'relative', backgroundColor: '#F5F5F5'}}>
            {itemAbsolute &&
            <Animated.View style={{
                position: 'absolute',
                top: transformItemAbsolute,
                right: 30,
                zIndex: 20,
                elevation: 6
            }}>
                {itemAbsolute}
            </Animated.View>}
            <Pressable
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', left: 20, top: 44,  elevation: 6, zIndex: 10, transform: [{rotate: "180deg"}]}}>
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
                style={{position: 'absolute', right: 20, top: 44,  elevation: 6, zIndex: 10, transform: [{rotate: "180deg"}]}}>
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
                    backgroundColor: '#11AEAE',
                    width: width,
                    height: transform,
                    position: 'relative',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }} >

                {!gallery && img && <Animated.Image source={img} style={{position: 'absolute', height: transform, zIndex: 2, width}}/>}
                {gallery && gallery.length > 0 && <Gallery
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
                    height: galleryItems,
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
                {count && <Text12 style={{color: '#fff'}}>{count} {t('Cities.excursions')}</Text12>}
                {gallery && gallery.length > 0 &&
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
                    <View style={{paddingBottom: width <= 428 ? 200 : 500}}/>
                </ScrollView>
            </SafeAreaView>
            <Toast config={toastConfig} position={top ? 'bottom': 'top'}/>
            <BottomNav/>
        </View>
    );
};