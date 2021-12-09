import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false,
    isView: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'cart',
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
            let names = []
            let data = []

            action?.payload?.data && action.payload.data.forEach(value => {
                if(!names.includes(value.name)){
                    names.push(value.name)
                    data.push(value)
                }
                else{
                    const index = data.findIndex(item => item.name === value.name)
                    data[index].quantity = data[index].quantity + value.quantity
                }
            })

            state.data = data
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
        setAddToCart(state, action){
            state.data.push(action.payload)
        },
        setDeleteCartById(state, action){
            const index = state.data.findIndex(value => value.id === action.payload)
            state.data.splice(index, 1)
        },
        setChangeCartById(state, action){
            const index = state.data.findIndex(value => value.id === action.payload.id)
            state.data[index].quantity = action.payload.value.replace(/[aA-zZ',~.!?;:()"|\/\\@#$%ˆ&*()_\-=+{}\[\]`˜±§<>©˙∆˚¬…Ω≈√∫˜µ≥≤÷∑´®†¥¨ˆøπ“‘]/g, '')
        },
        setChangeCart(state, action){
            const index = state.data.findIndex(value => value.id === action.payload.id)
            state.data[index].quantity = action.payload.value
        },

    },

})

export const {setCountries, excursionFetching, excursionFetchingSuccess, excursionFetchingError,
    setAddToCart, setDeleteCartById, setChangeCartById, setChangeCart} = counterSlice.actions
export default counterSlice.reducer