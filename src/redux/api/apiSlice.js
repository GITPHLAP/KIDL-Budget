
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiPath } from '../../utils/apiHelper'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ApiPath()}/v1`,
    }),
    tagTypes: [
        'TransactionList', 
        'TransCategoryList', 
        'TransCateMappingList', 
        'PlanList',
        'PlanYearList',
    ],
    endpoints: (builder) => ({
        getHealth: builder.query({
            query: () => ({
                url: '/health_check',
                method: 'GET',
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
    }),
})

export const {
    useGetHealthQuery,
} = apiSlice