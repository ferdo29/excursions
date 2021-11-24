import * as React from 'react';
import {CardBasketImage} from "../../../../styles/components/Cards";
import {BoxColumnView, BoxRowPressable, Text10, Text16} from "../../../../styles/components/tools";
import moment from 'moment'
import 'moment/locale/ru'
import {useLinkTo} from "@react-navigation/native";


export const ItemExcursion = ({image, title, id}) => {
    const linkTo = useLinkTo();
    return (
        <BoxRowPressable
            onPress={() => linkTo(`/Route/${id}`)}
            style={{
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingRight: 20,
            paddingLeft: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            marginBottom: 20
        }}>
            <CardBasketImage source={image} style={{flexGrow: 1, marginRight: 20}}/>

            <BoxColumnView style={{alignItems: 'flex-start', flexGrow: 2, height: 97}}>
                <Text16 numberOfLines={2}
                        style={{lineHeight: 20, paddingBottom: 5, flexGrow: 1, maxWidth: 200}}>{title}</Text16>
                <Text10 style={{lineHeight: 17, color: '#4F4F4F'}}>Заказ
                    от {moment().locale('ru').format('DD MMMM YYYY')} г.</Text10>
                <Text10 style={{lineHeight: 17, color: '#4F4F4F'}}>Действительна
                    до {moment().locale('ru').format('DD MMMM YYYY')} г.</Text10>
            </BoxColumnView>
        </BoxRowPressable>
    );
};