    import { useState, useEffect } from "react";
    import {
        Box,
        Button,
        Typography,
        FormControl,
        Select,
        MenuItem,
    } from "@mui/material";
    import { PlusCircle, } from "lucide-react";
    import PartyTable from "./PartyTable";
    import { IParty } from "../../interfaces/party.interface";
    import ConfirmDelete from "../../components/Alert/ConfirmDelete/ConfirmDelete";
    import PartyForm from "./PartyForm";
    import PartyFilter from "../../components/Filter/PartyFilter";
    import SearchBar from "../../components/SearchBar"
    import { DatePicker, } from '@mui/x-date-pickers';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import dayjs from 'dayjs';
    import { partyService } from '../../services/party.service';

    type PartyKey = keyof IParty;




    export default function PartyPage() {
        const [parties, setParties] = useState<IParty[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const fetchParties = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await partyService.getParties();
                console.log(data);
                setParties(data);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách tiệc cưới:', err);
                setError('Không thể tải danh sách tiệc cưới');
            } finally {
                setLoading(false);
            }
        };

        

        const handleEdit = (party: IParty) => {
            setEditData(party);         // Đổ dữ liệu cần sửa vào form
            setIsFormOpen(true);        // Mở form
        };
        

        const handleDelete = async (id: string) => {
            if (window.confirm("Bạn có chắc chắn muốn xóa tiệc này?")) {
                await partyService.deleteParty(id); // id phải là _id
                setParties(parties.filter(p => p._id !== id));
            }
        };

        useEffect(() => {
            fetchParties();
        }, []);
        const [searchKey, setSearchKey] = useState("");
        const [searchBy, setSearchBy] = useState<PartyKey>("groom");
        const [filterShift, setFilterShift] = useState("");
        const [filterHall, setFilterHall] = useState("");
        const [fromDate, setFromDate] = useState((dayjs().startOf("year")).toString());
        const [toDate, setToDate] = useState((dayjs().endOf("year")).toString());
        const [isFormOpen, setIsFormOpen] = useState(false);
        const [editData, setEditData] = useState<IParty | null>(null);
        const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
        const [deleteId, setDeleteId] = useState<string | null>(null);

        // filepath: client/src/pages/Party/Party.tsx
        const filteredParties = parties.filter((party) => {
            if (searchKey === "") return true; // Hiển thị tất cả nếu không tìm kiếm
            const value = party[searchBy];
            if (typeof value === 'number') {
                return value === Number(searchKey);
            }
            return value && value.toLowerCase().includes(searchKey.toLowerCase());
        });

        const handleAddClick = () => {
            setEditData(null);
            setIsFormOpen(true);
        };

        

        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
                overflow: 'hidden',
                backgroundColor: '#fff',
                borderRadius: '15px',
                paddingTop: '15px',
            }}>
                <Typography
                    sx={{
                        userSelect: "none",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                        fontSize: "32px",
                        marginX: "20px",
                    }}
                >
                    Danh sách tiệc cưới
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: "20px",
                        marginX: "20px",
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        gap: '10px',
                        width: "80%",
                        alignItems: 'flex-end',
                    }}>
                        <SearchBar
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />

                        <FormControl
                            sx={{
                                flex: 1,
                                "& fieldset": {
                                    borderRadius: "10px",
                                },
                                "& .MuiInputBase-input": {
                                    paddingY: "10px",
                                    paddingLeft: "14px",
                                    backgroundColor: '#fff',
                                },
                            }}
                        >
                            <Select
                                value={searchBy}
                                onChange={(e) => setSearchBy(e.target.value as PartyKey)}

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
                                <MenuItem value="groom">
                                    Tên chú rể
                                </MenuItem>
                                <MenuItem value="bride">
                                    Tên cô dâu
                                </MenuItem>
                                <MenuItem value="phone">
                                    Số điện thoại
                                </MenuItem>
                                <MenuItem value="deposit">
                                    Tiền cọc
                                </MenuItem>
                                <MenuItem value="tables">
                                    Số lượng bàn
                                </MenuItem>
                                <MenuItem value="reserveTables">
                                    Số bàn dự trữ
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <PartyFilter
                            label="Chọn ca"
                            value={filterShift}
                            onChange={(e) => setFilterShift(e.target.value)}
                            children={["Trưa", "Tối"]}
                        />

                        <PartyFilter
                            label="Chọn sảnh"
                            value={filterHall}
                            onChange={(e) => setFilterHall(e.target.value)}
                            children={["A", "B", "C", "D", "E"]}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{
                                flexDirection: 'column',
                            }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    Từ ngày
                                </Typography>
                                <DatePicker
                                    value={dayjs(fromDate)}
                                    format="DD/MM/YYYY"
                                    onChange={(value) => setFromDate((
                                        value?.toDate() || new Date()).toString()
                                    )}
                                    sx={{
                                        "& .MuiPickersInputBase-root": {
                                            backgroundColor: '#fff',
                                            borderRadius: "10px",
                                            gap: '5px',
                                        },
                                        "& .MuiPickersSectionList-root": {
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: '43px',
                                            width: 'fit-content',
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
                            </Box>

                            <Box sx={{
                                flexDirection: 'column',
                            }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    Đến ngày
                                </Typography>
                                <DatePicker
                                    value={dayjs(toDate)}
                                    format="DD/MM/YYYY"
                                    onChange={(value) => setToDate((
                                        value?.toDate() || new Date()).toString()
                                    )}
                                    sx={{
                                        "& .MuiPickersInputBase-root": {
                                            backgroundColor: '#fff',
                                            borderRadius: "10px",
                                            gap: '5px'
                                        },
                                        "& .MuiPickersSectionList-root": {
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: '43px',
                                            width: 'fit-content',
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
                            </Box>
                        </LocalizationProvider>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<PlusCircle />}
                        onClick={handleAddClick}
                        sx={{
                            alignSelf: 'flex-end',
                            padding: '10px 30px',
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: '8px',
                            backgroundColor: "#4880FF",
                            "&:hover": {
                                backgroundColor: "#3578f0",
                            },
                            textTransform: "none",
                        }}
                    > 
                        Create
                    </Button>
                </Box>

                {/* Table */}
                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <Typography>Đang tải dữ liệu...</Typography>
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : (
                    <PartyTable
                        data={filteredParties}
                        searchKey={searchKey}
                        handleEdit={handleEdit}
                        handleDelete={(id) => handleDelete(id)} // id phải là _id

                    />
                )}

                {/* Form + ConfirmDelete */}
                <PartyForm
                    open={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditData(null); // Đóng form thì xóa dữ liệu đang sửa
                    }}
                    onSubmit={async (data) => {
                        try {
                            if (editData) {
                                await partyService.updateParty(editData._id!, data);
                            } else {
                                await partyService.createParty(data);
                            }
                            await fetchParties();
                            setIsFormOpen(false);
                            setEditData(null);
                        } catch (err) {
                            console.error('Lỗi khi lưu tiệc cưới:', err);
                        }
                    }}
                    initialData={editData}
                    readOnly={false}
                />

                <ConfirmDelete
                    open={isDeleteConfirmOpen}
                    onClose={() => setIsDeleteConfirmOpen(false)}
                    onConfirm={async () => {
                        try {
                            if (deleteId) {
                                await partyService.deleteParty(deleteId);
                                await fetchParties();
                            }
                            setIsDeleteConfirmOpen(false);
                        } catch (err) {
                            console.error('Lỗi khi xóa tiệc cưới:', err);
                        }
                    }}
                />
            </Box>
        );
    }
