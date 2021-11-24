import * as React from 'react';
import {BoxColumnView, BoxRow, Text10, Text12, Text16} from "../../../../styles/components/tools";
import {CardBasketImage, InputBasket, WrapperInputBasket, WrapperSale} from "../../../../styles/components/Cards";
import {IconClose, IconHeadPhone} from "../../../../components/Icons";
import {useDispatch} from "react-redux";
import {setBasketById, setBasketCount} from "../../../../store/excursions/reducer";
import {TouchableOpacity} from "react-native";
import InsetShadow from 'react-native-inset-shadow'

export default function ItemBasket({image, title, price, id, count}) {

    const dispatch = useDispatch()

    const handlerRemoveBasket = () => dispatch(setBasketById(id))
    const handlerChangeCount = (data) => dispatch(setBasketCount({id, value: data}))

    return (
        <BoxRow style={{justifyContent: 'space-between', paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom:20}}>
            <CardBasketImage source={image} style={{flexGrow: 1, marginRight: 10}}/>
            <BoxColumnView style={{ alignItems: 'flex-start', flexGrow: 2, height: 97}}>
                <BoxRow style={{justifyContent: 'space-between'}}>
                    <Text16 numberOfLines={2} style={{lineHeight: 20, paddingBottom: 5, flexGrow: 1, maxWidth: 200}}>{title}</Text16>

                    <TouchableOpacity onPress={handlerRemoveBasket} style={{flexGrow: 1}}>
                        <IconClose/>
                    </TouchableOpacity>
                </BoxRow>
                <BoxColumnView style={{ alignItems: 'flex-start'}}>
                    <BoxRow style={{justifyContent: 'flex-start'}}>
                        <IconHeadPhone height={17} width={17} style={{}}/>
                        <Text16 style={{lineHeight: 18, color: '#11AEAE', flexGrow: 1}}>{price} €</Text16>
                        <Text16 style={{lineHeight: 18, color: '#BDBDBD', flexGrow: 1}}>X</Text16>

                        <WrapperInputBasket  style={{flexGrow: 8}}>
                            <InsetShadow top={false} left={false} shadowColor={'#fff'}
                                         shadowOpacity={0.9}
                                containerStyle={{borderRadius: 9}}>
                            <InsetShadow right={false} bottom={false} shadowColor={'#b2b2b2'}
                                         shadowOpacity={0.7}
                                containerStyle={{borderRadius: 9}}>
                                <InputBasket
                                    keyboardType={'numeric'}
                                    onChangeText={handlerChangeCount}
                                    value={count.toString()} style={{textAlignVertical: 'top', flexGrow: 1}}/>
                            </InsetShadow>
                            </InsetShadow>
                        </WrapperInputBasket>
                        <WrapperSale  style={{marginLeft: 10, justifyContent: 'center'}}>
                            <Text12 style={{color: '#fff', lineHeight: 14, textAlign: 'center'}}>-20%</Text12>
                        </WrapperSale>
                    </BoxRow>
                    <BoxRow style={{justifyContent: 'space-between'}}>
                        <Text10 style={{lineHeight: 18, color: '#828282'}}>Цена аудиоэкскурсии</Text10>
                    </BoxRow>
                </BoxColumnView>
            </BoxColumnView>
        </BoxRow>
    );
};