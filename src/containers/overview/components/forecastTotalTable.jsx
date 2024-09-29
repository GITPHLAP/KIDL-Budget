import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getDiffClassname } from "../../../utils/styleHelper";
import { calculateExpensesForecast, calculateIncomeForecast } from "../../../utils/forecastHelper";

export default function ForecastTable(props) {
    const { t } = useTranslation()
    const {
        expenses_total,
        income_total,
        monthIdx,
    } = props

    const rows = useMemo(() => {
        const incomeForecastTotal = calculateIncomeForecast(income_total.total_actual)
        const expensesForecastTotal = calculateExpensesForecast(expenses_total.total_actual)
        const plan_calc = income_total.total_plan + expenses_total.total_plan
        const forecast_calc = incomeForecastTotal + expensesForecastTotal

        return [
            { type: t('general.income'), ...income_total, forecastSum: incomeForecastTotal, diff: incomeForecastTotal - income_total.total_plan },
            { type: t('general.expenses'), ...expenses_total, forecastSum: expensesForecastTotal, diff: expensesForecastTotal - expenses_total.total_plan },
            {
                type: t('general.inc+exp'),
                total_plan: plan_calc,
                forecastSum: forecast_calc,
                diff: forecast_calc - plan_calc
            },
        ]
    }, [expenses_total, income_total])

    return (
        <TableContainer component={Paper} >
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('general.type')}</TableCell>
                        <TableCell>{t('general.plan')}</TableCell>
                        <TableCell>{t('general.forecast')}</TableCell>
                        <TableCell>{t('general.diff')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={row.type + "-month-" + monthIdx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell >{row.type}</TableCell>
                            <TableCell className={idx == 2 ? getDiffClassname(row.total_plan) : ""}>{row.total_plan?.toFixed(2)}</TableCell>
                            <TableCell className={idx == 2 ? getDiffClassname(row.forecastSum) : ""}>{row.forecastSum?.toFixed(2)}</TableCell>
                            <TableCell className={getDiffClassname(row.diff)}>{row.diff?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}