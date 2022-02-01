import * as React from 'react';
import {BoxColumnView, BoxRowView, Text16, Text26, Text28, URLText} from "../../../styles/components/tools";
import {Input, InputNumber, WrapperInputNumber} from "../../../styles/components/inputs";
import {useContext, useRef, useState} from "react";
import Locale from "../../../contexts/locale";
import {useDispatch, useSelector} from "react-redux";
import {changeState, clearState, clearStateOne} from "../../../store/sms/reducer";
import {ButtonGreenOpacity, ButtonWhite, ButtonWrapper} from "../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import LayoutPop from "../../../layouts/popups/LayoutPop";
import {Dimensions} from "react-native";
import {t} from "i18n-js";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import userFB from "../../../contexts/userFB";
import {showToastState} from "../../../store/toasts/reducer";

const {height, width} = Dimensions.get('window')

export const PopupsCheckSMS = ({openClose = () => {}, confirmation, handlerConfirmation = () => {}, Phone = '+7 (913) 041-99-99'}) => {
    useContext(Locale)
    const dispatch = useDispatch()
    const {data} = useSelector(state => state.SMS)
    const [stateHeight, setStateHeight] = useState(height * 0.4)
    const ref_input0 = useRef();
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();

    const handlerState = (num, value) => {
        if (value.length > 1){
            dispatch(clearState())

            const str = value.split('')

            str.forEach((item, index) => {
                dispatch(changeState({num: index, value: item}))
                if (str.length === index + 1){
                    setTimeout(() => {
                        dispatch(clearState())
                        openClose(data.join('') + value)
                        handleBlur()
                    }, 300)

                }
            })
            return
        }
        dispatch(changeState({num, value}))
        num === 0 && ref_input1.current.focus()
        num === 1 && ref_input2.current.focus()
        num === 2 && ref_input3.current.focus()
        num === 3 && ref_input4.current.focus()
        num === 4 && ref_input5.current.focus()

        if (data[0] !== '' && data[1] !== '' && data[2] !== '' && data[3] !== '' && data[4] !== '' && (num === 5 && value !== '')){
            dispatch(clearState())
            openClose(data.join('') + value)
            handleBlur()
        }
    }

    const handleFocus = (num) => {
        dispatch(clearStateOne({num}))
        setStateHeight(height * 0.1)
    }
    const handleBlur = () => setStateHeight(height * 0.4)

    return (
        <LayoutPop state={confirmation} openClose={handlerConfirmation} start={stateHeight} mountainTop={true} reSizeOnSwipe={false}>
            <BoxColumnView style={{justifyContent: 'center'}}>
                <Text26 style={{paddingBottom: 28}}>{t('Login by phone.Number confirmation')}</Text26>

                <Text16 style={{color: '#828282', textAlign: 'center', paddingBottom: 40}}>
                    {t('Login by phone.Enter the 6 digit code we sent to your phone number')}{Phone}
                </Text16>
                <BoxRowView style={{paddingBottom:22}}>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input0}
                            onFocus={() => handleFocus(0)}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => {handlerState(0, data)}}
                            returnKeyType={'next'}
                            value={data[0]}/>
                    </WrapperInputNumber>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input1}
                            onFocus={() => handleFocus(1)}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => handlerState(1, data)}
                            returnKeyType={'next'}
                            value={data[1]}/>
                    </WrapperInputNumber>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input2}
                            onFocus={() => handleFocus(2)}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => handlerState(2, data)}
                            returnKeyType={'next'}
                            value={data[2]}/>
                    </WrapperInputNumber>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input3}
                            onFocus={() => handleFocus(3)}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => handlerState(3, data)}
                            value={data[3]}/>
                    </WrapperInputNumber>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input4}
                            onFocus={() => handleFocus(4)}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => handlerState(4, data)}
                            value={data[4]}/>
                    </WrapperInputNumber>
                    <WrapperInputNumber>
                        <InputNumber
                            ref={ref_input5}
                            onFocus={() => handleFocus(5)}
                            onBlur={handleBlur}
                            textAlign={'center'}
                            keyboardType={'number-pad'}
                            onChangeText={(data) => handlerState(5, data)}
                            value={data[5]}/>
                    </WrapperInputNumber>
                </BoxRowView>
                {/*{timerView ?*/}
                {/*    <Text16 style={{color: '#828282', textAlign: 'center', paddingBottom: 40}}>*/}
                {/*        Отправить СМС еще раз {timer}*/}
                {/*    </Text16>:*/}
                {/*    <ButtonWrapper>*/}
                {/*        <Text16 style={{color: '#11AEAE', textAlign: 'center', paddingBottom: 40, textDecorationLine: 'underline'}}>*/}
                {/*            Отправить СМС еще раз*/}
                {/*        </Text16>*/}
                {/*    </ButtonWrapper>*/}
                {/*}*/}


            </BoxColumnView>
        </LayoutPop>

    );
};
export const PopupAgreement = ({handlerAgreement = () => {}, handlerConfirmation = () => {}}) => {
    return(
        <BoxColumnView style={{justifyContent: 'center'}}>
            <Text28 style={{paddingBottom: 28}}>{t('Agreement.Agreement')}</Text28>

            <BoxColumnView style={{paddingBottom: 40}}>
                <Text16 style={{color: '#828282'}}>{t('Agreement.By using the app you agree')}</Text16>
                <URLText style={{flexDirection: 'row', paddingBottom: 5}}>
                    <Text16 style={{color: '#828282'}}>{t('Agreement.with')} </Text16>
                    <Text16>
                        <Text16 style={{color: '#11AEAE', textDecorationLine: 'underline'}}>{t('Agreement.User agreement')}</Text16>
                    </Text16>
                    <Text16 style={{color: '#828282'}}> {t('Agreement.and')}</Text16>
                </URLText>

                <URLText style={{paddingBottom: 10}}>
                    <Text16 style={{color: '#11AEAE', textDecorationLine: 'underline'}}>{t('Agreement.Privacy Policy')}</Text16>
                </URLText>
            </BoxColumnView>

            <ButtonGreenOpacity activeOpacity={0.6} onPress={() => {
                handlerAgreement()
                handlerConfirmation()
            }}>
                <Text16 style={{color: '#fff', textAlign: 'center', width: '80%', paddingLeft: 40}}>{t('Agreement.Yes, I agree')}</Text16>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonGreenOpacity>

            <ButtonWhite onPress={handlerAgreement} activeOpacity={0.6} style={{backgroundColor: '#F5F5FA', borderWidth: 0}}>
                <Text16 style={{color: '#828282', textAlign: 'center', width: '100%', paddingRight: 20}}>{t('Agreement.No, go out')}</Text16>
            </ButtonWhite>

        </BoxColumnView>
    )
}
export const PopupRegForm = ({state, openClose = () => {}}) => {
    useContext(Locale)
    const dispatch = useDispatch()
    const {setAuth} = useContext(userFB)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Height, setHeight] = useState(height * 0.5)

    const handlerFocus = () => setHeight(height * 0.35)
    const handlerFocusPassword = () => setHeight(height * 0.25)
    const handlerBlur = () => setHeight(height * 0.5)

    const Register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                setAuth(true)
                openClose()
            })
            .catch((e) => {
                switch (e.code) {
                    case 'auth/weak-password': return dispatch(showToastState({ type: 'error', top: true, text1: t(`error.${e.code}`)}))
                    case 'auth/email-already-in-use': return dispatch(showToastState({ type: 'error', top: true, text1: t(`error.${e.code}`)}))
                    default: return dispatch(showToastState({ type: 'error', top: true, text1: t(`error.error`)}))
                }
            })
    }

    return(
        <LayoutPop state={state} openClose={openClose} start={Height} responseSize={false} mountainTop={true} reSizeOnSwipe={true}>
        <BoxColumnView style={{justifyContent: 'center'}}>
            <Input style={{borderColor: '#11AEAE', textAlign: 'center', marginBottom: 15, marginTop: 30}}
                   placeholder={t('Login by phone.Your email')}
                   placeholderTextColor={'#828282'}
                   onChangeText={setEmail}
                   onFocus={handlerFocus}
                   onBlur={handlerBlur}
                   autoComplete={'email'}
                   value={email}/>
            <Input style={{borderColor: '#11AEAE', textAlign: 'center', marginBottom: 32}}
                   placeholder={t('Login by phone.Password')}
                   placeholderTextColor={'#828282'}
                   onChangeText={setPassword}
                   onFocus={handlerFocusPassword}
                   onBlur={handlerBlur}
                   autoComplete={'password'}
                   value={password}/>
            <ButtonGreenOpacity activeOpacity={0.6} onPress={Register}>
                <Text16 style={{color: '#fff', textAlign: 'center', width: '80%', paddingLeft: 40}}>{t('Login by phone.Register')}</Text16>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonGreenOpacity>
        </BoxColumnView>
        </LayoutPop>
    )
}