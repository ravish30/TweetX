import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../models/User'


export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        FollowUser: builder.mutation<void, string>({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/follow-user',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        GetAllUsers: builder.query<User[], void>({
            query: () => ({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: '/api/getAllUsers',
                method: 'GET',
            }),
            providesTags: ['User']
        })
    })
})



export const { useFollowUserMutation, useGetAllUsersQuery } = userApi