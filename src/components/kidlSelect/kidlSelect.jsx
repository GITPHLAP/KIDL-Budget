import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";

/**
 * 
 * @param {{
 * name: string,
 * value: string,
 * onChange: function,
 * options: [],
 * isLoading: boolean
 * }} props 
 * @returns 
 */
export default function KIDLSelect(props) {
    const {
        name,
        value,
        onChange,
        options,
        isLoading,
    } = props

    const labelId = useMemo(() => `select-label-${name}`, [name])
    return (
        <FormControl variant="standard">
            <InputLabel id={labelId}>{name}</InputLabel>

            <Select
                labelId={labelId}
                value={value}
                onChange={onChange}
                renderValue={(selected) => {
                    if (isLoading) {
                        return <CircularProgress />
                    }

                    return selected
                }}
            >
                {options?.map((o) => (
                    <MenuItem
                        key={o}
                        value={o}
                    >
                        {o}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}