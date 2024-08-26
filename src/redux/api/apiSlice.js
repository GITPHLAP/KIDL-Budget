
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiPath } from '../../utils/apiHelper'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiPath()}/v1`,
    }),
    tagTypes: ['TransactionList', 'TransCategoryList', 'TransCateMappingList', 'ForecastList'],
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