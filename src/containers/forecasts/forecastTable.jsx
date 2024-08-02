import { CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { toast } from "react-toastify";
import CustomCRUDataGrid from "../../components/customCRUDataGrid/customCRUDataGrid";
import { useCreateForecastMutation, useGetForecastsQuery, useUpdateForecastMutation } from "../../redux/api/forecast/forecast";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";

export default function ForecastTable() {

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
                    pending: '⏳Creating forecast',
                    success: '✅Created forecast',
                }
            )
            return
        }
        toast.promise(
            updateForecast(row).unwrap(),
            {
                pending: '⏳Updating forecast',
                success: '✅Updated forecast',
            }
        )
        return
    }

    const columns = useMemo(() => [
        {
            field: 'categoryId', headerName: 'Kategori', editable: true,
            type: 'singleSelect', valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId
        },
        { field: 'year', headerName: 'Year', editable: true, type: 'number', },
        { field: 'januaryAmount', headerName: 'January', editable: true, type: 'number', },
        { field: 'februaryAmount', headerName: 'February', editable: true, type: 'number', },
        { field: 'marchAmount', headerName: 'March', editable: true, type: 'number', },
        { field: 'aprilAmount', headerName: 'April', editable: true, type: 'number', },
        { field: 'mayAmount', headerName: 'May', editable: true, type: 'number', },
        { field: 'juneAmount', headerName: 'June', editable: true, type: 'number', },
        { field: 'julyAmount', headerName: 'July', editable: true, type: 'number', },
        { field: 'augustAmount', headerName: 'August', editable: true, type: 'number', },
        { field: 'septemberAmount', headerName: 'September', editable: true, type: 'number', },
        { field: 'octoberAmount', headerName: 'October', editable: true, type: 'number', },
        { field: 'novemberAmount', headerName: 'November', editable: true, type: 'number', },
        { field: 'decemberAmount', headerName: 'December', editable: true, type: 'number', },
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

