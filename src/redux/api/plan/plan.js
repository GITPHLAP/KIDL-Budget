import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        createPlan: builder.mutation({
            query: (data) => ({
                url: `/plan`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['PlanList']
        }),
        updatePlan: builder.mutation({
            query: (data) => ({
                url: 'plan',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['PlanList']
        }),
        // QUERIES
        getPlans: builder.query({
            query: (year) => ({
                url: `/plan/${year}`,
                method: 'GET'
            }),
            providesTags: ['PlanList'],
            transformResponse: (response, meta, arg) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useGetPlansQuery,
} = extendedApi