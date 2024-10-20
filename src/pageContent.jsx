import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function PageContent() {
    const theme = useTheme()

    const themeMode = useMemo(() => theme?.palette?.mode, [theme?.palette?.mode])

    return (
        <>
            <ToastContainer stacked theme={themeMode} />
            {/* Overflow box */}
            <Box sx={{ overflow: "auto", height: "100%", display: "flex" }}>
                {/* Padding box */}
                <Box p={2} sx={{ flex: 1, height: "100%", display: "flex" }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}