import * as React from 'react';
import {BoxRowView, Text14} from "../../../styles/components/tools";
import {SelectorsZipCountry} from "../../../components/Selectors";
import {WrapperInput} from "../../../styles/components/inputs";
import {TextInputMask} from "react-native-masked-text";
import {t} from "i18n-js";
import {ButtonWhite} from "../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {useContext, useRef, useState} from "react";
import Locale from "../../../contexts/locale";
import {getAuth, signInWithPhoneNumber} from "firebase/auth";
import userFB from "../../../contexts/userFB";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {PopupsCheckSMS} from "./popups";
import { firebaseApp } from "../../../firebase"
import {Dimensions} from "react-native";

const {height, width} = Dimensions.get('window')


export const AuthPhone = ({}) => {
    useContext(Locale)
    const {setAuth} = useContext(userFB)
    const recaptchaVerifier = useRef(null);
    const [phone, setPhone] = useState('')
    const [zip, setZip] = useState('+44')
    const [pop, setPop] = useState(false);
    const [confirmSMSCode, setConfirmSMSCode] = useState();


    const handleConfirmSMSCode = async (code) => {
        try {
            await confirmSMSCode.confirm(code);
            setAuth()
            setPop(false)
        } catch (e) {
            console.error(e);
        }
    };
    const Login = async () => {
        const auth = getAuth();

        signInWithPhoneNumber(auth, zip+ phone.match(/[0-9]/g).join(''), recaptchaVerifier.current)
            .then((res) => {
                handleConfirmSMSCode(res)
                setConfirmSMSCode(res)
                setPop(true)
            })
            .catch(e => console.error(e, 123))
    }

    return (
        <>
            <BoxRowView style={{paddingBottom: 32, alignItems: 'center', width:  width >= 428 ? 375 : '100%'}}>
                <SelectorsZipCountry callBack={setZip}/>
                <WrapperInput  disabled={true} style={{borderColor: '#fff', flexGrow: 2, marginLeft: 13}}>
                    <TextInputMask
                        style={[{width: '100%', fontSize: 18, textAlign: 'center', color: '#828282'}]}
                        type={'custom'}
                        keyboardType="numeric"
                        options={{mask: '(999) 999-99-99'}}
                        placeholderTextColor={'#828282'}
                        placeholder={'(999) 999-99-99'}
                        onChangeText={setPhone}
                        value={phone}
                    />
                </WrapperInput>
            </BoxRowView>

            <ButtonWhite activeOpacity={0.6} style={{marginBottom: 26, width:  width >= 428 ? 375 : '100%'}} onPress={Login}>
                <Text14 style={{color: '#11AEAE',  width: '80%'}}>{t('Login by phone.Confirm and send the code')}</Text14>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonWhite>
            <PopupsCheckSMS
                openClose={handleConfirmSMSCode}
                confirmation={pop}
                Phone={zip + phone}
                handlerConfirmation={() => setPop(!pop)}/>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseApp.options}
                // attemptInvisibleVerification={true}
            />
        </>
    );
};