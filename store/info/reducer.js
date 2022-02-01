import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {
        facebook: 'https://facebook.com',
        vk: 'https://vk.com',
        instagram: 'https://instagram.com',
        site: 'https://vk.com',
    },
    isLoading: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo(state, action) {
            state.isLoading = false
            if(action.payload) state.data = action.payload
        },
        infoFetching(state) {
            state.isLoading = true
        },
        infoFetchingSuccess(state, action) {
            state.isLoading = false
            state.data = action.payload
        },
        infoFetchingError(state, action) {
            state.isLoading = false
            state.error = action.payload
        }

    },

})

export const {
    setInfo,
    infoFetching,
    infoFetchingError,
    infoFetchingSuccess,
} = counterSlice.actions
export default counterSlice.reducer