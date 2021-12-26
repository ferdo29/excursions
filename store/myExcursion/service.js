import axios from "axios";
import {
    myExcursionFetching, myExcursionFetchingSuccess, myExcursionFetchingError
} from "./reducer";

export const fetchMyExcursion = ({token= '', id = 1}) => async (dispatch) => {
    try {
        dispatch(myExcursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/excursions/my/${id} `,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(myExcursionFetchingSuccess(data))
    }catch (e) {
        dispatch(myExcursionFetchingError(e.response.message || 'Error'))
    }
}