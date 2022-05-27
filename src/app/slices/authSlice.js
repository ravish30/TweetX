import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    authToken: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            state.isAuth = true;
            state.authToken = action.payload
        },
        LogoutUser: (state, action) => {
            state.isAuth = false
        },
    }
})

export const { LoginUser, LogoutUser } = authSlice.actions
export default authSlice.reducer