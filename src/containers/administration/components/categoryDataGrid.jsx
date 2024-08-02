import { CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import { useCreateTransactionCategoryMutation, useDeleteTransactionCategoryMutation, useGetTransactionCategoriesQuery, useUpdateTransactionCategoryMutation } from "../../../redux/api/transaction_categories/transaction_categories";
import { toast } from "react-toastify";

export default function CategoryDataGrid() {

    const [createCategory] = useCreateTransactionCategoryMutation()
    const [updateCategory] = useUpdateTransactionCategoryMutation()
    const [deleteCategory] = useDeleteTransactionCategoryMutation()

    const {
        data: categories,
        isFetching: isFetchingCategories
    } = useGetTransactionCategoriesQuery()

    const handleDeleteCategory = (id) => {
        toast.promise(
            deleteCategory(id).unwrap(),
            {
                pending: '⏳Deleting category',
                success: '✅Deleted category',
            }
        )
    }
    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createCategory(row?.description).unwrap(),
                {
                    pending: '⏳Creating category',
                    success: '✅Created category',
                }
            )
            return
        }
        toast.promise(
            updateCategory(row).unwrap(),
            {
                pending: '⏳Updating category',
                success: '✅Updated category',
            }
        )
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
                    handleDeleteRow={handleDeleteCategory}
                />
            )}
        </>
    )
}

