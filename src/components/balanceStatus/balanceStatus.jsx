import { useMemo, useState } from "react";
import { useGetIsBalanceCorrectQuery } from "../../redux/api/transactions/transaction";
import { useTranslation } from "react-i18next";
import { CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Check, Error, Warning } from "@mui/icons-material";
import SimpleDialog from "../simpleDialog/simpleDialog";

export default function BalanceStatus() {
    const { t } = useTranslation()
    const {
        data: balanceData,
        isError: isBalanceCorrectError,
        isFetching: isBalanceCorrectFetching
    } = useGetIsBalanceCorrectQuery()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const result = useMemo(() => {
        let title = "general.balanceStatus.ok"
        let StatusIcon = <Check color="success" />

        // Set the icon and the title according to the fetch
        if (isBalanceCorrectFetching) {
            title = ""
            StatusIcon = <CircularProgress />
        } else if (isBalanceCorrectError) {
            title = "general.balanceStatus.error"
            StatusIcon = <Error color="error" />
        } else if (!balanceData?.isEqual) {
            title = "general.balanceStatus.warning"
            StatusIcon = <Warning color="warning" />
        }

        return {title: title, Icon: StatusIcon}
    }, [balanceData, isBalanceCorrectError, isBalanceCorrectFetching])



    return (
        <>
            <Tooltip title={t(result.title)} >
                <IconButton onClick={() => setIsDialogOpen(true)}>
                    {result.Icon}
                </IconButton>
            </Tooltip>
            <SimpleDialog 
                open={isDialogOpen}
                title={t("general.balanceStatus.dialogTitle")}
                onClose={() => setIsDialogOpen(false)}
            >
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography>{t("general.balanceStatus.dialogLatestBalance")}</Typography>
                    <Typography>{balanceData?.latestBalance}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography>{t("general.balanceStatus.dialogCalculatedBalance")}</Typography>
                    <Typography>{balanceData?.totalBalance}</Typography>
                </Stack>
            </SimpleDialog>
        </>
    )
}