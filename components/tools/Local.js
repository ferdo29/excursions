import * as React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {BoxColumnView, BoxRowView, ContainerMain, MainBox, Text16} from "../../styles/components/tools";
import {SelectorsLang} from "../Selectors";
import Svg, {Circle, G} from "react-native-svg";
import {arrLang} from '../../enums'
import {ButtonLocal} from "../../styles/components/buttons";
import {useContext} from "react";
import Locale from "../../contexts/locale";
import {setItemAsync} from "expo-secure-store";
import {IconCh, IconEn, IconGM, IconOK, IconRu, IconSP} from "../Icons";

export default function Local({moveAction = () => {}}) {
    const {lang, setLang} = useContext(Locale)

    const handlerPickedData = (data) => {

        setItemAsync("KExcLanguage", data.value)
            .then(req => {
                setLang(data.value)
            })
            .catch(err => console.error(err))
    }

    return (
        <MainLayout backgroundColor={'#11AEAE'} viewBottomNav={false}>
            <ContainerMain>
                <Svg style={{position: 'absolute',top: 50, left: 0}} width="83" height="167" viewBox="0 0 83 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <G opacity="0.4">
                        <Circle opacity="0.3" cx="-0.5" cy="83.5" r="83.5" fill="white"/>
                        <Circle opacity="0.3" cx="-0.500046" cy="83.5" r="55.0578" fill="white"/>
                        <Circle cx="-0.500195" cy="83.5" r="29.7469" fill="white"/>
                    </G>
                </Svg>

                <Svg style={{position: 'absolute',top: '50%', right: 0}} width="104" height="182" viewBox="0 0 124 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity="0.3" cx="100.99" cy="100.99" r="100.99" fill="#15C0C0"/>
                    <Circle opacity="0.3" cx="100.99" cy="100.99" r="66.5901" fill="#15C0C0"/>
                    <Circle cx="100.99" cy="100.99" r="35.9776" fill="#15C0C0"/>
                </Svg>
                <BoxRowView style={{paddingBottom: 37}}>
                    <BoxColumnView style={{alignItems: 'flex-start', width:175}}/>
                    <SelectorsLang moveAction={moveAction}/>
                </BoxRowView>

                <BoxColumnView>
                    {arrLang.map(value =>
                        <ButtonLocal key={value.value} onPress={() => handlerPickedData(value)}>
                                {value.label === 'EN' && <IconEn style={{marginRight: 10, flexGrow: 1}}/>}
                                {value.label === 'RU' && <IconRu style={{marginRight: 10, flexGrow: 1}}/>}
                                {value.label === 'GM' && <IconGM style={{marginRight: 10, flexGrow: 1}}/>}
                                {value.label === 'SP' && <IconSP style={{marginRight: 10, flexGrow: 1}}/>}
                                {value.label === 'CH' && <IconCh style={{marginRight: 10, flexGrow: 1}}/>}
                                <Text16 style={{color: '#fff', flexGrow: 2}}>{value.name}</Text16>

                            {value.value === lang && <IconOK style={{position: 'absolute', right: 0}}/> }
                        </ButtonLocal>
                    )}
                </BoxColumnView>

            </ContainerMain>
        </MainLayout>
    );
};