import Toast from 'react-native-toast-message';
import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showToastState} from "../../store/toasts/reducer";

export function Toasts(props) {
    const dispatch = useDispatch()
    const {type, text1, text2, view} = useSelector(state => state.toasts)
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }
    useMemo(() => {
        showToast()
        dispatch(showToastState({type,text1,text2,view: false}))
    },[view])
    return (<Toast/>)
}