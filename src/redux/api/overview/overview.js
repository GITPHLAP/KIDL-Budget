import queryString from 'query-string'
import { apiSlice } from '../apiSlice'

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // QUERIES
        getOverviewsByMonths: builder.query({
            query: (data) => ({
                url: `/overview/${data.year}?` + queryString.stringify({months: data.months}, {arrayFormat: 'none'}),
                method: 'GET'
            }),
            providesTags: ['TransCategoryList', 'TransactionList', 'TransCateMappingList', 'PlanList'],
            transformResponse: (response) => {
                const transformedData = {
                    year: response.data[0].year,
                    months: response.data[0].months.reduce((acc, monthObj) => {
                        // month element is an object of month number and data
                        // Thats why reducing it
                        const monthKey = Object.keys(monthObj)[0];
                        // Merge all fields into one object 
                        acc[monthKey] = monthObj[monthKey].reduce((acc, curr) => ({ ...acc, ...curr }), {});
                        return acc;
                    }, {})
                };
                return transformedData
            }
        }),
        getYearOverviewByYearAndType: builder.query({
            query: (params) => ({
                url: `/overview/template/${params.year}/${params.type}`,
                method: 'GET'
            }),
            transformResponse: (response) => response.data
        }),

    }),

    overrideExisting: false,
})

export const {
    useGetOverviewsByMonthsQuery,
    useLazyGetYearOverviewByYearAndTypeQuery,
} = extendedApi