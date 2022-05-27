import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        GetUserList: (state, action) => {
            state.users = action.payload
        },
    }
})

export const { GetUserList } = userSlice.actions
export default userSlice.reducer