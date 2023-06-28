import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constants'


const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    credentials: 'include',
    tagTypes: ['Recipe', 'Comment', 'User', 'Article'],
    endpoints: (builder) => ({})
})