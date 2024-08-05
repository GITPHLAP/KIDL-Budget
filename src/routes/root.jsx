import { CalendarMonth, Difference, Receipt, Tune } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

export default function Root() {
    const location = useLocation()
    return (
        <Box sx={{ pb: 7 }}>
            <ToastContainer />
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={location?.pathname}
                >
                    <BottomNavigationAction value={"/overview"} LinkComponent={Link} label="Overview" icon={<CalendarMonth />} to={"overview"} />
                    <BottomNavigationAction value={"/transactions"} LinkComponent={Link} label="Transactions" icon={<Receipt />} to={"transactions"} />
                    <BottomNavigationAction value={"/administration"} LinkComponent={Link} label="Administration" icon={<Tune />} to={"administration"} />
                    <BottomNavigationAction value={"/forecasts"} LinkComponent={Link} label="Forecasts" icon={<Difference />} to={"forecasts"} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}