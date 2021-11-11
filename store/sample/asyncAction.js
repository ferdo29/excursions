import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/all',
    async (_, thunkAPI) => {
        try {
            const usersAPI = await axios.get('https://jsonplaceholder.typicode.com/users')
            return usersAPI.data
        }catch (e) {
            return thunkAPI.rejectWithValue('Error')
        }
    }
)