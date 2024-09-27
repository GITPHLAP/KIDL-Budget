import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCopyPlanMutation } from "../../../redux/api/plan/plan";

export default function CopyPlanCard(props) {
    const { t } = useTranslation()

    const selectedYear = useSelector((state) => state.selectedYear)

    const [copyPlan] = useCopyPlanMutation()
    return (
        <>
            <Typography variant="h5">{t('pages.administration.copyPlanTitle')}</Typography>
            <Formik
                initialValues={{
                    fromYear: selectedYear,
                    toYear: selectedYear + 1
                }}
                onSubmit={(values, actions) => {
                    // Call api
                    toast.promise(
                        copyPlan({ fromYear: values.fromYear, toYear: values.toYear }).unwrap(),
                        {
                            pending: t('apiCalls.copyPlan.pending'),
                            success: t('apiCalls.copyPlan.success'),
                        }
                    )
                }}
            >
                <Form>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Field name="fromYear">
                            {({ field, form }) => (
                                <TextField {...field} variant="standard" size="small" label={t('pages.administration.planCard.fromText')} />
                            )}
                        </Field>
                        <Field name="toYear">
                            {({ field, form }) => (
                                <TextField {...field} variant="standard" size="small" label={t('pages.administration.planCard.toText')} />
                            )}
                        </Field>
                        <Button type="submit">Add</Button>
                    </Stack>
                </Form>
            </Formik>
        </>
    )
}