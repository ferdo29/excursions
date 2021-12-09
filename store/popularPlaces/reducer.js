import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    excursion: {
        data: [],
        isLoading: false,
        isView: false,
        error: '',
    },
    one: {
        data: {},
        isLoading: false,
        isView: false,
        error: '',
    },
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'popularPlaces',
    initialState,
    reducers: {
        setPopularPlaces(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },

        excursionFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        excursionFetchingSuccessData(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            if(action.payload) state.data = action.payload
        },
        excursionFetchingErrorData(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        excursionFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state['one'].error = ''
            state['one'].data = action.payload
        },
        excursionFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state['one'].error = action.payload
        },
        excursionDelete(state) {
            state.isLoading = false
            state.isView = false
            state['one'].error = ''
            state['one'].reviews =[]
            state['one'].data = {}
        },

        excursionFetchingExcursion(state) {
            state.isLoading = true
            state.isView = false
        },
        excursionFetchingSuccessExcursion(state, action) {
            state.isLoading = false
            state.isView = true
            state['excursion'].error = ''
            state['excursion'].data = action.payload.data
        },
        excursionFetchingErrorExcursion(state, action) {
            state.isLoading = false
            state.isView = false
            state['excursion'].error = action.payload
        },
        excursionDeleteExcursion(state) {
            state.isLoading = false
            state.isView = false
            state['excursion'].error = ''
            state['excursion'].data = {}
        },

    },

})

export const {setPopularPlaces, excursionFetching, excursionFetchingSuccess, excursionFetchingError, excursionDelete,
    excursionFetchingExcursion, excursionFetchingSuccessExcursion, excursionFetchingErrorExcursion, excursionDeleteExcursion,
    excursionFetchingSuccessData, excursionFetchingErrorData
} = counterSlice.actions
export default counterSlice.reducer