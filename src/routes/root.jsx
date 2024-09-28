import { CalendarMonth, Difference, Receipt, TableView, Tune } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Grid2, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import BalanceStatus from "../components/balanceStatus/balanceStatus";

export default function Root() {
    const { t } = useTranslation()
    const location = useLocation()

    return (
        <Box sx={{ pb: 7 }}>
            <ToastContainer />
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Grid2 container >
                    <Grid2  size={{xs: 0, md: 2}} >
                        {/* Empty just to center navigation */}
                    </Grid2>
                    <Grid2 size={{xs: 11, md: 8}} >
                        <BottomNavigation
                            showLabels
                            value={location?.pathname}
                        >
                            <BottomNavigationAction value={"/overview"} LinkComponent={Link} label={t("pages.overview.title")} icon={<CalendarMonth />} to={"overview"} />
                            <BottomNavigationAction value={"/transactions"} LinkComponent={Link} label={t("pages.transactions.title")} icon={<Receipt />} to={"transactions"} />
                            <BottomNavigationAction value={"/administration"} LinkComponent={Link} label={t("pages.administration.title")} icon={<Tune />} to={"administration"} />
                            <BottomNavigationAction value={"/plans"} LinkComponent={Link} label={t("pages.plans.title")} icon={<Difference />} to={"plans"} />
                            <BottomNavigationAction value={"/sheets"} LinkComponent={Link} label={t("pages.sheets.title")} icon={<TableView />} to={"sheets"} />
                        </BottomNavigation>
                    </Grid2>
                    <Grid2 size={{xs: 1, md: 2}}  alignContent={"center"} textAlign={"right"} p={1}>
                        <BalanceStatus />
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    );
}