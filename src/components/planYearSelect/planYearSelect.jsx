import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { useGetPlanYearsQuery } from "../../redux/api/plan/plan";
import { selectYear } from "../../redux/reducers/yearSlice";
import { getValue } from "../../utils/selectHelper";

export default function PlanYearSelect(props) {
    const dispatch = useDispatch()
    const selectedYear = useSelector((state) => state.selectedYear)

    const {
        data: planYears,
        isLoading,
        isFetching,
        isSuccess
    } = useGetPlanYearsQuery()

    const yearOptions = useMemo(() => {
        if (!isLoading && !isFetching && isSuccess) {
            return planYears.map(y => ({ value: y, label: y }))
        }
        return []
    }, [planYears, isLoading, isFetching, isSuccess])

    return (
        <ReactSelect
            value={getValue(selectedYear, yearOptions)}
            onChange={(e) => dispatch(selectYear(e?.value))}
            isLoading={isLoading || isFetching}
            options={yearOptions}
            placeholder="Select year"
            classNamePrefix={"react-select"}
            className="react-select-container"
            components={{
                IndicatorSeparator: () => null
            }}
        />
    )
}