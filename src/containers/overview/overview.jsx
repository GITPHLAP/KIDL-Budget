import { AppBar, Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import ChipArray from "./components/chipArray";
import MonthCard from "./components/monthCard";

export default function Overview() {
    const months = useSelector((state) => state.selectedMonths)

    const selectedMonths = useMemo(() =>
        months.filter(m => m.isSelected).map(m => m.id), [months])
    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: 2024, months: selectedMonths })
    // Height 56px = bottom navigation, 16px = top and bottom margin for body
    return (
        <Box  sx={{ height: "calc(100vh - 56px - 16px)" }}> 
            <AppBar position="static">
                <ChipArray />
            </AppBar>
            <Stack direction="row" sx={{ overflowX: "auto", height: "calc(100% - 56px - 16px)" }} p={2}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                )}
            </Stack>
        </Box>

    )
}
