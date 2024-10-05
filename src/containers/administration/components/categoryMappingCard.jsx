import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CustomCRUDDataGrid from "../../../components/customCRUDDataGrid/customCRUDDataGrid";
import { useGetTransactionCategoriesQuery } from "../../../redux/api/transaction_categories/transaction_categories";
import { useCreateCategoryMappingMutation, useDeleteCategoryMappingMutation, useGetCategoryMappingsQuery, useUpdateCategoryMappingMutation } from "../../../redux/api/transaction_categories_mapping/transaction_categories_mapping";

export default function CategoryMappingCard() {

    const { t } = useTranslation()
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
                pending: t('apiCalls.deleteMapping.pending'),
                success: t('apiCalls.deleteMapping.success'),
            }
        )
    }
    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createMapping(row).unwrap(),
                {
                    pending: t('apiCalls.createMapping.pending'),
                    success: t('apiCalls.createMapping.success'),
                }
            )
            return
        }
        toast.promise(
            updateMapping(row).unwrap(),
            {
                pending: t('apiCalls.updateMapping.pending'),
                success: t('apiCalls.updateMapping.success'),
            }
        )
        return
    }

    const columns = useMemo(() => [
        {
            field: 'categoryId', headerName: t('general.category'), editable: true,
            type: 'singleSelect', valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId
        },
        { field: 'mappingValue', headerName: t('general.mappingValue'), editable: true, type: 'string', },
    ], [categoryOptions])

    return (
        <>
            <Typography variant="h5">{t('pages.administration.categoryMappingTitle')}</Typography>
            <CustomCRUDDataGrid
                emptyDataRow={{ id: -1, categoryId: null, mappingValue: "" }}
                dataRows={mappings}
                columns={columns}
                handleUpsertRow={processRowUpdate}
                handleDeleteRow={handleDeleteCategory}
                isLoading={isFetchingCategories || isFetchingMappings}
            />
        </>
    )
}

