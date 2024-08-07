import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";

export default function TotalTable(props) {
    const {
        expenses_total,
        income_total,
        monthIdx,
    } = props

    const rows = useMemo(() => {
        const forecast_calc = income_total.total_forecast + expenses_total.total_forecast
        const actual_calc = income_total.total_actual + expenses_total.total_actual

        return [
            { type: "income", ...income_total, diff: income_total.total_forecast - income_total.total_actual },
            { type: "expenses", ...expenses_total, diff: expenses_total.total_actual - expenses_total.total_forecast },
            {
                type: "inc+exp",
                total_forecast: forecast_calc,
                total_actual: actual_calc,
                diff: actual_calc - forecast_calc
            },
        ]
    }, [expenses_total, income_total])

    return (
        <TableContainer component={Paper} >
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Forecast</TableCell>
                        <TableCell>Actual</TableCell>
                        <TableCell>Diff</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.type + "-month-" + monthIdx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.total_forecast?.toFixed(2)}</TableCell>
                            <TableCell>{row.total_actual?.toFixed(2)}</TableCell>
                            <TableCell>{row.diff?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}