import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        createTransactionCategory: builder.mutation({
            query: (data) => ({
                url: `/transaction_categories`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TransCategoryList']
        }),
        updateTransactionCategory: builder.mutation({
            query: (data) => ({
                url: 'transaction_categories',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['TransCategoryList']
        }),
        deleteTransactionCategory: builder.mutation({
            query: (id) => ({
                url: `/transaction_categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TransCategoryList']
        }),
        // QUERIES
        getTransactionCategories: builder.query({
            query: () => ({
                url: '/transaction_categories',
                method: 'GET'
            }),
            providesTags: ['TransCategoryList'],
            transformResponse: (response) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreateTransactionCategoryMutation,
    useUpdateTransactionCategoryMutation,
    useDeleteTransactionCategoryMutation,
    useGetTransactionCategoriesQuery,
} = extendedApi