import { useField } from "formik"

import { getValue } from "../../../utils/selectHelper"
import CustomSelect from "../../customSelect/customSelect"

export default function FormikSelect({ name, options, isLoading, label }) {

    const [field, meta, helpers] = useField(name)

    return (
        <CustomSelect
            value={getValue(field.value, options)}
            onChange={(obj) => helpers.setValue(obj?.value)}
            options={options}
            isLoading={isLoading}
            label={label ?? "Missing label"}
        />
    )
}








