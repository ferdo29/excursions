import * as React from 'react';
import * as SecureStore from "expo-secure-store";
import {useDispatch} from "react-redux";
import {setFile, setFiles} from '../store/files/reducer'
import {useEffect} from "react";
import * as FileSystem from "expo-file-system/build/FileSystem";

export const useFiles = () => {
    const dispatch = useDispatch()

    const handlerSetFileStore = async (object) => {
        try {
            const files = await SecureStore.getItemAsync('KeyExcursionStore')
            const data = !!files ? [...JSON.parse(files), ...[object]]: [object]
            await SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify(data))
            dispatch(setFiles(data))
        }catch (e) {
            dispatch(setFiles([]))
        }
    }
    const handlerDeleteFileStore = async (id) => {
        try {
            const files = await SecureStore.getItemAsync('KeyExcursionStore')
            const data = !!files ? [...JSON.parse(files)] : []
            if(data.length > 0){
                const file = data.find(value => value.id === id)
                const filterNotId = data.filter(value => value.id !== id)
                await FileSystem.deleteAsync(file.uri)
                await SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify(filterNotId))
                dispatch(setFiles(filterNotId))
            }
        }catch (e) {
            dispatch(setFiles([]))
        }
    }

    const handlerInitFiles = async () => {
        const KeyExcursionStore = await SecureStore.getItemAsync('KeyExcursionStore')
        if (!!KeyExcursionStore && KeyExcursionStore !== 'undefined' && KeyExcursionStore !== 'false') {
            const jsonData = JSON.parse(KeyExcursionStore)
            dispatch(setFiles(jsonData))
        }
        else {
            SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify([])).then()
            dispatch(setFiles([]))
        }
    }

    useEffect(() => {
        console.log(123)
    }, []);

    return {handlerSetFileStore, handlerDeleteFileStore, handlerInitFiles}
};