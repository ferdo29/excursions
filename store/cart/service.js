import {excursionFetching, excursionFetchingError, excursionFetchingSuccess, setChangeCart} from "./reducer";
import axios from "axios";

export const fetchCart = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(excursionFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cart`,
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(excursionFetchingSuccess(data))
    }catch (e) {
        dispatch(excursionFetchingError(e.response.message))
    }
}
export const fetchCartChange = ({token, id, quantity}) => async (dispatch) => {
    try {
        let quant = quantity.replace(/[aA-zZ',~.!?;:()"|\/\\@#$%ˆ&*()_\-=+{}\[\]`˜±§<>©˙∆˚¬…Ω≈√∫˜µ≥≤÷∑´®†¥¨ˆøπ“‘]/g, '')
        if(!quant) quant = 0
        await axios.patch(`${process.env.DB_HOST}/cart/${id}`,
            {quantity: quant},
            {headers: {Authorization: `Bearer ${token}`}})
        dispatch(setChangeCart({value: quant, id}))
    }catch (e) {
        console.log(e)
    }
}