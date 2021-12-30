import * as React from 'react';
import {Animated, Pressable, View, Text} from "react-native";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import {ToastError, ToastSuccess, ToastText, ToastWarning} from "../styles/components/Toast";
import {useEffect, useMemo, useRef, useState} from "react";
import {closeToastState} from "../store/toasts/reducer";
import {BottomNav} from "../navigation/Main/pages/components/BottomNav";
import {SafeAreaView} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import {ContainerMain} from "../styles/components/tools";
import {styles} from "../styles/global";
import {RefreshControl} from "react-native";

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

export default function ({
                             children,
                             animation = true,
                             backgroundColor = '#F5F5F5',
                             viewBottomNav = true,
                             viewBack = false,
                             itemBack,
                             itemTitle,
                             title,
                             Refreshing = false,
                             handlerRefresh = () => {}
                         }) {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [stateScroll, setStateScroll] = useState(false)
    const scrolling = useRef(new Animated.Value(40)).current;
    const titleAbsolute = useRef(new Animated.Value(20)).current;
    const paddingAbsolute = useRef(new Animated.Value(60)).current;
    const [refreshing, setRefreshing] = React.useState(false);

    const {type, text1, text2, view, top} = useSelector(state => state.toasts)
    const translation = scrolling.interpolate({
        inputRange: [100, 250],
        outputRange: [40, 25],
        extrapolate: 'clamp',
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        handlerRefresh()
        setTimeout( () => {
            setRefreshing(false)
        } , 2000)

    }, []);
    const handlerScroll = (event) => {
        const data = event.nativeEvent.contentOffset.y
        setStateScroll(data > 200)
    }

    useEffect(() => {
        Animated.timing(titleAbsolute, {
            toValue: stateScroll ? 0 : 20,
            duration: stateScroll ? 500 : 250,
            useNativeDriver: false
        }) .start()
        Animated.timing(paddingAbsolute, {
            toValue: stateScroll ? 120 : 60,
            duration: stateScroll ? 500 : 250,
            useNativeDriver: false
        }) .start()
    }, [stateScroll])

    useMemo(() => {
        if (view){
            Toast.show({ type, text1, text2})
            dispatch(closeToastState())
        }
    },[view])

    return (
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
            <Animated.View style={{
                backgroundColor,
                flex: 1,
                position: 'relative',
                background: 'rgb(245, 245, 250)',
                flexDirection:'column',
                paddingTop: translation
            }}>
                {itemBack}
                {viewBack && <Pressable
                    onPress={() => navigation.goBack()}
                    style={{position: 'absolute', left: 20, top: 44, zIndex: 1, transform: [{rotate: "180deg"}]}}>
                    <Svg width="41" height="41" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                        <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </Svg>
                </Pressable>}
                <ContainerMain>
                    {title &&<Animated.Text style={[styles.text23,{marginBottom: titleAbsolute}]}>{title}</Animated.Text>}
                    {itemTitle}
                </ContainerMain>
                <SafeAreaView>
                    <Animated.ScrollView
                        scrollEventThrottle={16}
                        refreshControl={
                            Refreshing && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onScroll={(data) => {
                            animation && handlerScroll(data)
                            animation && Animated.event(
                                [{nativeEvent:{contentOffset: {y: scrolling}}}],
                                {useNativeDriver: true}
                            )
                        }}
                        style={{height: '100%'}}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        {children}
                        <Animated.View style={{height: paddingAbsolute}}/>
                    </Animated.ScrollView>
                </SafeAreaView>
            </Animated.View>

            <Toast config={toastConfig} position={top ? 'bottom': 'top'}/>
            {viewBottomNav && <BottomNav/>}
        </View>
    );
};