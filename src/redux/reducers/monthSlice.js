import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Initial months - TODO: current month should be selected
const initialState = [
    { id: 1, name: "January", isSelected: true },
    { id: 2, name: "Febuary", isSelected: false },
    { id: 3, name: "March", isSelected: false },
    { id: 4, name: "April", isSelected: false },
    { id: 5, name: "May", isSelected: false },
    { id: 6, name: "June", isSelected: false },
    { id: 7, name: "July", isSelected: false },
    { id: 8, name: "August", isSelected: false },
    { id: 9, name: "September", isSelected: false },
    { id: 10, name: "October", isSelected: false },
    { id: 11, name: "November", isSelected: false },
    { id: 12, name: "December", isSelected: false },
]

export const monthSlice = createSlice({
    name: 'selectedMonths',
    initialState,
    reducers: {
        toggleMonth: (state, action) => {
            // Find index of month object by id 
            const t = state.map(s => s.id).indexOf(action?.payload)
            // Toggle isSelected for the selected month
            state[t].isSelected = !state[t]?.isSelected
        }
    }
})

export const { toggleMonth } = monthSlice.actions

export default monthSlice.reducer