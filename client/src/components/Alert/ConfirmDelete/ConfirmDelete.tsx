import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";


export default function ConfirmDelete({ 
    open, 
    onClose, 
    onConfirm 
}: {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void
}) {

    return (
        <Dialog open={open} onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: "",
                    color: "var(--text-color)",
                    padding: '20px 4px',
                    borderRadius: '15px'
                }
            }}
        >
            <DialogTitle>
                Bạn có chắc chắn muốn xóa không?
            </DialogTitle>

            <DialogActions sx={{
                alignSelf: 'center',
            }}>
                <Button onClick={onClose}
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: 'var(--text-color)',
                        textTransform: "none",
                    }}
                >
                    Huỷ
                </Button>
                <Button variant="contained" color="error" onClick={onConfirm}
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: '8px',
                        textTransform: "none",
                    }}
                >
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
}
