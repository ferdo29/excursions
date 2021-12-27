import * as React from 'react';
import {Dimensions, Modal, Pressable, View, SafeAreaView, ScrollView} from "react-native";
import {WrapperBox, WrapperCreateView, WrapperPop} from "../../styles/components/popups";
import Draggable from "react-native-draggable/Draggable";
import {useState} from "react";
import Svg, {Path} from "react-native-svg";

const {width, height} = Dimensions.get('window');

export default function ({children, state, openClose = () => {}, start = 50,
                             mountainTop = true,
                             shouldReverse = true,
                             responseSize = true,
                             reSizeOnSwipe= true}) {
    const [stateDraggable, setStateDraggable] = useState(true)
    const [Height, setHeight] = useState(height)

    const SwipeWindow = ({nativeEvent}) => {

            if(!stateDraggable && nativeEvent.pageY >= (height - 200)) {
                handlerClose()
                return
            }
            if(responseSize){
            nativeEvent?.pageY && setHeight(height - nativeEvent.pageY)
            setStateDraggable(true)
        }

    }

    const handlerDraggable = () => {
        setStateDraggable(!stateDraggable)
    }
    const handlerClose = () => {
        openClose()
        reSizeOnSwipe && setHeight(height)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={state}
            onRequestClose={handlerClose}
        >

            <WrapperPop style={{width, height, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)'}} onPress={handlerClose}/>

                    <Draggable onDragRelease={SwipeWindow}
                               shouldReverse={shouldReverse}
                               renderSize={width}
                               minX={0}
                               disabled={stateDraggable}
                               maxX={width}
                               minY={0}
                               x={0} y={start}>
                        <WrapperCreateView  style={{width, paddingTop: 0}}>
                            <Pressable onPressIn={handlerDraggable}  style={{width: '100%', paddingTop: 20, alignItems: 'center'}}>
                                <View style={{backgroundColor: '#C4c4c4' , width: 80, height: 4, borderRadius: 5}}/>
                                {mountainTop && <Svg width={width} height="55" style={{padding: 0}} viewBox="0 -10 452 55" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <Path fillRule="evenodd" clipRule="evenodd"
                                          d="M0.0269165 54.163H451.951C451.766 49.6025 450.963 45.0927 448.081 41.579C403.163 -13.1851 45.5697 -13.0533 3.44432 41.9741C0.801208 45.4267 0.153931 49.7934 0.0269165 54.163Z"
                                          fill="#F5F5FA"/>
                                </Svg>}
                            </Pressable>


                            <WrapperBox>

                                <SafeAreaView style={{height: Height - 50 }}>
                                    <ScrollView>
                                        {children}
                                    </ScrollView>
                                </SafeAreaView>
                            </WrapperBox>



                        </WrapperCreateView>
                    </Draggable>

        </Modal>
    );
};