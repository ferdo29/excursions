import * as React from 'react';
import Svg, {Circle, G, Path} from "react-native-svg";
import {Dimensions} from "react-native";

const {height, width} = Dimensions.get('window')

export const CirclesAb = ({}) => {

    return (
        <>
            <Svg style={{position: 'absolute',top: 50, left: 0}} width="83" height="167" viewBox="0 0 83 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="-0.5" cy="83.5" r="83.5" fill="white"/>
                    <Circle opacity="0.3" cx="-0.500046" cy="83.5" r="55.0578" fill="white"/>
                    <Circle cx="-0.500195" cy="83.5" r="29.7469" fill="white"/>
                </G>
            </Svg>

            <Svg style={{position: 'absolute',top: '80%', right: 0}} width="124" height="202" viewBox="0 0 124 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="100.99" fill="#15C0C0"/>
                <Circle opacity="0.3" cx="100.99" cy="100.99" r="66.5901" fill="#15C0C0"/>
                <Circle cx="100.99" cy="100.99" r="35.9776" fill="#15C0C0"/>
            </Svg>

            {width < 400 && <Svg style={{position: 'absolute', bottom: -30, zIndex: -2}} width={width}
                  height={height > 755 ? "167" : "147"} viewBox={`0 0 ${width} ${height > 755 ? "167" : "147"}`}
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M-19 0C126.5 56.5742 349 42.3836 433 0V254H-19V0Z" fill="#F5F5FA"/>
            </Svg>}


        </>
    );
};