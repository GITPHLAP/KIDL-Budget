import { Masonry } from "@mui/lab";
import { Card, CardContent, Input, Typography } from "@mui/material";
import papaparse from "papaparse";

export default function Administration() {
    const onFileChangeHandler = (event) => {
        const csvFile = event.target.files[0]
        papaparse.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                // TODO: Add api call to upload data
                console.log("Finished:", results.data);
            }
        });
    }
    return (
        <Masonry columns={4} spacing={2}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5">Import transactions</Typography>
                    <Input type="file" id="csvFileImporter" accept=".csv" onChange={onFileChangeHandler} inputProps={{accept: ".csv"}} value={""} />
                </CardContent>
            </Card>
        </Masonry>
    )
}