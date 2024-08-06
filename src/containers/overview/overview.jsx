import { AppBar, Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import ChipArray from "./components/chipArray";
import MonthCard from "./components/monthCard";

export default function Overview() {
    const months = useSelector((state) => state.selectedMonths)
    const appBarRef = useRef(null)

    const selectedMonths = useMemo(() =>
        months.filter(m => m.isSelected).map(m => m.id), [months])
    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: 2024, months: selectedMonths })
    // Height 56px = bottom navigation, 16px = top and bottom margin for body

    // Height on stack take 100% - appbar height - 2x16px padding
    return (
        <Box  sx={{ height: "calc(100vh - 56px - 16px)" }}> 
            <AppBar ref={appBarRef} position="static">
                <ChipArray />
            </AppBar>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ overflowX: "auto", height: `calc(100% - ${appBarRef?.current?.clientHeight}px - 32px)` }} p={2}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                )}
            </Stack>
        </Box>

    )
}
