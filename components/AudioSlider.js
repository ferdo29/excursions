import React, {useState, useRef, useEffect, useContext} from "react";
import {View, TouchableOpacity, Dimensions, Animated, Button} from "react-native";
import { Audio } from "expo-av";
import moment from 'moment'
import {BoxRow, ColumnCenterView, Text12} from "../styles/components/tools";
import Svg, {Path, Rect} from "react-native-svg";
import {getAuth} from "firebase/auth";
import {Slider} from '@miblanchard/react-native-slider';
import {useFiles} from "../hooks/useFiles";
import AudioContexts from '../contexts/audio'
import {useDispatch, useSelector} from "react-redux";
import {setPlayAudio} from "../store/files/reducer";

const {height, width} = Dimensions.get('window')

export default function AudioSlider({audioFile, id}) {
    const {
        ref,
        state,
        position,
        timeView,
        IsPLaying,
        PlayRecordedAudio,
        StopPlaying,
        handlerValueChangeSlider,
        GetPermission
    } = useContext(AudioContexts);
    const dispatch = useDispatch()
    const {playAudio, data} = useSelector(state => state.files)

    const onPlayStop = () => GetPermission(id)

    useEffect(() => {
        playAudio && dispatch(setPlayAudio(id))
    }, [playAudio])
    return (
        <>

        <BoxRow style={{justifyContent: 'flex-start', marginBottom: 40}}>

            <TouchableOpacity onPress={onPlayStop} style={{marginRight: 20}}>
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
                    {!!state && (id.id === state.id) ?
                        <Slider
                            style={{backgroundColor: 'red', width: (width * .8) - 20}}
                            value={position.value}
                            maximumTrackTintColor={'#BDBDBD'}
                            minimumTrackTintColor={'#11AEAE'}
                            thumbTintColor={'#11AEAE'}
                            onSlidingStart={StopPlaying}
                            onSlidingComplete={PlayRecordedAudio}
                            onValueChange={handlerValueChangeSlider}
                        />:
                        <Slider
                            style={{backgroundColor: 'red', width: (width * .8) - 20}}
                            value={0}
                            maximumTrackTintColor={'#BDBDBD'}
                            minimumTrackTintColor={'#11AEAE'}
                            thumbTintColor={'#11AEAE'}
                            onSlidingStart={0}
                            onSlidingComplete={0}
                        />
                    }
                </View>
                <BoxRow style={{justifyContent: 'space-between', width:( width * .8) - 20}}>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{timeView}</Text12>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{moment.utc(ref.current.durationMillis).format('HH:mm:ss')}</Text12>
                </BoxRow>
            </ColumnCenterView>

        </BoxRow>

            {/*<Button title={'handlerDeleteFileStore'} onPress={() => handlerDeleteFileStore(14)}/>*/}
        </>
    );
}