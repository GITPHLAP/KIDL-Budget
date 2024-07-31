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

    }),

    overrideExisting: false,
})

export const {
    useInsertTransactionsMutation,
} = extendedApi