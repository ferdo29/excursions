import styled from 'styled-components/native'
import {Platform} from "react-native";
import {blueAE} from "../colors";

export const MainBox = styled.View`
  flex: 1;
  position: relative;
  background: ${blueAE};
  flex-direction: column;
  padding: 45px 15px ${Platform.OS === 'ios' ? '40px' : '20px'} 22px;
`
export const Container = styled.View`
    padding: 0px 15px;
`

export const BoxRowView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
export const BoxColumnView = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
export const ColumnCenterView = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const CircleView = styled.View`
  width: 41px;
  height: 41px;
  background: #70CECE;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
`


export const Text33 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 33px;
  line-height: 34px;;
`
export const Text28 = styled.Text`
  font-family: "Ubuntu_400Regular";
  color: #4F4F4F;
  font-size: 28px;
  line-height: 29px;
`
export const Text26 = styled.Text`
  font-family: "Ubuntu_400Regular";
  color: #4F4F4F;
  font-size: 26px;
  line-height: 27px;
`
export const Text18 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 18px;
  line-height: 30px;
`
export const Text16 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 16px;
  line-height: 28px;
`
export const Text14 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 14px;
  line-height: 24px;
`
export const URLText = styled.Pressable`
  font-family: "Ubuntu_400Regular";
  font-size: 16px;
  line-height: 28px;

`