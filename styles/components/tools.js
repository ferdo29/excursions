import styled from 'styled-components/native'
import {Dimensions, Platform} from "react-native";

const {height, width} = Dimensions.get('window')

export const MainBox = styled.View`
  flex: 1;
  position: relative;
  background: rgb(245, 245, 250);
  flex-direction: column;
  padding: 45px 0 ${Platform.OS === 'ios' ? '40px' : '20px'} 0;
`
export const MainBoxWrap = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 20px;
  justify-content: space-between;
`
export const ContainerMain = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`
export const BoxWhite = styled.View`
  width: 100%;
  height: 100%;
  background: #F5F5FA;
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
export const BoxRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const BoxRowPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const BoxColumnView = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
export const BoxColumnPressable = styled.TouchableOpacity`
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

export const CardScrollView = styled.ScrollView`
  max-height: 400px;
  padding-left: 22px;
  flex-direction: row;
`

export const Text47Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 47px;
  line-height: 47px;
  color: #11AEAE;
`
export const Text47 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 47px;
  line-height: 54px;
  color: #11AEAE;
`
export const Text35 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 30px;
  line-height: 30px;
  color: #4F4F4F;
`
export const Text33 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 33px;
  line-height: 34px;;
`
export const Text30Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 30px;
  line-height: 31px;
`
export const Text30 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 30px;
  line-height: 31px;
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
export const Text23Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  color: #4F4F4F;
  font-size: 23px;
  line-height: 38px;
`
export const Text23 = styled.Text`
  font-family: "Ubuntu_400Regular";
  color: #4F4F4F;
  font-size: 23px;
  line-height: 38px; 
`
export const Text20 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 20px;
  line-height: 24px;
`
export const Text20Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 20px;
  line-height: 24px;
`
export const Text18 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 18px;
  line-height: 30px;
`
export const Text18Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 18px;
  line-height: 30px;
`
export const Text16Bold = styled.Text`
  font-family: "Ubuntu_700Bold";
  font-size: 16px;
  line-height: 28px;
`
export const Text16Bold500 = styled.Text`
  font-family: "Ubuntu_500Medium";
  font-size: 16px;
  line-height: 28px;
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
export const Text12 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 12px;
  line-height: 22px; 
`
export const Text12Underline = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 12px;
  line-height: 12px;
  border-bottom-color: #11AEAE;
  border-bottom-width: 1px;
`
export const Text10 = styled.Text`
  font-family: "Ubuntu_400Regular";
  font-size: 10px;
  line-height: 20px; 
`
export const URLText = styled.Pressable`
  font-family: "Ubuntu_400Regular";
  font-size: 16px;
  line-height: 28px;

`
export const Dot = styled.View`
  width: 10px;
  height: 10px;
  margin-left: 12px;
  background: #11AEAE;
  border-radius: 20px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.25);
`
export const WrapperBottomNav = styled.View`
  width: ${width <= 480 ? '95%' : '375px'};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 27px 10px 27px;
  background: #F5F5FA;
  border-radius: 20px;
  shadow-color: rgba(0, 0, 0, 0.33);
  shadow-offset: 10px;
  shadow-opacity: 0.6;
  shadow-radius: 18px;
  elevation: 8;
`
export const WrapperImage = styled.Image`
  width: ${width - 40}px;
  height: ${width - 20}px;
`
export const WrapperPopUp = styled.View`
  width: 320px;
  height: 361px;
  background: #F5F5FA;
  border-radius: 9px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

