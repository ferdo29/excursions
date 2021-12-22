import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import Svg, {Circle, G, Path} from "react-native-svg";
import {BoxRowView, ContainerMain, Text16, Text23Bold} from "../../../../styles/components/tools";
import {ButtonCircle} from "../../../../styles/components/buttons";
import {useNavigation} from "@react-navigation/native";
import {WrapperParticipant} from "../../../../styles/components/Cards";
import {useState} from "react";
import {InputSearch, InputSearchWrapper} from "../../../../styles/components/inputs";
import {IconNext, IconSearch} from "../../../../components/Icons";
import {View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ParticipantsPopup} from "../components/ParticipantsPopup";
import {SecondBackground} from "../../../../components/backgrounds/SecondBackground";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../../../../components/Loader";
import {fetchMyExcursions, fetchMyExcursionsShareCode} from "../../../../store/myExcursions/service";
import {getAuth} from "firebase/auth";
import axios from "axios";
import {showToastState} from "../../../../store/toasts/reducer";
import {t} from "i18n-js";

export default function Participants({}) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const user = getAuth().currentUser
    const [added, setAdded] = useState('');
    const [statePop, setStatePop] = useState(false);
    const {data, isLoading, isView, error, idExcursion} = useSelector(state => state.myExcursion)

    const handlerArrUser = async () => {
        try {
            await axios.post(`${process.env.DB_HOST}/excursions/add-user`, {
                "purchased_excursion": data.id,
                "login": added
            }, {headers: {Authorization: `Bearer ${user.stsTokenManager.accessToken}`}})
            dispatch(fetchMyExcursions({
                token: user.stsTokenManager.accessToken
            }))
            navigation.goBack()
            dispatch(showToastState({ type: 'success', top: false, text1: t(`message.Success`)}))
        } catch (e) {
            dispatch(showToastState({ type: 'error', top: false, text1: t(`error.error`)}))
        }
    }
    const RItem = () => (
        <BoxRowView style={{paddingBottom: 0, justifyContent: 'flex-end'}}>
            <ButtonCircle  onPress={() => navigation.goBack()}>
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1.49756 1.49756L12.5024 12.5024" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M12.5024 1.49756L1.49756 12.5024" stroke="#11AEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>

            </ButtonCircle>
        </BoxRowView>
    )

    if (idExcursion < 0) return (
        <MainLayout backgroundColor={'#11AEAE'} itemTitle={<RItem/>} itemBack={<SecondBackground/>}>
            <Loader/>
        </MainLayout>
    )

    return (
        <MainLayout backgroundColor={'#11AEAE'} itemTitle={<RItem/>} itemBack={<SecondBackground/>} >
            <ContainerMain>

                <Text23Bold style={{color: '#fff', lineHeight: 28, marginBottom: 36}}>Участники экскурсии</Text23Bold>

                {data.users.map((value, index) =>
                    <WrapperParticipant key={index} style={index === 0 ? {borderTopWidth: 1, borderTopColor: '#70CECE'} : {}}>
                        <Text16 style={{lineHeight: 16, color: '#fff'}}>{value.email || value.phoneNumber}</Text16>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#70CECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#70CECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>

                    </WrapperParticipant>
                )}

                <Text23Bold style={{marginTop: 70, color: '#fff', lineHeight: 28, marginBottom: 36}}>Участники экскурсии</Text23Bold>

                <View style={{paddingBottom: 100}}>
                    <InputSearchWrapper style={{backgroundColor: 'rgba(255,255,255,0.21)', height: 54}}>
                        <InputSearch value={added}
                                     onChangeText={setAdded}
                                     style={{paddingLeft: 24, color: '#fff',  width: 'auto', flexGrow: 10}}
                                     placeholderTextColor={'rgba(255,255,255,0.6)'} placeholder={'login / телефон'}/>
                        <TouchableOpacity
                            disabled={added === ''}
                            onPress={() => setStatePop(!statePop)}
                            style={{flexGrow: 1, paddingTop: 5, paddingRight: 15}} >
                            <IconNext width={41} height={41} style={{}}/>
                        </TouchableOpacity>
                    </InputSearchWrapper>
                </View>


            </ContainerMain>
            <ParticipantsPopup state={statePop} openClose={() => setStatePop(!statePop)} func={handlerArrUser} value={added}/>
        </MainLayout>
    );
};