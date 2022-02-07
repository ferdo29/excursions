import * as React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {BoxRow, ContainerMain, Text12, Text23Bold} from "../../../styles/components/tools";
import {useDispatch, useSelector} from "react-redux";
import {IconHeart} from "../../../components/Icons";
import {ButtonCircle} from "../../../styles/components/buttons";
import Svg, {Path} from "react-native-svg";
import {Image} from "react-native";
import {FirstBackground} from "../../../components/backgrounds/FirstBackground";
import {CardExcursion} from "../../../components/tools/CardExcursion";
import {fetchFavourite} from "../../../store/favourite/service";
import {getAuth} from "firebase/auth";
import {t} from "i18n-js";
import {useContext} from "react";
import UserFB from "../../../contexts/userFB";

export default function ({}) {
    const dispatch = useDispatch()
    const {user} = useContext(UserFB)
    const {data: favourite} = useSelector(state => state.favourite)

    const onRefresh = () => {
        dispatch(fetchFavourite({token: user.accessToken}))
    }

    return (
        <MainLayout Refreshing={true} scrollEnabled={favourite.length > 0} handlerRefresh={onRefresh} animation={favourite.length > 2} itemBack={<FirstBackground/>}>
            <ContainerMain style={{paddingBottom: 20, marginTop: 20}}>
                <Text23Bold style={{textAlign: 'center'}}>{t('Favorites.Favorites')}</Text23Bold>
                {/*<Text12 style={{textAlign: 'center', marginTop: favourite.length <= 0 ? 15 : 0}}>*/}
                {/*    {favourite.length > 0 ?*/}
                {/*            `${t('Favorites.In your favorites')} ${favourite.length} ${t('Favorites.excursions')}` :*/}
                {/*            t('Favorites.You have no excursions added to your favorites')}*/}
                {/*</Text12>*/}
                {favourite.length <= 0 &&
                <>
                    <Text12 style={{textAlign: 'center', color: '#828282', paddingTop: 50}}>
                        {t('Favorites.Add excursions to your favorites by clicking')}
                    </Text12>
                    <Text12 style={{textAlign: 'center', color: '#828282'}}>{t('Favorites.on the heart')}</Text12>
                    <BoxRow style={{paddingTop: 20}}>
                        <ButtonCircle disabled style={{marginRight: 10}}>
                            <IconHeart fill={'#11AEAE'}/>
                        </ButtonCircle>

                        <Svg width="43" height="16" viewBox="0 0 43 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M42.7071 8.70711C43.0976 8.31658 43.0976 7.68342 42.7071 7.29289L36.3431 0.928932C35.9526 0.538408 35.3195 0.538408 34.9289 0.928932C34.5384 1.31946 34.5384 1.95262 34.9289 2.34315L40.5858 8L34.9289 13.6569C34.5384 14.0474 34.5384 14.6805 34.9289 15.0711C35.3195 15.4616 35.9526 15.4616 36.3431 15.0711L42.7071 8.70711ZM0 9H42V7H0V9Z" fill="#BDBDBD"/>
                        </Svg>

                        <ButtonCircle disabled style={{marginLeft: 10}}>
                            <IconHeart fill={'#E0E0E0'}/>
                        </ButtonCircle>
                    </BoxRow>

                </>
                }

            </ContainerMain>
            {favourite.map((value, index) => <CardExcursion callBack={onRefresh} key={value.id} data={value} index={index}/>)}
            {favourite.length <= 0 && <ContainerMain>
                <Image source={require('../../../assets/image/Woman.png')}/>
            </ContainerMain>}
        </MainLayout>
    );
};