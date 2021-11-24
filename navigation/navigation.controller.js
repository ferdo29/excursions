import * as React from 'react';
import {useEffect} from "react";
import PreviewNavigation from "./Preview/PreviewNavigation";
import AuthNavigation from "./Auth/AuthNavigation";
import {useDispatch, useSelector} from "react-redux";
import {setStatePreview} from "../store/previewPagination/reducer";
import * as SecureStore from "expo-secure-store";
import MainNavigation from "./Main/MainNavigation";

export const NavigationController = ({preview, setCtxPreview = () => {}}) => {
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
            {!account.data?.phone && <AuthNavigation/>}
            {account.data?.phone && <MainNavigation/>}
            {/*<MainNavigation/>*/}
            {/*<AuthNavigation/>*/}

        </>
    );
};