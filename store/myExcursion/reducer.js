import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {},
    isLoading: false,
    isView: false,
    error: '',
    idExcursion: null
}

const counterSlice = createSlice({
    name: 'myExcursion',
    initialState,
    reducers: {
        myExcursionLinks(state, action) {
            state.idExcursion = action.payload
        },
        setCountries(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },
        setMyExcursionPath(state, action){
            state.data.audio[0].file = action.payload
        },

        myExcursionFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        myExcursionFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            state.data = action.payload.data
        },
        myExcursionFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        myExcursionDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.data = {}
        },
    },

})

export const {
    setCountries,
    myExcursionFetching,
    myExcursionFetchingSuccess,
    myExcursionFetchingError,
    myExcursionDelete,
    myExcursionLinks,
    setMyExcursionPath
} = counterSlice.actions
export default counterSlice.reducer