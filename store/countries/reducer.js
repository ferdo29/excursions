import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [
        {
            id: 1,
            country: 'Испания',
            count: '38',
            like: false,
            image: require('../../assets/image/Portug.jpg')
        },
        {
            id: 2,
            country: 'Португалия',
            count: '315',
            like: false,
            image: require('../../assets/image/Portug.jpg')
        },
        {
            id: 3,
            country: 'Россия',
            count: '120',
            like: false,
            image: require('../../assets/image/Portug.jpg')
        },
    ],
    isLoading: false,
    error: '',
}

const counterSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(state, action){
            state.data = action.payload.data
            state.isLoading = action.payload.isLoading
            state.error = action.payload.error
        },
    },

})

export const {setCountries} = counterSlice.actions
export default counterSlice.reducer