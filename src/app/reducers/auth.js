import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        SignUpUser: builder.mutation({
            query: (data) => ({
                url: '/api/register',
                method: 'POST',
                body: data,
            })
        }),
        SignInUser: builder.mutation({
            query: (data) => ({
                url: '/api/login',
                method: 'POST',
                body: data
            })
        })
    })
})



export const { useSignInUserMutation, useSignUpUserMutation } = authApi