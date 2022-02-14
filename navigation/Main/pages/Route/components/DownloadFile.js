import * as React from 'react';
import {ButtonGray} from "../../../../../styles/components/buttons";
import {Text16Bold500} from "../../../../../styles/components/tools";
import Svg, {Circle, Path} from "react-native-svg";
import * as FileSystem from 'expo-file-system';
import {useDispatch} from "react-redux";
import {useContext, useState} from "react";
import {randomName} from "../../../../../middleware/middlewares";
import {ActivityIndicator} from "react-native";
import i18n, {t} from "i18n-js";
import {useFiles} from "../../../../../hooks/useFiles";
import UserFB from "../../../../../contexts/userFB";

export const DownloadFile = ({path, id, date}) => {
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)
    const [bits, setBits] = useState(0)
    const {handlerSetFileStore} = useFiles()
    const {user} = useContext(UserFB)

    const downloadFile = async () => {
        try {
            setDisabled(true)
            const uri = `${path}`
            const options = {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            }


            const fileUri = FileSystem.documentDirectory + `${randomName()}.mp3`.split('-').join('')
            const callback = ({totalBytesWritten}) => {
                setTimeout(() => setBits((totalBytesWritten / 1024 / 1024).toFixed(2)), 500)
            }

            const File = FileSystem.createDownloadResumable(uri, fileUri, options, callback)
            const data = await File.downloadAsync()

            handlerSetFileStore({uri: data.uri, name: path, date, id, uid: user.uid}).then()
            setBits(0)
            setDisabled(false)
        }catch (e) {
            setDisabled(false)
        }


    }
    return (
        <ButtonGray activeOpacity={0.6}
                    disabled={disabled}
                    onPress={downloadFile}
                    style={{marginBottom: 40, paddingLeft: 35, width: '100%', justifyContent: 'space-between'}}>
            {!disabled && <>
                <Text16Bold500
                    style={{color: '#828282'}}>{t('Route.Listen')}</Text16Bold500>
                <Svg width="41" height="41" style={{}} fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </>}
            {disabled &&
            <>
                <Text16Bold500
                    style={{color: '#828282'}}>{t('Route.Downloaded')} - {bits} {i18n.t("Route.Mbs")}</Text16Bold500>
                <ActivityIndicator size={'large'} color={"#11AEAE"} />
            </>
            }
        </ButtonGray>
    );
};