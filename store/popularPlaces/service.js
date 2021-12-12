import {
    popularPlacesFetching,
    popularPlacesFetchingSuccess,
    popularPlacesFetchingError,
    popularPlacesFetchingSuccessExcursion,
    popularPlacesFetchingSuccessData,
    popularPlacesFetchingErrorData
} from "./reducer";
import axios from "axios";


export const fetchPopularPlaces = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(popularPlacesFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities/${id}`)
        dispatch(popularPlacesFetchingSuccess(data.info))
    }catch (e) {
        dispatch(popularPlacesFetchingError(e.response.message))
    }
}
export const fetchPopularPlacesData = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(popularPlacesFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cities?country=1`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(popularPlacesFetchingSuccessData(data.data))
    }catch (e) {
        dispatch(popularPlacesFetchingErrorData(e.response.message))
    }
}
export const fetchPopularPlacesExcursions = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(popularPlacesFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions?country=${id}`)
        dispatch(popularPlacesFetchingSuccessExcursion(data))
    }catch (e) {
        dispatch(popularPlacesFetchingError(e.response.message))
    }
}