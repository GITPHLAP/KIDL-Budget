import { Add, Cancel, Edit, EditNoteTwoTone, Save, VerticalAlignCenter } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, Toolbar, ToolbarButton, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { monthIdxToPlanColumnName, monthOptions } from "../../utils/monthHelper";
import CustomSelect from "../customSelect/customSelect";


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
    const [currentRow, setCurrentRow] = useState({})
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
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(params.id)}
                            key={`cru-data-grid-save-${params.id}`}
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.id)}
                            color="inherit"
                            key={`cru-data-grid-cancel-${params.id}`}
                        />,
                    ]
                }
                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                        key={`cru-data-grid-edit-${params.id}`}
                    />,
                    <GridActionsCellItem
                        icon={<EditNoteTwoTone />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => {
                            handleEditClick(params.id)
                            setIsDialogOpen(true)
                            setCurrentRow(params.row)
                        }}
                        color="inherit"
                        key={`cru-data-grid-bulk-edit-${params.id}`}
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

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        handleSaveClick(currentRow.id);
    };

    // Update row
    const processRowUpdate = (newRow) => {
        handleUpsertRow(newRow)
        setCurrentRow({})
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
                showToolbar
                loading={isLoading}

            />

            {isDialogOpen && <BulkEditCellDialog isOpen={isDialogOpen} onClose={handleDialogClose} processRowUpdate={processRowUpdate} currentRow={currentRow} />}
        </>
    )
}


function EditToolbar(props) {
    const { setRows, setRowModesModel, emptyDataRow, apiRef } = props;

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
            <ToolbarButton color="primary" onClick={handleClick}>
                <Add />
            </ToolbarButton>
            <ToolbarButton color="primary" onClick={handleResizeColumn}>
                <VerticalAlignCenter />
            </ToolbarButton>
        </Toolbar>
    );
}

// TODO: This is not generic, move to plan specific component
function BulkEditCellDialog({ isOpen, onClose, processRowUpdate, currentRow }) {
    const { t } = useTranslation()

    const [selectedMonths, setSelectedMonths] = useState([])
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = () => {
        let newRow = { ...currentRow }

        // Loop through selected months and set the monthAmount to inputValue
        selectedMonths.forEach((monthIdx) => {
            const monthField = monthIdxToPlanColumnName(`${monthIdx}`)
            const parsedValue = parseFloat(inputValue)
            newRow[monthField] = isNaN(parsedValue) ? 0 : parsedValue
        })

        processRowUpdate(newRow)
        onClose()
    }

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>{t("pages.plans.bulkEditPlanTitle")}</DialogTitle>
            <DialogContent >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={"100%"}>
                    <CustomSelect
                        label={t("pages.plans.months")}
                        options={monthOptions()}
                        value={selectedMonths}
                        onValueChange={(values) => setSelectedMonths(values ?? [])}
                        isMulti
                    />

                    <FormControl variant="standard" sx={{height: "100%"}}>
                        <InputLabel id="test">{t("general.plan")}</InputLabel>
                        <Input labelId={"test"} type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </FormControl>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("general.cancel")}</Button>
                <Button type="submit" onClick={handleSubmit}>{t("general.add")}</Button>
            </DialogActions>
        </Dialog>
    )
}