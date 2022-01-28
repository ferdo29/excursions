import React, {useContext} from 'react';
import Svg, {Path} from "react-native-svg";
import {Text14} from "../../../styles/components/tools";
import {t} from "i18n-js";
import {ButtonWhiteOpacity} from "../../../styles/components/buttons";
import {GoogleAuthProvider} from "firebase/auth";
import * as Google from "expo-google-app-auth";
import userFB from "../../../contexts/userFB";
import {useDispatch} from "react-redux";
import {showToastState} from "../../../store/toasts/reducer";
import { auth } from "../../../firebase"
import {Dimensions} from "react-native";
import * as SecureStore from "expo-secure-store";

const {height, width} = Dimensions.get('window')

export const AuthGoogle = ({}) => {
    const dispatch = useDispatch()
    const {setAuth} = useContext(userFB)

    const handlerGoogle = () => {
        const config = {
            iosClientId: process.env.DB_IOS_CLIENT_ID,
            androidClientId: process.env.ANDROID_CLIENT_ID,
            scopes: ['profile', 'email'],
        }

        Google.logInAsync(config)
            .then((result) => {
                const {type, user} = result
                if(type === 'success'){
                    const { idToken, accessToken } = result;
                    const credential = GoogleAuthProvider.credential(
                        idToken,
                        accessToken
                    );
                    return auth.signInWithCredential(credential).then(data => {
                            SecureStore.setItemAsync('KeyUser', JSON.stringify({type: 'Google'})).then()
                            setAuth()
                        })
                }else{
                   dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
            })

    }

    return (
        <ButtonWhiteOpacity onPress={handlerGoogle} style={{width: width >= 428 ? 375 : '100%'}} activeOpacity={0.6}>
            <Svg width="24" height="24" viewBox={'0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.988 6.84A11.262 11.262 0 0 1 5.034 2.98C6.788 1.533 8.798.661 11.054.394 13.701.08 16.19.58 18.491 1.959a13.13 13.13 0 0 1 1.617 1.154c.127.103.113.164.005.267-1.045 1.04-2.09 2.08-3.127 3.13-.121.123-.187.113-.318.015-3.038-2.34-7.467-1.706-9.731 1.388A6.833 6.833 0 0 0 5.99 9.68c-.02.056-.057.108-.085.164-.604-.46-1.214-.919-1.814-1.383-.703-.54-1.406-1.078-2.104-1.622Z"
                      fill="#E94335"/>
                <Path d="M5.906 14.24c.202.446.37.91.624 1.327 1.064 1.744 2.582 2.864 4.584 3.263 1.805.36 3.539.117 5.156-.788.056-.028.113-.056.164-.084.028.028.052.06.08.084l3.633 2.813c-.581.576-1.242 1.04-1.946 1.444-2.039 1.162-4.247 1.63-6.572 1.453-2.896-.225-5.395-1.37-7.457-3.432-.905-.904-1.65-1.926-2.19-3.093.502-.385 1.004-.765 1.505-1.149.807-.614 1.613-1.223 2.42-1.837Z"
                      fill="#34A853"/>
                <Path d="M20.151 20.855c-1.209-.938-2.423-1.875-3.632-2.813a.685.685 0 0 1-.08-.084c.417-.324.844-.638 1.186-1.05a5.452 5.452 0 0 0 1.148-2.325c.024-.108.005-.146-.103-.14-.056.004-.108 0-.164 0-1.912 0-3.83-.005-5.742.004-.211 0-.258-.056-.253-.258.01-1.36.01-2.719 0-4.078 0-.173.047-.22.22-.22 3.506.004 7.013.004 10.524 0 .15 0 .21.037.248.197.286 1.289.267 2.582.094 3.885a12.703 12.703 0 0 1-.783 3.024 10.754 10.754 0 0 1-2.54 3.773c-.043.033-.085.057-.123.085Z"
                      fill="#4285F3"/>
                <Path d="M5.906 14.24c-.806.615-1.612 1.224-2.419 1.838-.501.38-1.003.764-1.504 1.149-.39-.722-.643-1.486-.849-2.274C.74 13.43.68 11.883.895 10.331c.169-1.218.52-2.39 1.088-3.487.703.539 1.401 1.083 2.104 1.622.605.464 1.21.923 1.814 1.382-.103.502-.248.994-.295 1.51a7.274 7.274 0 0 0 .272 2.751c.019.038.023.085.028.132Z"
                      fill="#FABB06"/>
            </Svg>
            <Text14 style={{color: '#fff', marginLeft: 40}}>{t('Login by phone.Continue with')} Google</Text14>
        </ButtonWhiteOpacity>
    );
};