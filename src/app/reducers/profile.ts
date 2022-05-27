import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Feed } from '../models/Feed'
import { User } from '../models/User'


export const profileApi = createApi({
    reducerPath: 'profileApi',
    tagTypes: ['User', 'Feed'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        GetMyPosts: builder.query<Feed[], void>({
            query: () => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/profile/posts',
                method: 'GET',
            }),
            providesTags: ['Feed']
        }),
        GetFollowersList: builder.query<User[], void>({
            query: () => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/profile/followers',
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        GetFollowingList: builder.query<User[], void>({
            query: () => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/profile/following',
                method: 'GET',
            }),
            providesTags: ['User']
        })
    })
})



export const { useGetMyPostsQuery, useGetFollowersListQuery, useGetFollowingListQuery } = profileApi