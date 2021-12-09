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
import {countriesAPI} from "./countries/service";
import {popularPlacesAPI} from "./popularPlaces/service";
import {excursionsAPI} from "./excursions/service";
import {excursionAPI} from "./excursions/service";
import {reviewsAPI} from "./excursions/reviews.service";

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
        [countriesAPI.reducerPath]: countriesAPI.reducer,
        [popularPlacesAPI.reducerPath]: popularPlacesAPI.reducer,
        [excursionsAPI.reducerPath]: excursionsAPI.reducer,
        [excursionAPI.reducerPath]: excursionAPI.reducer,
        [reviewsAPI.reducerPath]: reviewsAPI.reducer,
    }
)

export default function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                countriesAPI.middleware,
                popularPlacesAPI.middleware,
                excursionsAPI.middleware,
                excursionAPI.middleware,
                reviewsAPI.middleware,
            )
    })
}