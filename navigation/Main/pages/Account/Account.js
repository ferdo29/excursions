import * as React from 'react';
import {ContainerMain, Text14, Text16, Text16Bold500, Text23} from "../../../../styles/components/tools";
import MainLayout from "../../../../layouts/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import {Dimensions, View} from "react-native";
import {WrapperParticipantButton} from "../../../../styles/components/Cards";
import {ButtonGray, ButtonGrayWrapper} from "../../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {IconAlertCircle, IconFile, IconHelp, IconSettings, IconUserPlus} from "../../../../components/Icons";
import useValidDataUser from "../../../../hooks/useValidDataUser";
import {useLinkTo} from "@react-navigation/native";
import {AccountBackground} from "../../../../components/backgrounds/AccountBackground";
import {useContext} from "react";
import userFB from "../../../../contexts/userFB";
import {getAuth} from "firebase/auth";
import {t} from "i18n-js";
import * as SecureStore from "expo-secure-store";
const {height} = Dimensions.get('window')

export default function Account({}) {
    const {logout} = useContext(userFB)
    const user = getAuth()
    const linkTo = useLinkTo();
    const dispatch = useDispatch()
    const {phoneFormat} = useValidDataUser()
    const handlerLogout = async () => {
        try{
            logout()
            await SecureStore.deleteItemAsync('KeyUser')
            await user.signOut()
        }catch (e) {
        }

    }
    return (
        <MainLayout animation={0}
                    itemBack={<AccountBackground/>}
                    itemTitle={
                        <View>
                            <Text23 style={{color: '#4f4f4f', textAlign: 'center', paddingBottom: 10}}>{t('Account.We are happy to see you!')}</Text23>
                            <Text14 style={{color: '#828282', textAlign: 'center'}}>{
                                user.currentUser.providerData[0].displayName ||
                                user.currentUser.providerData[0].phoneNumber ||
                                user.currentUser.providerData[0].email
                            }</Text14>
                        </View>}
        >


            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>

                <WrapperParticipantButton onPress={() => linkTo(`/InviteFriend`)}
                    style={{borderBottomColor: '#E0E0E0'}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.Invite a friend')}
                        <Text16 style={{lineHeight: 16, color: '#11AEAE'}}> {t('Account.and get a discount')}</Text16></Text16>
                    <IconUserPlus/>
                </WrapperParticipantButton>
                <WrapperParticipantButton onPress={() => linkTo(`/AboutApp`)}
                    style={{borderBottomColor: '#E0E0E0'}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.About the app')}</Text16>
                    <IconAlertCircle/>
                </WrapperParticipantButton>
                <WrapperParticipantButton onPress={() => linkTo(`/TermsUse`)}
                    style={{borderBottomColor: '#E0E0E0'}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.Terms of use')}</Text16>
                    <IconFile/>
                </WrapperParticipantButton>
                <WrapperParticipantButton onPress={() => linkTo(`/PrivacyPolicy`)}
                    style={{borderBottomColor: '#E0E0E0'}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.Privacy Policy')}</Text16>
                    <IconFile/>
                </WrapperParticipantButton>
                <WrapperParticipantButton onPress={() => linkTo(`/Faq`)}
                    style={{borderBottomColor: '#E0E0E0'}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.Questions and Answers')}</Text16>
                    <IconHelp/>
                </WrapperParticipantButton>
                <WrapperParticipantButton onPress={() => linkTo(`/Support`)}
                    style={{borderBottomColor: 'rgba(224,224,224,0)', marginBottom: 100}}>
                    <Text16 style={{lineHeight: 16, color: '#828282'}}>{t('Account.Contact technical support')}</Text16>
                    <IconSettings/>
                </WrapperParticipantButton>

                <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray activeOpacity={0.6} style={{marginBottom: 28, width: '100%'}}
                                onPress={handlerLogout}>
                        <Text16Bold500
                            style={{color: '#828282', width: 'auto'}}>{t('Account.Log off')}</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>

            </ContainerMain>
            {height < 700 && <View style={{height: 100, width: '100%'}}/>}
        </MainLayout>
    );
};