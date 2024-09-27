import { AppBar, Box, CircularProgress, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PlanYearSelect from "../../components/planYearSelect/planYearSelect";
import { useGetOverviewsByMonthsQuery } from "../../redux/api/overview/overview";
import ChipArray from "./components/chipArray";
import MonthCard from "./components/monthCard";
import "./overview.css";

export default function Overview() {
    const { t } = useTranslation()
    const appBarRef = useRef(null)
    const months = useSelector((state) => state.selectedMonths)
    const selectedYear = useSelector((state) => state.selectedYear)

    const appBarHeight = useMemo(() => appBarRef?.current?.clientHeight, [appBarRef ? appBarRef?.current?.clientHeight : null])
    const selectedMonths = useMemo(() => months.filter(m => m.isSelected).map(m => m.id), [months])

    const { data: overviews, isFetching: isFetchingOverviews } = useGetOverviewsByMonthsQuery({ year: selectedYear, months: selectedMonths }, { skip: selectedMonths.length === 0 })
    // Height 56px = bottom navigation, 16px = top and bottom margin for body

    // Height on stack take 100% - appbar height - 2x16px padding
    return (
        <Box sx={{ height: "calc(100vh - 56px - 16px)" }}>
            <AppBar ref={appBarRef} position="static" sx={{ backgroundColor: "transparent" }}>
                <Paper>
                    <Grid2 container >
                        <Grid2 size={{ xs: 1, md: 1.4 }} alignContent={"center"}>
                            <PlanYearSelect />
                        </Grid2>
                        <Grid2 size={{ xs: 11, md: 9.2 }} >
                            <ChipArray />
                        </Grid2>
                        <Grid2 size={{ xs: 0, md: 1.4 }} alignContent={"center"} textAlign={"right"} p={1}>
                            {/* Empty just to center Chip array */}
                        </Grid2>
                    </Grid2>
                </Paper>
            </AppBar>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ overflowX: "auto", height: `calc(100% - ${appBarHeight}px - 32px)` }} p={2} spacing={2}>
                {isFetchingOverviews ? <CircularProgress /> : (
                    selectedMonths.length > 0 ?
                        Object.entries(overviews?.months).map?.(([key, m]) => <MonthCard key={key} monthIdx={key} monthObj={m} />)
                        : <Typography>{t('pages.overview.noMonthSelectText')}</Typography>
                )}
            </Stack>
        </Box>

    )
}
