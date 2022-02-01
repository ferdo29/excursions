import {infoFetching, infoFetchingError, infoFetchingSuccess} from "./reducer";
import axios from "axios";

export const fetchInfo = () => async (dispatch) => {
    try {
        dispatch(infoFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/info/social`)
        dispatch(infoFetchingSuccess(data.data))
    }catch (e) {
        dispatch(infoFetchingError(e.response.message))
    }
}