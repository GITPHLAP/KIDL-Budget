import { Masonry } from "@mui/lab";
import { Card, CardContent, CircularProgress, Input, Typography } from "@mui/material";
import papaparse from "papaparse";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useInsertTransactionsMutation } from "../../redux/api/transactions/transaction";
import { ViteVersion } from "../../utils/envExtractor";
import CategoryDataGrid from "./components/categoryDataGrid";
import CategoryMappingCard from "./components/categoryMappingCard";
import CopyPlanCard from "./components/copyPlanCard";
import { useGetHealthQuery } from "../../redux/api/apiSlice";
import NordeaTemplateDownloader from "../../components/nordeaTemplateDownloader/nordeaTemplateDownloader";

export default function Administration() {
    const { t } = useTranslation()

    const {data: apiVersion} = useGetHealthQuery()
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
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{flex: 1}}>
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5">{t('pages.administration.importTransactionsTitle')}</Typography>
                    <Input type="file" id="csvFileImporter" accept=".csv" onChange={onFileChangeHandler} inputProps={{ accept: ".csv" }} value={""} />
                    {isLoading ? <CircularProgress /> : null}
                </CardContent>
            </Card>

            <Card elevation={4}>
                <CardContent>
                    <CategoryDataGrid />
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <CategoryMappingCard />
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <Typography>Vite Version: {ViteVersion}</Typography>
                    <Typography>API Version: {apiVersion?.version}</Typography>
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <CopyPlanCard />
                </CardContent>
            </Card>
            <Card elevation={4}>
                <CardContent>
                    <NordeaTemplateDownloader />
                </CardContent>
            </Card>
        </Masonry>
    )
}