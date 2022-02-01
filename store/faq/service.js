import {faqFetching, faqFetchingError, faqFetchingSuccess} from "./reducer";
import axios from "axios";


export const fetchFAQ = ({lang}) => async (dispatch) => {
    try {
        dispatch(faqFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/faq/${lang}`)
        dispatch(faqFetchingSuccess(data))
    }catch (e) {
        dispatch(faqFetchingError(e.response.message))
    }
}