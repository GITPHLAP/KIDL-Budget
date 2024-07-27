import { CalendarMonth, Receipt, Tune } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
    const [value, setValue] = useState('overview')
    return (
        <Box sx={{ pb: 7 }}>
            <Outlet/>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value={"overview"} LinkComponent={Link} label="Overview" icon={<CalendarMonth />} to={"overview"} />
                    <BottomNavigationAction value={"transactions"} LinkComponent={Link} label="Transactions" icon={<Receipt />} to={"transactions"} />
                    <BottomNavigationAction value={"administration"} LinkComponent={Link} label="Administration" icon={<Tune />} to={"administration"} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}