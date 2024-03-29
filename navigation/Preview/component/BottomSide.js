import * as React from 'react';
import {ButtonGreenOpacity, ButtonWhite} from "../../../styles/components/buttons";
import {BoxRow, Dot, Text16} from "../../../styles/components/tools";
import Svg, {Circle, Path} from "react-native-svg";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, setStatePreview} from "../../../store/previewPagination/reducer";
import * as SecureStore from "expo-secure-store";
import {t} from "i18n-js";

export const BottomSide = ({}) => {
    const dispatch = useDispatch()
    const {page, arrayPage} = useSelector(state => state.previewPagination)

    const handlerState = () => {
        page < 3 ?
            dispatch(nextPage()) :
            SecureStore.setItemAsync('KeyPreview', 'true')
                .then(() => dispatch(setStatePreview(true)))
                .catch(e => console.log(e))

    }

    return (
        <>
            <ButtonGreenOpacity activeOpacity={0.6} onPress={handlerState}>
                <Text16
                    style={{color: '#fff', textAlign: 'center', width: '80%', paddingLeft: 40}}>{t('Preview.Proceed')}</Text16>
                <Svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle opacity=".3" cx="20.5" cy="20.5" r="20.5" fill="#70CECE"/>
                    <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </Svg>
            </ButtonGreenOpacity>

            <ButtonWhite activeOpacity={0.6} style={{backgroundColor: '#F5F5FA', borderWidth: 0, height: 40}}>
                <Text16 style={{color: '#828282', textAlign: 'center', width: '100%', paddingRight: 20, lineHeight: 18}}>
                    {t('Preview.I already have an order number')}
                </Text16>
            </ButtonWhite>

            <BoxRow>
                {arrayPage.map((value, index) =>
                    <Dot key={index} style={value ? {width: 12, height: 12} : {}}/>)}
            </BoxRow>
        </>
    );
};