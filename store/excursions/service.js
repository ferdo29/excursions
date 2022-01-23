import {excursionsFetching, excursionsFetchingError, excursionsFetchingSuccess} from "./reducer";
import axios from "axios";


export const fetchExcursions = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionsFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionsFetchingSuccess(data))
    }catch (e) {
        dispatch(excursionsFetchingError(e.response.message))
    }
}