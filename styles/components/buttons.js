import styled from "styled-components/native/dist/styled-components.native.esm";
import {Platform} from "react-native";

export const ButtonWhite = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  padding: 11px 18px 12px 48px;
  flex-direction: row;
  border: 1px solid #FFFFFF;
  border-radius: 20px;
  background: #fff;
  align-items: center;
  justify-content: space-between;
`
export const ButtonGray = styled.TouchableOpacity`
  width: 334px;
  height: 54px;
  padding: 11px 20px 12px 20px;
  flex-direction: row;
  border: 1px solid #f1f1f1;
  border-radius: 20px;
  background: #F5F5FA;
  align-items: center;
  justify-content: center;
  position: relative;
  shadow-color: rgba(0, 0, 0, 0.24);
  shadow-offset: 5px;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  elevation: 10;
`
export const ButtonGrayWrapper = styled.TouchableOpacity`
  position: relative;
  shadow-color: rgb(255, 255, 255);
  shadow-offset: -5px;
  shadow-opacity: 1;
  shadow-radius: 5px;
  elevation: 10;
`
export const ButtonGrayWrapper2 = styled.TouchableOpacity`
  shadow-color: rgb(255, 255, 255);
  shadow-offset: -5px;
  shadow-opacity: 1;
  shadow-radius: 5px;
`
export const ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  align-items: center;
  justify-content: center;
`
export const ButtonWhiteOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  flex-direction: row;
  padding: 14px 26px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #FFFFFF;
  border-radius: 20px;
  align-items: center;
  margin-bottom: 15px;
`
export const ButtonGreenOpacity = styled.TouchableOpacity`
  height: 54px;
  flex-direction: row;
  padding: 6px 26px;
  background: #11AEAE;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
`
export const ButtonLocal = styled.TouchableOpacity`
  height: 73px;
  width: 186px;
  position: relative;
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(255, 255, 255, 0.3);
  border-bottom-width: 1px;
`
export const ButtonCircle = styled.TouchableOpacity`
  height: 43px;
  width: 43px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: #F5F5F9;
  shadow-color: rgba(0, 0, 0, 0.54);
  shadow-offset: 6px;
  shadow-opacity: 0.3;
  shadow-radius: ${Platform.OS === 'ios' ? 10 : 18}px;
  elevation: 8;
`
export const ButtonTab = styled.TouchableOpacity`
  padding-bottom: 6px;
  border-bottom-width: 2px;
  border-bottom-color: #11AEAE;
`