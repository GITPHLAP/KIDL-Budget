import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger =
    (api) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!')
            console.log('Peek - action on ln: 12 ', action);
            toast.error('data' in action.error
                ? (action.error.data).message
                : action.error.message)
        }
        return next(action)
    }