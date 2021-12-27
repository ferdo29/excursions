import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'myExcursions',
    initialState,
    reducers: {
        setCountries(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },
        myExcursionsFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        myExcursionsFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
        },
        myExcursionsFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        myExcursionsDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.data = {}
        },
    },

})

export const {setCountries, myExcursionsFetching, myExcursionsFetchingSuccess, myExcursionsFetchingError,} = counterSlice.actions
export default counterSlice.reducer