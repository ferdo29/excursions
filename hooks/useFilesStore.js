import * as React from 'react';
import {useState} from "react";
import * as SecureStore from "expo-secure-store";

export const useFilesStore = () => {
    const [excursionStore, setExcursionStore] = useState([])

    const getExcursionStore = () => {
        SecureStore.getItemAsync('KeyExcursionStore').then(data => {
            if (!!data && data !== 'undefined' && data !== 'false') {
                const jsonData = JSON.parse(data)
                setExcursionStore(jsonData)
            } else {
                SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify([])).then()
                setExcursionStore([])
            }

        })
    }
    const handlerSetExcursionsStore = (object) => {
        const data = [...excursionStore, ...[object]]
        SecureStore.setItemAsync('KeyExcursionStore', JSON.stringify(data))
            .then(value => {
                setExcursionStore(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const reExcursionStoreFile = (id) => {

    }
    const clearExcursionsStore = () => {
        SecureStore.deleteItemAsync('KeyExcursionStore')
            .then(() => {

                setExcursionStore([])
            })
            .catch((e) => console.log(e))
    }


    return {getExcursionStore, handlerSetExcursionsStore, reExcursionStoreFile, clearExcursionsStore, excursionStore}
};