import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'favourite',
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
            if(action.payload.data) state.data = action.payload.data
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
        setLikeById(state, action){
            const index = state.data.findIndex(value => value.id === action.payload)
            state.data[index].liked = !state.data[index].liked
        },
    },

})

export const {setCountries, excursionFetching, excursionFetchingSuccess, excursionFetchingError, setLikeById} = counterSlice.actions
export default counterSlice.reducer