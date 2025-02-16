import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useGetTransactionCategoriesQuery } from "../../redux/api/transaction_categories/transaction_categories";
import { useCreateCategoryMappingMutation } from "../../redux/api/transaction_categories_mapping/transaction_categories_mapping";
import { useTranslation } from "react-i18next";
// import FormikSelect from "../../components/customFormik/formikSelect/formikSelect";

export default function AddTransactionMappingDialog({ isOpen, onClose, description }) {
    const { t } = useTranslation()

    const {
        data: categories,
        isFetching: isFetchingCategories
    } = useGetTransactionCategoriesQuery()

    const [createMapping] = useCreateCategoryMappingMutation()

    const categoryOptions = useMemo(() =>
        categories?.map((c) => ({
            value: c.id,
            label: c.description
        }))
        , [categories]
    )

    const initialValues = useMemo(() => {
        return {
            mappingValue: description || "",
            categoryId: "",
        }
    }, [description])

    const handleOnSubmit = (values) => {
        console.log('Peek - values on ln: 36 ', values );
        toast.promise(
            createMapping(values).unwrap(),
            {
                pending: t('apiCalls.createMapping.pending'),
                success: t('apiCalls.createMapping.success'),
            }
        )
    }

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>{t("pages.transactions.addCategoryMapping")}</DialogTitle>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
                enableReinitialize={true}
            >
                <Form>
                    <DialogContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={"100%"}>
                            <Field name="mappingValue">
                                {({ field }) => (
                                    <TextField {...field} variant="standard" fullWidth label={t('general.category')} />
                                )}
                            </Field>
                            {/* <FormikSelect name="categoryId" options={categoryOptions} isLoading={isFetchingCategories} /> */}
                        </Stack>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>{t("general.cancel")}</Button>
                        <Button type="submit">{t("general.add")}</Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    )
}