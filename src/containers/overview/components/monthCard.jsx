import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { monthIdxToName } from "../../../utils/monthHelper";
import OverviewTransTable from "./overviewTransTable";
import TotalTable from "./totalTable";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ForecastTable from "./forecastTotalTable";
import ForecastTransTable from "./forecastTransTable";

export default function MonthCard(props) {
    const [showForecast, setShowForecast] = useState(false)
    const { t } = useTranslation()
    const {
        monthObj,
        monthIdx,
    } = props

    const handleChangeShowForecast = (e) => {
        setShowForecast(e.target.checked)
    }
    return (
        <Card
            sx={{
                minWidth: { xs: 0, sm: 500 },
                overflow: "auto",
            }}
            elevation={4}
        >
            <CardContent >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography> {monthIdxToName(monthIdx)}</Typography>
                    {monthIdx == 13 && (
                        <FormControlLabel
                            control={<Switch checked={showForecast} onChange={handleChangeShowForecast} />}
                            label={t("pages.overview.showForecastLabel")}
                        />
                    )}
                </Stack>

                {/* Total table */}
                <Accordion >
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-total-header"}
                    >
                        {t('general.total')}
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        {showForecast ? (
                            <ForecastTable
                                monthIdx={monthIdx}
                                expenses_total={monthObj.expenses_total}
                                income_total={monthObj.income_total}
                            />
                        ) : (
                            <TotalTable
                                monthIdx={monthIdx}
                                expenses_total={monthObj.expenses_total}
                                income_total={monthObj.income_total}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
                {/* Income table */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-income-header"}
                        sx={{ backgroundColor: "#00f0000f" }}
                    >
                        {t('general.income')}
                    </AccordionSummary>
                    <AccordionDetails sx={{ overflow: "auto", p: 0 }}>
                        {showForecast ? (
                            <ForecastTransTable monthIdxAndType={"-income-month-" + monthIdx} transactionData={monthObj.income} headerColor={"#00f0000f"} isIncome />
                        ) : (
                            <OverviewTransTable monthIdxAndType={"-income-month-" + monthIdx} transactionData={monthObj.income} headerColor={"#00f0000f"} />
                        )}
                    </AccordionDetails>
                </Accordion>
                {/* Expenses table */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        id={"month-" + monthIdx + "-expenses-header"}
                        sx={{ backgroundColor: "#f000000f" }}
                    >
                        {t('general.expenses')}
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        {showForecast ? (
                            <ForecastTransTable monthIdxAndType={"-expenses-month-" + monthIdx} transactionData={monthObj.expenses} headerColor={"#00f0000f"} />
                        ) : (
                            <OverviewTransTable monthIdxAndType={"-expenses-month-" + monthIdx} transactionData={monthObj.expenses} headerColor={"#f000000f"} />
                        )}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}