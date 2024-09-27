import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { rtkQueryErrorLogger } from "./api/apiMiddleware";
import monthSlice from "./reducers/monthSlice";
import yearSlice from "./reducers/yearSlice";

export default configureStore({
    reducer: {
        selectedMonths: monthSlice,
        selectedYear: yearSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(apiSlice.middleware)
})