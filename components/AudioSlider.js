import React, { useState, useRef, useEffect } from "react";
import {View, TouchableOpacity, Dimensions} from "react-native";
import { Audio } from "expo-av";
import moment from 'moment'
import {BoxRow, ColumnCenterView, Text12} from "../styles/components/tools";
import Svg, {Path} from "react-native-svg";
import {getAuth} from "firebase/auth";
import {SafeAreaView, ScrollView} from "react-native";

const {height, width} = Dimensions.get('window')

export default function AudioSlider({audioFile}) {
    const AudioPlayer = useRef(new Audio.Sound());
    const ref = useRef({})
    const user = getAuth().currentUser

    const [AudioPermission, SetAudioPermission] = useState(false);
    const [IsPLaying, SetIsPLaying] = useState(false);

    useEffect(() => {
        GetPermission();
    }, [audioFile]);

    const GetPermission = async () => {
        try {
            const getAudioPerm = await Audio.requestPermissionsAsync();
            SetAudioPermission(getAudioPerm.granted);
            AudioPlayer.current.loadAsync({
                uri: audioFile,
            }, {}, true).then((data) => {
                console.log(data)
                AudioPlayer.current.getStatusAsync().then()
            })

            ref.current = await AudioPlayer.current.getStatusAsync();
        }catch (e) {
            console.log(e)
        }

    };
    const PlayRecordedAudio = async () => {
        try {
            const playerStatus = await AudioPlayer.current.getStatusAsync();

            // console.log(playerStatus)
            ref.current = playerStatus
            if (playerStatus.isLoaded) {
                if (playerStatus.isPlaying === false) {
                    await AudioPlayer.current.playAsync();
                    SetIsPLaying(true);
                }
            }
        } catch (error) {}
    };
    const StopPlaying = async () => {
        try {
            //Get Player Status
            const playerStatus = await AudioPlayer.current.getStatusAsync();
            // console.log(playerStatus)
            ref.current = playerStatus
            // If song is playing then stop it
            if (playerStatus.isLoaded === true)
                await AudioPlayer.current.pauseAsync();
                // await AudioPlayer.current.unloadAsync();

            SetIsPLaying(false);
        } catch (error) {}
    };
    console.log(ref.current)

    return (
        <BoxRow style={{justifyContent: 'flex-start', marginBottom: 40}}>

            <TouchableOpacity onPress={IsPLaying ? StopPlaying : PlayRecordedAudio} style={{marginRight: 20}}>
                <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M15 12L24 18L15 24V12Z" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
            </TouchableOpacity>
            <ColumnCenterView style={{width: (width * .8) - 20, justifyContent: 'flex-start', alignItems:'space-between'}}>
                {/*<SafeAreaView>*/}
                {/*    <ScrollView style={{position: 'relative', height: 1,marginTop: 15, marginBottom: 7, backgroundColor: '#BDBDBD', width: width * .8 - 20}}>*/}
                {/*        */}
                {/*    </ScrollView>*/}
                {/*</SafeAreaView>*/}
                <View style={{position: 'relative', height: 1,marginTop: 15, marginBottom: 7, backgroundColor: '#BDBDBD', width: (width * .8) - 20}}>
                    <View style={{height: 3, backgroundColor: '#11AEAE', width: (width * .6) - 20, position: 'absolute', left: 0, top: -1}}/>
                </View>
                <BoxRow style={{justifyContent: 'space-between', width:( width * .8) - 20}}>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{moment.utc(ref.current.positionMillis).format('hh:mm:ss')}</Text12>
                    <Text12 style={{color: '#BDBDBD', lineHeight: 17}}>{moment.utc(ref.current.durationMillis).format('hh:mm:ss')}</Text12>
                </BoxRow>
            </ColumnCenterView>


        </BoxRow>
    );
}