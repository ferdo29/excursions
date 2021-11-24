import * as React from 'react';
import Svg, {Circle, G} from "react-native-svg";

export const HomeBackground = ({}) => {
    return (
        <>
            <Svg style={{position: 'absolute',top: '13%', right: 0}} width="89" height="167" viewBox="0 0 89 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="83.5" cy="83.5" r="83.5" fill="#11AEAE"/>
                    <Circle opacity="0.3" cx="83.5" cy="83.5" r="55.0578" fill="#11AEAE"/>
                    <Circle cx="83.4998" cy="83.5" r="29.7469" fill="#11AEAE"/>
                </G>
            </Svg>
            <Svg style={{position: 'absolute',top: '70%', left: 0 }} width="115" height="167" viewBox="0 0 115 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G opacity="0.4">
                    <Circle opacity="0.3" cx="31.5" cy="83.5" r="83.5" fill="#11AEAE"/>
                    <Circle opacity="0.3" cx="31.5" cy="83.5002" r="55.0578" fill="#11AEAE"/>
                    <Circle cx="31.4998" cy="83.4998" r="29.7469" fill="#11AEAE"/>
                </G>
            </Svg>

        </>
    );
};