import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    text23: {
        fontFamily: "Ubuntu_700Bold",
        color: '#4F4F4F',
        fontSize: 23,
        lineHeight: 38,
        textAlign: 'center',
    },
    buttonTextStyle: {
        color: '#828282',
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
        lineHeight: 28,
    },
    buttonStyle: {
        position: 'absolute',
        width:'100%',
        backgroundColor: 'rgba(255,255,255,0)',
        paddingHorizontal: 0,
        marginHorizontal: 0
    },
    rowStyle: {

    },
    dropdownStyle: {
        borderRadius: 15
    },
    dropdownWrapper:{
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});