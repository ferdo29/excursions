import * as React from 'react';
import {useContext, useEffect, useRef, useState} from "react";
import userFB from "../contexts/userFB";
import {getAuth} from "firebase/auth";
import {Audio} from "expo-av";
import moment from "moment";
import AudioContexts from '../contexts/audio'

let timer = 0

export const LayoutAudio = ({children}) => {
    const AudioPlayer = useRef(new Audio.Sound());
    const [state, setState] = useState(null);
    const ref = useRef({})
    const milliSec = useRef(0)
    const [AudioPermission, SetAudioPermission] = useState(false);
    const [position, setPosition] = useState({value: 0})
    const [timeView, setTimeView] = useState(moment.utc(0).format('HH:mm:ss'))
    const [IsPLaying, SetIsPLaying] = useState(false);

    const stopoiweu = () => {
        clearInterval(timer)
        if (ref.current.durationMillis <= milliSec.current) {
            AudioPlayer.current.pauseAsync().then();
            AudioPlayer.current.playFromPositionAsync(0).then();
            setPosition({value: 0})
            setTimeView(moment.utc(0).format('HH:mm:ss'))
            SetIsPLaying(false)
            clearInterval(timer)
            return
        }
        if (ref.current.durationMillis > milliSec.current) {
            timer = setInterval(() => {
                milliSec.current += 113
                setPosition({value: milliSec.current / ref.current.durationMillis})
                setTimeView(moment.utc(milliSec.current).format('HH:mm:ss'))
            }, 100)
        }
        else{
            AudioPlayer.current.pauseAsync().then();
            AudioPlayer.current.playFromPositionAsync(0).then();
            setPosition({value: 0})
            setTimeView(moment.utc(0).format('HH:mm:ss'))
            SetIsPLaying(false)
            clearInterval(timer)
            return
        }
    }

    const GetPermission = async ({uri, ...props}) => {
        if((state?.uri ? state?.uri : null) === uri){
            IsPLaying ? await StopPlaying() : await PlayRecordedAudio()
        }else{
        try {
            const getAudioPerm = await Audio.requestPermissionsAsync();
            SetAudioPermission(getAudioPerm.granted);
            await AudioPlayer.current.unloadAsync()
            AudioPlayer.current.loadAsync({uri}, {}, true)
                .then((data) => {
                    setState({uri, ...props})
                    PlayRecordedAudio()
                }).catch(e => {
            })

            AudioPlayer.current.getStatusAsync().then((data) => {
                ref.current = data
            })
        } catch (e) {
        }
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


    return (
        <AudioContexts.Provider value={{
            AudioPlayer,
            ref,
            state,
            milliSec,
            AudioPermission,
            position,
            timeView,
            IsPLaying,
            stopoiweu,
            GetPermission,
            PlayRecordedAudio,
            StopPlaying,
            handlerValueChangeSlider,
        }}>
            {children}
        </AudioContexts.Provider>)
};