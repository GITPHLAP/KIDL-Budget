import { createSlice } from '@reduxjs/toolkit'

/**
 * Check if **monthId** is the current month
 * @param {int} monthId Should be index e.g January = 0
 * @returns {bool} Returns true or false
 */
const isCurrentMonth = (monthId) => {
    const d = new Date();
    return monthId == d.getMonth()
} 

const initialState = [
    { id: 1, name: "general.months.january", isSelected: isCurrentMonth(0) },
    { id: 2, name: "general.months.february", isSelected: isCurrentMonth(1) },
    { id: 3, name: "general.months.march", isSelected: isCurrentMonth(2) },
    { id: 4, name: "general.months.april", isSelected: isCurrentMonth(3) },
    { id: 5, name: "general.months.may", isSelected: isCurrentMonth(4) },
    { id: 6, name: "general.months.june", isSelected: isCurrentMonth(5) },
    { id: 7, name: "general.months.july", isSelected: isCurrentMonth(6) },
    { id: 8, name: "general.months.august", isSelected: isCurrentMonth(7) },
    { id: 9, name: "general.months.september", isSelected: isCurrentMonth(8) },
    { id: 10, name: "general.months.october", isSelected: isCurrentMonth(9) },
    { id: 11, name: "general.months.november", isSelected: isCurrentMonth(10) },
    { id: 12, name: "general.months.december", isSelected: isCurrentMonth(11) },
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