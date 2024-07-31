
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5003/v1',
    }),
    tagTypes: ['TransactionList'],
    endpoints: (builder) => ({
        getHealth: builder.query({
            query: () => ({
                url: '/health_check',
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetHealthQuery,
} = apiSlice