// import axios from "axios";
// import {excursionFetching, excursionFetchingSuccess, excursionFetchingError} from "./reducer";
//
// export const fetchAccount = ({}) => async (dispatch) => {
//     try {
//         dispatch(excursionFetching())
//         const {data} = await axios.get(`${process.env.DB_HOST}/excursions/`,
//             {headers: {Authorization: `Bearer ${token}`}})
//         const {data: reviews} = await axios.get(`${process.env.DB_HOST}/excursions/${id}/reviews`, {headers: {Authorization: `Bearer ${token}`}})
//         dispatch(excursionFetchingSuccess({data, reviews}))
//     }catch (e) {
//         dispatch(excursionFetchingError(e.response.message))
//     }
// }