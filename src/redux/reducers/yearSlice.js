import { createSlice } from '@reduxjs/toolkit'

const currentYear = () => {
    const d = new Date();
    return d.getFullYear()
} 

const initialState = currentYear()

export const yearSlice = createSlice({
    name: 'selectedYear',
    initialState,
    reducers: {
        selectYear: (state, action) => {
            // set year 
            state = action?.payload
            return state
        }
    }
})

export const { selectYear } = yearSlice.actions

export default yearSlice.reducer