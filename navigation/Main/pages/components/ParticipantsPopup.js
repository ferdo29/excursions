import * as React from 'react';
import {Modal, View, TouchableOpacity, Pressable} from 'react-native'
import {Text16, Text16Bold500, Text20Bold, Text23, WrapperPopUp} from "../../../../styles/components/tools";
import {InputSearchWrapper} from "../../../../styles/components/inputs";
import {ButtonGray, ButtonGrayWrapper} from "../../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";

export const ParticipantsPopup = ({state, openClose = () => {}, func = () => {}, value }) => {

    const handlerFun = () => {
        func()
        openClose()
    }

    return (
            <Modal
                style={
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
            }
                animationType="slide"
                transparent={true}
                visible={state}
                onRequestClose={openClose} >
                <Pressable
                    onPress={openClose}
                    style={ {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <WrapperPopUp>
                    <Text20Bold style={{color: '#828282', lineHeight: 28, marginBottom: 20, textAlign: 'center', width: 257}}>Вы хотите добавить участника</Text20Bold>
                    <InputSearchWrapper
                    style={{borderColor: '#E0E0E0', borderWidth: 1, alignItems: 'center', marginBottom: 27, backgroundColor: '#F5F5FA', shadowColor: 'rgba(255,255,255,0)' }}
                    >
                        {value && <Text23 style={{
                            color: '#000',
                            lineHeight: 23,
                            textAlign: 'center',
                            width: 257
                        }}>{value}</Text23>}
                    </InputSearchWrapper>
                    <ButtonGrayWrapper style={{width: 'auto'}}>
                        <ButtonGray activeOpacity={0.6} style={{marginBottom: 28, width: '90%'}}
                                    onPress={handlerFun}>
                            <Text16Bold500
                                style={{color: '#828282', width: '65%'}}>Подтвердить</Text16Bold500>
                            <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                                <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </Svg>
                        </ButtonGray>
                    </ButtonGrayWrapper>

                    <TouchableOpacity onPress={openClose}>
                        <Text16 style={{color: '#11AEAE'}}>Отмена</Text16>
                    </TouchableOpacity>

                </WrapperPopUp>
                </Pressable>

            </Modal>
    );
};