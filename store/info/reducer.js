import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {
        facebook: 'https://m.facebook.com/Walksandtalksapp-108902298305526',
        vk: 'https://vk.com/walksandtalks_app ',
        instagram: 'https://instagram.com/walksandtalks_app',
        // site: 'https://vk.com',
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