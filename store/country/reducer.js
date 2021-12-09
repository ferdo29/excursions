import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {},
    excursion:{
        data: [],
        isLoading: false,
        isView: false,
        error: '',
    },
    city:{
        data: [],
        isLoading: false,
        isView: false,
        error: '',
    },
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'country',
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
        },

        excursionFetchingCity(state) {
            state['city'].isLoading = true
            state['city'].isView = false
        },
        excursionFetchingSuccessCity(state, action) {
            state['city'].isLoading = false
            state['city'].isView = true
            state['city'].error = ''
            state['city'].data = action.payload.data
        },
        excursionFetchingErrorCity(state, action) {
            state['city'].isLoading = false
            state['city'].isView = false
            state['city'].error = action.payload
        },
        excursionDeleteCity(state) {
            state['city'].isLoading = false
            state['city'].isView = false
            state['city'].error = ''
            state['city'].data = {}
        },

        excursionFetchingExcursion(state) {
            state['excursion'].isLoading = true
            state['excursion'].isView = false
        },
        excursionFetchingSuccessExcursion(state, action) {
            state['excursion'].isLoading = false
            state['excursion'].isView = true
            state['excursion'].error = ''
            state['excursion'].data = action.payload.data
        },
        excursionFetchingErrorExcursion(state, action) {
            state['excursion'].isLoading = false
            state['excursion'].isView = false
            state['excursion'].error = action.payload
        },
        excursionDeleteExcursion(state) {
            state['excursion'].isLoading = false
            state['excursion'].isView = false
            state['excursion'].error = ''
            state['excursion'].data = {}
        },

    },

})

export const {
    excursionFetching, excursionFetchingSuccess, excursionFetchingError, excursionDelete,
    excursionFetchingCity, excursionFetchingSuccessCity, excursionFetchingErrorCity, excursionDeleteCity,
    excursionFetchingExcursion, excursionFetchingSuccessExcursion, excursionFetchingErrorExcursion, excursionDeleteExcursion,
} = counterSlice.actions
export default counterSlice.reducer