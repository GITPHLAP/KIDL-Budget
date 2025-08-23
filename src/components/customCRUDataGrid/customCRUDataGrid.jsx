import { Add, Cancel, Edit, Save, VerticalAlignCenter } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarContainer, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function CustomCRUDataGrid(props) {
    const { t } = useTranslation()
    const {
        emptyDataRow, // Used to create new rows
        dataRows,
        columns: dataColumns,
        handleUpsertRow,
        isLoading
    } = props

    const [rows, setRows] = useState(dataRows);
    // Used to save if row is in edit mode or not
    const [rowModesModel, setRowModesModel] = useState({});
    const apiRef = useGridApiRef()

    useEffect(() => {
        setRows(dataRows)
    }, [dataRows])



    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const columns = [
        {
            field: "actions",
            type: "actions",
            headerName: t('general.actions'),
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                            key={`cru-data-grid-save-${id}`}
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                            key={`cru-data-grid-cancel-${id}`}
                        />,
                    ]
                }
                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                        key={`cru-data-grid-edit-${id}`}
                    />,
                ]
            },
        },
        ...dataColumns
    ]

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    // Update row
    const processRowUpdate = (newRow) => {
        handleUpsertRow(newRow)
        return newRow;
    };

    return (
        <>
            <DataGrid
                apiRef={apiRef}
                rows={rows ?? []}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newMode) => setRowModesModel(newMode)}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, emptyDataRow, apiRef },
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'skeleton',
                    },
                }}
                loading={isLoading}

            />
        </>
    )
}


function EditToolbar(props) {
    const { setRows, setRowModesModel, emptyDataRow, apiRef } = props;
    const { t } = useTranslation()

    const handleClick = () => {
        const id = -1; // Use minus one for new rows
        setRows((oldRows) => [{ id, ...emptyDataRow, isNew: true }, ...oldRows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit },
        }));
    };

    const handleResizeColumn = () => {
        apiRef?.current?.autosizeColumns?.({
            includeHeaders: true,
            includeOutliers: true,
            expand: true,
        })
    }

    return (
        <Toolbar>
            <ToolbarButton color="primary" startIcon={<Add />} onClick={handleClick}>
                {t('general.add')}
            </ToolbarButton>
            <ToolbarButton color="primary" startIcon={<VerticalAlignCenter />} onClick={handleResizeColumn}></ToolbarButton>
        </Toolbar>
    );
}