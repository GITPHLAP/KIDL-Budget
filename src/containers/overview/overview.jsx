import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import MonthCard from "./components/monthCard";
import "./overview.css";

export default function Overview() {
    const { t } = useTranslation()
    const months = useSelector((state) => state.selectedMonths)
    const selectedYear = useSelector((state) => state.selectedYear)

    const selectedMonths = useMemo(() => months.filter(m => m.isSelected).map(m => m.id), [months])

    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: selectedYear, months: selectedMonths }, { skip: selectedMonths.length === 0 })

    // Height on stack take 100% - appbar height - 2x16px padding
    return (
        <Box sx={{ flex: 1, height: "100%" }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ overflowX: "auto", height: `100%` }} p={2} spacing={2}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    selectedMonths.length > 0 ?
                        Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                        : <Typography>{t('pages.overview.noMonthSelectText')}</Typography>
                )}
            </Stack>
        </Box>

    )
}
