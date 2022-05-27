import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isVisible: false,
}


export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        LoaderVisibility: (state, action) => {
            state.isVisible = action.payload
        }
    }
})


export const { LoaderVisibility } = loaderSlice.actions;
export default loaderSlice.reducer;