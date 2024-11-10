import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Show a toast!
 */
export const rtkQueryErrorLogger =
    () => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            toast.error(
                action?.payload?.data?.meta?.message + ": " +
                action?.payload?.data?.meta?.description
            )
        }
        return next(action)
    }