import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLazyGetYearOverviewByYearAndTypeQuery } from "../../redux/api/overview/overview";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function NordeaTemplateDownloader() {
    const { t } = useTranslation()

    const selectedYear = useSelector((state) => state.selectedYear)

    const [getTemplateData] = useLazyGetYearOverviewByYearAndTypeQuery()
    const handleDownload = async () => {

        // Fetch excel file 
        const excelResponse = await fetch("/Nordea Budget.xlsx");
        if (!excelResponse.ok) {
            toast.error("Template does not exist, please contact administrator")
            console.error("Could not fetch the excel file");
            return
        }
        const excelBlob = await excelResponse.blob();

        const generateCSVContent = (data) => {
            const header = Object.keys(data[0]).join(",") + "\n"
            const rows = data.map((row) => Object.values(row).join(",")).join("\n");
            return header + rows
        }

        const incomeData = (await getTemplateData({ year: selectedYear, type: "income" })).data
        const expenseData = (await getTemplateData({ year: selectedYear, type: "expenses" })).data

        const incomeCsv = generateCSVContent(incomeData)
        const expenseCsv = generateCSVContent(expenseData)

        // Zip instance 
        const zip = new JSZip();

        // Add the CSV's to the ZIP file
        zip.file("income.csv", incomeCsv)
        zip.file("expense.csv", expenseCsv)


        // Add the excel file 
        zip.file("Nordea Budget.xlsx", excelBlob);

        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Download the zip
        saveAs(zipBlob, "Budget template.zip");

    }

    return (
        <>
            <Typography variant="h5">{t('pages.administration.nordeaDownloader')}</Typography>
            <Button
                onClick={handleDownload}
            >
                Download
            </Button>
        </>
    )
}