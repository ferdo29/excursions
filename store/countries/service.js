import axios from "axios";
import {
    excursionFetching, excursionFetchingSuccess, excursionFetchingError,
} from "./reducer";
import {setInfo} from "../info/reducer";

export const fetchCounter = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/countries/`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionFetchingSuccess(data))
        dispatch(setInfo(data.info))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}