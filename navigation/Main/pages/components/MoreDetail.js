import * as React from 'react';
import {Text12, Text16} from "../../../../styles/components/tools";
import {Animated, Pressable} from "react-native";
import {useEffect, useRef, useState} from "react";
import {IconExclamations} from "../../../../components/Icons";

export const MoreDetail = ({right=0, left=0, bottom=0, top=0}) => {
    const [state, setState] = useState(false)
    const scale = useRef(new Animated.Value(0)).current;
    const Right = useRef(new Animated.Value(0)).current;
    const Top = useRef(new Animated.Value(0)).current;
    const Radius = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.spring(scale, {
            toValue: !state ? 0 : 1,
            duration: 500,
        }).start()
        Animated.spring(Right, {
            toValue: !state ? -(257/2.6) : right,
            duration: 250,
        }).start()
        Animated.spring(Top, {
            toValue: !state ? -(248/2.6) : top,
            duration: 250,
        }).start()
        Animated.spring(Radius, {
            toValue: !state ? 100 : 9,
            duration: 250,
        }).start()
    }, [state])

    const ButtonMoreData = () => (
        <Pressable onPress={() => setState(!state)}
                   style={{
                       position: 'absolute',
                       right: 15,
                       top: 8,
                       padding: 10,
                   }}>
            <IconExclamations/>
        </Pressable>
    )
    const ViewMoreData = () => (
        <Animated.Pressable onPress={() => setState(!state)} style={{
            position: 'absolute',
            width: 257,
            height: 248,
            backgroundColor: "#FFF",
            flexDirection: 'column',
            paddingTop: 30,
            paddingRight: 21,
            paddingBottom: 32,
            paddingLeft: 24,
            transform: [{ scale }],
            right: Right,
            top: Top,
            zIndex: 100,
            justifyContent: 'space-between',
            borderRadius: 9,
        }}>
            {state &&
            <>
                <Text12 style={{color: '#828282', width: 207}}>
                    Поделись с другом ссылкой на скачивание приложения.
                    Ваш друг должен установить приложение, а вы при этом получите дополнительную
                    <Text12 style={{color: '#11AEAE'}}>скидку 10%</Text12> на покупку аудиоэкскурсии.
                </Text12>
                <Pressable onPress={() => setState(!state)} style={{ width: 'auto', paddingTop: 29}}>
                    <Text16 style={{color: '#11AEAE', textAlign: 'right', lineHeight: 19}}>ПОНЯТНО</Text16>
                </Pressable>
            </>
            }
        </Animated.Pressable>
    )

    return {ButtonMoreData, ViewMoreData}
};