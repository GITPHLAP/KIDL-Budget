import { CalendarMonth, Difference, Receipt, TableView, Tune } from "@mui/icons-material";
import { daDK as coreDaDK } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { daDK } from '@mui/x-data-grid/locales';
import { DashboardLayout } from "@toolpad/core";
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { useTranslation } from "react-i18next";
import 'react-toastify/ReactToastify.css';
import MonthAndYearToolbar from "./components/monthAndYearToolbar/monthAndYearToolbar";
import PageContent from "./pageContent";

const theme = createTheme(
    {
        cssVariables: {
            colorSchemeSelector: 'data-toolpad-color-scheme',
        },
        colorSchemes: {
            light: {
            },
            dark: {
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: ({ theme }) =>
                        theme.unstable_sx({
                            p: "1px"
                        })
                }
            },
            MuiDataGrid: {
                styleOverrides: {
                    editInputCell: {
                        '& input': {
                            padding: "0 2px"
                        },
                    },
                }
            }
        }
    },
    daDK, // x-data-grid translations
    coreDaDK, // core translations
);

const BRANDING = {
    title: 'Viften budget',
    logo: <img src="/ki-d.png" height={"45px"} />
};

export default function App() {
    const { t } = useTranslation();
    const NAVIGATION = [
        {
            kind: 'header',
            title: t('pages.navigation.headerTitle'),
        },
        {
            segment: 'overview',
            title: t("pages.overview.title"),
            icon: <CalendarMonth />,
        },
        {
            segment: 'transactions',
            title: t("pages.transactions.title"),
            icon: <Receipt />,
        },
        {
            segment: 'administration',
            title: t("pages.administration.title"),
            icon: <Tune />,
        },
        {
            segment: 'plans',
            title: t("pages.plans.title"),
            icon: <Difference />,
        },
        {
            segment: 'sheets',
            title: t("pages.sheets.title"),
            icon: <TableView />,
        },
    ];

    return (
        <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
            <DashboardLayout slots={{ toolbarActions: MonthAndYearToolbar }}>
                <PageContent />
            </DashboardLayout>
        </ReactRouterAppProvider  >
    )
}