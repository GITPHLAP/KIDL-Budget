import { useField } from "formik"

import { getValue } from "../../../utils/selectHelper"
import CustomSelect from "../../customSelect/customSelect"

export default function FormikSelect({ name, options, isLoading, label }) {

    const [field, meta, helpers] = useField(name)

    // TODO: Add FormControl
    return (
        <CustomSelect
            value={getValue(options, field.value)}
            onChange={(obj) => helpers.setValue(obj?.value)}
            options={options}
            isLoading={isLoading}
        />
    )
}








