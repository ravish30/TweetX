import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import loaderReducer from './slices/loaderSlice'
import feedReducer from './slices/feedSlice'
import userReducer from './slices/userSlice'
import profileReducer from './slices/profileSlice'
import { authApi } from "./reducers/auth";
import { feedApi } from "./reducers/feed.ts";
import { userApi } from "./reducers/users.ts";
import { profileApi } from "./reducers/profile.ts";



export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth: authReducer,
    loader: loaderReducer,
    feed: feedReducer,
    user: userReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(feedApi.middleware).concat(userApi.middleware).concat(profileApi.middleware),
})


