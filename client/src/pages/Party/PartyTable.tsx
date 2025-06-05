import { useState } from "react";
import {
    IconButton,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutline, } from "@mui/icons-material";
import { IParty } from "../../interfaces/party.interface";

type PartyKey = keyof IParty;
type ColorMap = Record<string, string>;

export const defaultBgColorMap: ColorMap = {
    "Trưa": "#fff4c7",            // yellow
    "Tối": "#c7f4ff",             // blue 

    "A": "#fff4c7",               // yellow
    "B": "#c7f4ff",               // blue 
    "C": "#ccf0eb",                 // green
    "D": "#fcd7d4",                 // red
    "E": "#e0d4fc",                 // purple

    "Đã đặt cọc": "#fff4c7",      //yellow
    "Đã thanh toán": "#c7f4ff",   //blue
    "Đã tổ chức": "#ccf0eb",        //green
    "Đã huỷ": "#fcd7d4",            //red
};

export const defaultTextColorMap: ColorMap = {
    "Trưa": "#d68b01",
    "Tối": "#00a8c6",

    "A": "#d68b01",
    "B": "#00a8c6",
    "C": "#00b69b",
    "D": "#ef3826",
    "E": "#6226ef",

    "Đã đặt cọc": "#d68b01",
    "Đã thanh toán": "#00a8c6",
    "Đã tổ chức": "#00b69b",
    "Đã huỷ": "#ef3826",
};

export default function PartyTable({
    data,
    searchKey,
    handleEdit,
    handleDelete,
}: {
    data: IParty[],
    searchKey: string,
    handleEdit: (course: any) => void,
    handleDelete: (id: any) => void
}) {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<PartyKey>('id');

    const handleRequestSort = (property: PartyKey) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedParties = [...data].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
            return order === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return 0;
    });


    return (
        <TableContainer
            sx={{
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#b8d8ff',
                            '& th': {
                                backgroundColor: '#b8d8ff' // Áp dụng cho các ô
                            },
                            '&:last-child td, &:last-child th': {
                                border: 'none'
                            }
                        }}
                    >
                        <TableCell align="center" onClick={() => handleRequestSort('id')}>
                            <TableSortLabel
                                active={orderBy === 'id'}
                                direction={orderBy === 'id' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>ID</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('groom')}>
                            <TableSortLabel
                                active={orderBy === 'groom'}
                                direction={orderBy === 'groom' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Chú rể</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('bride')}>
                            <TableSortLabel
                                active={orderBy === 'bride'}
                                direction={orderBy === 'bride' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Cô dâu</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('phone')}>
                            <TableSortLabel
                                active={orderBy === 'phone'}
                                direction={orderBy === 'phone' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Số điện thoại</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('date')}>
                            <TableSortLabel
                                active={orderBy === 'date'}
                                direction={orderBy === 'date' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Ngày tổ chức</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('shift')}>
                            <TableSortLabel
                                active={orderBy === 'shift'}
                                direction={orderBy === 'shift' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Ca</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('hall')}>
                            <TableSortLabel
                                active={orderBy === 'hall'}
                                direction={orderBy === 'hall' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Sảnh</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('deposit')}>
                            <TableSortLabel
                                active={orderBy === 'deposit'}
                                direction={orderBy === 'deposit' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Tiền cọc</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('tables')}>
                            <TableSortLabel
                                active={orderBy === 'tables'}
                                direction={orderBy === 'tables' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Số lượng bàn</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('reserveTables')}>
                            <TableSortLabel
                                active={orderBy === 'reserveTables'}
                                direction={orderBy === 'reserveTables' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Số bàn dự trữ</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center" onClick={() => handleRequestSort('status')}>
                            <TableSortLabel
                                active={orderBy === 'status'}
                                direction={orderBy === 'status' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>Trạng thái</b>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell align="center"><b>Hành động</b></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedParties.map((party) => (
                        <TableRow key={party.id} hover>
                            {/* ID */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "4%",
                                    fontWeight: 'bold',
                                }}
                            >
                                {party.id}
                            </TableCell>

                            {/* Groom */}
                            <TableCell
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 80, md: 120, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={party.groom}
                            >
                                {party.groom}
                            </TableCell>

                            {/* Bride */}
                            <TableCell
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 80, md: 120, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={party.bride}
                            >
                                {party.bride}
                            </TableCell>

                            {/* Phone */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "10%",
                                }}
                                title={party.phone}
                            >
                                {party.phone}
                            </TableCell>
                            
                            {/* Date */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "10%",
                                }}
                            >
                                {party.date ? dayjs(party.date).format('DD/MM/YYYY') : ""}
                            </TableCell>

                            {/* Shift */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "5%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        paddingX: 1.5,
                                        paddingY: 0.5,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        backgroundColor: defaultBgColorMap[party.shift],
                                        color: defaultTextColorMap[party.shift],
                                    }}
                                >
                                    {party.shift}
                                </Box>
                            </TableCell>

                            {/* Hall */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "5%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        paddingX: 1.5,
                                        paddingY: 0.5,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        backgroundColor: defaultBgColorMap[party.hall],
                                        color: defaultTextColorMap[party.hall],
                                    }}
                                >
                                    {party.hall}
                                </Box>
                            </TableCell>

                            {/* Deposit */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "10%",
                                }}
                            >
                                {party.deposit}
                            </TableCell>

                            {/* Tables */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "10%",
                                }}
                            >
                                {party.deposit}
                            </TableCell>

                            {/* Reserve tables */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "7%",
                                }}
                            >
                                {party.reserveTables}
                            </TableCell>

                            {/* Status */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        paddingX: 1.5,
                                        paddingY: 0.5,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        backgroundColor: defaultBgColorMap[party.status],
                                        color: defaultTextColorMap[party.status],
                                    }}
                                >
                                    {party.status}
                                </Box>
                            </TableCell>

                            {/* Actions */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "5%",
                                    padding: 0,
                                }}
                            >
                                <IconButton size="small" sx={{ color: '#00d4ff' }}
                                    onClick={() => handleEdit(party)}>
                                    <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#ff0000' }}
                                    onClick={() => handleDelete(party._id)}>
                                    <DeleteOutline fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    ))}
                    {sortedParties.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={12} align="center">
                                Không tìm thấy "{searchKey}".
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >

    );
}
