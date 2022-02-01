import * as React from 'react';
import {BoxColumnView, BoxRowView, Text14, Text16, Text18Bold} from "../../styles/components/tools";
import Svg, {Path} from "react-native-svg";
import {Text, TouchableOpacity, Animated} from "react-native";
import {useEffect, useRef, useState} from "react";

export const Accordion = ({title, body, state, ...props}) => {
    const [open, setOpen] = useState(false)
    const rotate = useRef(new Animated.Value(0)).current
    const height = useRef(new Animated.Value(0)).current
    const marginBottom = useRef(new Animated.Value(0)).current

    const mainView = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })
    const mainText = height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, body.length > 40 ? (body.length / 1.6) : 40]
    })

    useEffect(() => {
        Animated.timing(rotate, {
            toValue: !open ? 0 : 1,
            duration: 250,
        }) .start()
        Animated.timing(height, {
            toValue: !open ? 0 : 1,
            duration: 250,
        }) .start()
        Animated.timing(marginBottom, {
            toValue: !open ? 0 : 30,
            duration: 250,
        }) .start()
    }, [open])

    const onClick = () => setOpen(!open)

    return (
        <Animated.View style={{width: '100%', borderBottomWidth: 1, borderBottomColor: '#E0E0E0'}}>
            <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
            <BoxRowView style={{width: 'auto', marginBottom: 20}}>
                <Text16 style={{marginBottom: 20, color: '#4F4F4F', width: 230}}>{title}</Text16>
                <Animated.View style={{
                    transform: [{ rotate: mainView }]
                }}>
                    <Svg style={{width: 36, height: 36}} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <Path d="M18 12V24" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <Path d="M12 18H24" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </Animated.View>

            </BoxRowView>
            </TouchableOpacity>
            <Animated.View style={{
                height: mainText,
                marginBottom: marginBottom,
            }}>
                <Text style={{
                    color: '#828282',
                    fontFamily: "Ubuntu_400Regular",
                    fontSize: 14,
                    lineHeight: 24,

                }}>{body}</Text>
            </Animated.View>

        </Animated.View>

    );
};