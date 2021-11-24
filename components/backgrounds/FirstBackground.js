import * as React from 'react';
import Svg, {Circle, G, Path} from "react-native-svg";

export const FirstBackground = ({}) => {
    return (
        <>

            <Svg style={{position: 'absolute',top: 50, left: 0}} width="70" height="172" viewBox="0 0 70 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="-16" cy="86" r="86" fill="#11AEAE"/>
                    <Circle opacity="0.3" cx="-15.9998" cy="86" r="56.7062" fill="#11AEAE"/>
                    <Circle cx="-16.0002" cy="86" r="30.6375" fill="#11AEAE"/>
                </G>
            </Svg>


            <Svg style={{position: 'absolute',top: '70%', right: 0}} width="104" height="260" viewBox="0 0 104 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="130" cy="130" r="130" fill="#11AEAE"/>
                    <Circle opacity="0.3" cx="130" cy="130" r="85.7188" fill="#11AEAE"/>
                    <Circle cx="130" cy="130" r="46.3125" fill="#11AEAE"/>
                </G>
            </Svg>
        </>
    );
};