import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    feeds: []
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        MyFeeds: (state, action) => {
            state.feeds = action.payload
        },
    }
})

export const { MyFeeds } = feedSlice.actions
export default feedSlice.reducer