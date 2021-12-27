import React, { useState, useRef, useEffect } from "react";
import {View, TouchableOpacity, Dimensions, Animated, Button} from "react-native";
import { Audio } from "expo-av";
import moment from 'moment'
import {BoxRow, ColumnCenterView, Text12} from "../styles/components/tools";
import Svg, {Path, Rect} from "react-native-svg";
import {getAuth} from "firebase/auth";
import {Slider} from '@miblanchard/react-native-slider';
import {useFiles} from "../hooks/useFiles";

const {height, width} = Dimensions.get('window')
let timer = 0

export default function AudioSlider({audioFile}) {
    let intervalHandle = null;
    const AudioPlayer = useRef(new Audio.Sound());
    const ref = useRef({})
    const milliSec = useRef(0)
    const {handlerDeleteFileStore} = useFiles()
    const [AudioPermission, SetAudioPermission] = useState(false);
    const [position, setPosition] = useState({value: 0})
    const [timeView, setTimeView] = useState(moment.utc(0).format('HH:mm:ss'))
    const [IsPLaying, SetIsPLaying] = useState(false);

    const stopoiweu = () => {
        clearInterval(timer)
        if (ref.current.durationMillis > milliSec.current) {
            timer = setInterval(() => {
                milliSec.current += 113
                setPosition({value: milliSec.current / ref.current.durationMillis})
                setTimeView(moment.utc(milliSec.current).format('HH:mm:ss'))
            }, 100)
        }else{
            setPosition({value: 1})
            setTimeView(moment.utc(ref.current.durationMillis).format('HH:mm:ss'))
        }
    }
    const GetPermission = async () => {
        try {
            const getAudioPerm = await Audio.requestPermissionsAsync();
            SetAudioPermission(getAudioPerm.granted);
            AudioPlayer.current.loadAsync({uri:audioFile.uri}, {}, true)
                .then((data) => AudioPlayer.current.getStatusAsync().then())

            AudioPlayer.current.getStatusAsync().then((data) => {
                ref.current = data
            })
        } catch (e) {
        }

    };
    const PlayRecordedAudio = async () => {
        try {
            const playerStatus = await AudioPlayer.current.getStatusAsync();

            ref.current = playerStatus
            if (playerStatus.isLoaded) {
                if (playerStatus.isPlaying === false) {
                    if(ref.current.durationMillis === ref.current.positionMillis){
                        stopoiweu()
                        await AudioPlayer.current.setPositionAsync(0)
                        setPosition({value: 0})
                        milliSec.current = ref.current.positionMillis
                        await AudioPlayer.current.playAsync();
                    }else{
                        stopoiweu()
                        milliSec.current = ref.current.positionMillis
                        await AudioPlayer.current.playAsync();
                    }
                    SetIsPLaying(true);
                }
            }
        } catch (error) {}
    };
    const StopPlaying = async () => {
        milliSec.current = ref.current.positionMillis
        clearInterval(timer)
        try {
            const playerStatus = await AudioPlayer.current.getStatusAsync();
            ref.current = playerStatus
            if (playerStatus.isLoaded) {
                await AudioPlayer.current.pauseAsync();
                setPosition({value: ref.current.positionMillis / ref.current.durationMillis})
                SetIsPLaying(false);
            }
        } catch (error) {
        }
    };
    const handlerValueChangeSlider = async (value) => {
        setPosition({value})
        clearInterval(timer)
        try {
            const playerStatus = await AudioPlayer.current.getStatusAsync();
            ref.current = playerStatus
            if (playerStatus.isLoaded) {
                await AudioPlayer.current.setPositionAsync(ref.current.durationMillis * value[0])
                milliSec.current = ref.current.positionMillis
                stopoiweu()
                await PlayRecordedAudio()
            }
        }catch (e) {

        }
    }

    useEffect(() => {
        GetPermission();
    }, [audioFile]);



    return (
        <>
        <BoxRow style={{justifyContent: 'flex-start', marginBottom: 40}}>

            <TouchableOpacity onPress={IsPLaying ? StopPlaying : PlayRecordedAudio} style={{marginRight: 20}}>
                {!IsPLaying && <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
                        stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M15 12L24 18L15 24V12Z" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>}
                {IsPLaying && <Svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M18 33c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C9.716 3 3 9.716 3 18c0 8.284 6.716 15 15 15Z"
                        stroke="#11AEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Rect x="19.414" y="11.151" width="1.986" height="13.698" rx=".993" fill="#11AEAE"/>
                    <Rect x="14.601" y="11.151" width="1.986" height="13.698" rx=".993" fill="#11AEAE"/>
                </Svg>}
            </TouchableOpacity>


            <ColumnCenterView style={{width: (width * .8) - 20, justifyContent: 'flex-start', alignItems:'space-between'}}>
                <View style={{
                    flex: 1,
                    height: 10,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    width: (width * .8) - 20
                }}>
                    <Slider
                        style={{backgroundColor: 'red', width: ( width * .8) - 20}}
                        value={position.value}
                        maximumTrackTintColor={'#BDBDBD'}
                        minimumTrackTintColor={'#11AEAE'}
                        thumbTintColor={'#11AEAE'}
                        onSlidingStart={StopPlaying}
                        onSlidingComplete={PlayRecordedAudio}
                        onValueChange={handlerValueChangeSlider}
                    />
                </View>
                <BoxRow style={{justifyContent: 'space-between', width:( width * .8) - 20}}>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{timeView}</Text12>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{moment.utc(ref.current.durationMillis).format('HH:mm:ss')}</Text12>
                </BoxRow>
            </ColumnCenterView>

        </BoxRow>

            <Button title={'handlerDeleteFileStore'} onPress={() => handlerDeleteFileStore(14)}/>
        </>
    );
}