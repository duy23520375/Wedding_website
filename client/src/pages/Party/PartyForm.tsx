import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Select,
    MenuItem,
    Typography,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { defaultBgColorMap, defaultTextColorMap } from "./PartyTable";
import { DatePicker, } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function PartyForm({
    open,
    onClose,
    onSubmit,
    initialData,
    readOnly,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    readOnly: boolean
}) {
    const [form, setForm] = useState({
        id: 0,
        groom: "",
        bride: "",
        phone: "",
        date: "",
        shift: "",
        hall: "",
        deposit: 0,
        tables: 0,
        reserveTables: 0,
    });

    const [errors, setErrors] = useState({
        groom: "",
        bride: "",
        phone: "",
        date: "",
        shift: "",
        hall: "",
        deposit: "",
        tables: "",
        reserveTables: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            groom: "",
            bride: "",
            phone: "",
            date: "",
            shift: "",
            hall: "",
            deposit: "",
            tables: "",
            reserveTables: "",
        };

        if (!form.groom.trim()) {
            newErrors.groom = "Vui lòng nhập tên chú rể";
            isValid = false;
        }

        if (!form.bride.trim()) {
            newErrors.bride = "Vui lòng nhập tên cô dâu";
            isValid = false;
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
            isValid = false;
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
            isValid = false;
        }

        if (!form.date) {
            newErrors.date = "Vui lòng chọn ngày tổ chức";
            isValid = false;
        }

        if (!form.shift) {
            newErrors.shift = "Vui lòng chọn ca";
            isValid = false;
        }

        if (!form.hall) {
            newErrors.hall = "Vui lòng chọn sảnh";
            isValid = false;
        }

        if (form.deposit < 0) {
            newErrors.deposit = "Tiền cọc không được âm";
            isValid = false;
        }

        if (form.tables <= 0) {
            newErrors.tables = "Số lượng bàn phải lớn hơn 0";
            isValid = false;
        }

        if (form.reserveTables < 0) {
            newErrors.reserveTables = "Số bàn dự trữ không được âm";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({
            id: 0,
            groom: "",
            bride: "",
            phone: "",
            date: "",
            shift: "",
            hall: "",
            deposit: 0,
            tables: 0,
            reserveTables: 0,
        });
    }, [initialData]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiPaper-root': {
                    padding: '26px 4px',
                    borderRadius: '15px',
                    maxWidth: '700px',
                },
                '& .MuiDialogContent-root': {
                    padding: 0,
                },
                "& fieldset": {
                    borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                    padding: "15px 10px",
                    fontSize: "16px",
                    "&::placeholder": {
                        color: "#a5bed4",
                        opacity: 1,
                    },
                },
            }}
        >
            <DialogTitle sx={{
                padding: '8px 24px',
                paddingTop: '0px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                {readOnly ?
                    "Thông tin tiệc"
                    : initialData ?
                        "Cập nhật thông tin tiệc"
                        : "Đặt tiệc"
                }
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '15px 24px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tên chú rể
                        </Typography>
                        <TextField fullWidth value={form.groom}
                            placeholder="Nhập tên chú rể"
                            onChange={(e) => setForm({ ...form, groom: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tên cô dâu
                        </Typography>
                        <TextField fullWidth value={form.bride}
                            placeholder="Nhập tên tô dâu"
                            onChange={(e) => setForm({ ...form, bride: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số điện thoại
                        </Typography>
                        <TextField fullWidth value={form.phone}
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: ({ xs: 'column', sm: 'row', }),
                        gap: '18px',
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <FormControl fullWidth sx={{
                                flexDirection: 'column',
                            }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    Ngày tổ chức
                                </Typography>
                                <DatePicker
                                    value={dayjs(form.date)}
                                    format="DD/MM/YYYY"
                                    onChange={(value) => setForm({
                                        ...form,
                                        date: (value?.toDate() || new Date()).toString()
                                    })}
                                    sx={{
                                        "& .MuiPickersInputBase-root": {
                                            backgroundColor: '#fff',
                                            borderRadius: "10px",
                                            gap: '5px',
                                            '& .MuiPickersOutlinedInput-root.Mui-error .MuiPickersOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0, 0, 0, 0.23)'
                                            }
                                        },
                                        "& .MuiPickersSectionList-root": {
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: '61px',
                                            paddingY: '0px',
                                        },
                                    }}
                                    slotProps={{
                                        popper: {
                                            sx: {
                                                '& .MuiPaper-root': {
                                                    borderRadius: '20px',
                                                },
                                                '& .MuiDateCalendar-root': {
                                                    padding: '18px 20px',
                                                    gap: '10px',
                                                    maxHeight: '360px',
                                                    height: 'auto',
                                                    width: '310px'
                                                },
                                                '& .MuiPickersCalendarHeader-root': {
                                                    padding: '0 8px',
                                                    margin: 0,
                                                    justifyContent: 'space-between',
                                                },
                                                '& .MuiPickersCalendarHeader-labelContainer': {
                                                    color: '#202224',
                                                    fontWeight: 600,
                                                    fontSize: '15px',
                                                    margin: 0,
                                                },
                                                '& .MuiPickersArrowSwitcher-root': {
                                                    gap: '5px'
                                                },
                                                '& .MuiPickersArrowSwitcher-button': {
                                                    padding: 0,
                                                    backgroundColor: '#e7e9ee',
                                                    borderRadius: '5px'
                                                },
                                                '& .MuiTypography-root': {
                                                    color: '#454545',
                                                },
                                                '& .MuiDayCalendar-slideTransition': {
                                                    minHeight: 0,
                                                    marginBottom: '4px'
                                                },
                                            },

                                        },
                                        day: {
                                            sx: {
                                                color: "#8f9091",
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#e3f2fd',
                                                },
                                                '&.MuiPickersDay-root.Mui-selected': {
                                                    backgroundColor: '#4880FF',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#4880FF'
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                />
                            </FormControl>
                        </LocalizationProvider>

                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Ca
                            </Typography>
                            <Select
                                value={form.shift}
                                onChange={(e) => setForm({ ...form, shift: e.target.value })}
                                displayEmpty
                                sx={{
                                    height: '61px',
                                    "& .MuiSelect-icon": {
                                        color: "var(--text-color)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid #e4e4e7",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "rgba(117, 126, 136, 0.08)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "#bcd7ff",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Chọn ca     {/* placeholder */}
                                </MenuItem>
                                {["Trưa", "Tối"].map((item) =>
                                    <MenuItem value={item}
                                        sx={{
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'inline-flex',
                                            paddingX: 1.5,
                                            paddingY: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: defaultBgColorMap[item],
                                            color: defaultTextColorMap[item],
                                            fontWeight: 'bold',
                                            zIndex: 100
                                        }}>
                                            {item}
                                        </Box>
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Sảnh
                            </Typography>
                            <Select
                                value={form.hall}
                                onChange={(e) => setForm({ ...form, hall: e.target.value })}
                                displayEmpty
                                sx={{
                                    height: '61px',
                                    "& .MuiSelect-icon": {
                                        color: "var(--text-color)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid #e4e4e7",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "rgba(117, 126, 136, 0.08)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "#bcd7ff",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Chọn sảnh     {/* placeholder */}
                                </MenuItem>
                                {["A", "B", "C", "D", "E"].map((item) => (
                                    <MenuItem value={item}
                                        sx={{
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'inline-flex',
                                            paddingX: 1.5,
                                            paddingY: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: defaultBgColorMap[item],
                                            color: defaultTextColorMap[item],
                                            fontWeight: 'bold',
                                        }}>
                                            {item}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Tiền cọc
                        </Typography>
                        <TextField fullWidth value={form.deposit}
                            placeholder="Nhập tiền cọc"
                            onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số lượng bàn
                        </Typography>
                        <TextField fullWidth value={form.tables}
                            placeholder="Nhập số lượng bàn"
                            onChange={(e) => setForm({ ...form, tables: Number(e.target.value) })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Số bàn dự trữ
                        </Typography>
                        <TextField fullWidth value={form.reserveTables}
                            placeholder="Nhập số bàn dự trữ"
                            onChange={(e) => setForm({ ...form, reserveTables: Number(e.target.value) })} />
                    </Box>
                </Box>
            </DialogContent>

            {!readOnly &&
                <DialogActions sx={{
                    alignSelf: 'center',
                    paddingTop: '16px',
                    paddingBottom: '0px',
                    gap: '10px',
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
                    <Button 
                        onClick={() => {
                            if (validateForm()) {
                                onSubmit(form);
                            }
                        }} 
                        variant="contained"
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: '8px',
                            backgroundColor: "#4880FF",
                            textTransform: "none",
                        }}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            }
        </Dialog>
    );
}
