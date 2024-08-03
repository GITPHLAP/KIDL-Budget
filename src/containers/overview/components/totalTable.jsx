import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";

export default function TotalTable(props) {
    const {
        expenses_total,
        income_total
    } = props

    const rows = useMemo(() => {
        const forecast_calc = income_total.total_forecast + expenses_total.total_forecast
        const actual_calc = income_total.total_actual + expenses_total.total_actual

        return [
            { type: "income", ...income_total, diff: income_total.total_forecast - income_total.total_actual },
            { type: "expenses", ...expenses_total, diff: expenses_total.total_forecast - expenses_total.total_actual },
            {
                type: "diff",
                total_forecast: forecast_calc,
                total_actual: actual_calc,
                diff: forecast_calc - actual_calc
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
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.total_forecast}</TableCell>
                            <TableCell>{row.total_actual}</TableCell>
                            <TableCell>{row.diff}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}