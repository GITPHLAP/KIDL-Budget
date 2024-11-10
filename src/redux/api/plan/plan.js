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
        copyPlan: builder.mutation({
            query: (data) => ({
                url: `/plan/copy_plan/${data.fromYear}/${data.toYear}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['PlanYearList']
        }),
        // QUERIES
        getPlans: builder.query({
            query: (year) => ({
                url: `/plan/${year}`,
                method: 'GET'
            }),
            providesTags: ['PlanList'],
            transformResponse: (response) => response.data
        }),
        getPlanYears: builder.query({
            query: () => ({
                url: `/plan`,
                method: 'GET'
            }),
            providesTags: ['PlanYearList'],
            transformResponse: (response) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useGetPlansQuery,
    useGetPlanYearsQuery,
    useCopyPlanMutation,
} = extendedApi