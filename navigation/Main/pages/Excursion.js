import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigationState} from "@react-navigation/native";
import {LayoutImageTop} from "../../../layouts/LayoutImageTop";
import {
    BoxColumnView,
    BoxRow,
    ContainerMain,
    Text10, Text12,
    Text14, Text16, Text16Bold500, Text18Bold,
    Text23Bold, Text28
} from "../../../styles/components/tools";
import {IconHeadPhone, IconHeart, IconStar, IconWarning, IconWatchTwo} from "../../../components/Icons";
import Svg, {Circle, Path} from "react-native-svg";
import {ButtonCircle, ButtonGray, ButtonGrayWrapper} from "../../../styles/components/buttons";
import CardReview from "../../../components/tools/CardReview";
import {TouchableOpacity} from "react-native";
import {useState} from "react";
import {setLikeById} from "../../../store/excursions/reducer";

export const Excursion = ({}) => {
    const dispatch = useDispatch()
    const [maxReviews, setMaxReviews] = useState(3)
    const routes = useNavigationState(state => state.routes)
    const excursion = useSelector(state =>
        routes.length > 1 && routes[routes.length - 1]?.params?.screen ?
            state.excursions.data.find(value => value.id === parseInt(routes[routes.length - 1].params.screen)) :
            state.excursions.data[0]
    )

    const handlerLike = () => {
        dispatch(setLikeById(excursion.id))
    }
    const handlerMaxReviews = () => setMaxReviews(excursion.details.reviews.length)

    return (
        <LayoutImageTop
            itemAbsolute={
                <ButtonCircle onPress={handlerLike}>
                    <IconHeart fill={excursion.like ? '#E0E0E0' : '#11AEAE'}/>
                </ButtonCircle>
            }
            img={excursion.image}
            gallery={excursion.gallery}>



            <ContainerMain>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 16}}>
                    <IconStar style={{marginRight: 5}}/>
                    <BoxRow>
                        <Text14>{excursion.rang} </Text14>
                        <Text10 style={{color: '#4F4F4F'}}>({excursion.countRang} оценок)</Text10>
                    </BoxRow>

                </BoxRow>
                <Text23Bold style={{marginBottom: 10}}>{excursion.title}</Text23Bold>
                <BoxRow style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
                    <BoxColumnView style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                        <BoxRow style={{justifyContent: 'flex-start'}}>
                            <IconHeadPhone width={26} height={26} style={{marginRight: 12}}/>
                            <Text28 style={{ color: '#11AEAE'}}>228 €</Text28>
                        </BoxRow>
                        <Text10 style={{lineHeight: 18,color: '#BDBDBD'}}>Цена аудиоэкскурсии</Text10>
                    </BoxColumnView>
                    <ButtonGrayWrapper  style={{width: 'auto'}}>
                    <ButtonGray activeOpacity={0.6}  style={{width: 'auto'}}>
                        <Text16Bold500 style={{color: '#828282', width: 89}}>Купить</Text16Bold500>

                        <Svg width="29" height="29"  viewBox="0 0 41 41"
                             style={{position: 'absolute', right: 10}} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                    </ButtonGrayWrapper>
                </BoxRow>
                <Text16 style={{color: '#4F4F4F', marginBottom: 30}}>{excursion.description}</Text16>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 15}}>Маршрут</Text18Bold>
                {excursion.road.map((road, index) =>
                    <Text16 style={{color: '#4F4F4F', lineHeight: 27}} key={index}>{road}</Text16>)}

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 24}}> Детали экскурсии</Text18Bold>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 24}}>
                    <IconWatchTwo style={{marginRight: 22}}/>
                    <BoxColumnView style={{alignItems: 'flex-start'}}>
                        <Text16 style={{color: '#4F4F4F', lineHeight: 21}}>Время аудиоэкскурсии</Text16>
                        <Text16 style={{color: '#4F4F4F', lineHeight: 21}}>
                            {excursion.details.time.split(':')[0]} ч. {excursion.details.time.split(':')[1]} мин.
                        </Text16>
                    </BoxColumnView>
                </BoxRow>
                <BoxRow style={{justifyContent: 'flex-start', marginBottom: 30}}>
                    <IconWarning style={{marginRight: 34}}/>
                    <Text16 style={{color: '#4F4F4F', width: 290}}>
                        {excursion.details.warning}
                    </Text16>
                </BoxRow>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 20}}>Описание</Text18Bold>
                <BoxColumnView style={{marginBottom: 30}}>
                    {excursion.details.description.map(value =>
                    <Text14 style={{color:'#828282', marginBottom: 15}}>{value}</Text14>
                    )}
                </BoxColumnView>

                <ButtonGrayWrapper style={{width: 'auto'}}>
                    <ButtonGray activeOpacity={0.6} style={{marginBottom: 50, width: '100%'}}>
                        <Text16Bold500 style={{color: '#828282', width: '60%'}}>Заказать сейчас</Text16Bold500>
                        <Svg width="41" height="41" style={{position: 'absolute', right: 20}} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="20.5" cy="20.5" r="20.5" fill="#11AEAE"/>
                            <Path d="M13 21h14M20 14l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </Svg>
                    </ButtonGray>
                </ButtonGrayWrapper>

                <Text18Bold style={{color: '#4F4F4F', marginBottom: 22}}>Отзывы</Text18Bold>

                {excursion.details.reviews.map((value, index) =>
                        index < maxReviews && <CardReview
                            key={value.id}
                            star={value.star}
                            name={value.name}
                            body={value.description}
                            date={value.date}
                        />
                )}
                {excursion.details.reviews.length !== maxReviews && excursion.details.reviews.length >= 3 &&
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={handlerMaxReviews}
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      borderBottomColor: '#E0E0E0',
                                      borderBottomWidth: 1,
                                      paddingTop: 17,
                                      paddingBottom: 17,
                                      width: '100%'
                                  }}>
                    <Text12 style={{color:'#4F4F4F'}}>
                        Посмотреть еще {excursion.details.reviews.length - 3} отзывов
                    </Text12>
                    <Svg width="22" height="20" viewBox="0 -4 22 20" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 13L7 7L1 1" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </TouchableOpacity>
                }

            </ContainerMain>
        </LayoutImageTop>
    );
};