import styled from "styled-components/native";
import {Dimensions} from "react-native";

const {height, width} = Dimensions.get('window')

export const ToastSuccess = styled.View`
  background: #9feb57;
  width: ${width - 35}px;
  height: 60px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`
export const ToastWarning = styled.View`
  background: #ebc857;
  width: ${width - 35}px;
  height: 60px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`
export const ToastError = styled.View`
  background: #EB5757;
  width: ${width - 35}px;
  height: 60px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`
export const ToastText = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 16px;
  line-height: 28px;
  font-weight: bold;
  color: #fff;
`