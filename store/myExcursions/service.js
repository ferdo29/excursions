import axios from "axios";
import {
    myExcursionsFetching, myExcursionsFetchingSuccess, myExcursionsFetchingError
} from "./reducer";

export const fetchMyExcursions = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(myExcursionsFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/my`,
            {headers: {Authorization: `Bearer ${token}`}})
        console.log()
        dispatch(myExcursionsFetchingSuccess(data))
    }catch (e) {
        dispatch(myExcursionsFetchingError(e.response.message))
    }
}
export const fetchMyExcursionsShareCode = ({token= '', code, login}) => async (dispatch) => {
    try {
        dispatch(myExcursionsFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/my`,
            {headers: {Authorization: `Bearer ${token}`}})
        console.log()
        dispatch(myExcursionsFetchingSuccess(data))
    }catch (e) {
        dispatch(myExcursionsFetchingError(e.response.message))
    }
}