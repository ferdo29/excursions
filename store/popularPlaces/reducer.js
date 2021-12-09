import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [
        {
            id: 1,
            country: 'Сортелья',
            count: 'Лиссабон, Португалия ',
            like: false,
            image: require('../../assets/image/city.jpg')
        },
        {
            id: 2,
            country: 'Элваш',
            count: 'Лиссабон, Португалия',
            like: false,
            image: require('../../assets/image/city.jpg')
        },
        {
            id: 3,
            country: 'Португалия, Лисабон',
            count: 'Ламегу',
            like: false,
            image: require('../../assets/image/city.jpg')
        },
    ],
    isLoading: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'popularPlaces',
    initialState,
    reducers: {
        setPopularPlaces(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },

    },

})

export const {setPopularPlaces} = counterSlice.actions
export default counterSlice.reducer