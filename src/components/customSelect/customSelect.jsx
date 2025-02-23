import { Input, MenuItem, useTheme } from "@mui/material";
import React from "react";
import Select, { components } from 'react-select';

function CustomOption(props) {
    const { isFocused, isSelected, onFocus, selectOption, data } = props
    const handleClick = (event) => {
        selectOption(data, event);
    };

    return (
        <MenuItem
            onFocus={onFocus}
            selected={isFocused}
            onClick={handleClick}
            style={{
                fontWeight: isSelected ? 500 : 400
            }}
        >
            <components.Option {...props} />
        </MenuItem>
    );

}

const SelectWrapped = React.forwardRef(function SelectWrapped(props, ref) {
    const { ...other } = props;

    const theme = useTheme()

    const customSelectTheme = (muiTheme) => (base) => ({
        ...base,
        colors: {
            ...base.colors,
            primary: muiTheme.palette.primary.main,
            primary75: muiTheme.palette.primary.light,
            primary50: muiTheme.palette.primary.dark,
            primary25: muiTheme.palette.action.hover,
            danger: muiTheme.palette.error.main,
            dangerLight: muiTheme.palette.error.light,
            neutral0: muiTheme.palette.background.paper,
            neutral5: muiTheme.palette.grey[100],
            neutral10: muiTheme.palette.grey[200],
            neutral20: muiTheme.palette.grey[300],
            neutral30: muiTheme.palette.grey[400],
            neutral40: muiTheme.palette.grey[500],
            neutral50: muiTheme.palette.text.secondary,
            neutral60: muiTheme.palette.text.primary,
            neutral70: muiTheme.palette.text.primary,
            neutral80: muiTheme.palette.text.primary,
            neutral90: muiTheme.palette.text.primary,
        },
        borderRadius: muiTheme.shape.borderRadius,
        spacing: {
            controlHeight: 40,
            menuGutter: 8,
        },

    });

    const customStyles = {
        control: () => ({
            // width: "fit-content",
            display: "flex",
            alignItems: "center",
            border: 0,
            height: "auto",
            background: "transparent",
            "&:hover": {
                boxShadow: "none"
            }
        }),

        menuList: () => ({
            maxHeight: 48 * 4.5,
            overflowY: "auto"
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 })
    };

    const { onChange, ...rest } = other; // Remove onChange from other
    return (
        <Select
            components={{
                Option: CustomOption,
            }}
            styles={customStyles}
            isClearable={true}
            menuPortalTarget={document.body}
            theme={customSelectTheme(theme)}
            {...rest}
            ref={ref}
        />
    );
})

export default function CustomSelect({ value, onChange, options }) {
    return (
        <Input
            fullWidth={true}
            inputComponent={SelectWrapped}
            value={value}
            onChange={onChange}
            placeholder=""
            id="react-select-single"
            inputProps={{
                options: options
            }}
        />
    )
}