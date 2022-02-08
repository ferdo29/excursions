import * as React from 'react';
import {CardBasketImage} from "../../../../styles/components/Cards";
import {BoxColumnView, BoxRowPressable, Text10, Text16} from "../../../../styles/components/tools";
import moment from 'moment'
import 'moment/locale/ru'
import {useLinkTo} from "@react-navigation/native";
import {validImg} from "../../../../middleware/middlewares";
import {t} from "i18n-js";
import {useContext} from "react";
import Locale from "../../../../contexts/locale";
import {myExcursionLinks} from "../../../../store/myExcursion/reducer";
import {useDispatch} from "react-redux";
import {Dimensions, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const {width} = Dimensions.get('window')

export const ItemExcursion = ({name, excursion_id, id, created_at, expires_at, expired, ...props}) => {
    const dispatch = useDispatch()
    useContext(Locale)
    const linkTo = useLinkTo();
    const Link = () => {
        if (!expired) {
            dispatch(myExcursionLinks(id))
            linkTo(`/Route/${id}`)
        }
    }

    return (
        <BoxRowPressable
            onPress={Link}
            disabled={expired}
            style={{
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingRight: 20,
            paddingLeft: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            marginBottom: 20,
            marginRight:  width <= 480 ? 0 : 20
        }}>

            {expired &&
                <View style={{position:'relative', height: 97, width: 104, marginRight: 20}}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
                        style={{
                            position: 'absolute',
                            height: 97,
                            width: 104,
                            zIndex: 3,
                            bottom: 0,
                            paddingBottom: 20,
                            paddingHorizontal: 12,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderRadius: 15,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}/>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.5)']}
                        style={{
                            position: 'absolute',
                            height: 20,
                            width: 104,
                            zIndex: 3,
                            bottom: 0,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}/>
                    <CardBasketImage source={validImg(props)} style={{flexGrow: 1, marginRight: 20}}/>
                </View>

            }
            {!expired && <CardBasketImage source={validImg(props)} style={{flexGrow: 1, marginRight: 20}}/>}

            <BoxColumnView style={{alignItems: 'flex-start', flexGrow: 2, height: 97}}>
                <Text16 numberOfLines={2}
                        style={{lineHeight: 20, paddingBottom: 5, flexGrow: 1, maxWidth: 200}}>{name}</Text16>
                <Text10 style={{lineHeight: 17, color: '#4F4F4F'}}>{t('myExcursions.Order')}
                    от {moment(created_at).format('DD.MM.YYYY')} {t('myExcursions.y')}</Text10>
                <Text10 style={{lineHeight: 17, color: '#4F4F4F'}}>
                    {t('myExcursions.Valid until')} {moment(expires_at).format('DD.MM.YYYY')} {t('myExcursions.y')}</Text10>
            </BoxColumnView>
        </BoxRowPressable>
    );
};