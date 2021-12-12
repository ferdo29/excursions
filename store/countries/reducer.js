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
        countriesFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        countriesFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
        },
        countriesFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        countriesDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.data = {}
        },
    },

})

export const {setCountries, countriesFetching, countriesFetchingSuccess, countriesFetchingError,} = counterSlice.actions
export default counterSlice.reducer