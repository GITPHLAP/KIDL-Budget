import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, Typography } from "@mui/material";
import { monthIdxToName } from "../../../utils/monthHelper";
import OverviewTransTable from "./overviewTransTable";
import TotalTable from "./totalTable";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export default function MonthCard(props) {
    const {
        monthObj,
        monthIdx,
    } = props

    return (
        <Card
            sx={{
                minWidth: { xs: 0, sm: 500 },
                overflow: "auto",
            }}
            elevation={4}
        >
            <CardContent >
                <Typography> {monthIdxToName(monthIdx)}</Typography>

                {/* Total table */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-total-header"}
                    >
                        Total
                    </AccordionSummary>
                    <AccordionDetails>
                        <TotalTable
                            monthIdx={monthIdx}
                            expenses_total={monthObj.expenses_total}
                            income_total={monthObj.income_total}
                        />
                    </AccordionDetails>
                </Accordion>
                {/* Income table */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-income-header"}
                        sx={{ backgroundColor: "#00f0000f" }}
                    >
                        Income
                    </AccordionSummary>
                    <AccordionDetails sx={{ overflow: "auto" }}>
                        <OverviewTransTable monthIdxAndType={"-income-month-" + monthIdx} transactionData={monthObj.income} headerColor={"#00f0000f"} />
                    </AccordionDetails>
                </Accordion>
                {/* Expenses table */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-expenses-header"}
                        sx={{ backgroundColor: "#f000000f" }}
                    >
                        Expenses
                    </AccordionSummary>
                    <AccordionDetails>
                        <OverviewTransTable monthIdxAndType={"-expenses-month-" + monthIdx} transactionData={monthObj.expenses} headerColor={"#f000000f"} />
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}