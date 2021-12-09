import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {},
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

    },

})

export const {setInfo} = counterSlice.actions
export default counterSlice.reducer