import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function SimpleDialog(props) {
    const {
        title,
        children,
        open,
        onClose,
    } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}