import { AppBar, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo, useRef } from "react";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import ChipArray from "./components/chipArray";
import MonthCard from "./components/monthCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Overview() {
    const {t} = useTranslation()
    const appBarRef = useRef(null)
    const months = useSelector((state) => state.selectedMonths)

    const selectedMonths = useMemo(() => months.filter(m => m.isSelected).map(m => m.id), [months])

    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: 2024, months: selectedMonths }, {skip: selectedMonths.length === 0})
    // Height 56px = bottom navigation, 16px = top and bottom margin for body

    // Height on stack take 100% - appbar height - 2x16px padding
    return (
        <Box sx={{ height: "calc(100vh - 56px - 16px)" }}>
            <AppBar ref={appBarRef} position="static">
                <ChipArray />
            </AppBar>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ overflowX: "auto", height: `calc(100% - ${appBarRef?.current?.clientHeight}px - 32px)` }} p={2}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    selectedMonths.length > 0 ?
                        Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                        : <Typography>{t('pages.overview.noMonthSelectText')}</Typography>
                )}
            </Stack>
        </Box>

    )
}
