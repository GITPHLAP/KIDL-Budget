import { Card, CardContent, Divider, Typography } from "@mui/material";
import { monthIdxToName } from "../../../utils/monthHelper";
import OverviewTransTable from "./overviewTransTable";
import TotalTable from "./totalTable";

export default function MonthCard(props) {
    const {
        monthObj,
        monthIdx,
    } = props


    console.log('Peek - test on ln: 10 ', monthObj);
    return (
        <>
            <Card elevation={4}>
                <CardContent>
                    <Typography> {monthIdxToName(monthIdx)}</Typography>
                    <Divider sx={{ pt: 2, mb: 2 }} />
                    {/* Total table */}
                    <TotalTable
                        expenses_total={monthObj.expenses_total}
                        income_total={monthObj.income_total}
                    />
                    <Divider sx={{ pt: 2, mb: 2 }} />
                    {/* Income table */}
                    <OverviewTransTable transactionData={monthObj.income} headerColor={"#00f0000f"} />
                    <Divider sx={{ pt: 2, mb: 2 }} />
                    {/* Expenses table */}
                    <OverviewTransTable transactionData={monthObj.expenses} headerColor={"#f000000f"} />
                </CardContent>
            </Card>
        </>
    )
}