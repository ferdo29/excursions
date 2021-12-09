import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {},
    reviews: [],
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'excursion',
    initialState,
    reducers: {
        excursionFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        excursionFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
            state.reviews = action.payload.reviews
        },
        excursionFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        excursionDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.reviews =[]
            state.data = {}
        }
    },

})

export const {excursionFetching, excursionFetchingSuccess, excursionFetchingError, excursionDelete} = counterSlice.actions
export default counterSlice.reducer