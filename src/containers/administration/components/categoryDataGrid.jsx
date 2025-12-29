import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import MultilineGridCell from "../../../components/multilineGridCell/multilineGridCell";
import { useCreateTransactionCategoryMutation, useDeleteTransactionCategoryMutation, useGetTransactionCategoriesQuery, useUpdateTransactionCategoryMutation } from "../../../redux/api/transaction_categories/transaction_categories";

export default function CategoryDataGrid() {

    const { t } = useTranslation()
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
                createCategory(row).unwrap(),
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

    const columns = [
        { field: 'description', headerName: t('general.category'), editable: true, type: 'string' },
        { field: 'comment', headerName: t('general.comment'), editable: true, ...multilineColumn, },
    ]

    return (
        <>
            <Typography variant="h5">{t('pages.administration.categoryTitle')}</Typography>
            <Box sx={{ display: "flex", height: "500px" }}>
                <CustomCRUDDataGrid
                    emptyDataRow={{ id: -1, description: "", comment: "" }}
                    dataRows={categories}
                    columns={columns}
                    handleUpsertRow={processRowUpdate}
                    handleDeleteRow={handleDeleteCategory}
                    isLoading={isFetchingCategories}
                />
            </Box>
        </>
    )
}

const multilineColumn = {
    type: 'string',
    renderEditCell: (params) => <MultilineGridCell {...params} />,
};