import {USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }), keepUnusedDataFor: 5,
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }), keepUnusedDataFor: 5,
        }),
        getUserByPermission: builder.query({
            query: (permission) => ({}), keepUnusedDataFor: 5,
        }),
        getUserByEmail: builder.query({
            query: (email) => ({}), keepUnusedDataFor: 5,
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: USERS_URL,
                method: 'POST',
                body: newUser,
            }), 
        }),
        updateUser: builder.mutation({
            query: ({ userId, updatedUser }) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'PUT',
                body: updatedUser,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByPermissionQuery,
    useGetUserByEmailQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = recipesApiSlice