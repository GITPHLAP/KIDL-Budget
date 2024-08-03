import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function OverviewTransTable(props) {
    const {
        transactionData,
        headerColor // TODO: This should be themed
    } = props

    return (
        <TableContainer component={Paper} >
            <Table size="small" aria-label="simple table">
                <TableHead sx={{ backgroundColor: headerColor }}>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Forecast</TableCell>
                        <TableCell>Actual</TableCell>
                        <TableCell>Diff</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionData.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.forecast_sum}</TableCell>
                            <TableCell>{row.actual_sum}</TableCell>
                            <TableCell>{row.forecast_sum - row.actual_sum}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}