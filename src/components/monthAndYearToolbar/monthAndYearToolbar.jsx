import { Stack } from "@mui/material";
import ChipArray from "./components/chipArray";
import PlanYearSelect from "./components/planYearSelect";

export default function MonthAndYearToolbar(props) {
    return (
        <Stack direction={"row"}>
            <PlanYearSelect />
            <ChipArray />
        </Stack>
    )
}