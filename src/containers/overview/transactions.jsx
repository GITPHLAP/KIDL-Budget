import { Container, Table, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function Transactions() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100000,
        editable: true,
    });
    return (
        <Container>
            <DataGrid
                {...data}
                loading={data.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Container>
    )
}