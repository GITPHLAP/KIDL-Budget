export const getValue = (value, options) => {
    return options?.filter?.(o => o.value === value)
}