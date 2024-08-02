import { CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import { useGetTransactionCategoriesQuery } from "../../../redux/api/transaction_categories/transaction_categories";

export default function CategoryDataGrid() {

    const {
        data: categories,
        isFetching: isFetchingCategories
    } = useGetTransactionCategoriesQuery()

    const deleteCategory = (id) => {
        //TODO
    }
    const processRowUpdate = (row) => {
        if (row?.isNew) {
            // TODO
            return
        }
        //TODO
        return
    }

    const columns = useMemo(() => [
        { field: 'description', headerName: 'Kategori', editable: true, type: 'string', },
    ], [])

    return (
        <>
            <Typography variant="h5">Transaction category</Typography>
            {isFetchingCategories ? <CircularProgress/> : (
                <CustomCRUDDataGrid
                    emptyDataRow={{id: -1, description: ""}}
                    dataRows={categories}
                    columns={columns}
                    handleUpsertRow={processRowUpdate}
                    handleDeleteRow={deleteCategory}
                />
            )}
        </>
    )
}

