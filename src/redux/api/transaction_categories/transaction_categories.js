import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        createTransactionCategory: builder.mutation({
            query: (category) => ({
                url: `/transaction_categories/${category}`,
                method: 'POST',
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
        createCategoryMapping: builder.mutation({
            query: (data) => ({
                url: '/transaction_categories/mapping',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['TransactionList']
        }),
        // QUERIES
        getTransactionCategories: builder.query({
            query: (year) => ({
                url: '/transaction_categories',
                method: 'GET'
            }),
            providesTags: ['TransCategoryList'],
            transformResponse: (response, meta, arg) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useCreateTransactionCategoryMutation,
    useUpdateTransactionCategoryMutation,
    useDeleteTransactionCategoryMutation,
    useCreateCategoryMappingMutation,
    useGetTransactionCategoriesQuery,
} = extendedApi