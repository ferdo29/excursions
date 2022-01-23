import * as React from 'react';
import {ButtonGray, ButtonGrayWrapper} from "../../../../styles/components/buttons";
import {useState} from "react";
import {t} from "i18n-js";
import {CardField, useConfirmPayment} from "@stripe/stripe-react-native";
import {Input} from "../../../../styles/components/inputs";
import {Dimensions} from "react-native";
import LayoutPop from "../../../../layouts/popups/LayoutPop";
import {Text16Bold500} from "../../../../styles/components/tools";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "firebase/auth";
import {fetchCart} from "../../../../store/cart/service";
import {showToastState} from "../../../../store/toasts/reducer";
import {fetchMyExcursions} from "../../../../store/myExcursions/service";

const {height, width} = Dimensions.get('window')
const styleCard = {
    fontFamily: "Ubuntu_400Regular",
    fontWeight: 500,
    width: '100%',
    height: 54,
    background: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#0CA4A4',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 16,
    textColor: '#828282',
    color: '#828282',
}

export const StripePay = ({state = false, openClose = () => {}}) => {
    const user = getAuth().currentUser
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [cardDetails, setCardDetails] = useState();
    const [Height, setHeight] = useState(height * 0.50);
    const {confirmPayment, loading} = useConfirmPayment()
    const {data: cart, error} = useSelector(state => state.cart);

    const fetchPaymentIntentClientSecret = async () => {

        const response = await fetch(`${process.env.DB_HOST}/cart/pay-url/stripe`, {
            method: "POST",
            body: {
                cart
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.stsTokenManager.accessToken}`
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        if (!cardDetails?.complete || !email) {
            alert("Please enter Complete card details and Email");
            dispatch(showToastState({type: 'error', text1: t('All.Paid up')}))
            return;
        }
        const billingDetails = {
            email: email,
        };
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            if (error) {
                dispatch(showToastState({type: 'error', text1: t('error.error')}))
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    dispatch(showToastState({type: 'error', text1: t('error.error')}))
                } else if (paymentIntent) {
                    dispatch(fetchCart({token: user.stsTokenManager.accessToken}))
                    dispatch(fetchMyExcursions({token: user.stsTokenManager.accessToken}))
                    dispatch(showToastState({type: 'success', text1: t('success.Paid up'),}))
                }
            }
        } catch (e) {
            dispatch(showToastState({type: 'error', text1: t('error.error')}))
        }
        //3.Confirm the payment with the card details
    };

    const handlerFocus = () => setHeight(height * 0.2)
    const handlerBlur = () => setHeight(height * 0.5)
    const handlerClose = () => {
        openClose()
        setHeight(height * 0.5)
    }

    return (
        <LayoutPop state={state} openClose={handlerClose} start={Height} responseSize={false}>

        <ButtonGrayWrapper style={{width: 'auto', paddingTop: 20}}>
            <Input style={{color: '#828282', textAlign: 'center', marginBottom: 15}}
                   placeholder={t('Login by phone.Your email')}
                   placeholderTextColor={'#828282'}
                   onChangeText={setEmail}
                   onFocus={handlerFocus}
                   onBlur={handlerBlur}
                   autoComplete={'password'}
                   value={email}/>
            <CardField
                onFocus={handlerFocus}
                onBlur={handlerBlur}
                onCardChange={setCardDetails}
                style={[styleCard, {textColor: '#828282'}]} cardStyle={styleCard}
                postalCodeEnabled={true}
                placeholder={'0000 0000 0000 0000'}
            />
            <ButtonGray
                onPress={handlePayPress} disabled={loading}
                activeOpacity={0.6} style={{marginBottom: 40, width: '100%', backgroundColor:'#11AEAE'}}>
                <Text16Bold500 style={{color: '#fff'}}>{t('All.Pay')}</Text16Bold500>
            </ButtonGray>

        </ButtonGrayWrapper>
        </LayoutPop>
    );
};