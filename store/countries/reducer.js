import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },
        excursionFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        excursionFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
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
            state.data = {}
        },
    },

})

export const {setCountries, excursionFetching, excursionFetchingSuccess, excursionFetchingError,} = counterSlice.actions
export default counterSlice.reducer