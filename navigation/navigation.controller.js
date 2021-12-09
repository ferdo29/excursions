import * as React from 'react';
import {useContext, useEffect} from "react";
import PreviewNavigation from "./Preview/PreviewNavigation";
import AuthNavigation from "./Auth/AuthNavigation";
import {useDispatch, useSelector} from "react-redux";
import {setStatePreview} from "../store/previewPagination/reducer";
import * as SecureStore from "expo-secure-store";
import MainNavigation from "./Main/MainNavigation";
import userFB from "../contexts/userFB";

export const NavigationController = ({preview, setCtxPreview = () => {}}) => {
    const {auth} = useContext(userFB)

    console.log()

    const dispatch = useDispatch()
    const account = useSelector(state => state.account )
    const {state: statePreview} = useSelector(state => state.previewPagination)

    useEffect(() => {
        !preview && SecureStore.getItemAsync('KeyPreview').then((result) => {
            if (!!result){
                setCtxPreview(true)
                dispatch(setStatePreview(true))
            }else {
                setCtxPreview(false)
                dispatch(setStatePreview(false))
            }

        })

    });

    if (!preview)  return <PreviewNavigation/>

    return (
        <>
            {/*<AuthNavigation/>*/}
            {!!!auth && <AuthNavigation/>}
            {!!auth && <MainNavigation/>}

        </>
    );
};