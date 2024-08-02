import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        createForecast: builder.mutation({
            query: (data) => ({
                url: `/forecast`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ForecastList']
        }),
        updateForecast: builder.mutation({
            query: (data) => ({
                url: 'forecast',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['ForecastList']
        }),
        // QUERIES
        getForecasts: builder.query({
            query: (year) => ({
                url: `/forecast/${year}`,
                method: 'GET'
            }),
            providesTags: ['ForecastList'],
            transformResponse: (response, meta, arg) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreateForecastMutation,
    useUpdateForecastMutation,
    useGetForecastsQuery,
} = extendedApi