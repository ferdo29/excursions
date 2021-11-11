import * as React from 'react';
import {IconRu, IconCh, IconEn, IconGM, IconSP} from "./Icons";
import {Picker} from "react-native-woodpicker";
import Svg, {Path} from "react-native-svg";
import {WrapperLanguage} from "../styles/components/inputs";
import {Text18} from "../styles/components/tools";
import {useContext} from "react";
import Locale from "../contexts/locale";
import {t} from "i18n-js";
import {setItemAsync} from "expo-secure-store";



export const SelectorsLang = ({callBack = () => {}}) => {
    const {lang, setLang} = useContext(Locale)

    const [pickedData, setPickedData] = React.useState({ label: lang, value: lang });
    const arrLang = [
        { label: 'EN', value: 'EN'},
        { label: 'RU', value: 'RU' },
        { label: 'GM', value: 'GM' },
        { label: 'SP', value: 'SP' },
        { label: 'CH', value: 'CH' },
    ]
    const handlerPickedData = (data) => {

        setItemAsync("KExcLanguage", data.value)
            .then(req => {
                setLang(data.value)
                callBack(data.value)
                setPickedData(data)
            })
            .catch(err => console.error(err))
    }

    return (
        <WrapperLanguage style={{position: 'relative'}}>
            {pickedData.label === 'EN' && <IconEn style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {pickedData.label === 'RU' && <IconRu style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {pickedData.label === 'GM' && <IconGM style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {pickedData.label === 'SP' && <IconSP style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            {pickedData.label === 'CH' && <IconCh style={{position: 'absolute', left: 22, zIndex: -1}}/>}
            <Picker
                item={pickedData}
                items={arrLang}
                onItemChange={handlerPickedData}
                title={t("Login by phone.Language selection")}
                textInputStyle={{color: '#fff', textAlign: 'center', fontSize: 15, fontFamily: "Ubuntu_400Regular"}}
                isNullable={false} style={{width: 119, marginLeft: 10}}
            />

            <Svg style={{position: 'absolute', right: 22, zIndex: -1}} width="11" height="6" viewBox={'0 0 11 6'} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="m10.5.5-5 5-5-5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>

        </WrapperLanguage>
    );
};
export const SelectorsZipCountry = ({callBack = () => {}}) => {
    useContext(Locale)

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