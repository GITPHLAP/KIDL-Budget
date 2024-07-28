import { Masonry } from "@mui/lab";
import { Card, CardContent, Typography } from "@mui/material";

export default function Administration() {
    return (
        <Masonry columns={4} spacing={2}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5">Import transactions</Typography>
                </CardContent>
            </Card>
        </Masonry>
    )
}