import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { rtkQueryErrorLogger } from "./api/apiMiddleware";
import monthSlice from "./reducers/monthSlice";

export default configureStore({
    reducer: {
        selectedMonths: monthSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(apiSlice.middleware)
})