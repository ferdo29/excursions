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
import axios from "axios";
import {getAuth} from "firebase/auth";

export const CardExcursion = ({data, index, callBack = () => {}}) => {
    const user = getAuth().currentUser
    const dispatch = useDispatch()
    const linkTo = useLinkTo();
    const handlerLike = () => {
        dispatch(setLike(index))

        axios.get(`${process.env.DB_HOST}/excursions/${data.id}/like`,
            {headers: {Authorization:`Bearer ${user.stsTokenManager.accessToken}`}})
            .then(() => {callBack()})
            .catch((e) => {
            })
    }
    const handlerBasket = () => {
        axios.post(`${process.env.DB_HOST}/cart/${data.id}`, {"quantity": 1},
            {headers: {Authorization:`Bearer ${user.stsTokenManager.accessToken}`}})
            .then((data) => {
                console.log(data)
            })
            .catch((e) => {
                console.error(e.response)
            })
    }

    return (
        <ContainerMain style={{marginBottom: 20}}>
        <CardExcursionView onPress={() => linkTo(`/Excursion/${data.id}`)}>

            <CardExcursionImage source={{uri: data.images.length > 0 && data.images[0].path}}/>

            <CardExcursionContent>
                <BoxRow style={{justifyContent: 'flex-start', paddingBottom: 10}}>
                    <BoxRow style={{marginRight: 18}}>
                        <IconWatch style={{marginRight: 8}}/>
                        <Text10>{data.minutes} минут</Text10>
                    </BoxRow>
                    <BoxRow>
                        <IconRoad style={{marginRight: 8}}/>
                        <Text10>{data.object} объектов</Text10>
                    </BoxRow>
                </BoxRow>
                <Text18 style={{lineHeight: 18, paddingBottom: 10, color: '#4F4F4F'}}>{data.name}</Text18>
                <Text12 style={{color: '#4F4F4F'}}>{data.short_description}</Text12>
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
                                <IconBasket fill={data?.inBasket ? '#E0E0E0' : '#11AEAE'}/>
                        </ButtonCircle>
                        </ButtonGrayWrapper>
                        <ButtonGrayWrapper  style={{width: 'auto'}}>
                        <ButtonCircle onPress={handlerLike} style={{marginRight: 10}}>
                                <IconHeart fill={data?.liked ? '#E0E0E0' : '#11AEAE'}/>
                        </ButtonCircle>
                        </ButtonGrayWrapper>
                        <BoxRow>
                            <IconStar style={{marginRight: 5}}/>
                            <Text10>{data.stars} ({data?.reviews_count ? data?.reviews_count : 0})</Text10>
                        </BoxRow>
                    </BoxRow>
                </BoxRow>
            </CardExcursionContent>

        </CardExcursionView>
        </ContainerMain>
    );
};