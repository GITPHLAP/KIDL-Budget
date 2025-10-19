import { MenuItem, TextField, useTheme } from "@mui/material";
import React from "react";
import Select, { components, mergeStyles } from "react-select";
import { getValue as resolveSelectValue } from "../../utils/selectHelper";

const DEFAULT_MENU_MAX_HEIGHT = 48 * 4.5;

function CustomOption(props) {
    const { isFocused, isSelected, onFocus, selectOption, data } = props;
    const handleClick = (event) => {
        selectOption(data, event);
    };

    return (
        <MenuItem
            onFocus={onFocus}
            selected={isFocused}
            onClick={handleClick}
            dense
            sx={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            <components.Option {...props} />
        </MenuItem>
    );
}

const buildSelectTheme = (muiTheme) => (baseTheme) => ({
    ...baseTheme,
    borderRadius: muiTheme.shape.borderRadius,
    spacing: {
        ...baseTheme.spacing,
        controlHeight: 44,
        menuGutter: 8,
    },
    colors: {
        ...baseTheme.colors,
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
});

const SelectWrapped = React.forwardRef(function SelectWrapped(props, ref) {
    const {
        isLoading,
        isMulti,
        styles: stylesOverride,
        components: componentsOverride,
        menuPortalTarget,
        closeMenuOnSelect,
        muiError = false,
        ...other
    } = props;

    const theme = useTheme();

    const selectStyles = React.useMemo(
        () => ({
            control: (provided, state) => {
                const baseBorderColor = muiError
                    ? theme.palette.error.main
                    : theme.palette.divider;
                const focusBorderColor = muiError
                    ? theme.palette.error.main
                    : theme.palette.primary.main;
                const hoverBorderColor = muiError
                    ? theme.palette.error.dark
                    : theme.palette.text.primary;

                return {
                    ...provided,
                    minHeight: 44,
                    alignItems: "center",
                    border: "none",
                    borderRadius: 0,
                    borderBottom: `1px solid ${state.isFocused ? focusBorderColor : baseBorderColor}`,
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    paddingLeft: 0,
                    paddingRight: 0,
                    transition: theme.transitions.create(["border-color", "box-shadow"], {
                        duration: theme.transitions.duration.shorter,
                    }),
                    "&:hover": {
                        borderBottomColor: hoverBorderColor,
                        boxShadow: "none",
                    },
                };
            },
            valueContainer: (provided) => ({
                ...provided,
                gap: theme.spacing(0.5),
                flexWrap: "wrap",
            }),
            placeholder: (provided) => ({
                ...provided,
                color: theme.palette.text.secondary,
            }),
            singleValue: (provided) => ({
                ...provided,
                color: theme.palette.text.primary,
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: theme.palette.action.selected,
                borderRadius: theme.shape.borderRadius,
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                color: theme.palette.text.primary,
                fontWeight: 500,
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                color: theme.palette.text.secondary,
                ":hover": {
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.error.contrastText,
                },
            }),
            menu: (provided) => ({
                ...provided,
                zIndex: theme.zIndex.modal,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[4],
            }),
            menuList: (provided) => ({
                ...provided,
                maxHeight: DEFAULT_MENU_MAX_HEIGHT,
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                    ? theme.palette.primary.main
                    : state.isFocused
                        ? theme.palette.action.hover
                        : provided.backgroundColor,
                color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                fontWeight: state.isSelected ? 600 : 400,
            }),
            indicatorSeparator: () => ({
                display: "none",
            }),
            indicatorsContainer: (provided) => ({
                ...provided,
            }),
            input: (provided) => ({
                ...provided,
                margin: 0,
                padding: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: theme.zIndex.modal }),
        }),
        [muiError, theme]
    );

    const combinedStyles = React.useMemo(
        () => mergeStyles(selectStyles, stylesOverride ?? {}),
        [selectStyles, stylesOverride]
    );

    const resolvedComponents = React.useMemo(
        () => ({
            Option: CustomOption,
            ...componentsOverride,
        }),
        [componentsOverride]
    );

    const resolvedMenuPortalTarget =
        menuPortalTarget ?? (typeof document !== "undefined" ? document.body : undefined);

    return (
        <Select
            {...other}
            ref={ref}
            components={resolvedComponents}
            styles={combinedStyles}
            theme={buildSelectTheme(theme)}
            isDisabled={isLoading}
            isMulti={isMulti}
            isClearable={other.isClearable ?? true}
            closeMenuOnSelect={closeMenuOnSelect ?? !isMulti}
            hideSelectedOptions={true}
            menuPortalTarget={resolvedMenuPortalTarget}
            placeholder={""}
        />
    );
});

export default function CustomSelect({
    value,
    onChange,
    onValueChange,
    options = [],
    label,
    helperText,
    error = false,
    isLoading = false,
    isMulti = false,
    menuPortalTarget,
    placeholder,
    components: componentsOverride,
    styles: stylesOverride,
    onFocus,
    onBlur,
    ...selectProps
}) {
    const [isFocused, setIsFocused] = React.useState(false);

    const resolvedValue = React.useMemo(
        () => resolveSelectValue(value, options, isMulti),
        [value, options, isMulti]
    );

    const hasValue = React.useMemo(() => {
        if (isMulti) {
            return Array.isArray(resolvedValue) && resolvedValue.length > 0;
        }

        return Boolean(resolvedValue);
    }, [resolvedValue, isMulti]);

    const handleFocus = React.useCallback(
        (event) => {
            setIsFocused(true);
            onFocus?.(event);
        },
        [onFocus]
    );

    const handleBlur = React.useCallback(
        (event) => {
            setIsFocused(false);
            onBlur?.(event);
        },
        [onBlur]
    );

    const handleSelectChange = React.useCallback(
        (selected, actionMeta) => {
            onChange?.(selected, actionMeta);

            if (!onValueChange) {
                return;
            }

            if (isMulti) {
                const nextValues = Array.isArray(selected)
                    ? selected.map((option) => option?.value)
                    : [];
                onValueChange(nextValues, actionMeta);
                return;
            }

            onValueChange(selected?.value ?? null, actionMeta);
        },
        [onChange, onValueChange, isMulti]
    );

    const resolvedMenuPortalTarget =
        menuPortalTarget ?? (typeof document !== "undefined" ? document.body : undefined);

    return (
        <TextField
            variant="standard"
            fullWidth
            label={label}
            value=""
            error={error}
            helperText={helperText}
            multiline
            slotProps={{
                input: {
                    disableUnderline: true,
                    inputComponent: SelectWrapped,
                    inputProps: {
                        value: resolvedValue,
                        onChange: handleSelectChange,
                        options,
                        isLoading,
                        isMulti,
                        menuPortalTarget: resolvedMenuPortalTarget,
                        placeholder,
                        components: componentsOverride,
                        styles: stylesOverride,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        muiError: error,
                        ...selectProps,
                    },
                },
                inputLabel: label
                    ? {
                        shrink: isFocused || hasValue,
                    }
                    : undefined,
            }}
        />
    );
}