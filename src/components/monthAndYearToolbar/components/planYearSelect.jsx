import { useDispatch, useSelector } from "react-redux";
import { useGetPlanYearsQuery } from "../../../redux/api/plan/plan";
import { selectYear } from "../../../redux/reducers/yearSlice";
import KIDLSelect from "../../kidlSelect/kidlSelect";

export default function PlanYearSelect(props) {
    const dispatch = useDispatch()
    const selectedYear = useSelector((state) => state.selectedYear)

    const {
        data: planYears,
        isLoading,
        isFetching,
    } = useGetPlanYearsQuery()

    return (
        <KIDLSelect
            value={selectedYear}
            onChange={(e) => dispatch(selectYear(e?.target?.value))}
            isLoading={isLoading || isFetching}
            options={planYears}
            name="Year"
        />
    )
}