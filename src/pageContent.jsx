import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import ResizeProvider from "./components/resizeProvider/resizeProvider";

export default function PageContent() {
    const theme = useTheme()

    const themeMode = useMemo(() => theme?.palette?.mode, [theme?.palette?.mode])

    return (
        <>
            <ToastContainer stacked theme={themeMode} />
            {/* Overflow box */}
            <Box sx={{ overflow: "auto", height: "100%", display: "flex" }}>
                <ResizeProvider>
                    <Outlet />
                </ResizeProvider>
            </Box>
        </>
    )
}