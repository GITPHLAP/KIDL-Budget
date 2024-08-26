import { Masonry } from "@mui/lab";
import { Card, CardContent, CircularProgress, Input, Typography } from "@mui/material";
import papaparse from "papaparse";
import { useInsertTransactionsMutation } from "../../redux/api/transactions/transaction";
import { toast } from "react-toastify";
import CategoryDataGrid from "./components/categoryDataGrid";
import CategoryMappingCard from "./components/categoryMappingCard";
import { useTranslation } from "react-i18next";
import { ApiBasePort, ApiBaseURL, ViteVersion } from "../../utils/envExtractor";

export default function Administration() {
    const {t} = useTranslation()

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
                        pending: t('apiCalls.addTransactions.pending'),
                        success: t('apiCalls.addTransactions.success'),
                    }

                )
            }
        });
    }
    return (
        <Masonry columns={{xs: 1, sm: 2, md: 3}} spacing={2}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5">{t('pages.administration.importTransactionsTitle')}</Typography>
                    <Input type="file" id="csvFileImporter" accept=".csv" onChange={onFileChangeHandler} inputProps={{ accept: ".csv" }} value={""} />
                    {isLoading ? <CircularProgress/> : null}
                </CardContent>
            </Card>

            <Card elevation={4}>
                <CardContent>
                    <CategoryDataGrid/>
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <CategoryMappingCard/>
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <Typography>Vite Version: {ViteVersion}</Typography>
                </CardContent>
            </Card>
        </Masonry>
    )
}