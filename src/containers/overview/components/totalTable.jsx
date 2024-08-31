import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getDiffClassname } from "../../../utils/styleHelper";

export default function TotalTable(props) {
    const { t } = useTranslation()
    const {
        expenses_total,
        income_total,
        monthIdx,
    } = props

    const rows = useMemo(() => {
        const plan_calc = income_total.total_plan + expenses_total.total_plan
        const actual_calc = income_total.total_actual + expenses_total.total_actual

        return [
            { type: t('general.income'), ...income_total, diff: income_total.total_actual - income_total.total_plan },
            { type: t('general.expenses'), ...expenses_total, diff: expenses_total.total_actual - expenses_total.total_plan },
            {
                type: t('general.inc+exp'),
                total_plan: plan_calc,
                total_actual: actual_calc,
                diff: actual_calc - plan_calc
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
                        <TableCell>{t('general.actual')}</TableCell>
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
                            <TableCell className={idx == 2 ? getDiffClassname(row.total_actual) : ""}>{row.total_actual?.toFixed(2)}</TableCell>
                            <TableCell className={getDiffClassname(row.diff)}>{row.diff?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}