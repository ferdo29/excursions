import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false,
    error: '',
    playAudio: null
}

const counterSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFile(state, action) {
            state.data.unshift(action.payload)
        },
        setFiles(state, action) {
            state.data = action.payload
        },
        setPlayAudio(state, action) {
            state.playAudio = action.payload
        },
    },

})

export const {setFile, setFiles, setPlayAudio} = counterSlice.actions
export default counterSlice.reducer