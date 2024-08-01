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

        getTransactions: builder.query({
            query: (year) => ({
                url: `/transaction/${year}`,
                method: 'GET'
            }),
            providesTags: ['TransactionList'],
            transformResponse: (response, meta, arg) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useInsertTransactionsMutation,
    useGetTransactionsQuery,
} = extendedApi