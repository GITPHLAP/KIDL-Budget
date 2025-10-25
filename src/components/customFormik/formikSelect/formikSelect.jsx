import { useField } from "formik"

import CustomSelect from "../../customSelect/customSelect"

export default function FormikSelect({ name, options, isLoading, label }) {

    const [field, , helpers] = useField(name)

    return (
        <CustomSelect
            value={field.value}
            onValueChange={(val) => helpers.setValue(val)}
            options={options}
            isLoading={isLoading}
            label={label ?? "Missing label"}
        />
    )
}








