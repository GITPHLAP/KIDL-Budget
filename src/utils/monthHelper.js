import { t } from "i18next";

export const monthIdxToName = (idx) => {
    switch (idx) {
        case '1': return t('general.months.january');
        case '2': return t('general.months.february');
        case '3': return t('general.months.march');
        case '4': return t('general.months.april');
        case '5': return t('general.months.may');
        case '6': return t('general.months.june');
        case '7': return t('general.months.july');
        case '8': return t('general.months.august');
        case '9': return t('general.months.september');
        case '10': return t('general.months.october');
        case '11': return t('general.months.november');
        case '12': return t('general.months.december');
        default: return t('general.months.noMonths');
    }
}

