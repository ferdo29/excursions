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
        countryFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        countryFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
        },
        countryFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        countryDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.reviews =[]
            state.data = {}
        },

        countryFetchingCity(state) {
            state['city'].isLoading = true
            state['city'].isView = false
        },
        countryFetchingSuccessCity(state, action) {
            state['city'].isLoading = false
            state['city'].isView = true
            state['city'].error = ''
            state['city'].data = action.payload.data
        },
        countryFetchingErrorCity(state, action) {
            state['city'].isLoading = false
            state['city'].isView = false
            state['city'].error = action.payload
        },
        countryDeleteCity(state) {
            state['city'].isLoading = false
            state['city'].isView = false
            state['city'].error = ''
            state['city'].data = {}
        },

        countryFetchingExcursion(state) {
            state['excursion'].isLoading = true
            state['excursion'].isView = false
        },
        countryFetchingSuccessExcursion(state, action) {
            state['excursion'].isLoading = false
            state['excursion'].isView = true
            state['excursion'].error = ''
            state['excursion'].data = action.payload.data
        },
        countryFetchingErrorExcursion(state, action) {
            state['excursion'].isLoading = false
            state['excursion'].isView = false
            state['excursion'].error = action.payload
        },
        countryDeleteExcursion(state) {
            state['excursion'].isLoading = false
            state['excursion'].isView = false
            state['excursion'].error = ''
            state['excursion'].data = {}
        },

    },

})

export const {
    countryFetching,
    countryFetchingSuccess,
    countryFetchingError,
    countryDelete,
    countryFetchingCity,
    countryFetchingSuccessCity,
    countryFetchingErrorCity,
    countryDeleteCity,
    countryFetchingExcursion,
    countryFetchingSuccessExcursion,
    countryFetchingErrorExcursion,
    countryDeleteExcursion,
} = counterSlice.actions
export default counterSlice.reducer