import * as React from 'react';
import {BoxColumnView, BoxRowView, Text16, Text26, Text28, URLText} from "../../../styles/components/tools";
import {InputNumber, WrapperInputNumber} from "../../../styles/components/inputs";
import {useContext, useRef} from "react";
import Locale from "../../../contexts/locale";
import {useDispatch, useSelector} from "react-redux";
import {changeState, clearState} from "../../../store/sms/reducer";
import {ButtonGreenOpacity, ButtonWhite, ButtonWrapper} from "../../../styles/components/buttons";
import Svg, {Circle, Path} from "react-native-svg";
import {setPhoneAccount} from "../../../store/account/reducer";

export const PopupsCheckSMS = ({openClose = () => {}}) => {
    useContext(Locale)
    const dispatch = useDispatch()
    const {data, timerView, timer, phone, zipPhone} = useSelector(state => state.SMS)
    const ref_input0 = useRef();
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const handlerState = (num, value) => {
        dispatch(changeState({num, value}))
        num === 0 && ref_input1.current.focus()
        num === 1 && ref_input2.current.focus()
        num === 2 && ref_input3.current.focus()

        if (data[0] !== '' && data[1] !== '' && data[2] !== '' && (num === 3 && value !== '')){
            if ('1234' !== data.join('') + value){
                dispatch(clearState())
                ref_input0.current.focus()
            }else{
                dispatch(clearState())
                openClose()
                dispatch(setPhoneAccount(zipPhone + phone))
            }
        }
    }

    return (
        <BoxColumnView style={{justifyContent: 'center'}}>
            <Text26 style={{paddingBottom: 28}}>Подтверждение номера</Text26>

            <Text16 style={{color: '#828282', textAlign: 'center', paddingBottom: 40}}>
                Введите 4-значный код, который мы отправили на указанный вами номер телефона +7 (913) 041-99-99
            </Text16>
            <BoxRowView style={{paddingBottom:22}}>
                <WrapperInputNumber>
                    <InputNumber
                        ref={ref_input0}
                        maxLength={1}
                        textAlign={'center'}
                        keyboardType={'number-pad'}
                        onChangeText={(data) => handlerState(0, data)}
                        returnKeyType={'next'}
                        value={data[0]}/>
                </WrapperInputNumber>
                <WrapperInputNumber>
                    <InputNumber
                        ref={ref_input1}
                        maxLength={1}
                        textAlign={'center'}
                        keyboardType={'number-pad'}
                        onChangeText={(data) => handlerState(1, data)}
                        returnKeyType={'next'}
                        value={data[1]}/>
                </WrapperInputNumber>
                <WrapperInputNumber>
                    <InputNumber
                        ref={ref_input2}
                        maxLength={1}
                        textAlign={'center'}
                        keyboardType={'number-pad'}
                        onChangeText={(data) => handlerState(2, data)}
                        returnKeyType={'next'}
                        value={data[2]}/>
                </WrapperInputNumber>
                <WrapperInputNumber>
                    <InputNumber
                        ref={ref_input3}
                        maxLength={1}
                        textAlign={'center'}
                        keyboardType={'number-pad'}
                        onChangeText={(data) => handlerState(3, data)}
                        value={data[3]}/>
                </WrapperInputNumber>
            </BoxRowView>
            {timerView ?
                <Text16 style={{color: '#828282', textAlign: 'center', paddingBottom: 40}}>
                    Отправить СМС еще раз {timer}
                </Text16>:
                <ButtonWrapper>
                    <Text16 style={{color: '#11AEAE', textAlign: 'center', paddingBottom: 40, textDecorationLine: 'underline'}}>
                        Отправить СМС еще раз
                    </Text16>
                </ButtonWrapper>
            }


        </BoxColumnView>
    );
};
export const PopupAgreement = ({handlerAgreement = () => {}, handlerConfirmation = () => {}}) => {
    return(
        <BoxColumnView style={{justifyContent: 'center'}}>
            <Text28 style={{paddingBottom: 28}}>Соглашение</Text28>

            <BoxColumnView style={{paddingBottom: 40}}>
                <Text16 style={{color: '#828282'}}>Используя приложение вы соглашаетесь</Text16>
                <URLText style={{flexDirection: 'row', paddingBottom: 5}}>
                    <Text16 style={{color: '#828282'}}>с </Text16>
                    <Text16>
                        <Text16 style={{color: '#11AEAE', textDecorationLine: 'underline'}}>Пользовательским соглашением</Text16>
                    </Text16>
                    <Text16 style={{color: '#828282'}}> и</Text16>
                </URLText>

                <URLText style={{paddingBottom: 10}}>
                    <Text16 style={{color: '#11AEAE', textDecorationLine: 'underline'}}>Политикой конфиденциальности.</Text16>
                </URLText>
            </BoxColumnView>

            <ButtonGreenOpacity activeOpacity={0.6} onPress={() => {
                handlerAgreement()
                handlerConfirmation()
            }}>
                <Text16 style={{color: '#fff', textAlign: 'center', width: '80%', paddingLeft: 40}}>Да, согласен</Text16>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonGreenOpacity>

            <ButtonWhite onPress={handlerAgreement} activeOpacity={0.6} style={{backgroundColor: '#F5F5FA', borderWidth: 0}}>
                <Text16 style={{color: '#828282', textAlign: 'center', width: '100%', paddingRight: 20}}>Нет, выйти</Text16>
            </ButtonWhite>

        </BoxColumnView>
    )
}