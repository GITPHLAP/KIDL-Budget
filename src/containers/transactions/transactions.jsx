import { DataGrid } from "@mui/x-data-grid";
import { isDeepEqual } from "@mui/x-data-grid/internals";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";
import { useGetTransactionsQuery, useUpdateTransactionMutation } from "../../redux/api/transactions/transaction";
import { removeThousandSeperator } from "../../utils/dataGridHelper";
import useDisclosure from "../../utils/hooks/useDisclosure";
import AddTransactionMappingDialog from "./addTransactionMappingDialog";

export default function Transactions() {
    const selectedYear = useSelector((state) => state.selectedYear)

    const { isOpen, onOpen, onClose } = useDisclosure();

    const descriptionRef = useRef("")

    const [updateTransaction, { isLoading }] = useUpdateTransactionMutation()

    const {
        data: transactions,
        isFetching: transactionsFetching
    } = useGetTransactionsQuery(selectedYear)

    const {
        data: categories,
        isFetching: isFetchingCategories
    } = useGetTransactionCategoriesQuery()

    const categoryOptions = useMemo(() => {

        // If no categories default to empty array
        const tmpCategories = categories?.map((c) => ({
            categoryId: c.id,
            label: c.description
        })) || []

        // Add default category
        return [
            {
                categoryId: -1,
                label: "Mangler kategori"
            },
            ...tmpCategories,
        ]
    }, [categories])

    const columns = useMemo(() =>
        [
            { field: 'id', headerName: 'ID' },
            { field: 'accounting', headerName: 'Dato' },
            { field: 'amount', headerName: 'Beløb', type: "number", valueFormatter: (params) => removeThousandSeperator(params), },
            { field: 'description', headerName: 'Beskrivelse', },
            {
                field: 'categoryId', headerName: 'Kategori', editable: true, type: 'singleSelect',
                valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId,
                minWidth: 180,
            },
            { field: 'type', headerName: 'Type', },
        ]
        , [categoryOptions]
    )


    const processRowUpdate = (newRow, oldRow) => {
        // If no changes then just return oldRow
        if (isDeepEqual(newRow, oldRow)) return oldRow

        toast.promise(
            updateTransaction(newRow).unwrap(),
            {
                pending: 'Waiting ⏳',
                success: '👌 Updated transaction',
            }
        )
        return newRow;
    };


    const handleCellDoubleClick = (params) => {
        // Only do something if field is description
        if (params?.field !== "description") return

        // Set description
        descriptionRef.current = params?.formattedValue

        onOpen()
    }

    return (
        <>
            {transactions && (
                <DataGrid
                    autosizeOnMount
                    rows={transactions}
                    columns={columns}
                    disableRowSelectionOnClick
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'accounting', sort: 'desc' }],
                        },
                    }}
                    loading={isFetchingCategories || transactionsFetching || isLoading}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'linear-progress',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                    onCellDoubleClick={handleCellDoubleClick}
                />
            )}
            <AddTransactionMappingDialog
                isOpen={isOpen}
                onClose={onClose}
                description={descriptionRef?.current}
            />
        </>
    )
}

