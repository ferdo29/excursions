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

        popularPlacesFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        popularPlacesFetchingSuccessData(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            if(action.payload) state.data = action.payload
        },
        popularPlacesFetchingErrorData(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        popularPlacesFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state['one'].error = ''
            state['one'].data = action.payload
        },
        popularPlacesFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state['one'].error = action.payload
        },
        popularPlacesDelete(state) {
            state.isLoading = false
            state.isView = false
            state['one'].error = ''
            state['one'].reviews =[]
            state['one'].data = {}
        },

        popularPlacesFetchingExcursion(state) {
            state.isLoading = true
            state.isView = false
        },
        popularPlacesFetchingSuccessExcursion(state, action) {
            state.isLoading = false
            state.isView = true
            state['excursion'].error = ''
            state['excursion'].data = action.payload.data
        },
        popularPlacesFetchingErrorExcursion(state, action) {
            state.isLoading = false
            state.isView = false
            state['excursion'].error = action.payload
        },
        popularPlacesDeleteExcursion(state) {
            state.isLoading = false
            state.isView = false
            state['excursion'].error = ''
            state['excursion'].data = {}
        },

    },

})

export const {
    setPopularPlaces,
    popularPlacesFetching,
    popularPlacesFetchingSuccess,
    popularPlacesFetchingError,
    popularPlacesDelete,
    popularPlacesFetchingExcursion,
    popularPlacesFetchingSuccessExcursion,
    popularPlacesFetchingErrorExcursion,
    popularPlacesDeleteExcursion,
    popularPlacesFetchingSuccessData,
    popularPlacesFetchingErrorData
} = counterSlice.actions
export default counterSlice.reducer