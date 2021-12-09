import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit";
import Sample from './sample/reducer'
import SMS from './sms/reducer'
import previewPagination from './previewPagination/reducer'
import toasts from './toasts/reducer'
import account from './account/reducer'
import countries from './countries/reducer'
import country from './country/reducer'
import popularPlaces from './popularPlaces/reducer'
import excursions from './excursions/reducer'
import excursion from './excursion/reducer'
import faq from './faq/reducer'
import favourite from './favourite/reducer'
import cart from './cart/reducer'

const rootReducer = combineReducers(
    {
        Sample,
        SMS,
        previewPagination,
        toasts,
        account,
        countries,
        country,
        popularPlaces,
        excursions,
        excursion,
        faq,
        favourite,
        cart,
    }
)

export default function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
            )
    })
}