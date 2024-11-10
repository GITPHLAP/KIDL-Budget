import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        createCategoryMapping: builder.mutation({
            query: (data) => ({
                url: '/transaction_categories/mapping',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['TransCateMappingList']
        }),
        updateCategoryMapping: builder.mutation({
            query: (data) => ({
                url: 'transaction_categories/mapping',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['TransCateMappingList']
        }),
        deleteCategoryMapping: builder.mutation({
            query: (id) => ({
                url: `/transaction_categories/mapping/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TransCateMappingList']
        }),

        // QUERIES
        getCategoryMappings: builder.query({
            query: () => ({
                url: '/transaction_categories/mapping',
                method: 'GET'
            }),
            providesTags: ['TransCateMappingList'],
            transformResponse: (response) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreateCategoryMappingMutation,
    useUpdateCategoryMappingMutation,
    useDeleteCategoryMappingMutation,
    useGetCategoryMappingsQuery,
} = extendedApi