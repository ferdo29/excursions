import * as React from 'react';
import {ButtonWhiteOpacity} from "../../../styles/components/buttons";
import Svg, {Path} from "react-native-svg";
import {Text14} from "../../../styles/components/tools";
import {t} from "i18n-js";
import {getAuth, FacebookAuthProvider, signInWithCredential} from "firebase/auth";
import {logInWithReadPermissionsAsync, initializeAsync} from 'expo-facebook'
import {useContext} from "react";
import userFB from "../../../contexts/userFB";
import {useDispatch} from "react-redux";
import {showToastState} from "../../../store/toasts/reducer";

export const AuthFacebook = ({}) => {
    const dispatch = useDispatch()
    const {setAuth} = useContext(userFB)

    async function logIn() {
        const auth = getAuth()
        const appId = process.env.facebook
        const permissions = ['public_profile', 'email'];
        try {
            await initializeAsync(appId)
            const {type,token} = await logInWithReadPermissionsAsync({
                permissions,
                appId
            });
            switch (type) {
                case 'success': {
                    const credential = FacebookAuthProvider.credential(token);
                    await signInWithCredential(auth, credential)
                    return setAuth(true)
                }
                case 'cancel': {
                    return dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
                }
            }
        }catch (e) {
            console.log(e)
            dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
        }

    }

    return (
        <ButtonWhiteOpacity onPress={logIn} activeOpacity={0.6}>
            <Svg style={{marginRight: 48}} width="24" height="24" viewBox={'0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M12 23.636c6.427 0 11.636-5.21 11.636-11.636C23.636 5.573 18.426.364 12 .364 5.573.364.364 5.574.364 12c0 6.427 5.21 11.636 11.636 11.636Z"
                      fill="#3F65A6"/>
                <Path d="M10.232 8.173v1.836H8.886v2.246h1.346v6.154h2.763V12.25h1.855s.173-1.077.259-2.255h-2.1V8.46c0-.227.3-.536.6-.536h1.505V5.586h-2.046c-2.904.005-2.836 2.25-2.836 2.587Z"
                      fill="#fff"/>
            </Svg>
            <Text14 style={{color: '#fff'}}>{t('Login by phone.Continue with')} Facebook</Text14>
        </ButtonWhiteOpacity>
    );
};