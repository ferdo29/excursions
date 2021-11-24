import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    page: 1,
    arrayPage: [true, false, false],
    state: false
}

const counterSlice = createSlice({
    name: 'previewPagination',
    initialState,
    reducers: {
        nextPage(state){
            state.page++
            state.arrayPage = state.arrayPage.map((value, index) => (index + 1) === state.page)
        },
        backPage(state){
            state.page--
            state.arrayPage = state.arrayPage.map((value, index) => (index - 1) === state.page)
        },
        setStatePreview(state, action){
            state.state = action.payload
        }
    },

})

export const {nextPage, backPage, setStatePreview} = counterSlice.actions
export default counterSlice.reducer