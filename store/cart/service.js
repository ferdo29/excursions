import {cartFetching, cartFetchingError, cartFetchingSuccess, setChangeCart} from "./reducer";
import axios from "axios";

export const fetchCart = ({token= ''}) => async (dispatch) => {
    try {
        dispatch(cartFetching())
        const {data} = await axios.get(`${process.env.DB_HOST}/cart`,
            {headers: {Authorization: `Bearer ${token}`}})
        console.log()
        dispatch(cartFetchingSuccess(data))
    }catch (e) {
        dispatch(cartFetchingError(e.response.message))
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
    }
}