import {excursionFetching, excursionFetchingError, excursionFetchingSuccess} from "./reducer";
import axios from "axios";


export const fetchExcursions = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionFetchingSuccess(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}