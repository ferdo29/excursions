import * as React from 'react';
import {CardExcursionContent, CardExcursionImage, CardExcursionView} from "../../styles/components/Cards";
import {
    BoxColumnView,
    BoxRow,
    ContainerMain,
    Text10,
    Text12,
    Text18,
} from "../../styles/components/tools";
import {IconBasket, IconHeadPhone, IconHeart, IconRoad, IconStar, IconWatch} from "../Icons";
import {ButtonCircle, ButtonGrayWrapper} from "../../styles/components/buttons";
import {useDispatch} from "react-redux";
import {setBasket, setLike} from "../../store/excursions/reducer";
import {useLinkTo} from "@react-navigation/native";

export const CardExcursion = ({data, index}) => {
    const dispatch = useDispatch()
    const linkTo = useLinkTo();
    const handlerLike = () => dispatch(setLike(index))
    const handlerBasket = () => dispatch(setBasket(index))

    return (
        <ContainerMain style={{marginBottom: 20}}>
        <CardExcursionView onPress={() => linkTo(`/Excursion/${data.id}`)}>

            <CardExcursionImage source={data.image}/>

            <CardExcursionContent>
                <BoxRow style={{justifyContent: 'flex-start', paddingBottom: 10}}>
                    <BoxRow style={{marginRight: 18}}>
                        <IconWatch style={{marginRight: 8}}/>
                        <Text10>{data.time.split(':')[0]} часа {data.time.split(':')[1]} минут</Text10>
                    </BoxRow>
                    <BoxRow>
                        <IconRoad style={{marginRight: 8}}/>
                        <Text10>{data.object} объектов</Text10>
                    </BoxRow>
                </BoxRow>
                <Text18 style={{lineHeight: 18, paddingBottom: 10, color: '#4F4F4F'}}>{data.title}</Text18>
                <Text12 style={{color: '#4F4F4F'}}>{data.description}</Text12>
                <BoxRow style={{justifyContent:'space-between', paddingTop: 12}}>
                    <ButtonGrayWrapper  style={{width: 'auto'}}>
                    <BoxColumnView style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <BoxRow style={{justifyContent: 'flex-start'}}>
                            <IconHeadPhone style={{marginRight: 12}}/>
                            <Text18 style={{lineHeight: 18, color: '#11AEAE'}}>{data.price} €</Text18>
                        </BoxRow>
                        <Text10 style={{lineHeight: 18,color: '#BDBDBD'}}>Цена аудиоэкскурсии</Text10>
                    </BoxColumnView>
                    </ButtonGrayWrapper>
                    <BoxRow>
                        <ButtonGrayWrapper  style={{width: 'auto'}}>
                        <ButtonCircle onPress={ handlerBasket} style={{marginRight: 10}}>
                                <IconBasket fill={data.inBasket ? '#E0E0E0' : '#11AEAE'}/>
                        </ButtonCircle>
                        </ButtonGrayWrapper>
                        <ButtonGrayWrapper  style={{width: 'auto'}}>
                        <ButtonCircle onPress={handlerLike} style={{marginRight: 10}}>
                                <IconHeart fill={data.like ? '#E0E0E0' : '#11AEAE'}/>
                        </ButtonCircle>
                        </ButtonGrayWrapper>
                        <BoxRow>
                            <IconStar style={{marginRight: 5}}/>
                            <Text10>{data.rang} ({data.countRang})</Text10>
                        </BoxRow>
                    </BoxRow>
                </BoxRow>
            </CardExcursionContent>

        </CardExcursionView>
        </ContainerMain>
    );
};