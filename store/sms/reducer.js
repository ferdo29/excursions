import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: ['', '', '', '', '', ''],
    phone: '',
    zipPhone: '',
    email: '',
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
            state.data = ['', '', '', '', '', '']
        },
        clearStateOne(state, {payload}){
            state.data[payload.num] = ''
        },
        setPhoneSMS(state, action){
            state.phone = action.payload.replace(/\D+/g,"")
        },
        setEmailSMS(state, action){
            state.email = action.payload
        },
        setZipPhoneSMS(state, action){
            state.zipPhone = action.payload.replace(/\D+/g,"")
        }
    },

})

export const {changeState, clearState, setPhoneSMS, setEmailSMS, setZipPhoneSMS, clearStateOne} = counterSlice.actions
export default counterSlice.reducer