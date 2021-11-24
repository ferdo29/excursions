import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    type: 'success',
    text1: 'Hello11',
    text2: 'This is some something 👋',
    view: false
}

const counterSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToastState(state, action){
            state.type = action.payload.type
            state.text1 = action.payload.text1
            state.text2 = action.payload.text2
            state.view = true
        },
        closeToastState(state){
            state.type = ''
            state.text1 = ''
            state.text2 = ''
            state.view = false
        }
    },

})

export const {showToastState, closeToastState} = counterSlice.actions
export default counterSlice.reducer