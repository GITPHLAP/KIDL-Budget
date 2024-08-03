import { AppBar, CircularProgress, Stack } from "@mui/material";
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
    return (
        <>
            <AppBar position="static">
                <ChipArray />
            </AppBar>
            <Stack direction="row" sx={{ overflowX: "auto" }}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                )}
            </Stack>
        </>
    )
}
