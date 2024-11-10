import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // MUTATIONS
        insertTransactions: builder.mutation({
            query: (data) => ({
                url: '/transaction',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['TransactionList']
        }),
        updateTransaction: builder.mutation({
            query: (data) => ({
                url: '/transaction',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['TransactionList']
        }),

        getTransactions: builder.query({
            query: (year) => ({
                url: `/transaction/${year}`,
                method: 'GET'
            }),
            providesTags: ['TransactionList'],
            transformResponse: (response) => response.data
        }),
        getIsBalanceCorrect: builder.query({
            query: () => ({
                url: `/transaction/is_balance_correct`,
                method: 'GET'
            }),
            providesTags: ['TransactionList'],
            transformResponse: (response) => response.data
        }),
    }),

    overrideExisting: false,
})

export const {
    useInsertTransactionsMutation,
    useGetTransactionsQuery,
    useUpdateTransactionMutation,
    useGetIsBalanceCorrectQuery,
} = extendedApi