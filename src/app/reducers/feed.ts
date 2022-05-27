import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Feed } from '../models/Feed'


export const feedApi = createApi({
    reducerPath: 'feedApi',
    tagTypes: ['Feed'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        SavePost: builder.mutation<void, Feed>({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/save-post',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Feed']
        }),
        GetAllFeedPosts: builder.query<Feed[], void>({
            query: () => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/getAllFeeds',
                method: 'GET',
            }),
            providesTags: ['Feed']
        })
    })
})



export const { useSavePostMutation, useGetAllFeedPostsQuery } = feedApi