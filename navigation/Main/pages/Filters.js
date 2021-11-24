import * as React from 'react';
import Svg, {Circle, G, Path} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import {BoxColumnView, BoxRowView, ContainerMain} from "../../../styles/components/tools";
import MainLayout from "../../../layouts/MainLayout";
import {ButtonCircle} from "../../../styles/components/buttons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useState} from "react";
import {View} from "react-native";
import {SecondBackground} from "../../../components/backgrounds/SecondBackground";

export default function Filters({}) {
    const navigation = useNavigation();
    const [arrayFilter, setArrayFilter] = useState([
        {
            title: 'Культура и история',
            check: false,
            id: 1
        },
        {
            title: 'Обзорные экскурсии',
            check: false,
            id: 2
        },
        {
            title: 'Экскурсии для семьи',
            check: false,
            id: 3
        },
        {
            title: 'Экскурсии для детей',
            check: false,
            id: 4
        },
    ]);

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

    return (
        <MainLayout backgroundColor={'#11AEAE'} itemTitle={<RItem/>} itemBack={<SecondBackground/>} >
            <ContainerMain>

                <View style={{justifyContent: 'flex-start', flexDirection: 'column', marginTop: 70, paddingLeft: 60}}>
                    {arrayFilter.map(value =>
                        <BouncyCheckbox key={value.id}
                                        size={25}
                                        style={{marginBottom: 20}}
                                        fillColor={"rgba(255,255,255)"}
                                        textStyle={{color: "#fff", fontFamily: 'Ubuntu_700Bold', fontSize: 16, textDecorationLine: "none",}}
                                        unfillColor={"rgba(255,255,255,0.5)"}
                                        text={value.title}
                                        iconStyle={{ borderColor: "#fff", color: 'red', borderRadius: 0 }}
                                        onPress={(isChecked) => {}} />
                    )}
                </View>

            </ContainerMain>
        </MainLayout>
    );
};