import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit";
import Sample from './sample/reducer'
import SMS from './sms/reducer'
import previewPagination from './previewPagination/reducer'
import toasts from './toasts/reducer'
import account from './account/reducer'
import countries from './countries/reducer'
import popularPlaces from './popularPlaces/reducer'
import excursions from './excursions/reducer'
import faq from './faq/reducer'
import {userApi} from "./sample/service";

const rootReducer = combineReducers(
    {
        Sample,
        SMS,
        previewPagination,
        toasts,
        account,
        countries,
        popularPlaces,
        excursions,
        faq,
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