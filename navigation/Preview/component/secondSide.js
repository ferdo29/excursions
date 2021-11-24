import * as React from 'react';
import {BoxRowView, BoxWhite, MainBox, Text16, Text16Bold, Text35} from "../../../styles/components/tools";
import {Dimensions, Image, View} from "react-native";
import {SelectorsLang} from "../../../components/Selectors";
import Svg, {Circle, G, Path} from "react-native-svg";
import {IconPhotoPhone} from "../../../components/Icons";

const {height, width} = Dimensions.get('window')

export const SecondSide = ({children, image, styleImg={}, resizeMode = 'cover'}) => {
    return (
        <>
            <MainBox style={{paddingRight: 0, paddingLeft: 0}}>
                {/*<IconPhotoPhone style={{position: 'absolute',top: -10}} width={width} height={height * 0.65}/>*/}
                <View style={{
                    backgroundColor: 'rgba(77,77,77,0.51)',
                    position: 'absolute',
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 0,
                }}>
                    <Image resizeMode={resizeMode} style={styleImg} source={image}/>
                </View>
                <BoxRowView style={{paddingBottom: 37, justifyContent: 'flex-end'}}>
                    <View style={{marginRight: 15}}><SelectorsLang/></View>
                    <View style={{paddingTop: '80%'}}>

                        <Svg width={width} height="69" viewBox="0 -10 453 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <Path fillRule="evenodd" clipRule="evenodd"
                                  d="M452.607 0.0395508C368.607 56.765 146.107 75.7576 0.606689 0.0395508V69H452.607V0.0395508Z"
                                  fill="#F5F5FA"/>
                        </Svg>


                    </View>
                        {children}
                </BoxRowView>

            </MainBox>


            <Svg style={{position: 'absolute', top: 50, left: 0}}
                width="73" height="167" viewBox="0 0 73 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.7">
                    <Circle opacity="0.3" cx="-10.5" cy="83.5" r="83.5" fill="white"/>
                    <Circle opacity="0.3" cx="-10.5" cy="83.5" r="55.0578" fill="white"/>
                    <Circle cx="-10.5002" cy="83.5" r="29.7469" fill="white"/>
                </G>
            </Svg>

            {/*<View style={{*/}
            {/*    position: 'absolute',*/}
            {/*    top: 0,*/}
            {/*    width: width,*/}
            {/*    alignItems: 'center',*/}
            {/*    justifyContent: 'center',*/}
            {/*    zIndex: 0*/}
            {/*}}>*/}
            {/*    <Image style={{width: width, height: height * 0.8}} source={require('../../../assets/image/Phone.jpg')}/>*/}
            {/*</View>*/}

            <Svg style={{position: 'absolute', top: '45%', right: -10}} width="104" height="182" viewBox="-20 0 124 202"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="100.99" fill="#15C0C0"/>
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="66.5901" fill="#15C0C0"/>
                <Circle cx="100.99" cy="100.99" r="35.9776" fill="#15C0C0"/>
            </Svg>
        </>
    );
};