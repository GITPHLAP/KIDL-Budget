import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function Transactions() {
    const [rows, setRows] = useState([
        { id: 1, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 2, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 3, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 4, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 5, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 6, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 7, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 8, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
        { id: 9, date: '2024-12-31 23:59', amount: 200.22, description: "Beskrivelse123", category: "Select", type: "Type" },
    ])

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'Dato' },
        { field: 'amount', headerName: 'Beløb', },
        { field: 'description', headerName: 'Beskrivelse', },
        { field: 'category', headerName: 'Kategori', editable: true, type: 'singleSelect', valueOptions: ['Market', 'Finance', 'Development'], },
        { field: 'type', headerName: 'Type', },
    ];

    const processRowUpdate = (newRow) => {
        // TODO: Add logic to update db with the new row
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    return (
        <Container maxWidth="lg">
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                editMode="row"
                processRowUpdate={processRowUpdate}
            />
        </Container>
    )
}
