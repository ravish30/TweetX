import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    myPosts: [],
    followingList: [],
    followersList: [],
    user: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        saveMyPosts: (state, action) => {
            state.myPosts = action.payload
        },
        saveUser: (state, action) => {
            state.user = action.payload
        },
        saveMyFollowingList: (state, action) => {
            state.followingList = action.payload
        },
        saveMyFollowerList: (state, action) => {
            state.followersList = action.payload
        },
    }
})

export const { saveMyPosts, saveUser, saveMyFollowingList, saveMyFollowerList } = profileSlice.actions
export default profileSlice.reducer