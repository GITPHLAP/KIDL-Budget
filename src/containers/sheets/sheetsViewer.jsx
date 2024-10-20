import { Box } from "@mui/material";

export default function SheetsViewer(props) {
    return (
        // height calc = 100vh - topBar (64px) - top+bottom padding (2*16px) 
        <Box sx={{ height: "calc(100vh - 64px - 32px)", display: "flex", flex: 1}}>
            <iframe src={"https://docs.google.com/spreadsheets/d/1nYspem3fTBbjy4ITW0a1bkpLbiWRQz2vNgfNPjKuliw/edit?gid=0#gid=0"} width="100%" height="100%" />
        </Box>
    )
}