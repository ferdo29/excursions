import * as React from 'react';
import {WrapperBottomNav} from "../../../../styles/components/tools";
import {ButtonCircle} from "../../../../styles/components/buttons";
import {IconBasket, IconHeart, IconHome, IconMan, IconStack} from "../../../../components/Icons";
import {useLinkTo, useRoute} from "@react-navigation/native";

export const BottomNav = ({}) => {
    const {name} = useRoute()
    const linkTo = useLinkTo();

    const RouterName = () => {
        switch (name){
            case 'Route' : return '#11AEAE'
            case 'MyExcursions' : return '#11AEAE'
            case 'Participants' : return '#11AEAE'
            case 'Map' : return '#11AEAE'
            default: return '#BDBDBD'
        }
    }
    const RouterAccount = () => {
        switch (name){
            case 'Account' : return '#11AEAE'
            case 'InviteFriend' : return '#11AEAE'
            case 'AboutApp' : return '#11AEAE'
            case 'TermsUse' : return '#11AEAE'
            case 'PrivacyPolicy' : return '#11AEAE'
            case 'Faq' : return '#11AEAE'
            case 'Support' : return '#11AEAE'
            default: return '#BDBDBD'
        }
    }
    const RouterHome = () => {
        switch (name){
            case 'Filters' : return '#11AEAE'
            case 'Home' : return '#11AEAE'
            case 'Countries' : return '#11AEAE'
            case 'Country' : return '#11AEAE'
            case 'City' : return '#11AEAE'
            case 'Cities' : return '#11AEAE'
            case 'Excursion' : return '#11AEAE'
            default: return '#BDBDBD'
        }
    }

    return (
        <WrapperBottomNav>
            <ButtonCircle onPress={() => linkTo(`/Home`)}>
                <IconHome fill={RouterHome()}/>
            </ButtonCircle>
            <ButtonCircle onPress={() => linkTo(`/MyExcursions`)}>
                <IconStack fill={RouterName()}/>
            </ButtonCircle>
            <ButtonCircle onPress={() => linkTo(`/Likes`)}>
                <IconHeart fill={name === 'Likes' ? '#11AEAE' :'#BDBDBD'}/>
            </ButtonCircle>
            <ButtonCircle  onPress={() => linkTo(`/Account`)}>
                <IconMan fill={RouterAccount()}/>
            </ButtonCircle>
            <ButtonCircle onPress={() => linkTo(`/Basket`)}>
                <IconBasket fill={name === 'Basket' ? '#11AEAE' :'#BDBDBD'}/>
            </ButtonCircle>
        </WrapperBottomNav>
    );
};