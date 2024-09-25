import { Box } from "@mui/material";

export default function SheetsViewer(props) {

    return (
        <Box sx={{ height: "calc(100vh - 56px - 16px)" }}>
            <iframe src={"https://docs.google.com/spreadsheets/d/1nYspem3fTBbjy4ITW0a1bkpLbiWRQz2vNgfNPjKuliw/edit?gid=0#gid=0"} width="100%" height="600px" />
        </Box>
    )
}