import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    allPrice: 0,
    allPriceSale: 0,
    isLoading: false,
    error: '',
}

const CalcPrice = (state) => {
    let price = 0
    state.data.forEach(value => {
        price += value.count * value.price
    })
    return price
}

const counterSlice = createSlice({
    name: 'excursions',
    initialState,
    reducers: {
        setExcursions(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },
        excursionsFetching(state) {
            state.isLoading = true
            state.isView = false
        },
        excursionsFetchingSuccess(state, action) {
            state.isLoading = false
            state.isView = true
            state.error = ''
            if(action.payload.data) state.data = action.payload.data
        },
        excursionsFetchingError(state, action) {
            state.isLoading = false
            state.isView = false
            state.error = action.payload
        },
        excursionsDelete(state) {
            state.isLoading = false
            state.isView = false
            state.error = ''
            state.data = {}
        },
        setLike(state, action){
            state.data[action.payload].liked = !state.data[action.payload].liked
        },
        setLikeById(state, action){
            const index = state.data.findIndex(value => value.id === action.payload)
            state.data[index].liked = !state.data[index].liked
        },
        //old
        setBasket(state, action){
            state.data[action.payload].inBasket = !state.data[action.payload].inBasket
            state.data[action.payload].count = state.data[action.payload].inBasket ? 1 : 0
            state.allPrice = CalcPrice(state)
            state.allPriceSale = CalcPrice(state)
        },
        setBasketById(state, action){
            const index = state.data.findIndex(value => value.id === action.payload)
            state.data[index].inBasket = !state.data[index].inBasket
            state.data[index].count = state.data[index].inBasket ? 1 : 0
            state.allPrice = CalcPrice(state)
            state.allPriceSale = CalcPrice(state)
        },
        setBasketCount(state, action){
            const index = state.data.findIndex(value => value.id === action.payload.id)
            state.data[index].count = action.payload.value
            state.allPrice = CalcPrice(state)
            state.allPriceSale = CalcPrice(state)
        },
    },

})

export const {
    setLike, setBasket, setLikeById, setBasketById, setBasketCount, setExcursions,
    excursionsFetching, excursionsFetchingSuccess, excursionsFetchingError, excursionsDelete
} = counterSlice.actions
export default counterSlice.reducer