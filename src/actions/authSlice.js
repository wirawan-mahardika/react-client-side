import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getUser = createAsyncThunk('getUser', async ({username, password}, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:1000/api/user/login', {username, password}, {withCredentials: true})
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getme = createAsyncThunk('/user/getme', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:1000/api/user/getme' , {withCredentials: true})
        return response.data
    } catch (error) {
        if(error.response){
            const msg = error.response.data.msg
            return thunkAPI.rejectWithValue(msg)
        }
    }
})

export const logout = createAsyncThunk('/user/logout', async (_) => {
    await axios.delete('http://localhost:1000/api/user/logout', {withCredentials: true})
})

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    message: null,
    isSuccess: false,
    token: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.token
            state.isSuccess = true
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.token = null
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(getme.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getme.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(getme.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })



        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = false
            state.user = null
            state.message = 'Berhasil Logout'
            state.isSuccess = false
            state.isError = true
            state.token = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = null
            state.message = 'Berhasil Logout'
            state.isSuccess = false
            state.isError = true
            state.token = null
        })
    }
})
export const { reset } = authSlice.actions
export default authSlice.reducer