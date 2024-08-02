import { Masonry } from "@mui/lab";
import { Card, CardContent, CircularProgress, Input, Typography } from "@mui/material";
import papaparse from "papaparse";
import { useInsertTransactionsMutation } from "../../redux/api/transactions/transaction";
import { toast } from "react-toastify";
import CategoryDataGrid from "./components/categoryDataGrid";

export default function Administration() {

    const [addTransactions, { isLoading }] = useInsertTransactionsMutation()

    const onFileChangeHandler = (event) => {
        const csvFile = event.target.files[0]
        papaparse.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                toast.promise(
                    addTransactions(Array.from(results.data)).unwrap(),
                    {
                        pending: 'Waiting ⏳',
                        success: 'Success 👌',
                    }

                )
            }
        });
    }
    return (
        <Masonry columns={4} spacing={2}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5">Import transactions</Typography>
                    <Input type="file" id="csvFileImporter" accept=".csv" onChange={onFileChangeHandler} inputProps={{ accept: ".csv" }} value={""} />
                    {isLoading ? <CircularProgress/> : null}
                </CardContent>
            </Card>

            <Card elevation={4}>
                <CardContent>
                    <CategoryDataGrid/>
                </CardContent>
            </Card>
        </Masonry>
    )
}