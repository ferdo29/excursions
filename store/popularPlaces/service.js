import {excursionFetching, excursionFetchingSuccess, excursionFetchingError, excursionFetchingSuccessExcursion, excursionFetchingSuccessData, excursionFetchingErrorData} from "./reducer";
import axios from "axios";


export const fetchPopularPlaces = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities/${id}`)
        dispatch(excursionFetchingSuccess(data.info))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}
export const fetchPopularPlacesData = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities?country=1`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionFetchingSuccessData(data.data))
    }catch (e) {
        dispatch(excursionFetchingErrorData(e.response.message))
    }
}
export const fetchPopularPlacesExcursions = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions?country=${id}`)
        dispatch(excursionFetchingSuccessExcursion(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}