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
        favouriteFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        favouriteFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            if(action.payload.data) state.data = action.payload.data
        },
        favouriteFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        favouriteDelete(state) {
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

export const {setCountries, favouriteFetching, favouriteFetchingSuccess, favouriteFetchingError, setLikeById} = counterSlice.actions
export default counterSlice.reducer