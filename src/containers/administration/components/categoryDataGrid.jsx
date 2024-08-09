import { CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import { useCreateTransactionCategoryMutation, useDeleteTransactionCategoryMutation, useGetTransactionCategoriesQuery, useUpdateTransactionCategoryMutation } from "../../../redux/api/transaction_categories/transaction_categories";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function CategoryDataGrid() {

    const {t} = useTranslation()
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
                pending: t('apiCalls.deleteCategory.pending'),
                success: t('apiCalls.deleteCategory.success'),
            }
        )
    }
    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createCategory(row?.description).unwrap(),
                {
                    pending: t('apiCalls.createCategory.pending'),
                    success: t('apiCalls.createCategory.success'),
                }
            )
            return
        }
        toast.promise(
            updateCategory(row).unwrap(),
            {
                pending: t('apiCalls.updateCategory.pending'),
                success: t('apiCalls.updateCategory.success'),
            }
        )
        return
    }

    const columns = useMemo(() => [
        { field: 'description', headerName: t('general.category'), editable: true, type: 'string', },
    ], [])

    return (
        <>
            <Typography variant="h5">{t('pages.administration.categoryTitle')}</Typography>
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

