import {favouriteFetching, favouriteFetchingError, favouriteFetchingSuccess} from "./reducer";
import axios from "axios";

export const fetchFavourite = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(favouriteFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/favourite`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(favouriteFetchingSuccess(data))
    }catch (e) {
        dispatch(favouriteFetchingError(e.response.message))
    }
}