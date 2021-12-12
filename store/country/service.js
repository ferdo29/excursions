import axios from "axios";
import {
    countryFetching, countryFetchingSuccess, countryFetchingError,
    countryFetchingSuccessCity, countryFetchingSuccessExcursion,
} from "./reducer";

export const fetchCounter = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(countryFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/countries/${id}`)
        dispatch(countryFetchingSuccess(data))
    }catch (e) {
        dispatch(countryFetchingError(e.response.message))
    }
}
export const fetchCounterCity = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(countryFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities?country=${id}`)
        dispatch(countryFetchingSuccessCity(data))
    }catch (e) {
        dispatch(countryFetchingError(e.response.message))
    }
}
export const fetchCounterExcursion = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(countryFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions?country=${id}`)
        dispatch(countryFetchingSuccessExcursion(data))
    }catch (e) {
        dispatch(countryFetchingError(e.response.message))
    }
}