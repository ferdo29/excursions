import * as React from 'react';
import {IconRu, IconCh, IconEn, IconGM, IconSP} from "./Icons";
import {Picker} from "react-native-woodpicker";
import Svg, {Path} from "react-native-svg";
import {WrapperLanguage} from "../styles/components/inputs";
import {Text16, Text18} from "../styles/components/tools";
import {useContext, useMemo} from "react";
import Locale from "../contexts/locale";
import {t} from "i18n-js";
import {useDispatch} from "react-redux";
import {setZipPhoneSMS} from "../store/sms/reducer";



export const SelectorsLang = ({moveAction = () => {}}) => {
    const {lang} = useContext(Locale)


    return (
        <WrapperLanguage style={{position: 'relative'}} onPress={moveAction}>
            {lang === 'EN' && <IconEn style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {lang === 'RU' && <IconRu style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {lang === 'GM' && <IconGM style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {lang === 'SP' && <IconSP style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {lang === 'CH' && <IconCh style={{position: 'absolute', left: 22, zIndex: -1}}/>}

            <Text16 style={{color: '#fff', textAlign: 'center'}}>{lang || 'EN'}</Text16>

            <Svg style={{position: 'absolute', right: 22, zIndex: -1}} width="11" height="6" viewBox={'0 0 11 6'} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="m10.5.5-5 5-5-5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>

        </WrapperLanguage>
    );
};
export const SelectorsZipCountry = ({callBack = () => {}}) => {
    useContext(Locale)
    const dispatch = useDispatch()
    const [pickedData, setPickedData] = React.useState({ label: '+44', value: 'EN' });
    const arrLang = [
        { label: '+44', value: 'EN'},
        { label: '+7',  value: 'RU' },
        { label: '+49', value: 'GM' },
        { label: '+34', value: 'SP' },
        { label: '+86', value: 'CH' },
    ]
    const handlerPickedData = (data) => {
        callBack(data.label)
        setPickedData(data)
    }
    useMemo(() => {
        dispatch(setZipPhoneSMS(pickedData.label))
    }, [pickedData])

    return (
        <WrapperLanguage style={{position: 'relative', borderColor: '#fff'}}>
            <Text18 style={{position: 'absolute', left: 21, zIndex: -1, color: '#fff'}}>{pickedData.value}</Text18>
            <Picker
                item={pickedData}
                items={arrLang}
                onItemChange={handlerPickedData}
                title={t("Login by phone.Number selection")}
                textInputStyle={{color: '#fff', textAlign: 'center', fontSize: 18, fontFamily: "Ubuntu_400Regular"}}
                isNullable={false} style={{width: 119, marginLeft: 14}}
            />

            <Svg style={{position: 'absolute', right: 16, zIndex: -1}} width="14" height="8" viewBox={'0 0 14 8'} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M6.941 8 13.818.5H.064L6.94 8Z" fill="#fff"/>
            </Svg>

        </WrapperLanguage>
    );
};