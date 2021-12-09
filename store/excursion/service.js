import axios from "axios";
import {excursionFetching, excursionFetchingSuccess, excursionFetchingError} from "./reducer";

export const fetchExcursion = ({id= 1, token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/${id}`)
        const {data: reviews} = await axios.get(`${process.env.DB_HOST}/excursions/${id}/reviews`)
        dispatch(excursionFetchingSuccess({data, reviews}))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}