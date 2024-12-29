import { Stack } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core";
import BalanceStatus from "../balanceStatus/balanceStatus";
import ChipArray from "./components/chipArray";
import PlanYearSelect from "./components/planYearSelect";

export default function MonthAndYearToolbar() {
    return (
        <Stack direction={"row"}>
            <PlanYearSelect />
            <ChipArray />
            <BalanceStatus />
            <ThemeSwitcher />
        </Stack>
    )
}