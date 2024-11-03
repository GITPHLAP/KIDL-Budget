import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomCRUDataGrid from "../../components/customCRUDataGrid/customCRUDataGrid";
import { useCreatePlanMutation, useGetPlansQuery, useUpdatePlanMutation } from "../../redux/api/plan/plan";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";
import { removeThousandSeperator } from "../../utils/dataGridHelper";
import { monthIdxToName } from "../../utils/monthHelper";

export default function PlanTable() {

    const selectedYear = useSelector(state => state.selectedYear)

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

    const typeOptions = useMemo(() =>
        [
            { value: 'expenses', label: t("general.expenses") },
            { value: 'income', label: t("general.income") },
        ], [])

    const [createPlan] = useCreatePlanMutation()
    const [updatePlan] = useUpdatePlanMutation()

    const {
        data: plans,
        isFetching: isFetchingPlans
    } = useGetPlansQuery(selectedYear)

    const processRowUpdate = (row) => {
        if (row?.isNew) {
            toast.promise(
                createPlan(row).unwrap(),
                {
                    pending: t('apiCalls.createPlan.pending'),
                    success: t('apiCalls.createPlan.success'),
                }
            )
            return
        }
        toast.promise(
            updatePlan(row).unwrap(),
            {
                pending: t('apiCalls.updatePlan.pending'),
                success: t('apiCalls.updatePlan.success'),
            }
        )
        return
    }

    const columns = useMemo(() => [
        {
            field: 'categoryId', headerName: t("general.category"), editable: true,
            type: 'singleSelect', valueOptions: categoryOptions, getOptionValue: (value) => value.categoryId,
            minWidth: 235,
        },
        { field: 'year', headerName: t("general.year"), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'type', headerName: t("general.type"), editable: true, type: 'singleSelect', valueOptions: typeOptions, minWidth: 100 },
        { field: 'januaryAmount', headerName: monthIdxToName('1'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'februaryAmount', headerName: monthIdxToName('2'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'marchAmount', headerName: monthIdxToName('3'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'aprilAmount', headerName: monthIdxToName('4'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'mayAmount', headerName: monthIdxToName('5'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'juneAmount', headerName: monthIdxToName('6'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'julyAmount', headerName: monthIdxToName('7'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'augustAmount', headerName: monthIdxToName('8'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'septemberAmount', headerName: monthIdxToName('9'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'octoberAmount', headerName: monthIdxToName('10'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'novemberAmount', headerName: monthIdxToName('11'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
        { field: 'decemberAmount', headerName: monthIdxToName('12'), editable: true, type: 'number', valueFormatter: (params) => removeThousandSeperator(params), },
    ], [categoryOptions])

    return (
        <CustomCRUDataGrid
            emptyDataRow={{
                id: -1, categoryId: null, year: 2024, januaryAmount: 0,
                februaryAmount: 0, marchAmount: 0, aprilAmount: 0, mayAmount: 0,
                juneAmount: 0, julyAmount: 0, augustAmount: 0, septemberAmount: 0,
                octoberAmount: 0, novemberAmount: 0, decemberAmount: 0,
            }}
            dataRows={plans}
            columns={columns}
            handleUpsertRow={processRowUpdate}
            isLoading={isFetchingCategories || isFetchingPlans}
        />
    )
}

