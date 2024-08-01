import { CircularProgress, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useGetTransactionsQuery, useUpdateTransactionMutation } from "../../redux/api/transactions/transaction";
import { toast } from "react-toastify";

export default function Transactions() {
    const [updateTransaction, {isLoading}] = useUpdateTransactionMutation()
    const {
        data: transactions,
        isFetching: transactionsFetching
    } = useGetTransactionsQuery(2024) // TODO: use state to save the selected year from overview 

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'accounting', headerName: 'Dato' },
        { field: 'amount', headerName: 'Beløb', type: "number", },
        { field: 'description', headerName: 'Beskrivelse', },
        { field: 'category', headerName: 'Kategori', editable: true, type: 'singleSelect', valueOptions: ['Market', 'Finance', 'Development'], },
        { field: 'type', headerName: 'Type', },
    ];

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
            {transactionsFetching || isLoading ? <CircularProgress/> : (
                <DataGrid
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
