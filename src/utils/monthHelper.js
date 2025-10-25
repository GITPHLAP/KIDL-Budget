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
        case '13': return t('general.months.total');
        default: return t('general.months.noMonths');
    }
}

export const monthOptions = () => {
    return [
        { value: 1, label: t("general.months.jan") },
        { value: 2, label: t("general.months.feb") },
        { value: 3, label: t("general.months.mar") },
        { value: 4, label: t("general.months.apr") },
        { value: 5, label: t("general.months.may") },
        { value: 6, label: t("general.months.jun") },
        { value: 7, label: t("general.months.jul") },
        { value: 8, label: t("general.months.aug") },
        { value: 9, label: t("general.months.sep") },
        { value: 10, label: t("general.months.oct") },
        { value: 11, label: t("general.months.nov") },
        { value: 12, label: t("general.months.dec") },
    ]
}

export const monthIdxToPlanColumnName = (idx) => {
    switch (idx) {
        case '1': return 'januaryAmount';
        case '2': return 'februaryAmount';
        case '3': return 'marchAmount';
        case '4': return 'aprilAmount';
        case '5': return 'mayAmount';
        case '6': return 'juneAmount';
        case '7': return 'julyAmount';
        case '8': return 'augustAmount';
        case '9': return 'septemberAmount';
        case '10': return 'octoberAmount';
        case '11': return 'novemberAmount';
        case '12': return 'decemberAmount';
    }
}