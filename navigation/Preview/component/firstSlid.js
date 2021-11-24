import * as React from 'react';
import Svg, {Circle, G, Path} from "react-native-svg";
import {Dimensions, Image, View} from "react-native";
import {BoxRow, BoxRowView, BoxWhite, MainBox, Text16, Text16Bold, Text35} from "../../../styles/components/tools";
import {SelectorsLang} from "../../../components/Selectors";
import {t} from "i18n-js";

const {height, width} = Dimensions.get('window')

export const FirstSlid = ({children}) => {
    return (
        <MainBox style={{paddingRight: 0, paddingLeft: 0, backgroundColor: '#11AEAE'}}>
            <BoxRowView style={{paddingBottom: 37, justifyContent: 'flex-end'}}>
                <View style={{marginRight: 15}}><SelectorsLang/></View>

                <View style={{paddingTop: '45%'}}>
                    <Svg width={width + 2} height="109" viewBox="0 -12 454 109" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <Path fillRule="evenodd" clipRule="evenodd"
                              d="M0.925244 108.735H451.607C450.07 98.1362 445.435 88.176 437.657 80.6775C324.15 -28.7464 132.849 -24.8312 16.0078 80.418C7.7681 87.8403 2.72353 97.9137 0.925244 108.735Z"
                              fill="#F5F5FA"/>
                    </Svg>
                    <BoxWhite style={{paddingTop: 90, paddingRight: 15, paddingLeft: 22}}>
                        <Text35>{t('Preview.First.Travel')}</Text35>
                        <Text35>{t('Preview.First.in a new way')}</Text35>

                        <Text16 style={{color: '#828282'}}>
                            <Text16Bold style={{color: '#11AEAE'}}>{t('Preview.First.UNUSUAL')} </Text16Bold>
                            {t('Preview.First.audio guided tours around the world')}
                        </Text16>

                        <BoxRow style={{justifyContent: 'space-around', paddingTop: 18, paddingBottom: 22}}>
                            <BoxRow>
                                <Text16Bold style={{color: '#11AEAE'}}>92 </Text16Bold>
                                <Text16>{t('Preview.First.country')}</Text16>
                            </BoxRow>
                            <BoxRow>
                                <Text16Bold style={{color: '#11AEAE'}}>630+ </Text16Bold>
                                <Text16>{t('Preview.First.cities')}</Text16>
                            </BoxRow>
                            <BoxRow>
                                <Text16Bold style={{color: '#11AEAE', fontSize: 18}}>∞ </Text16Bold>
                                <Text16>{t('Preview.First.emotions')}</Text16>
                            </BoxRow>
                        </BoxRow>

                        {children}
                    </BoxWhite>
                </View>


            </BoxRowView>

            <Svg style={{position: 'absolute', top: 50, left: 0}}
                 width="82" height="167" viewBox="0 0 82 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="-1.5" cy="83.5" r="83.5" fill="white"/>
                    <Circle opacity="0.3" cx="-1.50005" cy="83.5" r="55.0578" fill="white"/>
                    <Circle cx="-1.50019" cy="83.5" r="29.7469" fill="white"/>
                </G>
            </Svg>

            <View style={{
                position: 'absolute',
                top: '20%',
                width: width,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image style={{width: 356, height: 356}} source={require('../../../assets/image/Globe.png')}/>
            </View>

            <Svg style={{position: 'absolute', top: '45%', right: -10}} width="104" height="182" viewBox="-20 0 124 202"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="100.99" fill="#15C0C0"/>
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="66.5901" fill="#15C0C0"/>
                <Circle cx="100.99" cy="100.99" r="35.9776" fill="#15C0C0"/>
            </Svg>

        </MainBox>
    );
};