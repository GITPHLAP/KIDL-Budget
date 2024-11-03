import { Stack } from "@mui/material";
import ChipArray from "./components/chipArray";
import PlanYearSelect from "./components/planYearSelect";
import BalanceStatus from "../balanceStatus/balanceStatus";

export default function MonthAndYearToolbar(props) {
    return (
        <Stack direction={"row"}>
            <PlanYearSelect />
            <ChipArray />
            <BalanceStatus  />
        </Stack>
    )
}