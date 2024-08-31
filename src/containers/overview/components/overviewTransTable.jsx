import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getDiffClassname } from "../../../utils/styleHelper";

export default function OverviewTransTable(props) {
    const {t} = useTranslation()
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
                    <TableCell>{t('general.category')}</TableCell>
                        <TableCell>{t('general.plan')}</TableCell>
                        <TableCell>{t('general.actual')}</TableCell>
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
                            <TableCell>{row.actual_sum?.toFixed(2)}</TableCell>
                            <TableCell className={getDiffClassname((row.actual_sum - row.plan_sum ))}>{(row.actual_sum - row.plan_sum )?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}