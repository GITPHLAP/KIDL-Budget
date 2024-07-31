import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { rtkQueryErrorLogger } from "./api/apiMiddleware";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(apiSlice.middleware)
})