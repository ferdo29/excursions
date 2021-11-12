import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: ['', '', '', ''],
    fetchData: '',
    isLoading: false,
    error: '',
    timer: '0:24',
    timerView: true,
}

const counterSlice = createSlice({
    name: 'sms',
    initialState,
    reducers: {
        changeState(state, {payload}){
            state.data[payload.num] = payload.value
        },
        clearState(state){
            state.data = ['', '', '', '']
        }
    },

})

export const {changeState, clearState} = counterSlice.actions
export default counterSlice.reducer