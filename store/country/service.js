import axios from "axios";
import {
    excursionFetching, excursionFetchingSuccess, excursionFetchingError,
excursionFetchingSuccessCity, excursionFetchingSuccessExcursion,
} from "./reducer";

export const fetchCounter = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/countries/${id}`)
        dispatch(excursionFetchingSuccess(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}
export const fetchCounterCity = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities?country=${id}`)
        dispatch(excursionFetchingSuccessCity(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}
export const fetchCounterExcursion = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions?country=${id}`)
        dispatch(excursionFetchingSuccessExcursion(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}