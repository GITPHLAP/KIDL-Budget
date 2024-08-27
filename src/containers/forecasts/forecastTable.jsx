import { CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { toast } from "react-toastify";
import CustomCRUDataGrid from "../../components/customCRUDataGrid/customCRUDataGrid";
import { useCreateForecastMutation, useGetForecastsQuery, useUpdateForecastMutation } from "../../redux/api/forecast/forecast";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";
import { removeThousandSeperator } from "../../utils/dataGridHelper";
import { useTranslation } from "react-i18next";
import { monthIdxToName } from "../../utils/monthHelper";

export default function ForecastTable() {

    const {t} = useTranslation()
    const {
        data: categories,
        isFetching: isFetchingCategories
    } = useGetTransactionCategoriesQuery()

    const categoryOptions = useMemo(() =>
        categories?.map((c) => ({
            categoryId: c.id,
            label: c.description
        }))
        , [categories]
    )
    
    const typeOptions = useMemo(() => 
        [
            {value: 'expenses', label: t("general.expenses")},
            {value: 'income', label: t("general.income")},
        ], [])

    const [createForecast] = useCreateForecastMutation()
    const [updateForecast] = useUpdateForecastMutation()

    const {
        data: forecasts,
        isFetching: isFetchingForecasts
    } = useGetForecastsQuery(2024) // TODO: Use redux store

    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createForecast(row).unwrap(),
                {
                    pending: t('apiCalls.createForecast.pending'),
                    success: t('apiCalls.createForecast.success'),
                }
            )
            return
        }
        toast.promise(
            updateForecast(row).unwrap(),
            {
                pending: t('apiCalls.updateForecast.pending'),
                success: t('apiCalls.updateForecast.success'),
            }
        )
        return
    }

    const columns = useMemo(() => [
        {
            field: 'categoryId', headerName: t("general.category"), editable: true,
            type: 'singleSelect', valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId
        },
        { field: 'year', headerName: t("general.year"), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'type', headerName: t("general.type"), editable: true, type: 'singleSelect', valueOptions: typeOptions },
        { field: 'januaryAmount', headerName: monthIdxToName('1'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'februaryAmount', headerName: monthIdxToName('2'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'marchAmount', headerName: monthIdxToName('3'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'aprilAmount', headerName: monthIdxToName('4'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'mayAmount', headerName: monthIdxToName('5'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'juneAmount', headerName: monthIdxToName('6'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'julyAmount', headerName: monthIdxToName('7'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'augustAmount', headerName: monthIdxToName('8'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'septemberAmount', headerName: monthIdxToName('9'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'octoberAmount', headerName: monthIdxToName('10'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'novemberAmount', headerName: monthIdxToName('11'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'decemberAmount', headerName: monthIdxToName('12'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
    ], [categoryOptions])

    return (
        <>
            {isFetchingCategories || isFetchingForecasts ? <CircularProgress /> : (
                <CustomCRUDataGrid
                    emptyDataRow={{
                        id: -1, categoryId: null, year: 2024, januaryAmount: 0,
                        februaryAmount: 0, marchAmount: 0, aprilAmount: 0, mayAmount: 0,
                        juneAmount: 0, julyAmount: 0, augustAmount: 0, septemberAmount: 0,
                        octoberAmount: 0, novemberAmount: 0, decemberAmount: 0,
                    }}
                    dataRows={forecasts}
                    columns={columns}
                    handleUpsertRow={processRowUpdate}
                />
            )}
        </>
    )
}

