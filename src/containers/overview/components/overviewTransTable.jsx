import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";

export default function OverviewTransTable(props) {
    const {
        transactionData,
        headerColor, // TODO: This should be themed
        monthIdxAndType, // Needed to create unique key values for table
    } = props

    // Sorting rows be category ascending 
    const sortedRows = useMemo(() => {
        // Need to create a copy because transactionData is immutable
        const copyOfData = [...transactionData]
        const sortedData = copyOfData?.sort((a, b) => {
            if (a['category'] < b['category'] ) return -1;
            if (a['category'] > b['category'] ) return 1;
            return 0;
        })
        return sortedData
    }, [transactionData])

    return (
        <TableContainer sx={{maxHeight: "inherit"}} component={Paper} >
            <Table stickyHeader size="small" aria-label="simple table">
                <TableHead sx={{ backgroundColor: headerColor }}>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Forecast</TableCell>
                        <TableCell>Actual</TableCell>
                        <TableCell>Diff</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow
                            key={row.category + monthIdxAndType}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.forecast_sum?.toFixed(2)}</TableCell>
                            <TableCell>{row.actual_sum?.toFixed(2)}</TableCell>
                            <TableCell>{(row.actual_sum - row.forecast_sum )?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}