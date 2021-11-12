import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit";
import Sample from './sample/reducer'
import SMS from './sms/reducer'
import {userApi} from "./sample/service";

const rootReducer = combineReducers(
    {
        Sample,
        SMS,
        [userApi.reducerPath]: userApi.reducer
    }
)

export default function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userApi.middleware
            )
    })
}