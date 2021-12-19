import styled from "styled-components/native";
import {Dimensions} from "react-native";
import Participants from "../../navigation/Main/pages/Route/Participants";
import {MoreDetail} from "../../navigation/Main/pages/components/MoreDetail";

const {height, width} = Dimensions.get('window')

export const CardImage = styled.ImageBackground`
  width: ${width > 370 ? 160 : 150}px;
  height: ${width > 370 ? 250 : 230}px;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #cbcbcb;
  border-radius: 15px;
  padding: 20px 12px;
  margin-bottom: 20px;
  shadow-color: rgba(0, 0, 0, 0.33);
  shadow-offset: 3px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 4;
`
export const WrapperImagePressable = styled.Pressable`
  margin-right: 10px;
`
export const CardExcursionView = styled.Pressable`
  border-radius: 15px;
  flex-direction: column;
  background: #FFFFFF;
  shadow-color: rgba(0, 0, 0, 0.33);
  shadow-offset: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 10;
`
export const CardExcursionImage = styled.Image`
  height: 160px;  
  width: 100%;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`
export const CardExcursionContent = styled.View`
  width: 100%;
  padding: 7px 18px 13px 18px;
`
export const CardBasketImage = styled.Image`
  height: 97px;  
  width: 104px;
  background-color: #cbcbcb;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`
export const WrapperInputBasket = styled.View`
  height: 34px;
  border-radius: 9px;
`
export const WrapperCircle = styled.View`
  height: 46px;
  width: 46px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #11AEAE;
  align-items: center;
  justify-content: center;
`
export const InputBasket = styled.TextInput`
  font-family: "Ubuntu_400Regular";
  padding-top: 4px;
  text-align: center;
  align-items: center;
  font-weight: 500;
  color: #11AEAE;
  font-size: 18px;
`
export const WrapperSale = styled.TextInput`
  width: 52px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: #11AEAE;
`
export const WrapperParticipant = styled.View`
  flex-direction: row;
  padding: 19px 10px 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #70CECE;
  align-items: center;
  justify-content: space-between;
`
export const WrapperParticipantButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 19px 10px 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #70CECE;
  align-items: center;
  justify-content: space-between;
`
export const WrapperMoreDetailButton = styled.TouchableOpacity`
  position: absolute;
  width: 257px;
  height: 218px;
  background: #FFFFFF;
  flex-direction: column;
  padding: 30px 21px 32px 24px;
  align-items: center;
  justify-content: space-between;
  
`