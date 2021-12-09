import {excursionFetching, excursionFetchingError, excursionFetchingSuccess} from "./reducer";
import axios from "axios";

export const fetchFavourite = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/favourite`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionFetchingSuccess(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}