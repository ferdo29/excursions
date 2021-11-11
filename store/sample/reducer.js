import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchUsers} from "./asyncAction";


const initialState = {
    users: [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        }
    ],
    isLoading: false,
    error: ''
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUsers.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
        },
        [fetchUsers.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {} = counterSlice.actions
export default counterSlice.reducer