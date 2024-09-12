import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getDiffClassname } from "../../../utils/styleHelper";
import { calculateForecast } from "../../../utils/forecastHelper";

export default function ForecastTransTable(props) {
    const { t } = useTranslation()
    const {
        transactionData,
        headerColor, // TODO: This should be themed
        monthIdxAndType, // Needed to create unique key values for table
    } = props

    // Sorting rows be category ascending 
    const sortedRows = useMemo(() => {
        const copyOfData = [...transactionData]
        // Calculate the forecast
        const dataWithForecast = copyOfData.map((c) => ({
            ...c,
            "forecastSum": calculateForecast(c.actual_sum)
        }))
        console.log('Peek - dataWithForecast on ln: 23 ', dataWithForecast);
        // Need to create a copy because transactionData is immutable
        const sortedData = dataWithForecast?.sort((a, b) => {
            if (a['category'] < b['category']) return -1;
            if (a['category'] > b['category']) return 1;
            return 0;
        })
        return sortedData
    }, [transactionData])

    return (
        <TableContainer sx={{ maxHeight: "inherit" }} component={Paper} >
            <Table stickyHeader size="small" aria-label="simple table">
                <TableHead sx={{ backgroundColor: headerColor }}>
                    <TableRow>
                        <TableCell>{t('general.category')}</TableCell>
                        <TableCell>{t('general.plan')}</TableCell>
                        <TableCell>{t('general.forecast')}</TableCell>
                        <TableCell>{t('general.diff')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow
                            key={row.category + monthIdxAndType}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.plan_sum?.toFixed(2)}</TableCell>
                            <TableCell>{row.forecastSum?.toFixed(2)}</TableCell>
                            <TableCell className={getDiffClassname((row.forecastSum - row.plan_sum))}>{(row.forecastSum - row.plan_sum)?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}