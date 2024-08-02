import { CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { toast } from "react-toastify";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import { useGetTransactionCategoriesQuery } from "../../../redux/api/transaction_categories/transaction_categories";
import { useCreateCategoryMappingMutation, useDeleteCategoryMappingMutation, useGetCategoryMappingsQuery, useUpdateCategoryMappingMutation } from "../../../redux/api/transaction_categories_mapping/transaction_categories_mapping";

export default function CategoryMappingCard() {

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

    const [createMapping] = useCreateCategoryMappingMutation()
    const [updateMapping] = useUpdateCategoryMappingMutation()
    const [deleteMapping] = useDeleteCategoryMappingMutation()

    const {
        data: mappings,
        isFetching: isFetchingMappings
    } = useGetCategoryMappingsQuery()

    const handleDeleteCategory = (id) => {
        toast.promise(
            deleteMapping(id).unwrap(),
            {
                pending: '⏳Deleting mapping',
                success: '✅Deleted mapping',
            }
        )
    }
    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createMapping(row).unwrap(),
                {
                    pending: '⏳Creating mapping',
                    success: '✅Created mapping',
                }
            )
            return
        }
        toast.promise(
            updateMapping(row).unwrap(),
            {
                pending: '⏳Updating mapping',
                success: '✅Updated mapping',
            }
        )
        return
    }

    const columns = useMemo(() => [
        { field: 'categoryId', headerName: 'Kategori', editable: true, 
            type: 'singleSelect', valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId 
        },
        { field: 'mappingValue', headerName: 'Mapping value', editable: true, type: 'string', },
    ], [categoryOptions])

    return (
        <>
            <Typography variant="h5">Category mapping</Typography>
            {isFetchingCategories || isFetchingMappings ? <CircularProgress /> : (
                <CustomCRUDDataGrid
                    emptyDataRow={{ id: -1, categoryId: null, mappingValue: "" }}
                    dataRows={mappings}
                    columns={columns}
                    handleUpsertRow={processRowUpdate}
                    handleDeleteRow={handleDeleteCategory}
                />
            )}
        </>
    )
}

