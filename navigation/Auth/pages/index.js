import * as React from 'react';
import {Dimensions, View} from "react-native";
import {
    BoxColumnView,
    BoxRowView, ContainerMain,
    Text14,
    Text16,
    Text18,
    Text33,
} from "../../../styles/components/tools";
import {Input,  WrapperInput} from "../../../styles/components/inputs";
import {ButtonWhite, ButtonWhiteOpacity} from "../../../styles/components/buttons";
import {SelectorsLang, SelectorsZipCountry} from "../../../components/Selectors";
import Svg, {Circle, Path} from "react-native-svg";
import {CirclesAb} from "../../../layouts/CirclesAb";
import Locale from "../../../contexts/locale";
import {useContext, useState} from "react";
import {t} from "i18n-js";
import {TouchableOpacity} from "react-native";
import LayoutPop from '../../../layouts/popups/LayoutPop'
import {PopupAgreement, PopupsCheckSMS} from "../copmonents/popups";
import {clearState, setEmailSMS, setPhoneSMS} from "../../../store/sms/reducer";
import {useDispatch, useSelector} from "react-redux";
import {TextInputMask} from "react-native-masked-text";
import * as SecureStore from "expo-secure-store";
import {setStatePreview} from "../../../store/previewPagination/reducer";
import {showToastState} from "../../../store/toasts/reducer";
import MainLayout from "../../../layouts/MainLayout";

const {height, width} = Dimensions.get('window')

export default function ({navigation}) {
    useContext(Locale)
    const dispatch = useDispatch()
    const {phone, email} = useSelector(state => state.SMS)
    const [stateLogin, setStateLogin] = useState('Phone')
    const [agreement, setAgreement] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const handlerStateLogin = () => {
        setStateLogin(stateLogin === 'Phone' ? 'Email' : 'Phone')
    }
    const setPhone = (data) => dispatch(setPhoneSMS(data))
    const setEmail = (data) => dispatch(setEmailSMS(data))
    const handlerAgreement = () => {

        if(!phone || (phone.match(/[0-9]/gm).length < 10)){
            dispatch(showToastState({
                type: 'error',
                text1: t('error.Enter your phone number'),
            }))
            return
        }
        setAgreement(!agreement)
    }
    const handlerConfirmation = () => {
        setConfirmation(!confirmation)
        dispatch(clearState())
    }
    const handlerRemove = () => {
        SecureStore.deleteItemAsync('KeyPreview').then(() => {
            dispatch(setStatePreview(false))
        })
    }


    return (
        <MainLayout backgroundColor={'#11AEAE'} viewBottomNav={false} itemBack={<CirclesAb/>}>
            <ContainerMain>

            <BoxRowView style={{paddingBottom: 37}}>
                <BoxColumnView style={{alignItems: 'flex-start'}}>
                    <Text18 style={{color: '#fff', width:175}}>{t("Login by phone.Have an order number?")}</Text18>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Text14 style={{color: '#fff', textDecorationLine: 'underline'}}>{t("Login by phone.Enter here")}</Text14>
                    </TouchableOpacity>

                </BoxColumnView>

                <SelectorsLang  moveAction={() => navigation.navigate('Language')}/>
            </BoxRowView>

            <BoxColumnView style={{alignItems: 'flex-start', paddingBottom: 20}}>
                <Text33 style={{color: '#fff'}}>{
                   !confirmation ? t("Login by phone.And so, let's go") : t("Login by phone.We are always glad to see you")
                }</Text33>
                <Text16 style={{color: '#fff', paddingTop: 16, paddingBottom: confirmation ? 120 : 0}}>{
                  !confirmation ? t("Login by phone.Enter your phone number and we will send you a login code")
                  : t("Login by phone.Sign in to save your favorite excursions and see your purchases in your personal account")
                }</Text16>
            </BoxColumnView>

            {!confirmation && <>
                {stateLogin === 'Phone' && <BoxRowView style={{paddingBottom: 32}}>
                    <SelectorsZipCountry/>
                    <WrapperInput style={{borderColor: '#fff', flexGrow: 2, marginLeft: 13}}>
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
                </BoxRowView>}
                {stateLogin === 'Email' && <Input style={{borderColor: '#fff', textAlign: 'center', marginBottom: 32}}
                                                  placeholder={t('Login by phone.Your email')}
                                                  placeholderTextColor={'#828282'}
                                                  onChangeText={setEmail}
                                                  autoComplete={'email'}
                                                  value={email}/>}

                <ButtonWhite activeOpacity={0.6} style={{marginBottom: 26}} onPress={handlerAgreement}>
                    <Text14 style={{color: '#11AEAE'}}>{t('Login by phone.Confirm and send the code')}</Text14>
                    <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                        <Path d="M13 21h14M20 14l7 7-7 7" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </Svg>
                </ButtonWhite>
            </>}


            <BoxRowView style={{marginBottom: 26}}>
                <View style={{height:1, minWidth: '40%', backgroundColor: '#fff'}}/>
                <Text16 style={{color: '#fff'}}>{t('Login by phone.or')}</Text16>
                <View style={{height:1, minWidth: '40%', backgroundColor: '#fff'}}/>
            </BoxRowView>


            {stateLogin === 'Email' && <ButtonWhiteOpacity onPress={handlerStateLogin} activeOpacity={0.6}>
                <Svg style={{marginRight: 48}} width="16" height="28" viewBox="0 0 16 28" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M13.3334 2.26663V1.19997C13.3334 0.91707 13.2211 0.645759 13.021 0.44572C12.821 0.245681 12.5497 0.133301 12.2668 0.133301C11.9839 0.133301 11.7126 0.245681 11.5125 0.44572C11.3125 0.645759 11.2001 0.91707 11.2001 1.19997V2.26663H2.66678C2.10099 2.26663 1.55836 2.4914 1.15829 2.89147C0.758209 3.29155 0.533447 3.83417 0.533447 4.39997V25.7333C0.533447 26.2991 0.758209 26.8417 1.15829 27.2418C1.55836 27.6419 2.10099 27.8666 2.66678 27.8666H13.3334C13.8992 27.8666 14.4419 27.6419 14.8419 27.2418C15.242 26.8417 15.4668 26.2991 15.4668 25.7333V4.39997C15.4668 3.83417 15.242 3.29155 14.8419 2.89147C14.4419 2.4914 13.8992 2.26663 13.3334 2.26663ZM4.80011 25.7333H2.66678V23.6H4.80011V25.7333ZM4.80011 21.4666H2.66678V19.3333H4.80011V21.4666ZM4.80011 17.2H2.66678V15.0666H4.80011V17.2ZM9.06678 25.7333H6.93345V23.6H9.06678V25.7333ZM9.06678 21.4666H6.93345V19.3333H9.06678V21.4666ZM9.06678 17.2H6.93345V15.0666H9.06678V17.2ZM13.3334 25.7333H11.2001V23.6H13.3334V25.7333ZM13.3334 21.4666H11.2001V19.3333H13.3334V21.4666ZM13.3334 17.2H11.2001V15.0666H13.3334V17.2ZM13.3334 11.8666C13.3334 12.1495 13.2211 12.4208 13.021 12.6209C12.821 12.8209 12.5497 12.9333 12.2668 12.9333H3.73345C3.45055 12.9333 3.17924 12.8209 2.9792 12.6209C2.77916 12.4208 2.66678 12.1495 2.66678 11.8666V5.46663C2.66678 5.18374 2.77916 4.91243 2.9792 4.71239C3.17924 4.51235 3.45055 4.39997 3.73345 4.39997H12.2668C12.5497 4.39997 12.821 4.51235 13.021 4.71239C13.2211 4.91243 13.3334 5.18374 13.3334 5.46663V11.8666Z"
                        fill="#3E5063"/>
                </Svg>
                <Text14
                    style={{color: '#fff'}}>{t('Login by phone.Continue through')} {t('Login by phone.Phone')}</Text14>
            </ButtonWhiteOpacity>}
            {stateLogin === 'Phone' && <ButtonWhiteOpacity onPress={handlerStateLogin} activeOpacity={0.6}>
                <Svg style={{marginRight: 48}} width="24" height="24" viewBox={'0 -3 24 24'} fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M19.917 14.035v1.133a.568.568 0 0 1-.567.567H.65a.568.568 0 0 1-.567-.567v-1.133c0 .312.255.567.567.567h18.7a.568.568 0 0 0 .567-.567ZM19.492.364l-6.475 6.474-.34.34-.467.468-.043.042-.934.935c-.68.68-1.786.68-2.466 0l-.935-.935-.042-.042-.468-.468-.34-.34L.508.364A.437.437 0 0 1 .65.35h18.7c.042 0 .1 0 .142.014Z"
                        fill="#3E5063"/>
                    <Path
                        d="M19.917 1.072v13.105a.568.568 0 0 1-.567.566H.65a.568.568 0 0 1-.567-.566V1.072l.425.425 5.908 5.908.24.24-5.624 5.625a.432.432 0 0 0 .297.737.408.408 0 0 0 .298-.128l5.625-5.624.935.935c.495.496 1.147.75 1.799.75.651 0 1.303-.24 1.799-.75l.935-.935 5.624 5.624a.408.408 0 0 0 .595 0c.17-.17.17-.439 0-.609l-5.624-5.624.24-.241 5.937-5.908.425-.425Z"
                        fill="#4B687F"/>
                </Svg>
                <Text14 style={{color: '#fff'}}>{t('Login by phone.Continue through')} Email</Text14>
            </ButtonWhiteOpacity>}
            <ButtonWhiteOpacity activeOpacity={0.6}>
                <Svg style={{marginRight: 48}} width="24" height="24" viewBox={'0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1.988 6.84A11.262 11.262 0 0 1 5.034 2.98C6.788 1.533 8.798.661 11.054.394 13.701.08 16.19.58 18.491 1.959a13.13 13.13 0 0 1 1.617 1.154c.127.103.113.164.005.267-1.045 1.04-2.09 2.08-3.127 3.13-.121.123-.187.113-.318.015-3.038-2.34-7.467-1.706-9.731 1.388A6.833 6.833 0 0 0 5.99 9.68c-.02.056-.057.108-.085.164-.604-.46-1.214-.919-1.814-1.383-.703-.54-1.406-1.078-2.104-1.622Z"
                          fill="#E94335"/>
                    <Path d="M5.906 14.24c.202.446.37.91.624 1.327 1.064 1.744 2.582 2.864 4.584 3.263 1.805.36 3.539.117 5.156-.788.056-.028.113-.056.164-.084.028.028.052.06.08.084l3.633 2.813c-.581.576-1.242 1.04-1.946 1.444-2.039 1.162-4.247 1.63-6.572 1.453-2.896-.225-5.395-1.37-7.457-3.432-.905-.904-1.65-1.926-2.19-3.093.502-.385 1.004-.765 1.505-1.149.807-.614 1.613-1.223 2.42-1.837Z"
                          fill="#34A853"/>
                    <Path d="M20.151 20.855c-1.209-.938-2.423-1.875-3.632-2.813a.685.685 0 0 1-.08-.084c.417-.324.844-.638 1.186-1.05a5.452 5.452 0 0 0 1.148-2.325c.024-.108.005-.146-.103-.14-.056.004-.108 0-.164 0-1.912 0-3.83-.005-5.742.004-.211 0-.258-.056-.253-.258.01-1.36.01-2.719 0-4.078 0-.173.047-.22.22-.22 3.506.004 7.013.004 10.524 0 .15 0 .21.037.248.197.286 1.289.267 2.582.094 3.885a12.703 12.703 0 0 1-.783 3.024 10.754 10.754 0 0 1-2.54 3.773c-.043.033-.085.057-.123.085Z"
                          fill="#4285F3"/>
                    <Path d="M5.906 14.24c-.806.615-1.612 1.224-2.419 1.838-.501.38-1.003.764-1.504 1.149-.39-.722-.643-1.486-.849-2.274C.74 13.43.68 11.883.895 10.331c.169-1.218.52-2.39 1.088-3.487.703.539 1.401 1.083 2.104 1.622.605.464 1.21.923 1.814 1.382-.103.502-.248.994-.295 1.51a7.274 7.274 0 0 0 .272 2.751c.019.038.023.085.028.132Z"
                          fill="#FABB06"/>
                </Svg>
                <Text14 style={{color: '#fff'}}>{t('Login by phone.Continue with')} Google</Text14>
            </ButtonWhiteOpacity>
            <ButtonWhiteOpacity onPress={handlerRemove} activeOpacity={0.6}>
                <Svg style={{marginRight: 48}} width="24" height="24" viewBox={'0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 23.636c6.427 0 11.636-5.21 11.636-11.636C23.636 5.573 18.426.364 12 .364 5.573.364.364 5.574.364 12c0 6.427 5.21 11.636 11.636 11.636Z"
                          fill="#3F65A6"/>
                    <Path d="M10.232 8.173v1.836H8.886v2.246h1.346v6.154h2.763V12.25h1.855s.173-1.077.259-2.255h-2.1V8.46c0-.227.3-.536.6-.536h1.505V5.586h-2.046c-2.904.005-2.836 2.25-2.836 2.587Z"
                          fill="#fff"/>
                </Svg>
                <Text14 style={{color: '#fff'}}>{t('Login by phone.Continue with')} Facebook</Text14>
            </ButtonWhiteOpacity>


            <LayoutPop state={agreement} openClose={handlerAgreement} start={height * 0.43} mountainTop={true} reSizeOnSwipe={false}>
                <PopupAgreement handlerAgreement={handlerAgreement}
                                handlerConfirmation={handlerConfirmation}/>
            </LayoutPop>

            <PopupsCheckSMS openClose={handlerConfirmation} confirmation={confirmation} handlerConfirmation={handlerConfirmation}/>

        </ContainerMain>
        </MainLayout>
    );
};