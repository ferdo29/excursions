import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {
    BoxColumnView,
    BoxRowView,
    ContainerMain, Text12, Text12Underline,
    Text16, Text16Bold500, Text30Bold, Text47Bold
} from "../../../../styles/components/tools";
import {Animated, Dimensions, Image, Platform, Pressable, Share} from "react-native";
import {IconBC, IconExclamations} from "../../../../components/Icons";
import {ButtonGray, ButtonGrayWrapper2} from "../../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {useLinkTo} from "@react-navigation/native";
import {MoreDetail} from "../components/MoreDetail";
import {t} from "i18n-js";
import axios from "axios";
import {useContext} from "react";
import UserFB from "../../../../contexts/userFB";

const {height, width} = Dimensions.get('window')

const topModel = () =>{
    if (height  < 562) return 50
    return 332
}
export default function InviteFriend({}) {
    const {user} = useContext(UserFB)
    const {ButtonMoreData, ViewMoreData} = MoreDetail({right:40, top:topModel()})
    const linkTo = useLinkTo();
    const onShare = async () => {
        try {
            const {data: message} = await axios.get(`${process.env.DB_HOST}/referral`, {headers: {Authorization: `Bearer ${user.accessToken}`}})

            const result = await Share.share({message});
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MainLayout animation={0} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 60, position: 'relative'}}>

                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', position: 'relative'}}>
                    <IconBC style={{position: 'absolute', top: -60}}/>
                    <Image source={require('../../../../assets/image/Traveller.png')}/>
                </BoxRowView>

                <BoxColumnView style={{paddingBottom: 33}}>
                    <Text16 style={{width: 257, color: '#4F4F4F', textAlign: 'center', lineHeight: 26}}>
                        {t('InviteFriend.We give you an additional discount for participating in the Invite a friend program')}
                    </Text16>
                    <BoxRowView style={{justifyContent: 'center', alignItems: 'flex-end', paddingTop: 20, marginBottom: 15, position: 'relative'}}>
                        <Text47Bold >- 10</Text47Bold>
                        <Text30Bold style={{color: '#11AEAE', paddingBottom: 4}}>% {t('InviteFriend.discount')}</Text30Bold>
                        {/*<ButtonMoreData/>*/}
                    </BoxRowView>
                    <ButtonGrayWrapper2 style={{width: 'auto'}}>
                        <ButtonGray activeOpacity={0.6} style={{marginBottom: 28, width: '100%'}}
                                    onPress={onShare}>
                            <Text16Bold500 style={{color: '#828282', textAlign: 'center', width: '80%'}}>{t('InviteFriend.Share link')}</Text16Bold500>
                            <Svg width="41" height="41" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                                <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </Svg>
                        </ButtonGray>
                    </ButtonGrayWrapper2>
                </BoxColumnView>



                <BoxColumnView style={{paddingBottom: 30}}>
                    <Text12 style={{color: '#4F4F4F'}}>{t('InviteFriend.Read the program rules')} </Text12>
                    <BoxRowView style={{justifyContent: 'center'}}>
                        <Text12 style={{color: '#4F4F4F'}}>{t('InviteFriend.Invite a friend')}</Text12>
                        <Pressable onPress={() => linkTo(`/Faq`)}>
                            <Text12Underline style={{color: '#11AEAE', paddingTop: 3}}>{t('InviteFriend.here')}</Text12Underline>
                        </Pressable>

                    </BoxRowView>

                </BoxColumnView>
                {/*<ViewMoreData/>*/}
            </ContainerMain>

        </MainLayout>
    );
};