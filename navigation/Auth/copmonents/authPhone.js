import * as React from 'react';
import {BoxRowView, Text14} from "../../../styles/components/tools";
import {SelectorsZipCountry} from "../../../components/Selectors";
import {Input, WrapperInput} from "../../../styles/components/inputs";
import {TextInputMask} from "react-native-masked-text";
import {t} from "i18n-js";
import {ButtonWhite} from "../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {useContext, useRef, useState} from "react";
import Locale from "../../../contexts/locale";
import {getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential,} from "firebase/auth";
import userFB from "../../../contexts/userFB";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {PopupsCheckSMS} from "./popups";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DARA_BASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGEING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

export const AuthPhone = ({}) => {
    useContext(Locale)
    const {setAuth} = useContext(userFB)
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);
    const [phone, setPhone] = useState('')
    const [zip, setZip] = useState('+44')
    const [confirm, setConfirm] = useState(null);
    const [pop, setPop] = useState(false);

    const verif = async () => {
        const auth = getAuth();
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            await phoneProvider.verifyPhoneNumber(zip + phone.match(/[0-9]/g).join(''), recaptchaVerifier.current);


        } catch (e) {
            console.log(e)
            setPop(true)
        }
    }
    const Login = async (code) => {
        const auth = getAuth();

        // console.log(zip + phone)
        // const appVerifier = PhoneAuthProvider.credential(
        //     verificationId,
        //     code
        // );
        const credential = PhoneAuthProvider.credential(
            verificationId,
            code
        )

        signInWithCredential(auth, credential)
            .then((result) => {
                console.error(result);
            });
        // signInWithPhoneNumber(auth, zip + phone.match(/[0-9]/g), data)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch(e => console.error(e))
    }

    return (
        <>
            <BoxRowView style={{paddingBottom: 32}}>
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

            <ButtonWhite activeOpacity={0.6} style={{marginBottom: 26}} onPress={verif}>
                <Text14 style={{color: '#11AEAE'}}>{t('Login by phone.Confirm and send the code')}</Text14>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonWhite>
            <PopupsCheckSMS
                openClose={Login}
                confirmation={pop}
                Phone={zip + phone}
                handlerConfirmation={() => setPop(!pop)}/>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />
        </>
    );
};