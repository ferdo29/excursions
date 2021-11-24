import * as React from 'react';
import MainLayout from "../../../../layouts/MainLayout";
import {
    BoxColumnView,
    BoxRowView,
    ContainerMain, Text12, Text12Underline,
    Text14,
    Text16, Text16Bold500, Text30Bold,
    Text47,
    Text47Bold
} from "../../../../styles/components/tools";
import {Image, Pressable} from "react-native";
import {IconBC, IconExclamations} from "../../../../components/Icons";
import {ButtonGray, ButtonGrayWrapper, ButtonGrayWrapper2} from "../../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {useLinkTo} from "@react-navigation/native";
import {MoreDetail} from "../components/MoreDetail";

export default function InviteFriend({}) {
    const linkTo = useLinkTo();
    return (
        <MainLayout animation={0} viewBack={true}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 60}}>

                <BoxRowView style={{width: 'auto', justifyContent: 'center', alignItems: 'flex-end', position: 'relative'}}>
                    <IconBC style={{position: 'absolute', top: -60}}/>
                    <Image source={require('../../../../assets/image/Traveller.png')}/>
                </BoxRowView>

                <BoxColumnView style={{paddingBottom: 33}}>
                    <Text16 style={{width: 257, color: '#4F4F4F', textAlign: 'center', lineHeight: 26}}>
                        Дарим вам дополнительную скидку за участие в программе «Пригласи друга»
                    </Text16>
                    <BoxRowView style={{justifyContent: 'center', alignItems: 'flex-end', paddingTop: 20, position: 'relative'}}>
                        <Text47Bold>- 10</Text47Bold>
                        <Text30Bold style={{color: '#11AEAE', paddingBottom: 4}}>% скидка</Text30Bold>
                        <MoreDetail right={10} top={50}/>
                    </BoxRowView>
                    <ButtonGrayWrapper2 style={{width: 'auto'}}>
                        <ButtonGray activeOpacity={0.6} style={{marginBottom: 28, width: '100%'}}
                                    onPress={() => {}}>
                            <Text16Bold500 style={{color: '#828282', width: 'auto', paddingRight: 20}}>Поделиться ссылкой</Text16Bold500>
                            <Svg width="41" height="41" style={{right: 20}} fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                                <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </Svg>
                        </ButtonGray>
                    </ButtonGrayWrapper2>
                </BoxColumnView>



                <BoxColumnView>
                    <Text12 style={{color: '#4F4F4F'}}>Ознакомьтесь с правилами программы </Text12>
                    <BoxRowView style={{justifyContent: 'center'}}>
                        <Text12 style={{color: '#4F4F4F'}}>«Пригласи друга» </Text12>
                        <Pressable onPress={() => linkTo(`/Faq`)}>
                            <Text12Underline style={{color: '#11AEAE', paddingTop: 3}}>здесь</Text12Underline>
                        </Pressable>

                    </BoxRowView>

                </BoxColumnView>

            </ContainerMain>

        </MainLayout>
    );
};