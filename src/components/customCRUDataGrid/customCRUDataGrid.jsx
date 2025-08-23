import { Add, Cancel, Edit, Save, VerticalAlignCenter } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, Toolbar, ToolbarButton, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../customSelect/customSelect";
import { monthOptions } from "../../utils/monthHelper";
import { getValue } from "../../utils/selectHelper";


export default function CustomCRUDataGrid(props) {
    const { t } = useTranslation()
    const {
        emptyDataRow, // Used to create new rows
        dataRows,
        columns: dataColumns,
        handleUpsertRow,
        isLoading
    } = props

    const [isDialogOpen, setIsDialogOpen] = useState(false)
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
        console.log('Peek -  on ln: 101 ',);
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
                onCellKeyDown={(params, event, details) => {
                    console.log('Peek -  on ln: 119 ', params, event, details);
                    setIsDialogOpen(true)
                }}
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
            <BulkEditCellDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
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

function BulkEditCellDialog({ isOpen, onClose, }) {
    const { t } = useTranslation()

    const [selectedMonths, setSelectedMonths] = useState([])

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>{t("pages.transactions.addCategoryMapping")}</DialogTitle>
            <DialogContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={"100%"}>
                    <CustomSelect
                        label={"Select affected months"}
                        options={monthOptions()}
                        value={getValue(selectedMonths)}
                        onChange={(obj) => setSelectedMonths(obj?.value)}
                        isMulti
                    />

                    <Input type="number" />
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("general.cancel")}</Button>
                <Button type="submit">{t("general.add")}</Button>
            </DialogActions>
        </Dialog>
    )
}