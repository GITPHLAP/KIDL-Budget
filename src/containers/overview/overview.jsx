import { CircularProgress, Stack } from "@mui/material";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import MonthCard from "./components/monthCard";

export default function Overview() {
    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: 2024, months: [1, 2] })

    return (
        <>
            <Stack direction="row">
                {isFetchingOverviews ? <CircularProgress /> : (
                    Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                )}
            </Stack>
        </>
    )
}
