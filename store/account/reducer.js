import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: {},
    isLoading: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setPhoneAccount(state, action){
            state.data.phone = action.payload.replace(/\D+/g,"")
        },
        accountFetching(state) {
            state.isLoading = true
        },
        accountLogin(state, action){
            state.isLoading = false
            state.data = action.payload
        },
        excursionFetchingError(state, action) {
            state.isLoading = false
            state.data = null
            state.error = action.payload
        },
        accountLogout(state){
            state.data = null
        },
    },

})

export const {setPhoneAccount, accountFetching, accountLogin, excursionFetchingError, accountLogout} = counterSlice.actions
export default counterSlice.reducer