import axios from "axios";
import {
    countriesFetching, countriesFetchingSuccess, countriesFetchingError,
} from "./reducer";
import {setInfo} from "../info/reducer";

export const fetchCounter = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(countriesFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/countries/`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(countriesFetchingSuccess(data))
    }catch (e) {
        dispatch(countriesFetchingError(e.response.message))
    }
}