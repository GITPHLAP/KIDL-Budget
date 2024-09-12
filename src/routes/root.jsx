import { CalendarMonth, Check, Difference, Error, Receipt, Tune, Warning } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, CircularProgress, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useGetIsBalanceCorrectQuery } from "../redux/api/transactions/transaction";

export default function Root() {
    const { t } = useTranslation()
    const location = useLocation()

    const {
        data: isBalanceCorrect,
        isError: isBalanceCorrectError,
        isFetching: isBalanceCorrectFetching
    } = useGetIsBalanceCorrectQuery()

    function BalanceStatus() {
        let title = "general.balanceStatus.ok"
        let StatusIcon = () => <Check color="success"/>

        // Set the icon and the title according to the fetchec
        if (isBalanceCorrectFetching) {
            title = ""
            StatusIcon = () => <CircularProgress/>
        } else if (isBalanceCorrectError) {
            title = "general.balanceStatus.error"
            StatusIcon = () => <Error color="error"/>
        } else if (!isBalanceCorrect) {
            title = "general.balanceStatus.warning"
            StatusIcon = () => <Warning color="warning"/>
        }

        return (
            <Tooltip title={t(title)} >
                <IconButton>
                    <StatusIcon />
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Box sx={{ pb: 7 }}>
            <ToastContainer />
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Grid container >
                    <Grid item xs={0} md={2} >
                        {/* Empty just to center navigation */}
                    </Grid>
                    <Grid item xs={11} md={8} >
                        <BottomNavigation
                            showLabels
                            value={location?.pathname}
                        >
                            <BottomNavigationAction value={"/overview"} LinkComponent={Link} label={t("pages.overview.title")} icon={<CalendarMonth />} to={"overview"} />
                            <BottomNavigationAction value={"/transactions"} LinkComponent={Link} label={t("pages.transactions.title")} icon={<Receipt />} to={"transactions"} />
                            <BottomNavigationAction value={"/administration"} LinkComponent={Link} label={t("pages.administration.title")} icon={<Tune />} to={"administration"} />
                            <BottomNavigationAction value={"/plans"} LinkComponent={Link} label={t("pages.plans.title")} icon={<Difference />} to={"plans"} />
                        </BottomNavigation>
                    </Grid>
                    <Grid item xs={1} md={2} alignContent={"center"} textAlign={"right"} p={1}>
                        <BalanceStatus />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}