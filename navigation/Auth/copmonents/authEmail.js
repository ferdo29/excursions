import * as React from 'react';
import {Input} from "../../../styles/components/inputs";
import {t} from "i18n-js";
import {ButtonWhite} from "../../../styles/components/buttons";
import {Text14, Text16} from "../../../styles/components/tools";
import Svg, {Circle, Path} from "react-native-svg";
import {useContext, useState} from "react";
import Locale from "../../../contexts/locale";
import {getAuth, signInWithEmailAndPassword, signInWithEmailLink} from "firebase/auth";
import userFB from "../../../contexts/userFB";
import {Dimensions, TouchableOpacity} from "react-native";
import {PopupAgreement, PopupRegForm} from "./popups";
import LayoutPop from "../../../layouts/popups/LayoutPop";
import {showToastState} from "../../../store/toasts/reducer";
import {useDispatch} from "react-redux";
import { firebaseApp, auth } from "../../../firebase"

const {height, width} = Dimensions.get('window')

export const AuthEmail = ({}) => {
    useContext(Locale)
    const dispatch = useDispatch()
    const [agreement, setAgreement] = useState(false)
    const [regForm, setRegForm] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const {setAuth} = useContext(userFB)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerEmail = (data) => {

        setErrorEmail(false)
        setErrorPassword(false)
        setEmail(data)
    }
    const handlerPassword = (data) => {

        setErrorEmail(false)
        setErrorPassword(false)
        setPassword(data)
    }
    const Login = () => {
        setErrorEmail(false)
        setErrorPassword(false)
        const auth = getAuth();



        signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
                setAuth(data)
            })
            .catch(e=> {
                switch (e.code) {
                    case 'auth/invalid-email': return setErrorEmail(true)
                    case 'auth/wrong-password': return setErrorPassword(true)
                    default: return dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
                }
            })
    }

    return (
        <>
            <Input style={{borderColor: errorEmail ? '#EB5757': '#fff',color: errorEmail ? '#EB5757': '#828282', textAlign: 'center', marginBottom: 15}}
                                              placeholder={t('Login by phone.Your email')}
                                              placeholderTextColor={'#828282'}
                                              onChangeText={handlerEmail}
                                              autoComplete={'email'}
                                              value={email}/>
            <Input style={{borderColor: errorPassword ? '#EB5757': '#fff',color: errorPassword ? '#EB5757': '#828282', textAlign: 'center', marginBottom: 32}}
                                              placeholder={t('Login by phone.Password')}
                                              placeholderTextColor={'#828282'}
                                              onChangeText={handlerPassword}
                                              autoComplete={'password'}
                                              secureTextEntry={true}
                                              value={password}/>

            <ButtonWhite activeOpacity={0.6} style={{}} onPress={Login}>
                <Text14 style={{color: '#11AEAE', textAlign: 'center', width: '80%'}}>{t('Login by phone.Login')}</Text14>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonWhite>
            <TouchableOpacity onPress={() => setAgreement(!agreement)} style={{paddingTop: 15, paddingRight: 10}}>
                <Text16 style={{color: '#fff', textAlign: 'left'}}>{t('Login by phone.Register')}</Text16>
            </TouchableOpacity>
            <LayoutPop state={agreement} openClose={() => setAgreement(!agreement)} start={height * 0.43} responseSize={false} mountainTop={true} reSizeOnSwipe={true}>
                <PopupAgreement handlerAgreement={() => setAgreement(!agreement)}
                                handlerConfirmation={() => setRegForm(!regForm)}/>
            </LayoutPop>
                <PopupRegForm state={regForm} openClose={() => setRegForm(!regForm)}/>
        </>
    );
};