import { CircularProgress, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useGetTransactionsQuery, useUpdateTransactionMutation } from "../../redux/api/transactions/transaction";
import { toast } from "react-toastify";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";

export default function Transactions() {
    const [updateTransaction, {isLoading}] = useUpdateTransactionMutation()
    const {
        data: transactions,
        isFetching: transactionsFetching
    } = useGetTransactionsQuery(2024) // TODO: use state to save the selected year from overview 

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

    const columns = useMemo(() => 
        [
            { field: 'id', headerName: 'ID' },
            { field: 'accounting', headerName: 'Dato' },
            { field: 'amount', headerName: 'Beløb', type: "number", },
            { field: 'description', headerName: 'Beskrivelse', },
            { field: 'categoryId', headerName: 'Kategori', editable: true, type: 'singleSelect', 
                valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId
            },
            { field: 'type', headerName: 'Type', },
        ]
        , [categoryOptions]
    )

    const processRowUpdate = (newRow) => {
        toast.promise(
            updateTransaction(newRow).unwrap(),
            {
                pending: 'Waiting ⏳',
                success: '👌 Updated transaction',
            }
        )
        return newRow;
    };

    return (
        <Container maxWidth="lg">
            {isFetchingCategories || transactionsFetching || isLoading ? <CircularProgress/> : (
                <DataGrid
                    autosizeOnMount
                    autoHeight
                    rows={transactions}
                    columns={columns}
                    disableRowSelectionOnClick
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                />
            )}
        </Container>
    )
}
