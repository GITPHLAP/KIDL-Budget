import { CalendarMonth, Difference, Receipt, TableView, Tune } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DashboardLayout } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { t } from "i18next";
import { Outlet } from "react-router-dom";
import MonthAndYearToolbar from "./components/monthAndYearToolbar/monthAndYearToolbar";

export default function App(props) {
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

    const BRANDING = {
        title: 'Viften budget',
        logo: <img src="/ki-d.png" height={"45px"} />
    };

    return (
        <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            <DashboardLayout slots={{ toolbarActions: MonthAndYearToolbar }}>
                {/* Overflow box */}
                <Box sx={{ overflow: "auto", height: "100%", display: "flex" }}>
                    {/* Padding box */}
                    <Box p={2} sx={{ flex: 1, height: "100%", display: "flex" }}> 
                        <Outlet />
                    </Box>
                </Box>
            </DashboardLayout>
        </AppProvider >
    )
}