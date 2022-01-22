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
import { firebaseApp } from "../../../firebase"
import {checkActionCode} from "firebase/auth";


export const AuthPhone = ({}) => {
    useContext(Locale)
    const {setAuth} = useContext(userFB)
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);
    const [phone, setPhone] = useState('')
    const [zip, setZip] = useState('+44')
    const [pop, setPop] = useState(false);

    const verif = async () => {
        const auth = getAuth();
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(zip+ phone.match(/[0-9]/g).join(''),
                recaptchaVerifier.current);
            setVerificationId(verificationId);
            setPop(true)
        } catch (e) {
            setPop(false)
        }
    }
    const Login = async (code) => {
        const auth = getAuth();

        // console.log(zip + phone)
        // const appVerifier = PhoneAuthProvider.credential(
        //     verificationId,
        //     code
        // );
        // const credential = PhoneAuthProvider.credential(
        //     verificationId,
        //     code
        // )
        //
        // signInWithCredential(auth, credential)
        //     .then((result) => {
        //         console.error(result);
        //     });
        try {
            const sdf = await checkActionCode(recaptchaVerifier.current, code)
            console.log(sdf)
        }catch (e) {
            console.log(e)
        }

        // signInWithPhoneNumber(auth, zip + phone.match(/[0-9]/g), recaptchaVerifier.current)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch(e => console.error(e, 123))
    //     console.log(recaptchaVerifier.current)
    //     signInWithPhoneNumber(auth, zip + phone.match(/[0-9]/g), recaptchaVerifier.current)
    // .then(r => {
    //         console.log("Hej!")
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    }
    return (
        <>
            <BoxRowView style={{paddingBottom: 32, alignItems: 'center', width: 375}}>
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

            <ButtonWhite activeOpacity={0.6} style={{marginBottom: 26, width: 375}} onPress={verif}>
                <Text14 style={{color: '#11AEAE', marginLeft: 40}}>{t('Login by phone.Confirm and send the code')}</Text14>
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
                firebaseConfig={firebaseApp.options}
                attemptInvisibleVerification={true}
            />
        </>
    );
};