export const getValue = (value, options = [], isMulti = false) => {
    if (isMulti) {
        if (!value) {
            return [];
        }

        if (Array.isArray(value)) {
            const hasOptionShape = value.every(
                (item) => item && typeof item === "object" && Object.prototype.hasOwnProperty.call(item, "value")
            );

            if (hasOptionShape) {
                return value;
            }

            const rawValues = value.map((item) => (item && typeof item === "object" ? item.value : item));
            return options.filter((option) => rawValues.includes(option.value));
        }

        return options.filter((option) => option.value === value);
    }

    if (value === null || value === undefined || value === "") {
        return null;
    }

    if (value && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "value")) {
        return value;
    }

    return options.find((option) => option.value === value) ?? null;
};